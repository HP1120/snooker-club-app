import React, { useState } from 'react';
import {
  Users,
  Table2,
  Gamepad2,
  Coffee,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  BarChart2,
  Calendar,
  Clock,
  Bell,
  Filter
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import '../styles/Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today');
  const [activeTab, setActiveTab] = useState('all');

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹12,500',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      trend: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    },
    {
      title: 'Active Tables',
      value: '6/8',
      change: '+2',
      isPositive: true,
      icon: Table2,
      trend: [4, 6, 8, 7, 6, 8, 6, 7, 6]
    },
    {
      title: 'PS5 Sessions',
      value: '12',
      change: '-3',
      isPositive: false,
      icon: Gamepad2,
      trend: [15, 13, 14, 12, 11, 10, 12, 11, 12]
    },
    {
      title: 'Drinks Sales',
      value: '₹3,200',
      change: '+8.3%',
      isPositive: true,
      icon: Coffee,
      trend: [20, 25, 30, 35, 25, 30, 35, 40, 32]
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'table',
      title: 'Table 3 Session Started',
      time: '5 minutes ago',
      details: 'John and Mike - 2 hours',
      amount: '₹400'
    },
    {
      id: 2,
      type: 'ps5',
      title: 'PS5 Session Ended',
      time: '15 minutes ago',
      details: 'Alex - FIFA 23',
      amount: '₹300'
    },
    {
      id: 3,
      type: 'order',
      title: 'New Order',
      time: '30 minutes ago',
      details: 'Table 1 - 2 Coke, 1 Snacks',
      amount: '₹180'
    },
    {
      id: 4,
      type: 'member',
      title: 'New Member Registration',
      time: '1 hour ago',
      details: 'Sarah Wilson',
      amount: '₹1000'
    }
  ];

  // Chart data
  const chartData = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    datasets: [
      {
        label: 'Tables',
        data: [4, 6, 8, 7, 6, 8, 6, 7, 6],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'PS5',
        data: [2, 3, 4, 3, 2, 3, 4, 3, 2],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#cbd5e1'
        }
      },
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: '#cbd5e1'
        }
      }
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>
        <div className="header-actions">
          <button className="btn-icon">
            <Calendar size={20} />
          </button>
          <button className="btn-icon">
            <Bell size={20} />
          </button>
          <button className="btn-primary">
            <Users size={20} />
            <span>New Member</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                {stat.isPositive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="stat-trend">
              {stat.trend.map((value, i) => (
                <div
                  key={i}
                  className="trend-bar"
                  style={{
                    height: `${(value / Math.max(...stat.trend)) * 100}%`
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Occupancy Chart */}
        <div className="dashboard-card occupancy-chart">
          <div className="card-header">
            <div className="card-title">
              <h2>Occupancy Trends</h2>
              <p>Real-time venue occupancy tracking</p>
            </div>
            <div className="card-actions">
              <button className="btn-icon">
                <Filter size={20} />
              </button>
              <select
                className="time-select"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <div className="card-title">
              <h2>Recent Activity</h2>
              <p>Latest updates and events</p>
            </div>
            <div className="activity-tabs">
              <button
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`tab-button ${activeTab === 'tables' ? 'active' : ''}`}
                onClick={() => setActiveTab('tables')}
              >
                Tables
              </button>
              <button
                className={`tab-button ${activeTab === 'ps5' ? 'active' : ''}`}
                onClick={() => setActiveTab('ps5')}
              >
                PS5
              </button>
            </div>
          </div>
          <div className="activity-list">
            {recentActivity
              .filter(activity => activeTab === 'all' || activity.type === activeTab)
              .map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'table' && <Table2 size={20} />}
                    {activity.type === 'ps5' && <Gamepad2 size={20} />}
                    {activity.type === 'order' && <Coffee size={20} />}
                    {activity.type === 'member' && <Users size={20} />}
                  </div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <h4>{activity.title}</h4>
                      <span className="activity-time">
                        <Clock size={14} />
                        {activity.time}
                      </span>
                    </div>
                    <p>{activity.details}</p>
                    <div className="activity-footer">
                      <span className="activity-amount">{activity.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 