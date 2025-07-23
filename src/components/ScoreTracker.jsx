import React, { useState } from 'react';
import { Trophy, Plus, Minus, X } from 'lucide-react';
import '../styles/ScoreTracker.css';

const ScoreTracker = ({ players, onClose, onFinish }) => {
  const [scores, setScores] = useState(players.map(player => ({
    name: player,
    score: 0,
    frames: 0
  })));

  const handleScoreChange = (index, amount) => {
    setScores(prev => prev.map((player, i) => {
      if (i === index) {
        return {
          ...player,
          score: Math.max(0, player.score + amount)
        };
      }
      return player;
    }));
  };

  const handleFrameChange = (index, amount) => {
    setScores(prev => prev.map((player, i) => {
      if (i === index) {
        return {
          ...player,
          frames: Math.max(0, player.frames + amount)
        };
      }
      return player;
    }));
  };

  const determineWinner = () => {
    const highestScore = Math.max(...scores.map(p => p.score));
    const winners = scores.filter(p => p.score === highestScore);
    const lowestFrames = Math.min(...winners.map(p => p.frames));
    const winner = winners.find(p => p.frames === lowestFrames);
    
    onFinish({
      winner: winner.name,
      scores: scores.map(({ name, score, frames }) => ({
        name,
        score,
        frames,
        isWinner: name === winner.name
      }))
    });
  };

  return (
    <div className="score-tracker-overlay">
      <div className="score-tracker">
        <div className="tracker-header">
          <h2>Score Tracker</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="players-grid">
          {scores.map((player, index) => (
            <div key={player.name} className="player-card">
              <h3>{player.name}</h3>
              
              <div className="score-section">
                <h4>Score</h4>
                <div className="score-controls">
                  <button
                    className="control-button"
                    onClick={() => handleScoreChange(index, -1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="score-value">{player.score}</span>
                  <button
                    className="control-button"
                    onClick={() => handleScoreChange(index, 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="frames-section">
                <h4>Frames</h4>
                <div className="score-controls">
                  <button
                    className="control-button"
                    onClick={() => handleFrameChange(index, -1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="score-value">{player.frames}</span>
                  <button
                    className="control-button"
                    onClick={() => handleFrameChange(index, 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="tracker-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={determineWinner}>
            <Trophy size={16} />
            End Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreTracker; 