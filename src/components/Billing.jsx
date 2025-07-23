import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Download,
  Printer,
  Mail,
  Eye,
  Edit2,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import '../styles/Billing.css';

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod] = useState('today');

  const invoices = [
    {
      id: 'INV-2024-001',
      customer: 'John Smith',
      date: '2024-02-15',
      amount: 2450.00,
      status: 'paid',
      items: [
        { description: 'Table Session (2 hours)', amount: 400 },
        { description: 'Drinks', amount: 150 },
        { description: 'PS5 Session (3 hours)', amount: 900 },
        { description: 'Snacks', amount: 1000 },
      ],
    },
    {
      id: 'INV-2024-002',
      customer: 'Mike Johnson',
      date: '2024-02-14',
      amount: 1200.00,
      status: 'pending',
      items: [
        { description: 'Table Session (3 hours)', amount: 600 },
        { description: 'Drinks', amount: 300 },
        { description: 'Snacks', amount: 300 },
      ],
    },
    {
      id: 'INV-2024-003',
      customer: 'Sarah Wilson',
      date: '2024-02-14',
      amount: 3600.00,
      status: 'overdue',
      items: [
        { description: 'Table Session (4 hours)', amount: 800 },
        { description: 'PS5 Session (6 hours)', amount: 1800 },
        { description: 'Drinks and Snacks', amount: 1000 },
      ],
    },
    {
      id: 'INV-2024-004',
      customer: 'Alex Brown',
      date: '2024-02-13',
      amount: 1800.00,
      status: 'paid',
      items: [
        { description: 'Table Session (5 hours)', amount: 1000 },
        { description: 'Drinks', amount: 500 },
        { description: 'Snacks', amount: 300 },
      ],
    },
    {
      id: 'INV-2024-005',
      customer: 'Emma Davis',
      date: '2024-02-13',
      amount: 2100.00,
      status: 'draft',
      items: [
        { description: 'PS5 Session (4 hours)', amount: 1200 },
        { description: 'Drinks', amount: 400 },
        { description: 'Snacks', amount: 500 },
      ],
    },
  ];

  const stats = {
    totalRevenue: invoices.reduce((sum, inv) => sum + (inv.status === 'paid' ? inv.amount : 0), 0),
    pendingAmount: invoices.reduce((sum, inv) => sum + (inv.status === 'pending' ? inv.amount : 0), 0),
    overdueAmount: invoices.reduce((sum, inv) => sum + (inv.status === 'overdue' ? inv.amount : 0), 0),
    totalInvoices: invoices.length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'danger';
      case 'draft':
        return 'secondary';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'overdue':
        return <XCircle size={16} />;
      case 'draft':
        return <FileText size={16} />;
      default:
        return null;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="billing">
      <div className="page-header">
        <div>
          <h1>Billing & Invoices</h1>
          <p className="subtitle">Manage billing and track invoices</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn btn-primary">
            <Plus size={20} />
            New Invoice
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <div className="stat-value">₹{stats.totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending Amount</h3>
            <div className="stat-value">₹{stats.pendingAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>Overdue Amount</h3>
            <div className="stat-value">₹{stats.overdueAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Invoices</h3>
            <div className="stat-value">{stats.totalInvoices}</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="filters">
            <div className="dropdown">
              <button className="btn btn-secondary">
                <Calendar size={20} />
                {selectedPeriod === 'this-month' ? 'This Month' : 
                 selectedPeriod === 'last-month' ? 'Last Month' : 
                 selectedPeriod === 'quarter' ? 'This Quarter' : 'All Time'}
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="status-filters">
              <button 
                className={`status-filter ${selectedStatus === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('all')}
              >
                All
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'paid' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('paid')}
              >
                Paid
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('pending')}
              >
                Pending
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'overdue' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('overdue')}
              >
                Overdue
              </button>
              <button 
                className={`status-filter ${selectedStatus === 'draft' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('draft')}
              >
                Draft
              </button>
            </div>
          </div>

          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="invoices-table">
          <div className="table-header">
            <div className="col-invoice">Invoice</div>
            <div className="col-customer">Customer</div>
            <div className="col-date">Date</div>
            <div className="col-amount">Amount</div>
            <div className="col-status">Status</div>
            <div className="col-actions">Actions</div>
          </div>

          <div className="table-body">
            {filteredInvoices.map(invoice => (
              <div key={invoice.id} className="table-row">
                <div className="col-invoice">
                  <span className="invoice-id">{invoice.id}</span>
                  <span className="items-count">{invoice.items.length} items</span>
                </div>
                
                <div className="col-customer">
                  {invoice.customer}
                </div>
                
                <div className="col-date">
                  {new Date(invoice.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                
                <div className="col-amount">
                  ₹{invoice.amount.toLocaleString()}
                </div>
                
                <div className="col-status">
                  <span className={`status-badge ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
                
                <div className="col-actions">
                  <button className="btn-icon" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="btn-icon" title="Download">
                    <Download size={16} />
                  </button>
                  <button className="btn-icon" title="Print">
                    <Printer size={16} />
                  </button>
                  <button className="btn-icon" title="Send">
                    <Mail size={16} />
                  </button>
                  {invoice.status === 'draft' && (
                    <>
                      <button className="btn-icon" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="table-footer">
          <div className="pagination">
            <span className="page-info">Showing 1-5 of 5 invoices</span>
            <div className="page-controls">
              <button className="btn btn-secondary" disabled>Previous</button>
              <button className="btn btn-secondary" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing; 