import React, { useState } from 'react';
import {
  Users,
  Table2,
  Gamepad2,
  Coffee,
  Package,
  DollarSign,
  BarChart3,
  Calendar,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';
import '../styles/Management.css';

const Management = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  const stats = {
    totalRevenue: 45000,
    activeMembers: 156,
    tablesOccupied: 6,
    ps5Sessions: 12,
    pendingOrders: 8,
    lowStockItems: 3,
    monthlyGrowth: 12.5,
    customerSatisfaction: 94
  };

  const recentActivities = [
    {
      id: 1,
      type: 'member',
      title: 'New Member Registration',
      description: 'John Doe joined as Premium member',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'table',
      title: 'Table 3 Session Started',
      description: 'Mike Johnson - 2 hour booking',
      time: '12 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Low Stock Alert',
      description: 'Coca Cola running low (8 units left)',
      time: '25 minutes ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'ps5',
      title: 'PS5 Session Completed',
      description: 'Alex Brown - FIFA 24 (2 hours)',
      time: '1 hour ago',
      status: 'completed'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Member',
      description: 'Register a new club member',
      icon: Users,
      color: 'primary',
      action: () => console.log('Add member')
    },
    {
      title: 'Book Table',
      description: 'Create new table reservation',
      icon: Table2,
      color: 'success',
      action: () => console.log('Book table')
    },
    {
      title: 'Start PS5 Session',
      description: 'Begin new gaming session',
      icon: Gamepad2,
      color: 'info',
      action: () => console.log('Start PS5')
    },
    {
      title: 'Manage Inventory',
      description: 'Update stock levels',
      icon: Package,
      color: 'warning',
      action: () => console.log('Manage inventory')
    }
  ];

  const performanceMetrics = [
    {
      title: 'Revenue',
      value: '₹45,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Members',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Utilization',
      value: '78%',
      change: '+5.1%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Satisfaction',
      value: '94%',
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  return (
    <div className="management">
      <div className="page-header">
        <div>
          <h1>Management Dashboard</h1>
          <p className="subtitle">Comprehensive business management and oversight</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search management data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-icon">
            <Filter size={20} />
          </button>
          <button className="btn-icon">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="management-nav">
        <button
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={20} />
          Overview
        </button>
        <button
          className={`nav-tab ${activeTab === 'operations' ? 'active' : ''}`}
          onClick={() => setActiveTab('operations')}
        >
          <Settings size={20} />
          Operations
        </button>
        <button
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={20} />
          Analytics
        </button>
        <button
          className={`nav-tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <FileText size={20} />
          Reports
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="management-content">
          <div className="stats-grid">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <metric.icon size={24} />
                </div>
                <div className="stat-content">
                  <h3>{metric.title}</h3>
                  <div className="stat-value">{metric.value}</div>
                  <div className={`stat-change ${metric.trend}`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="content-grid">
            <div className="quick-actions-section">
              <div className="section-header">
                <h2>Quick Actions</h2>
                <p>Frequently used management tasks</p>
              </div>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <div key={index} className={`quick-action-card ${action.color}`}>
                    <div className="action-icon">
                      <action.icon size={24} />
                    </div>
                    <div className="action-content">
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                    </div>
                    <button className="action-button" onClick={action.action}>
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-activities-section">
              <div className="section-header">
                <h2>Recent Activities</h2>
                <p>Latest system events and updates</p>
              </div>
              <div className="activities-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'member' && <Users size={20} />}
                      {activity.type === 'table' && <Table2 size={20} />}
                      {activity.type === 'inventory' && <Package size={20} />}
                      {activity.type === 'ps5' && <Gamepad2 size={20} />}
                    </div>
                    <div className="activity-content">
                      <div className="activity-header">
                        <h4>{activity.title}</h4>
                        <span className="activity-time">
                          <Clock size={14} />
                          {activity.time}
                        </span>
                      </div>
                      <p>{activity.description}</p>
                      <span className={`activity-status ${activity.status}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'operations' && (
        <div className="management-content">
          <div className="operations-grid">
            <div className="operations-card">
              <div className="card-header">
                <h3>Table Management</h3>
                <button className="btn-icon">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="card-content">
                <div className="metric-row">
                  <span>Active Tables</span>
                  <span className="metric-value">6/8</span>
                </div>
                <div className="metric-row">
                  <span>Average Session</span>
                  <span className="metric-value">2.5 hrs</span>
                </div>
                <div className="metric-row">
                  <span>Revenue Today</span>
                  <span className="metric-value">₹12,500</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-secondary">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="btn-primary">
                  <Edit2 size={16} />
                  Manage
                </button>
              </div>
            </div>

            <div className="operations-card">
              <div className="card-header">
                <h3>PS5 Gaming</h3>
                <button className="btn-icon">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="card-content">
                <div className="metric-row">
                  <span>Active Sessions</span>
                  <span className="metric-value">3/4</span>
                </div>
                <div className="metric-row">
                  <span>Popular Game</span>
                  <span className="metric-value">FIFA 24</span>
                </div>
                <div className="metric-row">
                  <span>Revenue Today</span>
                  <span className="metric-value">₹8,400</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-secondary">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="btn-primary">
                  <Edit2 size={16} />
                  Manage
                </button>
              </div>
            </div>

            <div className="operations-card">
              <div className="card-header">
                <h3>Inventory Status</h3>
                <button className="btn-icon">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="card-content">
                <div className="metric-row">
                  <span>Total Items</span>
                  <span className="metric-value">156</span>
                </div>
                <div className="metric-row">
                  <span>Low Stock</span>
                  <span className="metric-value warning">3 items</span>
                </div>
                <div className="metric-row">
                  <span>Total Value</span>
                  <span className="metric-value">₹45,600</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-secondary">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="btn-primary">
                  <Edit2 size={16} />
                  Manage
                </button>
              </div>
            </div>

            <div className="operations-card">
              <div className="card-header">
                <h3>Member Management</h3>
                <button className="btn-icon">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="card-content">
                <div className="metric-row">
                  <span>Total Members</span>
                  <span className="metric-value">156</span>
                </div>
                <div className="metric-row">
                  <span>Active Today</span>
                  <span className="metric-value">42</span>
                </div>
                <div className="metric-row">
                  <span>New This Month</span>
                  <span className="metric-value">12</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-secondary">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="btn-primary">
                  <Edit2 size={16} />
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="management-content">
          <div className="analytics-section">
            <div className="section-header">
              <h2>Performance Analytics</h2>
              <p>Detailed insights into business performance</p>
            </div>
            <div className="analytics-placeholder">
              <BarChart3 size={48} />
              <h3>Analytics Dashboard</h3>
              <p>Comprehensive analytics and reporting tools will be displayed here</p>
              <button className="btn-primary">
                <TrendingUp size={16} />
                View Full Analytics
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="management-content">
          <div className="reports-section">
            <div className="section-header">
              <h2>Management Reports</h2>
              <p>Generate and view detailed business reports</p>
            </div>
            <div className="reports-placeholder">
              <FileText size={48} />
              <h3>Reports Center</h3>
              <p>Access comprehensive reports and export functionality</p>
              <button className="btn-primary">
                <FileText size={16} />
                Generate Reports
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;