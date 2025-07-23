import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Tag,
  FileText,
  Edit2,
  Trash2,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';
import '../styles/Expenses.css';

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [dateRange] = useState([null, null]);  // Remove unused setter

  const expenses = [
    {
      id: 1,
      description: 'Equipment Maintenance',
      category: 'maintenance',
      amount: 15000,
      date: '2024-03-20',
      status: 'approved',
      approvedBy: 'John Smith',
      receipt: true,
    },
    {
      id: 2,
      description: 'Utility Bills - Electricity',
      category: 'utilities',
      amount: 25000,
      date: '2024-03-18',
      status: 'pending',
      receipt: true,
    },
    {
      id: 3,
      description: 'Snooker Cues Restock',
      category: 'inventory',
      amount: 35000,
      date: '2024-03-15',
      status: 'approved',
      approvedBy: 'Sarah Wilson',
      receipt: true,
    },
    {
      id: 4,
      description: 'Staff Salaries',
      category: 'payroll',
      amount: 125000,
      date: '2024-03-01',
      status: 'approved',
      approvedBy: 'John Smith',
      receipt: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Expenses' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'inventory', name: 'Inventory' },
    { id: 'payroll', name: 'Payroll' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'others', name: 'Others' },
  ];

  const stats = {
    totalExpenses: expenses.reduce((acc, exp) => acc + exp.amount, 0),
    pendingApproval: expenses.filter(exp => exp.status === 'pending').length,
    categories: categories.length - 1,
    monthlyChange: 12.5,
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || expense.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="expenses">
      <div className="page-header">
        <div>
          <h1>Expenses</h1>
          <p className="subtitle">Track and manage business expenses</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn btn-secondary">
            <Calendar size={20} />
            {dateRange}
          </button>
          <button className="btn btn-primary">
            <Plus size={20} />
            Add Expense
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Expenses</h3>
            <div className="stat-value">₹{stats.totalExpenses.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending Approval</h3>
            <div className="stat-value">{stats.pendingApproval}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Tag size={24} />
          </div>
          <div className="stat-content">
            <h3>Categories</h3>
            <div className="stat-value">{stats.categories}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Monthly Change</h3>
            <div className="stat-value">{stats.monthlyChange}%</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="expenses-table">
          <div className="table-header">
            <div className="th">Description</div>
            <div className="th">Category</div>
            <div className="th">Amount</div>
            <div className="th">Date</div>
            <div className="th">Status</div>
            <div className="th">Receipt</div>
            <div className="th">Actions</div>
          </div>

          <div className="table-body">
            {filteredExpenses.map(expense => (
              <div key={expense.id} className="table-row">
                <div className="td description">
                  <span className="text">{expense.description}</span>
                  {expense.approvedBy && (
                    <span className="approved-by">
                      Approved by {expense.approvedBy}
                    </span>
                  )}
                </div>
                <div className="td category">
                  <span className="category-badge">{expense.category}</span>
                </div>
                <div className="td amount">₹{expense.amount.toLocaleString()}</div>
                <div className="td date">{expense.date}</div>
                <div className="td status">
                  <span className={`status-badge ${expense.status}`}>
                    {expense.status === 'approved' ? (
                      <Check size={14} />
                    ) : expense.status === 'rejected' ? (
                      <X size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                    {expense.status}
                  </span>
                </div>
                <div className="td receipt">
                  {expense.receipt ? (
                    <button className="btn-text">View</button>
                  ) : (
                    <span className="no-receipt">N/A</span>
                  )}
                </div>
                <div className="td actions">
                  <button className="btn-icon">
                    <Edit2 size={18} />
                  </button>
                  <button className="btn-icon">
                    <Trash2 size={18} />
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

export default Expenses; 