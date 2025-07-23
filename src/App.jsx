import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Menu, Bell, User, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          {/* Header */}
          <header className="app-header">
            <div className="header-left">
              <button className="menu-toggle" onClick={toggleSidebar}>
                <Menu size={24} />
              </button>
              <div className="search-bar">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="header-right">
              <button className="header-icon-btn">
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>
              <button className="header-icon-btn">
                <User size={20} />
              </button>
              <div className="user-profile">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="content-area">
            <div className="content-wrapper">
              <AppRoutes />
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 