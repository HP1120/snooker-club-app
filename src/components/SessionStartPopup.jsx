import React, { useState } from 'react';
import { Users, Clock, DollarSign, X } from 'lucide-react';
import '../styles/SessionStartPopup.css';

const SessionStartPopup = ({ tableId, tableName, onClose, onStart }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState(['', '']);
  const [rateType, setRateType] = useState('hourly');
  const [duration, setDuration] = useState(1);

  const handlePlayerCountChange = (count) => {
    setPlayerCount(count);
    setPlayers(Array(count).fill(''));
  };

  const handlePlayerNameChange = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({
      tableId,
      players: players.filter(name => name.trim() !== ''),
      rateType,
      duration,
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  return (
    <div className="session-popup-overlay">
      <div className="session-popup">
        <div className="popup-header">
          <h2>Start Session - {tableName}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>
              <Users size={20} />
              Number of Players
            </h3>
            <div className="player-count-buttons">
              {[2, 3, 4].map(count => (
                <button
                  key={count}
                  type="button"
                  className={`count-button ${playerCount === count ? 'active' : ''}`}
                  onClick={() => handlePlayerCountChange(count)}
                >
                  {count} Players
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Player Names (Optional)</h3>
            <div className="player-names">
              {players.map((player, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Player ${index + 1}`}
                  value={player}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  className="form-input"
                />
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>
              <Clock size={20} />
              Session Type
            </h3>
            <div className="rate-type-buttons">
              <button
                type="button"
                className={`rate-button ${rateType === 'hourly' ? 'active' : ''}`}
                onClick={() => setRateType('hourly')}
              >
                <Clock size={16} />
                Hourly Rate
              </button>
              <button
                type="button"
                className={`rate-button ${rateType === 'fixed' ? 'active' : ''}`}
                onClick={() => setRateType('fixed')}
              >
                <DollarSign size={16} />
                Fixed Rate
              </button>
            </div>
          </div>

          {rateType === 'fixed' && (
            <div className="form-section">
              <h3>Duration (hours)</h3>
              <input
                type="number"
                min="1"
                max="8"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="form-input"
              />
            </div>
          )}

          <div className="popup-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Start Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionStartPopup; 