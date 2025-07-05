const cors = require('cors');

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');

// UUID generation function for compatibility
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // Initialize Prisma Client

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'http://frontend:5173', 'http://26.226.169.71:5173'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

app.use(express.json());

// Apply CORS middleware BEFORE routes
app.use(cors({
    origin: ['http://localhost:5173', 'http://frontend:5173', 'http://26.226.169.71:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));

// In-memory data structures for game state management
const gameSessions = new Map(); // sessionId -> { topic, numQuestions, questions, players, currentQuestionIndex, answersMap, questionStartTime }
const questionTimers = new Map(); // sessionId -> timer reference
const activeConnections = new Map(); // socketId -> { sessionId, playerId, playerName }

// Helper functions (UNCHANGED)
/**
 * Shuffles an array using the Fisher-Yates (Knuth) algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Normalizes a string for case-insensitive and punctuation-agnostic comparison.
 * @param {string} str - The input string.
 * @returns {string} The normalized string.
 */
function normalizeText(str) {
    if (typeof str !== 'string') return '';
    return str.trim().toLowerCase().replace(/[^\w\s]/gi, '');
}

/**
 * Progresses to the next question or ends the game
 * @param {string} sessionId - The game session ID
 */
function progressToNextQuestion(sessionId) {
    const game = gameSessions.get(sessionId);
    if (!game) return;

    // Clear existing timer
    if (questionTimers.has(sessionId)) {
        clearTimeout(questionTimers.get(sessionId));
        questionTimers.delete(sessionId);
    }

    game.currentQuestionIndex++;
    
    if (game.currentQuestionIndex >= game.numQuestions) {
        // Game finished
        io.to(sessionId).emit('gameFinished', { 
            message: "Game finished!",
            finalLeaderboard: game.players
                .map(p => ({ playerName: p.playerName, characterModel: p.characterModel, score: p.score }))
                .sort((a, b) => b.score - a.score)
        });
    } else {
        // Serve next question
        game.questionStartTime = Date.now();
        const nextQuestion = game.questions[game.currentQuestionIndex];
        
        io.to(sessionId).emit('newQuestion', {
            questionId: nextQuestion.id,
            question: nextQuestion.question,
            type: nextQuestion.type,
            choices: nextQuestion.type === "multiple_choice" ? nextQuestion.choices : null,
            questionStartTime: game.questionStartTime,
            timeLimit: 30000 // 30 seconds per question
        });

        // Set timer for next question
        const timer = setTimeout(() => {
            progressToNextQuestion(sessionId);
        }, 30000); // 30 seconds
        questionTimers.set(sessionId, timer);
    }
}

// REST API Endpoints

/*
## POST /game/start

Initiates a new quiz game session.

### Input
`{ "topic": "string", "numQuestions": integer }`

### Output
`{ "sessionId": "string" }`
*/

  
app.post('/game/start', async (req, res) => { // Made async
    console.log('POST /game/start called with:', req.body);
    const { topic, numQuestions } = req.body;

    if (!topic || typeof topic !== 'string' || !numQuestions || !Number.isInteger(numQuestions) || numQuestions <= 0) {
        return res.status(400).json({ error: "Invalid input. 'topic' (string) and 'numQuestions' (positive integer) are required." });
    }

    // Fetch questions from the database using Prisma
    console.log('Fetching questions for topic:', topic);
    let availableQuestions = await prisma.question.findMany({
        where: { topic: topic }
    });
    console.log('Found questions:', availableQuestions.length);

    if (!availableQuestions || availableQuestions.length === 0) {
        return res.status(404).json({ error: `No questions found for topic '${topic}' in the database.` });
    }

    if (numQuestions > availableQuestions.length) {
        return res.status(400).json({ error: `Not enough questions available for topic '${topic}'. Max available: ${availableQuestions.length}.` });
    }

    // Parse choices for multiple_choice questions from string to array
    availableQuestions = availableQuestions.map(q => {
        if (q.type === 'multiple_choice' && q.choices) {
            try {
                return { ...q, choices: JSON.parse(q.choices) };
            } catch (e) {
                console.error(`Error parsing choices for question ${q.id}:`, e);
                return { ...q, choices: [] }; // Fallback to empty array if parsing fails
            }
        }
        return q;
    });

    const shuffledQuestions = shuffleArray([...availableQuestions]).slice(0, numQuestions);
    console.log('Creating session with', shuffledQuestions.length, 'questions');
    const sessionId = generateUUID();
    console.log('Generated session ID:', sessionId);

    gameSessions.set(sessionId, {
        topic,
        numQuestions,
        questions: shuffledQuestions,
        players: [], // Stores { playerId, playerName, characterModel, score }
        currentQuestionIndex: -1, // -1 means game has started but no question has been served yet
        answersMap: new Map(), // questionId -> { totalExpected: number, answers: [{ playerId, answer, serverAnswerTime }] }
        questionStartTime: null, // Server timestamp when the current question was presented
        gameStarted: false, // Whether the host has started the game
        hostPlayerId: null // ID of the host player
    });

    res.status(201).json({ sessionId });
});

/*
## POST /game/join

Allows a player to join an existing game session.

### Input
`{ "sessionId": "string", "playerName": "string", "characterModel": "string" }`

### Output
`{ "playerId": "string" }`
*/
app.post('/game/join', (req, res) => {
    const { sessionId, playerName, characterModel } = req.body;

    if (!sessionId || typeof sessionId !== 'string' || !playerName || typeof playerName !== 'string' || !characterModel || typeof characterModel !== 'string') {
        return res.status(400).json({ error: "Invalid input. 'sessionId', 'playerName', and 'characterModel' (all strings) are required." });
    }

    const game = gameSessions.get(sessionId);
    if (!game) {
        return res.status(404).json({ error: "Game session not found." });
    }

    if (game.players.some(p => p.playerName === playerName)) {
        return res.status(409).json({ error: `Player name '${playerName}' is already taken in this session.` });
    }

    const playerId = generateUUID();
    const newPlayer = { playerId, playerName, characterModel, score: 0 };

    game.players.push(newPlayer);

    // If there's an active question, update its `totalExpected` answers for new players
    const currentQuestion = game.questions[game.currentQuestionIndex];
    if (currentQuestion && game.answersMap.has(currentQuestion.id)) {
        game.answersMap.get(currentQuestion.id).totalExpected = game.players.length;
    }

    res.status(200).json({ playerId });
});

/*
## GET /game/:sessionId/question

Retrieves the current question for the given game session.

### Output
`{ "questionId": "string", "question": "string", "type": "multiple_choice" or "free_text", "choices": ["string", ...], "questionStartTime": milliseconds }`
For free_text questions, the "choices" array should be `null`.
*/
app.get('/game/:sessionId/question', (req, res) => {
    const { sessionId } = req.params;

    const game = gameSessions.get(sessionId);
    if (!game) {
        return res.status(404).json({ error: "Game session not found." });
    }

    // Only start the game if it has been explicitly started by the host
    if (!game.gameStarted) {
        return res.status(200).json({ 
            message: "Game is waiting for host to start. Players can still join.",
            waitingForHost: true,
            players: game.players.length
        });
    }
    
    // If game has started and no question has been served yet, start the first question.
    if (game.currentQuestionIndex === -1 && game.players.length > 0) {
        game.currentQuestionIndex = 0;
        game.questionStartTime = Date.now(); // Record when the question is served by the server

        // Emit newQuestion via WebSocket when the first question starts
        const newQuestion = game.questions[game.currentQuestionIndex];
        io.to(sessionId).emit('newQuestion', {
            questionId: newQuestion.id,
            question: newQuestion.question,
            type: newQuestion.type,
            choices: newQuestion.type === "multiple_choice" ? newQuestion.choices : null,
            questionStartTime: game.questionStartTime,
            timeLimit: 30000 // 30 seconds per question
        });

        // Set timer for first question
        const timer = setTimeout(() => {
            progressToNextQuestion(sessionId);
        }, 30000); // 30 seconds
        questionTimers.set(sessionId, timer);
    } else if (game.currentQuestionIndex >= game.numQuestions) {
        // All questions have been served
        return res.status(200).json({ message: "Game finished. All questions served." });
    }

    const currentQuestion = game.questions[game.currentQuestionIndex];
    if (!currentQuestion) {
        return res.status(404).json({ error: "No current question available or game not ready to start. Ensure players have joined." });
    }

    const { id: questionId, question: questionText, type, choices } = currentQuestion;

    res.status(200).json({
        questionId,
        question: questionText,
        type,
        choices: type === "multiple_choice" ? choices : null,
        questionStartTime: game.questionStartTime
    });
});

/*
## POST /game/:sessionId/answer

Submits an answer for the current question.

### Input
`{ "playerId": "string", "questionId": "string", "answer": "string" }`

### Output
`{ "correct": boolean, "currentScore": integer }`
*/
app.post('/game/:sessionId/answer', (req, res) => {
    const { sessionId } = req.params;
    const { playerId, questionId, answer } = req.body;

    if (!playerId || typeof playerId !== 'string' || !questionId || typeof questionId !== 'string' || answer === undefined) {
        return res.status(400).json({ error: "Invalid input. 'playerId', 'questionId' (strings), and 'answer' are required." });
    }

    const game = gameSessions.get(sessionId);
    if (!game) {
        return res.status(404).json({ error: "Game session not found." });
    }

    const player = game.players.find(p => p.playerId === playerId);
    if (!player) {
        return res.status(404).json({ error: "Player not found in this game session." });
    }

    const currentQuestion = game.questions[game.currentQuestionIndex];
    if (!currentQuestion || currentQuestion.id !== questionId) {
        return res.status(400).json({ error: "Submitted answer is not for the current active question or question does not exist in this game state." });
    }

    let questionData = game.answersMap.get(questionId);
    if (questionData && questionData.answers.some(ans => ans.playerId === playerId)) {
        return res.status(409).json({ error: "Player has already submitted an answer for this question." });
    }

    let correct = false;
    let scoreEarned = 0;

    const serverAnswerTime = game.questionStartTime ? (Date.now() - game.questionStartTime) : 0;

    if (currentQuestion.type === "multiple_choice") {
        correct = (answer === currentQuestion.correctAnswer);
    } else if (currentQuestion.type === "free_text") {
        correct = (normalizeText(answer) === normalizeText(currentQuestion.correctAnswer));
    }

    if (correct) {
        scoreEarned = Math.max(0, 1000 - (serverAnswerTime / 10));
    }

    player.score += scoreEarned;

    if (!questionData) {
        questionData = {
            totalExpected: game.players.length,
            answers: []
        };
        game.answersMap.set(questionId, questionData);
    }
    questionData.answers.push({ playerId, answer, serverAnswerTime });

    // Notify all clients in the session that a player has submitted an answer
    io.to(sessionId).emit('answerSubmitted', { playerId, questionId });

    // Broadcast updated leaderboard after every answer
    const leaderboard = game.players
        .map(p => ({ playerName: p.playerName, characterModel: p.characterModel, score: p.score }))
        .sort((a, b) => b.score - a.score);
    console.log(`📢 BROADCASTING leaderboardUpdated to session ${sessionId}:`, leaderboard);
    io.to(sessionId).emit('leaderboardUpdated', leaderboard);


    if (questionData.answers.length === questionData.totalExpected) {
        // All players have answered, progress to next question immediately
        progressToNextQuestion(sessionId);
    }

    res.status(200).json({ correct, currentScore: player.score });
});

/*
## GET /game/:sessionId/leaderboard

Retrieves the current leaderboard for a game session.

### Output
`[{ "playerName": "string", "characterModel": "string", "score": integer }]`
*/
app.get('/game/:sessionId/leaderboard', (req, res) => {
    const { sessionId } = req.params;

    const game = gameSessions.get(sessionId);
    if (!game) {
        return res.status(404).json({ error: "Game session not found." });
    }

    const leaderboard = game.players
        .map(player => ({
            playerName: player.playerName,
            characterModel: player.characterModel,
            score: player.score
        }))
        .sort((a, b) => b.score - a.score);

    res.status(200).json(leaderboard);
});

/*
## POST /game/:sessionId/start

Allows the host to start the game.

### Input
`{ "hostPlayerId": "string" }`

### Output
`{ "success": boolean, "message": "string" }`
*/
app.post('/game/:sessionId/start', (req, res) => {
    const { sessionId } = req.params;
    const { hostPlayerId } = req.body;

    if (!hostPlayerId || typeof hostPlayerId !== 'string') {
        return res.status(400).json({ error: "Invalid input. 'hostPlayerId' (string) is required." });
    }

    const game = gameSessions.get(sessionId);
    if (!game) {
        return res.status(404).json({ error: "Game session not found." });
    }

    // Verify the player is the host
    if (game.hostPlayerId !== hostPlayerId) {
        return res.status(403).json({ error: "Only the host can start the game." });
    }

    if (game.gameStarted) {
        return res.status(400).json({ error: "Game has already been started." });
    }

    if (game.players.length < 1) {
        return res.status(400).json({ error: "At least one player must be in the game to start." });
    }

    // Start the game
    game.gameStarted = true;
    
    // Emit game started event to all players
    const gameStartedEvent = { 
        message: "Game started by host!",
        players: game.players.length
    };
    console.log(`📢 BROADCASTING gameStarted to session ${sessionId}:`, gameStartedEvent);
    console.log(`👥 Players in session ${sessionId}:`, game.players.map(p => p.playerName));
    io.to(sessionId).emit('gameStarted', gameStartedEvent);

    res.status(200).json({ 
        success: true, 
        message: "Game started successfully.",
        players: game.players.length
    });
});

/*
## GET /game/lobbies

Retrieves a list of all active game lobbies.

### Output
`[{ "sessionId": "string", "topic": "string", "numQuestions": integer, "players": integer, "gameStarted": boolean }]`
*/
app.get('/game/lobbies', (req, res) => {
    const lobbies = [];
    
    for (const [sessionId, game] of gameSessions.entries()) {
        lobbies.push({
            sessionId,
            topic: game.topic,
            numQuestions: game.numQuestions,
            players: game.players.length,
            gameStarted: game.gameStarted,
            hostPlayerName: game.players.find(p => p.playerId === game.hostPlayerId)?.playerName || 'Unknown'
        });
    }
    
    // Sort by most recent (assuming newer sessions have longer UUIDs)
    lobbies.sort((a, b) => b.sessionId.localeCompare(a.sessionId));
    
    res.status(200).json(lobbies);
});


// WebSocket (Socket.IO) event handlers
io.on('connection', (socket) => {
    console.log(`🔌 CLIENT CONNECTED: ${socket.id}`);
    console.log(`📡 Socket connection established from:`, socket.handshake.address);
    console.log(`🔗 Socket headers:`, socket.handshake.headers);

    // Client sends 'joinGame' event to join a game session via WebSockets
    socket.on('joinGame', ({ sessionId, playerName, characterModel }, callback) => {
        console.log(`📥 JOIN GAME EVENT RECEIVED from socket ${socket.id}:`, { sessionId, playerName, characterModel });
        console.log(`🔍 Checking session ${sessionId} - Available sessions:`, Array.from(gameSessions.keys()));
        if (!sessionId || !playerName || !characterModel) {
            if (typeof callback === 'function') {
                callback({ error: "Invalid input. 'sessionId', 'playerName', and 'characterModel' are required." });
            }
            return;
        }

        const game = gameSessions.get(sessionId);
        if (!game) {
            if (typeof callback === 'function') {
                callback({ error: "Game session not found." });
            }
            return;
        }

        // Check for duplicate names, but allow reconnection of the same player
        console.log(`🔍 Checking for duplicate name '${playerName}' in session ${sessionId}`);
        console.log(`👥 Current players in session:`, game.players.map(p => ({ name: p.playerName, id: p.playerId })));
        
        // Check if this player name is already taken by an active connection
        const existingPlayer = game.players.find(p => p.playerName === playerName);
        const activePlayerWithName = Array.from(activeConnections.values()).find(
            conn => conn.sessionId === sessionId && conn.playerName === playerName
        );
        
        if (existingPlayer && activePlayerWithName) {
            // Another player is actively using this name
            console.log(`❌ Player name '${playerName}' already taken by active player:`, activePlayerWithName.playerId);
            if (typeof callback === 'function') {
                callback({ error: `Player name '${playerName}' is already taken in this session.` });
            }
            return;
        }

        // If player exists but no active connection, allow reconnection
        let playerId;
        let isReconnection = false;
        
        if (existingPlayer && !activePlayerWithName) {
            // Player exists but no active connection - allow reconnection
            playerId = existingPlayer.playerId;
            isReconnection = true;
            console.log(`🔄 Player ${playerName} reconnecting to session ${sessionId}`);
        } else {
            // New player
            playerId = generateUUID();
            const newPlayer = { playerId, playerName, characterModel, score: 0 };
            game.players.push(newPlayer);
            console.log(`Player ${playerName} (${playerId}) joined session ${sessionId}`);
        }

        // Set the first player as the host if no host is set
        if (!game.hostPlayerId) {
            game.hostPlayerId = playerId;
            console.log(`Player ${playerName} (${playerId}) is the host for session ${sessionId}`);
        }

        // Track active connection
        activeConnections.set(socket.id, { sessionId, playerId, playerName });

        // Join the Socket.IO room for this session
        socket.join(sessionId);
        socket.data.sessionId = sessionId; // Store sessionId on socket for later use (e.g., disconnection)
        socket.data.playerId = playerId; // Store playerId on socket

        // Notify all clients in the session that a new player has joined
        const playerJoinedEvent = { playerName, characterModel, isHost: playerId === game.hostPlayerId };
        console.log(`📢 BROADCASTING playerJoined to session ${sessionId}:`, playerJoinedEvent);
        console.log(`👥 Players in session ${sessionId}:`, game.players.map(p => p.playerName));
        io.to(sessionId).emit('playerJoined', playerJoinedEvent);

        // Update totalExpected for current/future questions in the answersMap
        const currentQuestion = game.questions[game.currentQuestionIndex];
        if (currentQuestion && game.answersMap.has(currentQuestion.id)) {
            game.answersMap.get(currentQuestion.id).totalExpected = game.players.length;
        }

        if (typeof callback === 'function') {
            const response = { 
                success: true, 
                playerId,
                isHost: playerId === game.hostPlayerId, // Send host status to the joining client
                isReconnection
            };
            console.log(`📤 SENDING JOIN GAME RESPONSE to socket ${socket.id}:`, response);
            callback(response); // Acknowledge successful join to the joining client
        }

        // If a player joins after the game has started, send them the current question immediately.
        if (game.currentQuestionIndex !== -1 && game.currentQuestionIndex < game.numQuestions) {
            const currentQ = game.questions[game.currentQuestionIndex];
            socket.emit('newQuestion', {
                questionId: currentQ.id,
                question: currentQ.question,
                type: currentQ.type,
                choices: currentQ.type === "multiple_choice" ? currentQ.choices : null,
                questionStartTime: game.questionStartTime
            });
            // Also send the current leaderboard to the newly joined player
            const leaderboard = game.players
                .map(p => ({ playerName: p.playerName, characterModel: p.characterModel, score: p.score }))
                .sort((a, b) => b.score - a.score);
            socket.emit('leaderboardUpdated', leaderboard);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        
        // Remove from active connections
        const connection = activeConnections.get(socket.id);
        if (connection) {
            console.log(`🗑️ Removing active connection for player ${connection.playerName} in session ${connection.sessionId}`);
            activeConnections.delete(socket.id);
        }
        
        // For this MVP, we keep players in gameSessions even after disconnect
        // as they might reconnect. The activeConnections map tracks who is actually connected.
    });
});


// Start the Express server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Quiz game server running on port ${PORT}`);
    console.log(`🌐 WebSocket server ready for connections`);
    console.log(`📊 CORS origins:`, ['http://localhost:5173', 'http://frontend:5173', 'http://26.226.169.71:5173']);
});