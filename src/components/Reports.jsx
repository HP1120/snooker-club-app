import React, { useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  Calendar,
  ChevronDown,
  DollarSign,
  Users,
  Coffee,
  Table2,
  Gamepad2,
  BarChart2,
  Printer,
  Mail,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import '../styles/Reports.css';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [selectedView, setSelectedView] = useState('chart');

  // Sample data - replace with real API data
  const revenueData = {
    total: 185000,
    trend: '+12.5%',
    previousTotal: 164000,
    breakdown: {
      tables: 95000,
      ps5: 45000,
      food: 25000,
      drinks: 20000,
    },
    daily: [
      { date: '2024-02-01', amount: 5800 },
      { date: '2024-02-02', amount: 6200 },
      { date: '2024-02-03', amount: 7500 },
      { date: '2024-02-04', amount: 8100 },
      { date: '2024-02-05', amount: 7200 },
      { date: '2024-02-06', amount: 6800 },
      { date: '2024-02-07', amount: 7900 },
    ],
    monthly: [
      { month: 'Sep', amount: 145000 },
      { month: 'Oct', amount: 156000 },
      { month: 'Nov', amount: 164000 },
      { month: 'Dec', amount: 178000 },
      { month: 'Jan', amount: 169000 },
      { month: 'Feb', amount: 185000 },
    ],
  };

  const utilizationData = {
    tables: {
      average: '68%',
      trend: '+5%',
      peak_hours: ['14:00', '18:00', '20:00'],
      hourly: [45, 55, 65, 75, 85, 95, 80, 70, 60, 50, 40, 35],
      popular: ['Table 3', 'Table 7', 'Table 1'],
    },
    ps5: {
      average: '72%',
      trend: '+8%',
      peak_hours: ['15:00', '19:00', '21:00'],
      hourly: [40, 50, 60, 80, 90, 85, 75, 65, 55, 45, 35, 30],
      popular_games: ['FIFA 24', 'Spider-Man 2', 'Call of Duty'],
    },
  };

  const membershipData = {
    total: 450,
    active: 320,
    premium: 85,
    new_this_month: 28,
    growth: '+6.2%',
    retention: '92%',
    monthly_trend: [380, 395, 410, 425, 435, 450],
    categories: {
      premium: 85,
      standard: 235,
      basic: 130,
    },
    age_groups: {
      '18-24': 120,
      '25-34': 180,
      '35-44': 95,
      '45+': 55,
    },
  };

  const salesData = {
    total_orders: 1250,
    average_order: 180,
    popular_items: [
      { name: 'Red Bull', sales: 280, revenue: 8400 },
      { name: 'Chips', sales: 245, revenue: 4900 },
      { name: 'Coffee', sales: 210, revenue: 5250 },
      { name: 'Soft Drinks', sales: 195, revenue: 3900 },
      { name: 'Cigarettes', sales: 175, revenue: 3500 },
    ],
    hourly_orders: [25, 35, 45, 65, 85, 95, 75, 55, 45, 35, 25, 20],
  };

  const timeSlots = [
    '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'
  ];

  return (
    <div className="reports">
      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="subtitle">Comprehensive insights and business analysis</p>
        </div>
        <div className="header-actions">
          <div className="period-selector">
            <button className="btn btn-secondary">
              <Calendar size={20} />
              {selectedPeriod === 'today' ? 'Today' :
               selectedPeriod === 'this-week' ? 'This Week' :
               selectedPeriod === 'this-month' ? 'This Month' :
               selectedPeriod === 'last-month' ? 'Last Month' :
               selectedPeriod === 'custom' ? 'Custom Range' : 'All Time'}
              <ChevronDown size={16} />
            </button>
          </div>
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn btn-primary">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      <div className="report-nav">
        <button
          className={`report-tab ${selectedReport === 'revenue' ? 'active' : ''}`}
          onClick={() => setSelectedReport('revenue')}
        >
          <DollarSign size={20} />
          Revenue Analysis
        </button>
        <button
          className={`report-tab ${selectedReport === 'utilization' ? 'active' : ''}`}
          onClick={() => setSelectedReport('utilization')}
        >
          <BarChart2 size={20} />
          Utilization Metrics
        </button>
        <button
          className={`report-tab ${selectedReport === 'membership' ? 'active' : ''}`}
          onClick={() => setSelectedReport('membership')}
        >
          <Users size={20} />
          Membership Stats
        </button>
        <button
          className={`report-tab ${selectedReport === 'sales' ? 'active' : ''}`}
          onClick={() => setSelectedReport('sales')}
        >
          <Coffee size={20} />
          Sales Analysis
        </button>
      </div>

      {selectedReport === 'revenue' && (
        <div className="report-content">
          <div className="report-summary">
            <div className="summary-card primary">
              <div className="summary-header">
                <h3>Total Revenue</h3>
                <span className={`trend ${revenueData.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                  {revenueData.trend.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {revenueData.trend}
                </span>
              </div>
              <div className="summary-value">₹{revenueData.total.toLocaleString()}</div>
              <div className="summary-subtitle">vs ₹{revenueData.previousTotal.toLocaleString()} last month</div>
            </div>

            <div className="breakdown-cards">
              {Object.entries(revenueData.breakdown).map(([category, amount]) => (
                <div key={category} className={`breakdown-card ${category}`}>
                  <div className="breakdown-icon">
                    {category === 'tables' ? <Table2 size={24} /> :
                     category === 'ps5' ? <Gamepad2 size={24} /> :
                     category === 'food' ? <Coffee size={24} /> :
                     <Coffee size={24} />}
                  </div>
                  <div className="breakdown-content">
                    <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    <div className="breakdown-value">₹{amount.toLocaleString()}</div>
                    <div className="breakdown-percentage">
                      {Math.round((amount / revenueData.total) * 100)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-section">
            <div className="section-header">
              <h2>Revenue Trends</h2>
              <div className="view-selector">
                <button
                  className={`view-option ${selectedView === 'chart' ? 'active' : ''}`}
                  onClick={() => setSelectedView('chart')}
                >
                  Chart View
                </button>
                <button
                  className={`view-option ${selectedView === 'table' ? 'active' : ''}`}
                  onClick={() => setSelectedView('table')}
                >
                  Table View
                </button>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color revenue"></span>
                  Revenue
                </div>
                <div className="legend-item">
                  <span className="legend-color trend"></span>
                  Trend
                </div>
              </div>

              <div className="chart">
                <div className="chart-grid">
                  {revenueData.monthly.map((data, index) => (
                    <div key={data.month} className="chart-column">
                      <div 
                        className="bar revenue"
                        style={{ height: `${(data.amount / Math.max(...revenueData.monthly.map(d => d.amount))) * 100}%` }}
                      >
                        <span className="bar-value">₹{(data.amount / 1000).toFixed(0)}K</span>
                      </div>
                      <span className="time-label">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'utilization' && (
        <div className="report-content">
          <div className="utilization-metrics">
            <div className="metric-card tables">
              <div className="metric-header">
                <h3>Tables Utilization</h3>
                <span className={`trend ${utilizationData.tables.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                  {utilizationData.tables.trend.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {utilizationData.tables.trend}
                </span>
              </div>
              <div className="metric-value">{utilizationData.tables.average}</div>
              <div className="metric-details">
                <div className="detail-item">
                  <span>Peak Hours</span>
                  <span>{utilizationData.tables.peak_hours.join(', ')}</span>
                </div>
                <div className="detail-item">
                  <span>Most Used</span>
                  <span>{utilizationData.tables.popular.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="metric-card ps5">
              <div className="metric-header">
                <h3>PS5 Utilization</h3>
                <span className={`trend ${utilizationData.ps5.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                  {utilizationData.ps5.trend.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {utilizationData.ps5.trend}
                </span>
              </div>
              <div className="metric-value">{utilizationData.ps5.average}</div>
              <div className="metric-details">
                <div className="detail-item">
                  <span>Peak Hours</span>
                  <span>{utilizationData.ps5.peak_hours.join(', ')}</span>
                </div>
                <div className="detail-item">
                  <span>Popular Games</span>
                  <span>{utilizationData.ps5.popular_games.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-section">
            <div className="section-header">
              <h2>Hourly Utilization</h2>
              <div className="chart-actions">
                <button className="btn btn-secondary">
                  <Calendar size={16} />
                  Compare
                </button>
                <button className="btn btn-secondary">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color tables"></span>
                  Tables
                </div>
                <div className="legend-item">
                  <span className="legend-color ps5"></span>
                  PS5
                </div>
              </div>

              <div className="chart">
                <div className="chart-grid">
                  {timeSlots.map((time, index) => (
                    <div key={time} className="chart-column">
                      <div 
                        className="bar tables"
                        style={{ height: `${utilizationData.tables.hourly[index]}%` }}
                      >
                        <span className="bar-value">{utilizationData.tables.hourly[index]}%</span>
                      </div>
                      <div 
                        className="bar ps5"
                        style={{ height: `${utilizationData.ps5.hourly[index]}%` }}
                      >
                        <span className="bar-value">{utilizationData.ps5.hourly[index]}%</span>
                      </div>
                      <span className="time-label">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'membership' && (
        <div className="report-content">
          <div className="membership-overview">
            <div className="overview-card total">
              <div className="overview-icon">
                <Users size={24} />
              </div>
              <div className="overview-content">
                <h3>Total Members</h3>
                <div className="overview-value">{membershipData.total}</div>
                <span className="trend positive">
                  <ArrowUpRight size={14} />
                  {membershipData.growth}
                </span>
              </div>
            </div>

            <div className="overview-card active">
              <div className="overview-icon">
                <Users size={24} />
              </div>
              <div className="overview-content">
                <h3>Active Members</h3>
                <div className="overview-value">{membershipData.active}</div>
                <span className="subtitle">{Math.round((membershipData.active / membershipData.total) * 100)}% of total</span>
              </div>
            </div>

            <div className="overview-card premium">
              <div className="overview-icon">
                <Users size={24} />
              </div>
              <div className="overview-content">
                <h3>Premium Members</h3>
                <div className="overview-value">{membershipData.premium}</div>
                <span className="subtitle">{Math.round((membershipData.premium / membershipData.total) * 100)}% of total</span>
              </div>
            </div>

            <div className="overview-card retention">
              <div className="overview-icon">
                <TrendingUp size={24} />
              </div>
              <div className="overview-content">
                <h3>Retention Rate</h3>
                <div className="overview-value">{membershipData.retention}</div>
                <span className="subtitle">Last 30 days</span>
              </div>
            </div>
          </div>

          <div className="membership-charts">
            <div className="chart-section">
              <h3>Membership Distribution</h3>
              <div className="pie-charts">
                <div className="pie-chart">
                  <h4>By Type</h4>
                  <div className="pie-legend">
                    {Object.entries(membershipData.categories).map(([category, count]) => (
                      <div key={category} className="legend-item">
                        <span className={`legend-color ${category}`}></span>
                        <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pie-chart">
                  <h4>By Age Group</h4>
                  <div className="pie-legend">
                    {Object.entries(membershipData.age_groups).map(([group, count]) => (
                      <div key={group} className="legend-item">
                        <span className={`legend-color age-${group.replace('+', 'plus')}`}></span>
                        <span>{group}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'sales' && (
        <div className="report-content">
          <div className="sales-overview">
            <div className="overview-card orders">
              <div className="overview-icon">
                <Coffee size={24} />
              </div>
              <div className="overview-content">
                <h3>Total Orders</h3>
                <div className="overview-value">{salesData.total_orders}</div>
              </div>
            </div>

            <div className="overview-card average">
              <div className="overview-icon">
                <DollarSign size={24} />
              </div>
              <div className="overview-content">
                <h3>Average Order Value</h3>
                <div className="overview-value">₹{salesData.average_order}</div>
              </div>
            </div>
          </div>

          <div className="sales-details">
            <div className="popular-items">
              <h3>Popular Items</h3>
              <div className="items-table">
                <div className="table-header">
                  <div className="col-item">Item</div>
                  <div className="col-sales">Sales</div>
                  <div className="col-revenue">Revenue</div>
                </div>
                {salesData.popular_items.map(item => (
                  <div key={item.name} className="table-row">
                    <div className="col-item">{item.name}</div>
                    <div className="col-sales">{item.sales}</div>
                    <div className="col-revenue">₹{item.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hourly-sales">
              <h3>Hourly Sales Distribution</h3>
              <div className="chart-container">
                <div className="chart">
                  <div className="chart-grid">
                    {timeSlots.map((time, index) => (
                      <div key={time} className="chart-column">
                        <div 
                          className="bar sales"
                          style={{ height: `${(salesData.hourly_orders[index] / Math.max(...salesData.hourly_orders)) * 100}%` }}
                        >
                          <span className="bar-value">{salesData.hourly_orders[index]}</span>
                        </div>
                        <span className="time-label">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="report-actions">
        <button className="btn btn-secondary">
          <Printer size={20} />
          Print Report
        </button>
        <button className="btn btn-secondary">
          <Mail size={20} />
          Email Report
        </button>
        <button className="btn btn-secondary">
          <FileText size={20} />
          Save as PDF
        </button>
        <button className="btn btn-primary">
          <Download size={20} />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default Reports;