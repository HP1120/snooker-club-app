import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  DollarSign,
  BarChart2,
  Filter,
} from 'lucide-react';
import '../styles/HappyHours.css';

const HappyHours = () => {
  const [activeTab, setActiveTab] = useState('current');

  const happyHours = [
    {
      id: 1,
      name: 'Early Bird Special',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlot: '10:00 AM - 2:00 PM',
      discount: 20,
      status: 'active',
      tables: ['Standard Tables'],
      services: ['PS5 Gaming'],
    },
    {
      id: 2,
      name: 'Weekend Happy Hours',
      days: ['Saturday', 'Sunday'],
      timeSlot: '3:00 PM - 7:00 PM',
      discount: 15,
      status: 'active',
      tables: ['All Tables'],
      services: ['All Services'],
    },
    {
      id: 3,
      name: 'Late Night Gaming',
      days: ['Friday', 'Saturday'],
      timeSlot: '11:00 PM - 2:00 AM',
      discount: 25,
      status: 'scheduled',
      tables: ['Premium Tables', 'PS5 Gaming'],
      services: ['Drinks'],
      startDate: '2024-04-01',
    },
  ];

  const stats = {
    activeOffers: 2,
    totalSavings: 12500,
    avgDiscount: 18,
    popularTime: '2:00 PM - 5:00 PM',
  };

  return (
    <div className="happy-hours">
      <div className="page-header">
        <div>
          <h1>Happy Hours</h1>
          <p className="subtitle">Manage special offers and discounted time slots</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn btn-secondary">
            <BarChart2 size={20} />
            View Analytics
          </button>
          <button className="btn btn-primary">
            <Plus size={20} />
            Add Happy Hour
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Offers</h3>
            <div className="stat-value">{stats.activeOffers}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Savings Given</h3>
            <div className="stat-value">₹{stats.totalSavings}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={24} />
          </div>
          <div className="stat-content">
            <h3>Average Discount</h3>
            <div className="stat-value">{stats.avgDiscount}%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>Most Popular Time</h3>
            <div className="stat-value">{stats.popularTime}</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              Current Offers
            </button>
            <button
              className={`tab-btn ${activeTab === 'scheduled' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled
            </button>
            <button
              className={`tab-btn ${activeTab === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveTab('expired')}
            >
              Expired
            </button>
          </div>
        </div>

        <div className="offers-grid">
          {happyHours.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header">
                <h3>{offer.name}</h3>
                <div className="offer-actions">
                  <button className="btn-icon">
                    <Edit2 size={18} />
                  </button>
                  <button className="btn-icon">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="offer-details">
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{offer.timeSlot}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{offer.days.join(', ')}</span>
                </div>
                <div className="detail-item highlight">
                  <DollarSign size={16} />
                  <span>{offer.discount}% OFF</span>
                </div>
              </div>

              <div className="offer-scope">
                <div className="scope-section">
                  <h4>Applicable to:</h4>
                  <div className="tags">
                    {offer.tables.map((table, index) => (
                      <span key={index} className="tag">
                        {table}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="scope-section">
                  <h4>Includes:</h4>
                  <div className="tags">
                    {offer.services.map((service, index) => (
                      <span key={index} className="tag">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {offer.startDate && (
                <div className="offer-footer">
                  <Calendar size={16} />
                  <span>Starts from {offer.startDate}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappyHours; 