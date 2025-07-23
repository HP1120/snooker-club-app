import React, { useState } from 'react';
import {
  Coffee,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Package,
  Cigarette,
  DollarSign,
  Edit2,
  Trash2,
  ShoppingCart,
} from 'lucide-react';
import '../styles/DrinksAndCigs.css';

const DrinksAndCigs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);

  const items = [
    {
      id: 1,
      name: 'Coca Cola',
      category: 'soft_drinks',
      price: 40,
      stock: 48,
      minStock: 20,
      image: '🥤',
      status: 'in_stock',
    },
    {
      id: 2,
      name: 'Classic Lights',
      category: 'cigarettes',
      price: 18,
      stock: 25,
      minStock: 30,
      image: '🚬',
      status: 'low_stock',
    },
    {
      id: 3,
      name: 'Sprite',
      category: 'soft_drinks',
      price: 40,
      stock: 36,
      minStock: 20,
      image: '🥤',
      status: 'in_stock',
    },
    {
      id: 4,
      name: 'Gold Flake Kings',
      category: 'cigarettes',
      price: 20,
      stock: 15,
      minStock: 25,
      image: '🚬',
      status: 'low_stock',
    },
    {
      id: 5,
      name: 'Red Bull',
      category: 'energy_drinks',
      price: 110,
      stock: 24,
      minStock: 15,
      image: '🥤',
      status: 'in_stock',
    },
    {
      id: 6,
      name: 'Monster',
      category: 'energy_drinks',
      price: 100,
      stock: 12,
      minStock: 10,
      image: '🥤',
      status: 'in_stock',
    },
    {
      id: 7,
      name: 'Marlboro',
      category: 'cigarettes',
      price: 22,
      stock: 40,
      minStock: 20,
      image: '🚬',
      status: 'in_stock',
    },
    {
      id: 8,
      name: 'Mountain Dew',
      category: 'soft_drinks',
      price: 40,
      stock: 28,
      minStock: 15,
      image: '🥤',
      status: 'in_stock',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: <Package size={20} /> },
    { id: 'soft_drinks', name: 'Soft Drinks', icon: <Coffee size={20} /> },
    { id: 'energy_drinks', name: 'Energy Drinks', icon: <Coffee size={20} /> },
    { id: 'cigarettes', name: 'Cigarettes', icon: <Cigarette size={20} /> },
  ];

  const stats = {
    totalItems: items.length,
    lowStock: items.filter(item => item.stock < item.minStock).length,
    totalValue: items.reduce((acc, item) => acc + (item.stock * item.price), 0),
    categories: categories.length - 1,
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="drinks-and-cigs">
      <div className="page-header">
        <div>
          <h1>Drinks & Cigarettes</h1>
          <p className="subtitle">Manage drinks and cigarettes inventory</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filter
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
            <DollarSign size={24} />
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
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="items-container">
          <div className="items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="item-card">
                <div className="item-header">
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'in_stock' ? 'In Stock' : 'Low Stock'}
                  </span>
                  <div className="item-actions">
                    <button className="btn-icon">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="item-image">{item.image}</div>

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <div className="item-details">
                    <span className="category-badge">{item.category.replace('_', ' ')}</span>
                    <span className="price">₹{item.price}</span>
                  </div>
                  <div className="stock-info">
                    <div className="stock-bar">
                      <div
                        className="stock-level"
                        style={{
                          width: `${(item.stock / item.minStock) * 100}%`,
                          backgroundColor: item.stock < item.minStock ? '#ef4444' : '#22c55e',
                        }}
                      ></div>
                    </div>
                    <span className="stock-text">{item.stock} left</span>
                  </div>
                </div>

                <button
                  className="btn btn-primary add-to-cart"
                  onClick={() => addToCart(item)}
                  disabled={item.stock === 0}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-sidebar">
              <div className="cart-header">
                <h2>Cart</h2>
                <span className="item-count">{cartItems.length} items</span>
              </div>

              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                    <div className="quantity-controls">
                      <button
                        className="btn-icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="btn-icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-icon remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <span className="total-amount">₹{cartTotal.toLocaleString()}</span>
                </div>
                <button className="btn btn-primary checkout-btn">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrinksAndCigs; 