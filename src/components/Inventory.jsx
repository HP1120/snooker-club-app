import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  BarChart2,
  ArrowDown,
  ArrowUp,
  Edit2,
  Trash2,
} from 'lucide-react';
import '../styles/Inventory.css';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const inventory = [
    {
      id: 1,
      name: 'Snooker Cue',
      category: 'equipment',
      quantity: 15,
      minQuantity: 10,
      price: 2500,
      lastRestocked: '2024-03-10',
      status: 'in_stock',
    },
    {
      id: 2,
      name: 'Coca Cola',
      category: 'drinks',
      quantity: 48,
      minQuantity: 50,
      price: 40,
      lastRestocked: '2024-03-15',
      status: 'low_stock',
    },
    {
      id: 3,
      name: 'Classic Lights',
      category: 'cigarettes',
      quantity: 25,
      minQuantity: 20,
      price: 18,
      lastRestocked: '2024-03-18',
      status: 'in_stock',
    },
    {
      id: 4,
      name: 'Chalk',
      category: 'equipment',
      quantity: 8,
      minQuantity: 15,
      price: 100,
      lastRestocked: '2024-03-05',
      status: 'low_stock',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'equipment', name: 'Equipment' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'cigarettes', name: 'Cigarettes' },
    { id: 'snacks', name: 'Snacks' },
  ];

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(item => item.status === 'low_stock').length,
    totalValue: inventory.reduce((acc, item) => acc + (item.quantity * item.price), 0),
    categories: categories.length - 1,
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory">
      <div className="page-header">
        <div>
          <h1>Inventory Management</h1>
          <p className="subtitle">Track and manage stock levels, equipment, and supplies</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn btn-secondary">
            <BarChart2 size={20} />
            Analytics
          </button>
          <button className="btn btn-primary">
            <Plus size={20} />
            Add Item
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Items</h3>
            <div className="stat-value">{stats.totalItems}</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3>Low Stock Items</h3>
            <div className="stat-value">{stats.lowStock}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h3>Categories</h3>
            <div className="stat-value">{stats.categories}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Value</h3>
            <div className="stat-value">₹{stats.totalValue.toLocaleString()}</div>
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
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="inventory-table">
          <div className="table-header">
            <div className="th">Item Name</div>
            <div className="th">Category</div>
            <div className="th">Quantity</div>
            <div className="th">Price</div>
            <div className="th">Last Restocked</div>
            <div className="th">Status</div>
            <div className="th">Actions</div>
          </div>

          <div className="table-body">
            {filteredInventory.map(item => (
              <div key={item.id} className="table-row">
                <div className="td name">{item.name}</div>
                <div className="td category">
                  <span className="category-badge">{item.category}</span>
                </div>
                <div className="td quantity">
                  <span className={`quantity-indicator ${item.quantity < item.minQuantity ? 'low' : ''}`}>
                    {item.quantity < item.minQuantity ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                  </span>
                  {item.quantity}
                </div>
                <div className="td price">₹{item.price}</div>
                <div className="td date">{item.lastRestocked}</div>
                <div className="td status">
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'in_stock' ? 'In Stock' : 'Low Stock'}
                  </span>
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

export default Inventory; 