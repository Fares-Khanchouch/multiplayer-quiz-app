// frontend/src/components/JoinLobby.jsx
import React, { useState, useEffect } from 'react';
import './JoinLobby.css'; // Specific styles for JoinLobby

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const JoinLobby = ({ onJoinSession }) => {
  // Generate a unique player name
  const generateUniqueName = () => {
    const adjectives = ['Swift', 'Brave', 'Clever', 'Witty', 'Smart', 'Quick', 'Sharp', 'Bright', 'Genius', 'Wise'];
    const nouns = ['Player', 'Gamer', 'Quizzer', 'Thinker', 'Solver', 'Master', 'Champion', 'Winner', 'Hero', 'Star'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000000); // More random numbers
    const timestamp = Date.now().toString().slice(-4); // Add timestamp for uniqueness
    return `${randomAdjective}${randomNoun}${randomNumber}${timestamp}`;
  };

  const [formData, setFormData] = useState({
    playerName: generateUniqueName(),
    characterModel: '👤',
    sessionId: '',
    topic: 'general',
    numQuestions: 5
  });
  const [isHost, setIsHost] = useState(false);
  const [showLobbyList, setShowLobbyList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lobbies, setLobbies] = useState([]);
  const [loadingLobbies, setLoadingLobbies] = useState(false);

  const characterModels = [
    { emoji: '👤', name: 'Default' },
    { emoji: '🦊', name: 'Fox' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🐼', name: 'Panda' },
    { emoji: '🦁', name: 'Lion' },
    { emoji: '🐯', name: 'Tiger' },
    { emoji: '🐸', name: 'Frog' },
    { emoji: '🐙', name: 'Octopus' },
    { emoji: '🦄', name: 'Unicorn' }
  ];

  const topics = [
    { value: 'general', label: 'General Knowledge' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  // Fetch lobbies when browse games is clicked
  const fetchLobbies = async () => {
    setLoadingLobbies(true);
    try {
      const response = await fetch(`${BACKEND_URL}/game/lobbies`);
      if (!response.ok) {
        throw new Error('Failed to fetch lobbies');
      }
      const lobbiesData = await response.json();
      setLobbies(lobbiesData);
    } catch (err) {
      console.error('Error fetching lobbies:', err);
      setError('Failed to load available games');
    } finally {
      setLoadingLobbies(false);
    }
  };

  const handleBrowseGames = () => {
    setShowLobbyList(true);
    fetchLobbies();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStartGame = async () => {
    if (!formData.playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/game/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          numQuestions: parseInt(formData.numQuestions)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start game');
      }

      const data = await response.json();
      const playerId = crypto.randomUUID();
      
      onJoinSession({
        sessionId: data.sessionId,
        playerName: formData.playerName.trim(),
        characterModel: formData.characterModel,
        isHost: true,
        playerId
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!formData.playerName.trim() || !formData.sessionId.trim()) {
      setError('Please enter your name and session ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/game/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: formData.sessionId.trim(),
          playerName: formData.playerName.trim(),
          characterModel: formData.characterModel
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join game');
      }

      const data = await response.json();
      
      onJoinSession({
        sessionId: formData.sessionId.trim(),
        playerName: formData.playerName.trim(),
        characterModel: formData.characterModel,
        isHost: false,
        playerId: data.playerId
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinLobby = async (sessionId) => {
    if (!formData.playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/game/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          playerName: formData.playerName.trim(),
          characterModel: formData.characterModel
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join game');
      }

      const data = await response.json();
      
      onJoinSession({
        sessionId: sessionId,
        playerName: formData.playerName.trim(),
        characterModel: formData.characterModel,
        isHost: false,
        playerId: data.playerId
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTopicLabel = (topicValue) => {
    const topic = topics.find(t => t.value === topicValue);
    return topic ? topic.label : topicValue;
  };

  return (
    <div className="join-lobby">
      <div className="card">
        <h2 className="text-center mb-4">Join Quiz Game</h2>
        
        {error && (
          <div className="error mb-4">
            {error}
          </div>
        )}

        <div className="form-section">
          <div className="mb-4">
            <label htmlFor="playerName">Your Name</label>
            <input
              type="text"
              id="playerName"
              name="playerName"
              value={formData.playerName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="characterModel">Character</label>
            <select
              id="characterModel"
              name="characterModel"
              value={formData.characterModel}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              {characterModels.map((char, index) => (
                <option key={index} value={char.emoji}>
                  {char.emoji} {char.name}
                </option>
              ))}
            </select>
          </div>

          <div className="separator">
            <hr className="line" />
            <span className="or-badge">OR</span>
            <hr className="line" />
          </div>

          <div className="lobby-actions">
            <button
              className="btn-primary"
              onClick={() => setIsHost(true)}
              disabled={isLoading}
            >
              Start New Game
            </button>
            <span className="or-divider">or</span>
            <button
              className="btn-secondary"
              onClick={handleBrowseGames}
              disabled={isLoading}
            >
              Browse Games
            </button>
          </div>

          {isHost && (
            <div className="host-settings mt-4">
              <h3 className="mb-3">Game Settings</h3>
              
              <div className="mb-3">
                <label htmlFor="topic">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  disabled={isLoading}
                >
                  {topics.map((topic, index) => (
                    <option key={index} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="numQuestions">Number of Questions</label>
                <select
                  id="numQuestions"
                  name="numQuestions"
                  value={formData.numQuestions}
                  onChange={handleInputChange}
                  disabled={isLoading}
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                </select>
              </div>

              <button
                className="btn-primary"
                onClick={handleStartGame}
                disabled={isLoading}
              >
                {isLoading ? 'Starting...' : 'Start Game'}
              </button>
            </div>
          )}

          {!isHost && !showLobbyList && (
            <div className="join-settings mt-4">
              <h3 className="mb-3">Join Existing Game</h3>
              
              <div className="mb-4">
                <label htmlFor="sessionId">Session ID</label>
                <input
                  type="text"
                  id="sessionId"
                  name="sessionId"
                  value={formData.sessionId}
                  onChange={handleInputChange}
                  placeholder="Enter session ID"
                  disabled={isLoading}
                />
              </div>

              <button
                className="btn-primary"
                onClick={handleJoinGame}
                disabled={isLoading}
              >
                {isLoading ? 'Joining...' : 'Join Game'}
              </button>
            </div>
          )}

          {showLobbyList && (
            <div className="lobby-list">
              <div className="lobby-header">
                <h4>Available Games</h4>
                <button
                  className="back-btn"
                  onClick={() => setShowLobbyList(false)}
                  disabled={isLoading}
                >
                  ← Back
                </button>
              </div>
              
              {loadingLobbies ? (
                <div className="loading-lobbies">
                  <p>Loading available games...</p>
                </div>
              ) : lobbies.length === 0 ? (
                <div className="no-lobbies">
                  <p>No active games available.</p>
                  <p>Start a new game to create one!</p>
                </div>
              ) : (
                <div className="lobby-items">
                  {lobbies.map((lobby) => (
                    <div key={lobby.sessionId} className="lobby-item">
                      <div className="lobby-info">
                        <h5>{getTopicLabel(lobby.topic)} Quiz</h5>
                        <p>{lobby.numQuestions} questions • {lobby.players} player{lobby.players !== 1 ? 's' : ''}</p>
                        {lobby.gameStarted && <span className="game-status started">Game in Progress</span>}
                        {!lobby.gameStarted && <span className="game-status waiting">Waiting for Players</span>}
                      </div>
                      <button
                        className="btn-primary"
                        onClick={() => handleJoinLobby(lobby.sessionId)}
                        disabled={isLoading || lobby.gameStarted}
                      >
                        {lobby.gameStarted ? 'In Progress' : 'Join'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinLobby;