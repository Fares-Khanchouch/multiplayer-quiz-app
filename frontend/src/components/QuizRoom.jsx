// frontend/src/components/QuizRoom.jsx

import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';
import Question from './Question';
import Leaderboard from './Leaderboard';
import './QuizRoom.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function QuizRoom({ sessionId, playerName, characterModel, isHostProp, playerId }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [gameStatus, setGameStatus] = useState('waiting');
  const [gameMessage, setGameMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [socketPlayerId, setSocketPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(isHostProp);
  const [gameStarted, setGameStarted] = useState(false);
  const questionTimerRef = useRef(null);
  const QUESTION_DURATION = 15;

  useEffect(() => {
    if (!sessionId) return;

    console.log('🔄 QuizRoom useEffect running with:', { sessionId, playerName, characterModel, isHostProp });

    console.log('🔌 Connecting socket...');
    socket.connect();
    console.log(`🆔 My socket ID: ${socket.id}`);
    
    console.log('📤 Emitting joinGame event...');
    socket.emit('joinGame', { sessionId, playerName, characterModel }, (response) => {
      if (response && response.success) {
        console.log('Successfully joined WebSocket game room');
        if (response.playerId) {
          setSocketPlayerId(response.playerId);
          console.log('Player ID:', response.playerId);
        }
        if (response.isHost) {
          console.log('Setting isHost to true from WebSocket response');
          setIsHost(true);
        } else {
          console.log('WebSocket response isHost:', response.isHost);
        }
      } else {
        console.error('Failed to join WebSocket game room:', response?.error || 'Unknown error');
        alert('Failed to join game room.');
      }
    });

    socket.on('playerJoined', (player) => {
      console.log(`📥 RECEIVED playerJoined event:`, player);
      console.log(`👤 Player ${player.playerName} joined, isHost: ${player.isHost}`);
      fetchLeaderboard();
    });

    socket.on('gameStarted', (data) => {
      console.log(`📥 RECEIVED gameStarted event:`, data);
      console.log(`🎮 Game started: ${data.message}, Players: ${data.players}`);
      setGameStarted(true);
      setGameStatus('playing');
      setGameMessage('');
      fetchCurrentQuestion();
    });

    socket.on('newQuestion', (data) => {
      console.log('New question received:', data);
      setCurrentQuestion(data);
      setGameStatus('playing');
      setGameMessage('');
      
      clearInterval(questionTimerRef.current);
      
      const timeLimit = data.timeLimit || 30000;
      const elapsed = Date.now() - data.questionStartTime;
      const timeLeft = Math.max(0, Math.floor((timeLimit - elapsed) / 1000));
      setTimeLeft(timeLeft);
      
      questionTimerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(questionTimerRef.current);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    });

    socket.on('answerSubmitted', ({ playerId, questionId }) => {
      console.log(`Player ${playerId} submitted answer for question ${questionId}`);
    });

    socket.on('leaderboardUpdated', (updatedLeaderboard) => {
      console.log(`📥 RECEIVED leaderboardUpdated event:`, updatedLeaderboard);
      console.log(`🏆 Leaderboard updated with ${updatedLeaderboard.length} players`);
      setLeaderboard(updatedLeaderboard);
      setPlayersInRoom(updatedLeaderboard.map(p => ({ playerName: p.playerName, characterModel: p.characterModel })));
    });

    socket.on('gameFinished', (data) => {
      setGameStatus('finished');
      setGameMessage(data.message);
      setCurrentQuestion(null);
      clearInterval(questionTimerRef.current);
      if (data.finalLeaderboard) {
        setLeaderboard(data.finalLeaderboard);
      } else {
        fetchLeaderboard();
      }
    });

    fetchLeaderboard();

    return () => {
      socket.off('playerJoined');
      socket.off('gameStarted');
      socket.off('newQuestion');
      socket.off('answerSubmitted');
      socket.off('leaderboardUpdated');
      socket.off('gameFinished');
      clearInterval(questionTimerRef.current);
      socket.emit('leaveGame', { sessionId, playerName });
    };
  }, [sessionId, playerName, characterModel, isHostProp]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/${sessionId}/leaderboard`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
        setPlayersInRoom(data.map(p => ({ playerName: p.playerName, characterModel: p.characterModel })));
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const startGame = async () => {
    try {
      console.log(`Host ${playerName} is starting game for session ${sessionId}...`);
      const response = await fetch(`${BACKEND_URL}/game/${sessionId}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostPlayerId: socketPlayerId }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Game started successfully:', data.message);
        setGameStarted(true);
        setGameStatus('playing');
        setGameMessage('');
      } else {
        const errorData = await response.json();
        console.error('Error starting game:', errorData.error);
        alert(`Error starting game: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Network error starting game:', error);
      alert('Network error. Could not start game.');
    }
  };

  const fetchCurrentQuestion = async () => {
    try {
      console.log(`Host ${playerName} is fetching current question for session ${sessionId}...`);
      const response = await fetch(`${BACKEND_URL}/game/${sessionId}/question`);
      if (response.ok) {
        const data = await response.json();
        if (data.waitingForHost) {
          console.log('Game is waiting for host to start:', data.message);
          setGameStatus('waiting');
          setGameMessage(`Waiting for host to start game. ${data.players} player(s) joined.`);
          return;
        }
        if (data.questionId) {
          console.log('Initial question fetched by host:', data);
        } else {
          console.log('No question available yet or game finished:', data.message);
          setGameStatus('waiting');
          setGameMessage(data.message || 'Waiting for game to start...');
        }
      } else {
        const errorData = await response.json();
        console.error('Error fetching initial question:', errorData.error);
        setGameMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Network error fetching initial question:', error);
      setGameMessage('Network error. Could not fetch initial question.');
    }
  };

  const handleAnswer = async (questionId, answer) => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/${sessionId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: socketPlayerId, questionId, answer }),
      });
      const data = await response.json();
      if (data.correct !== undefined) {
        console.log(`Answer correct: ${data.correct}, Score: ${data.currentScore}`);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const getCharacterAvatar = (model) => {
    // Handle emoji characters directly
    if (model && model.length === 2 && model.charCodeAt(0) > 255) {
      return model;
    }
    
    switch (model) {
      case 'robot': return '🤖';
      case 'astronaut': return '🧑‍🚀';
      case 'wizard': return '🧙';
      default: return '👤';
    }
  };

  return (
    <div className="quiz-room-container">
      <div className="player-list-section card">
        <h3 className="text-center mb-3">Players ({playersInRoom.length})</h3>
        <ul className="player-list">
          {playersInRoom.map((player, index) => (
            <li key={index} className="player-item">
              <span className="player-avatar">{getCharacterAvatar(player.characterModel)}</span>
              <span className="player-name">
                {player.playerName}
                {player.playerName === playerName && (
                  <span className="you-badge">You</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="game-area">
        {gameStatus === 'waiting' && (
          <div className="game-status-message card">
            <h2 className="text-center mb-4">Waiting Room</h2>
            <div className="session-info mb-4">
              <p className="text-center">
                <strong>Session ID:</strong> {sessionId}
              </p>
              <p className="text-center text-small">
                Share this ID with your friends!
              </p>
            </div>
            
            <div className="player-count mb-4">
              <p className="text-center">
                <strong>{playersInRoom.length}</strong> player{playersInRoom.length !== 1 ? 's' : ''} in room
              </p>
            </div>
            
            {isHost && !gameStarted ? (
              <div className="host-controls">
                <p className="text-center mb-3">
                  You are the host. Start the game when everyone has joined.
                </p>
                <div className="text-center">
                  <button 
                    onClick={startGame}
                    className="btn-primary"
                    disabled={playersInRoom.length < 1}
                  >
                    Start Game ({playersInRoom.length} player{playersInRoom.length !== 1 ? 's' : ''})
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center">Waiting for host to start the game...</p>
            )}
            
            {gameMessage && (
              <div className="game-message mt-3">
                {gameMessage}
              </div>
            )}
          </div>
        )}

        {gameStatus === 'playing' && currentQuestion && (
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
            totalTime={QUESTION_DURATION}
          />
        )}

        {gameStatus === 'finished' && (
          <div className="game-status-message card">
            <h2 className="text-center mb-4">🎉 Game Over! 🎉</h2>
            <p className="text-center mb-4">{gameMessage || 'The game has concluded.'}</p>
            
            {leaderboard.length > 0 && (
              <div className="final-results">
                <h3 className="text-center mb-4">🏆 Final Results</h3>
                <div className="winner-section mb-4">
                  {leaderboard[0] && (
                    <div className="winner">
                      <span className="winner-avatar">{getCharacterAvatar(leaderboard[0].characterModel)}</span>
                      <h4 className="text-center">🥇 {leaderboard[0].playerName}</h4>
                      <p className="winner-score text-center">{leaderboard[0].score} points</p>
                    </div>
                  )}
                </div>
                
                <div className="all-players">
                  {leaderboard.slice(1).map((player, index) => (
                    <div key={index} className="player-result">
                      <span className="player-avatar">{getCharacterAvatar(player.characterModel)}</span>
                      <span className="player-name">{player.playerName}</span>
                      <span className="player-score">{player.score} points</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="game-actions text-center mt-4">
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="leaderboard-section">
        <Leaderboard leaderboard={leaderboard} />
      </div>
    </div>
  );
}

export default QuizRoom;