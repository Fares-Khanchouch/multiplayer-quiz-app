// frontend/src/components/Leaderboard.jsx
import React from 'react';
import './Leaderboard.css'; // Specific styles for Leaderboard

function Leaderboard({ leaderboard }) {
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="leaderboard-container card">
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading Leaderboard...
        </div>
      </div>
    );
  }

  // Sort leaderboard by score in descending order
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

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

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}`;
    }
  };

  return (
    <div className="leaderboard-container card">
      <h3 className="text-center mb-3">Leaderboard</h3>
      <ul className="leaderboard-list">
        {sortedLeaderboard.map((player, index) => (
          <li 
            key={player.playerName} 
            className={`leaderboard-item ${index < 3 ? `top-${index + 1}` : ''}`}
          >
            <div className="player-rank">
              <span className="rank-icon">{getRankIcon(index)}</span>
            </div>
            <span className="player-avatar">{getCharacterAvatar(player.characterModel)}</span>
            <span className="player-name">{player.playerName}</span>
            <span className="player-score">{player.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;