// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import JoinLobby from './components/JoinLobby';
import QuizRoom from './components/QuizRoom';

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [characterModel, setCharacterModel] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [playerId, setPlayerId] = useState(null);

  // Function to handle joining a session (either starting or just joining)
  const handleJoinSession = ({ sessionId, playerName, characterModel, isHost = false, playerId }) => {
    setSessionId(sessionId);
    setPlayerName(playerName);
    setCharacterModel(characterModel);
    setIsHost(isHost);
    setPlayerId(playerId);
  };

  return (
    <div className="app-container">
      <div className="container">
        {!sessionId ? (
          <JoinLobby onJoinSession={handleJoinSession} />
        ) : (
          <QuizRoom 
            sessionId={sessionId}
            playerName={playerName}
            characterModel={characterModel}
            isHostProp={isHost}
            playerId={playerId}
          />
        )}
      </div>
    </div>
  );
}

export default App;