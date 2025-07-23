import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Plus, 
  Clock, 
  Users, 
  AlertTriangle,
  Settings,
  Search,
  Filter,
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import '../styles/Tables.css';

const Tables = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const tables = [
    { 
      id: 1, 
      name: 'Table 1', 
      status: 'active', 
      type: 'Premium', 
      rate: '200/hour', 
      currentAmount: '₹300', 
      timeLeft: '30m',
      session: { 
        players: ['John Smith', 'Mike Johnson'], 
        startTime: '14:30', 
        duration: '1:30',
        startedAt: new Date(Date.now() - 5400000), // 1.5 hours ago
        endTime: new Date(Date.now() + 1800000), // 30 minutes from now
      } 
    },
    { 
      id: 2, 
      name: 'Table 2', 
      status: 'available', 
      type: 'Standard', 
      rate: '150/hour' 
    },
    { 
      id: 3, 
      name: 'Table 3', 
      status: 'active', 
      type: 'Premium', 
      rate: '200/hour', 
      currentAmount: '₹150', 
      timeLeft: '1h',
      session: { 
        players: ['Sarah Wilson'], 
        startTime: '15:15', 
        duration: '0:45',
        startedAt: new Date(Date.now() - 2700000), // 45 minutes ago
        endTime: new Date(Date.now() + 3600000), // 1 hour from now
      } 
    },
    { 
      id: 4, 
      name: 'Table 4', 
      status: 'maintenance', 
      type: 'Standard', 
      rate: '200/hour',
      maintenanceInfo: {
        startedAt: new Date(Date.now() - 7200000), // 2 hours ago
        issue: 'Surface repair needed',
        estimatedCompletion: 'Today, 18:00'
      }
    },
    { 
      id: 5, 
      name: 'Table 5', 
      status: 'reserved', 
      type: 'Premium', 
      rate: '200/hour',
      reservation: { 
        name: 'Alex Brown', 
        time: '16:00',
        duration: '2 hours',
        contact: '+91 98765 43210'
      } 
    },
    { 
      id: 6, 
      name: 'Table 6', 
      status: 'available', 
      type: 'Standard', 
      rate: '150/hour' 
    },
    { 
      id: 7, 
      name: 'Table 7', 
      status: 'active', 
      type: 'Premium', 
      rate: '200/hour',
      session: { 
        players: ['Player 1'], 
        startTime: '13:00', 
        duration: '2:00',
        startedAt: new Date(Date.now() - 7200000), // 2 hours ago
        endTime: new Date(Date.now() + 0), // Now
      } 
    },
    { 
      id: 8, 
      name: 'Table 8', 
      status: 'available', 
      type: 'Standard', 
      rate: '150/hour' 
    }
  ];

  const stats = {
    active: tables.filter(t => t.status === 'active').length,
    available: tables.filter(t => t.status === 'available').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    maintenance: tables.filter(t => t.status === 'maintenance').length,
    revenue: '₹900'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Play className="status-icon active" />;
      case 'available': return <Plus className="status-icon available" />;
      case 'reserved': return <Clock className="status-icon reserved" />;
      case 'maintenance': return <Settings className="status-icon maintenance" />;
      default: return null;
    }
  };

  const getStatusClass = (status) => `status ${status}`;

  const formatTimeLeft = (endTime) => {
    if (!endTime) return '';
    const now = new Date();
    const diff = endTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatDuration = (startedAt) => {
    if (!startedAt) return '';
    const now = new Date();
    const diff = now - startedAt;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTableAction = (tableId, action) => {
    console.log(`Table ${tableId}: ${action}`);
    // Implement table actions
  };

  const filteredTables = tables
    .filter(table => filter === 'all' || table.status === filter)
    .filter(table => 
      searchQuery === '' || 
      table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (table.session?.players.some(player => 
        player.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    );

  return (
    <div className="tables-container">
      <div className="tables-header">
        <div className="header-content">
          <h1>Table Management</h1>
          <p>Monitor and manage snooker tables</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search tables or players..." 
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

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Active Tables</span>
          <span className="stat-value">{stats.active}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Available Tables</span>
          <span className="stat-value">{stats.available}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Reserved</span>
          <span className="stat-value">{stats.reserved}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Under Maintenance</span>
          <span className="stat-value">{stats.maintenance}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Today's Revenue</span>
          <span className="stat-value">{stats.revenue}</span>
        </div>
      </div>

      <div className="filter-bar">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tables
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
          onClick={() => setFilter('available')}
        >
          Available
        </button>
        <button 
          className={`filter-btn ${filter === 'reserved' ? 'active' : ''}`}
          onClick={() => setFilter('reserved')}
        >
          Reserved
        </button>
        <button 
          className={`filter-btn ${filter === 'maintenance' ? 'active' : ''}`}
          onClick={() => setFilter('maintenance')}
        >
          Maintenance
        </button>
      </div>

      <div className="tables-grid">
        {filteredTables.map(table => (
          <div key={table.id} className={`table-card ${table.status}`}>
            <div className="table-header">
              <h3>{table.name}</h3>
              <div className="table-actions">
                <span className={getStatusClass(table.status)}>
                  {getStatusIcon(table.status)}
                  {table.status}
                </span>
                <button 
                  className="btn-icon-small"
                  onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
                >
                  <MoreVertical size={16} />
                </button>
                {selectedTable === table.id && (
                  <div className="table-actions-dropdown">
                    <button onClick={() => handleTableAction(table.id, 'edit')}>
                      <Edit size={16} />
                      Edit
                    </button>
                    <button onClick={() => handleTableAction(table.id, 'delete')}>
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="table-content">
              <div className="table-info">
                <span className="table-type">{table.type}</span>
                <span className="table-rate">{table.rate}</span>
              </div>

              {table.status === 'active' && table.session && (
                <div className="session-info">
                  {table.session.players && table.session.players.length > 0 && (
                    <div className="players">
                      <Users size={16} />
                      <span>{table.session.players.join(', ')}</span>
                    </div>
                  )}
                  <div className="session-details">
                    <div className="time-info">
                      <Clock size={16} />
                      <span>Duration: {formatDuration(table.session.startedAt)}</span>
                    </div>
                    {table.timeLeft && (
                      <div className="time-warning">
                        <AlertTriangle size={16} />
                        <span>Time left: {formatTimeLeft(table.session.endTime)}</span>
                      </div>
                    )}
                  </div>
                  {table.currentAmount && (
                    <div className="amount">
                      <DollarSign size={16} />
                      Current Amount: {table.currentAmount}
                    </div>
                  )}
                  <div className="session-actions">
                    <button className="btn-add-time">
                      <Clock size={16} />
                      Add Time
                    </button>
                    <button className="btn-end">
                      <XCircle size={16} />
                      End Session
                    </button>
                  </div>
                </div>
              )}

              {table.status === 'available' && (
                <button className="btn-start">
                  <Play size={16} />
                  Start Session
                </button>
              )}

              {table.status === 'reserved' && table.reservation && (
                <div className="reservation-info">
                  <div className="reservation-details">
                    <Users size={16} />
                    <span>{table.reservation.name}</span>
                  </div>
                  <div className="reservation-time">
                    <Clock size={16} />
                    <span>Starting at: {table.reservation.time}</span>
                  </div>
                  <div className="reservation-duration">
                    <Clock size={16} />
                    <span>Duration: {table.reservation.duration}</span>
                  </div>
                  <button className="btn-cancel">
                    <XCircle size={16} />
                    Cancel Reservation
                  </button>
                </div>
              )}

              {table.status === 'maintenance' && table.maintenanceInfo && (
                <div className="maintenance-info">
                  <Settings size={16} />
                  <div className="maintenance-details">
                    <p>{table.maintenanceInfo.issue}</p>
                    <span>Est. completion: {table.maintenanceInfo.estimatedCompletion}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables; 