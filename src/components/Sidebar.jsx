import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  Gamepad2,
  CreditCard,
  Coffee,
  Users,
  Clock,
  DollarSign,
  Package,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import '../styles/Sidebar.css';

const navigationItems = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: Home },
      { id: 'tables', name: 'Tables', path: '/tables', icon: Calendar },
      { id: 'ps5', name: 'PS5 Booking', path: '/ps5-booking', icon: Gamepad2 },
    ]
  },
  {
    section: 'Management',
    items: [
      { id: 'billing', name: 'Billing', path: '/billing', icon: CreditCard },
      { id: 'inventory', name: 'Inventory', path: '/inventory', icon: Package },
      { id: 'members', name: 'Members', path: '/members', icon: Users },
      { id: 'drinks-cigarettes', name: 'Drinks & Cigs', path: '/drinks-cigarettes', icon: Coffee },
    ]
  },
  {
    section: 'Reports & Settings',
    items: [
      { id: 'expenses', name: 'Expenses', path: '/expenses', icon: DollarSign },
      { id: 'reports', name: 'Reports', path: '/reports', icon: BarChart3 },
      { id: 'settings', name: 'Settings', path: '/settings', icon: Settings },
    ]
  }
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img src="/logo.png" alt="Make A Break" className="logo-image" />
          <span className="logo-text">Make A Break</span>
        </div>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((section) => (
          <div key={section.section} className="nav-section">
            <h3 className="section-title">{section.section}</h3>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                  onClick={() => window.innerWidth <= 768 && onClose()}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 