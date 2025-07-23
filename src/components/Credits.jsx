import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Search,
  Filter,
  Clock,
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
} from 'lucide-react';
import '../styles/Credits.css';

const Credits = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const credits = [
    {
      id: 1,
      member: 'John Smith',
      amount: 1500,
      type: 'credit',
      date: '2024-03-15',
      dueDate: '2024-03-30',
      status: 'pending',
      description: 'Table booking and drinks',
    },
    {
      id: 2,
      member: 'Sarah Wilson',
      amount: 800,
      type: 'payment',
      date: '2024-03-14',
      status: 'completed',
      description: 'Partial payment for previous dues',
    },
    {
      id: 3,
      member: 'Mike Johnson',
      amount: 2000,
      type: 'credit',
      date: '2024-03-13',
      dueDate: '2024-03-28',
      status: 'overdue',
      description: 'PS5 sessions and snacks',
    },
  ];

  const stats = {
    totalDues: 12500,
    pendingPayments: 8,
    overdueAmount: 3500,
    totalCollected: 25000,
  };

  return (
    <div className="credits">
      <div className="page-header">
        <div>
          <h1>Credit & Dues</h1>
          <p className="subtitle">Track member credits and manage payments</p>
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
            Add Credit
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Dues</h3>
            <div className="stat-value">₹{stats.totalDues}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending Payments</h3>
            <div className="stat-value">{stats.pendingPayments}</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>Overdue Amount</h3>
            <div className="stat-value">₹{stats.overdueAmount}</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Collected</h3>
            <div className="stat-value">₹{stats.totalCollected}</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Transactions
            </button>
            <button
              className={`tab-btn ${activeTab === 'credits' ? 'active' : ''}`}
              onClick={() => setActiveTab('credits')}
            >
              Credits
            </button>
            <button
              className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </button>
          </div>

          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="credits-list">
          {credits
            .filter(
              (credit) =>
                credit.member.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (activeTab === 'all' ||
                  (activeTab === 'credits' && credit.type === 'credit') ||
                  (activeTab === 'payments' && credit.type === 'payment'))
            )
            .map((credit) => (
              <div key={credit.id} className="credit-card">
                <div className="credit-info">
                  <div className="credit-primary">
                    <div className="member-info">
                      <div className="avatar">
                        <Users size={20} />
                      </div>
                      <div>
                        <h3>{credit.member}</h3>
                        <span className="credit-date">{credit.date}</span>
                      </div>
                    </div>
                    <div className="amount-info">
                      <div
                        className={`amount ${
                          credit.type === 'payment' ? 'payment' : ''
                        }`}
                      >
                        {credit.type === 'payment' ? (
                          <ArrowUpRight size={20} />
                        ) : (
                          <ArrowDownRight size={20} />
                        )}
                        ₹{credit.amount}
                      </div>
                      <span
                        className={`status-badge ${credit.status}`}
                      >
                        {credit.status}
                      </span>
                    </div>
                  </div>

                  <div className="credit-details">
                    <p className="description">{credit.description}</p>
                    {credit.dueDate && (
                      <div className="due-date">
                        <Calendar size={16} />
                        <span>Due: {credit.dueDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Credits; 