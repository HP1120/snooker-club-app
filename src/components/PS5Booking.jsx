import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Play,
  Pause,
  StopCircle,
  Timer,
  Settings,
  Edit2,
  Trash2,
  ChevronDown,
  MoreVertical,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  CalendarClock,
  History
} from 'lucide-react';
import '../styles/PS5Booking.css';

const PS5Booking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConsole, setSelectedConsole] = useState(null);

  const consoles = [
    {
      id: 1,
      name: 'PS5 Console 1',
      status: 'active',
      currentGame: 'FIFA 24',
      players: ['John Smith', 'Mike Johnson'],
      startTime: '14:30',
      duration: '1:30',
      rate: 300,
      startedAt: new Date(Date.now() - 5400000), // 1.5 hours ago
      endTime: new Date(Date.now() + 1800000), // 30 minutes from now
      totalAmount: 450,
      history: [
        { type: 'start', time: '14:30', details: 'Session started' },
        { type: 'extend', time: '15:30', details: '+30 minutes added' }
      ]
    },
    {
      id: 2,
      name: 'PS5 Console 2',
      status: 'available',
      currentGame: null,
      players: [],
      startTime: null,
      duration: null,
      rate: 300,
      lastSession: {
        endedAt: new Date(Date.now() - 3600000), // 1 hour ago
        duration: '2:00',
        revenue: 600
      }
    },
    {
      id: 3,
      name: 'PS5 Console 3',
      status: 'maintenance',
      currentGame: null,
      players: [],
      startTime: null,
      duration: null,
      rate: 300,
      maintenanceInfo: {
        startedAt: new Date(Date.now() - 7200000), // 2 hours ago
        issue: 'Controller repair needed',
        estimatedCompletion: 'Today, 18:00',
        technician: 'Mike Tech'
      }
    },
    {
      id: 4,
      name: 'PS5 Console 4',
      status: 'reserved',
      currentGame: null,
      players: [],
      startTime: null,
      duration: null,
      rate: 300,
      reservation: {
        name: 'Alex Brown',
        time: '16:00',
        duration: '2 hours',
        contact: '+91 98765 43210',
        game: 'FIFA 24'
      }
    }
  ];

  const games = [
    { id: 1, name: 'FIFA 24', image: '⚽', category: 'Sports', popularity: 85 },
    { id: 2, name: 'Call of Duty: Modern Warfare', image: '🎯', category: 'Action', popularity: 78 },
    { id: 3, name: 'NBA 2K24', image: '🏀', category: 'Sports', popularity: 72 },
    { id: 4, name: 'God of War Ragnarök', image: '⚔️', category: 'Action', popularity: 90 },
    { id: 5, name: 'Gran Turismo 7', image: '🏎️', category: 'Racing', popularity: 65 },
    { id: 6, name: 'Mortal Kombat 1', image: '🥋', category: 'Fighting', popularity: 70 },
    { id: 7, name: 'Spider-Man 2', image: '🕷️', category: 'Action', popularity: 95 },
    { id: 8, name: 'EA Sports FC 24', image: '⚽', category: 'Sports', popularity: 82 }
  ];

  const stats = {
    activeConsoles: consoles.filter(c => c.status === 'active').length,
    availableConsoles: consoles.filter(c => c.status === 'available').length,
    totalRevenue: 4500,
    popularGames: games.sort((a, b) => b.popularity - a.popularity).slice(0, 3),
    totalSessions: 24,
    averageSessionTime: '1.5 hours'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'available':
        return 'primary';
      case 'maintenance':
        return 'warning';
      case 'reserved':
        return 'info';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Play size={16} />;
      case 'available':
        return <CheckCircle2 size={16} />;
      case 'maintenance':
        return <Settings size={16} />;
      case 'reserved':
        return <CalendarClock size={16} />;
      default:
        return null;
    }
  };

  const formatDuration = (startedAt) => {
    if (!startedAt) return '';
    const now = new Date();
    const diff = now - startedAt;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatTimeLeft = (endTime) => {
    if (!endTime) return '';
    const now = new Date();
    const diff = endTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleConsoleAction = (consoleId, action) => {
    console.log(`Console ${consoleId}: ${action}`);
    // Implement console actions
  };

  const filteredConsoles = consoles
    .filter(console => selectedStatus === 'all' || console.status === selectedStatus)
    .filter(console => 
      searchQuery === '' || 
      console.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (console.currentGame?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (console.players?.some(player => 
        player.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    );

  return (
    <div className="ps5-booking">
      <div className="page-header">
        <div>
          <h1>PS5 Booking</h1>
          <p className="subtitle">Manage PS5 consoles and game sessions</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search consoles, games or players..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button className="btn-icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={20} />
          </button>
          <button className="btn-new">
            <Plus size={20} />
            New Booking
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Play size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Sessions</h3>
            <div className="stat-value">{stats.activeConsoles}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Gamepad2 size={24} />
          </div>
          <div className="stat-content">
            <h3>Available Consoles</h3>
            <div className="stat-value">{stats.availableConsoles}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Today's Revenue</h3>
            <div className="stat-value">₹{stats.totalRevenue}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <History size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Sessions</h3>
            <div className="stat-value">{stats.totalSessions}</div>
            <div className="stat-subtitle">Avg. {stats.averageSessionTime}</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="filters">
            <div className="dropdown">
              <button className="btn-secondary">
                <Calendar size={20} />
                {selectedTimeRange.charAt(0).toUpperCase() + selectedTimeRange.slice(1)}
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="status-filters">
              <button 
                className={`status-filter ${selectedStatus === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('all')}
              >
                All Consoles
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'active' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('active')}
              >
                Active
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'available' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('available')}
              >
                Available
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'reserved' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('reserved')}
              >
                Reserved
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'maintenance' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('maintenance')}
              >
                Maintenance
              </button>
            </div>
          </div>
        </div>

        <div className="consoles-grid">
          {filteredConsoles.map(console => (
            <div key={console.id} className={`console-card ${console.status}`}>
              <div className="console-header">
                <h3>{console.name}</h3>
                <div className="console-actions">
                  <span className={`status-badge ${getStatusColor(console.status)}`}>
                    {getStatusIcon(console.status)}
                    {console.status.charAt(0).toUpperCase() + console.status.slice(1)}
                  </span>
                  <button 
                    className="btn-icon-small"
                    onClick={() => setSelectedConsole(selectedConsole === console.id ? null : console.id)}
                  >
                    <MoreVertical size={16} />
                  </button>
                  {selectedConsole === console.id && (
                    <div className="console-actions-dropdown">
                      <button onClick={() => handleConsoleAction(console.id, 'edit')}>
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button onClick={() => handleConsoleAction(console.id, 'delete')}>
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {console.status === 'active' && (
                <div className="session-info">
                  <div className="game-info">
                    <span className="game-icon">🎮</span>
                    <span className="game-name">{console.currentGame}</span>
                  </div>
                  {console.players && console.players.length > 0 && (
                    <div className="players">
                      <Users size={16} />
                      <span>{console.players.join(', ')}</span>
                    </div>
                  )}
                  <div className="time-info">
                    <div className="duration">
                      <Timer size={16} />
                      <span>Duration: {formatDuration(console.startedAt)}</span>
                    </div>
                    <div className="time-warning">
                      <AlertTriangle size={16} />
                      <span>Time left: {formatTimeLeft(console.endTime)}</span>
                    </div>
                  </div>
                  <div className="amount">
                    <DollarSign size={16} />
                    Current Amount: ₹{console.totalAmount}
                  </div>
                  <div className="session-actions">
                    <button className="btn-add-time">
                      <Plus size={16} />
                      Add Time
                    </button>
                    <button className="btn-end">
                      <XCircle size={16} />
                      End Session
                    </button>
                  </div>
                </div>
              )}

              {console.status === 'available' && (
                <>
                  <div className="available-info">
                    <div className="rate">₹{console.rate}/hour</div>
                    <p>Ready for new session</p>
                    {console.lastSession && (
                      <div className="last-session">
                        <Clock size={14} />
                        Last session: {formatDuration(console.lastSession.endedAt)} ago
                      </div>
                    )}
                  </div>
                  <button className="start-session">
                    <Play size={16} />
                    Start Session
                  </button>
                </>
              )}

              {console.status === 'reserved' && console.reservation && (
                <div className="reservation-info">
                  <div className="reservation-details">
                    <Users size={16} />
                    <span>{console.reservation.name}</span>
                  </div>
                  <div className="reservation-time">
                    <Clock size={16} />
                    <span>Starting at: {console.reservation.time}</span>
                  </div>
                  <div className="reservation-duration">
                    <Timer size={16} />
                    <span>Duration: {console.reservation.duration}</span>
                  </div>
                  <div className="reservation-game">
                    <Gamepad2 size={16} />
                    <span>Game: {console.reservation.game}</span>
                  </div>
                  <button className="btn-cancel">
                    <XCircle size={16} />
                    Cancel Reservation
                  </button>
                </div>
              )}

              {console.status === 'maintenance' && console.maintenanceInfo && (
                <div className="maintenance-info">
                  <Settings size={48} />
                  <div className="maintenance-details">
                    <p>{console.maintenanceInfo.issue}</p>
                    <span>Est. completion: {console.maintenanceInfo.estimatedCompletion}</span>
                    <span>Technician: {console.maintenanceInfo.technician}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="games-section">
          <div className="section-header">
            <div className="section-title">
              <h2>Available Games</h2>
              <p>Most popular games in your collection</p>
            </div>
            <button className="btn-secondary">
              <Plus size={20} />
              Add Game
            </button>
          </div>

          <div className="games-grid">
            {games.map(game => (
              <div key={game.id} className="game-card">
                <div className="game-image">
                  {game.image}
                </div>
                <div className="game-info">
                  <h3>{game.name}</h3>
                  <span className="category-badge">{game.category}</span>
                  <div className="popularity-bar" style={{ '--popularity': `${game.popularity}%` }}>
                    <div className="popularity-fill"></div>
                    <span className="popularity-text">{game.popularity}% Popular</span>
                  </div>
                </div>
                <div className="game-actions">
                  <button className="btn-icon" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="btn-icon" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PS5Booking; 