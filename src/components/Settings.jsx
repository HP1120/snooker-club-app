import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  DollarSign,
  Bell,
  Database,
  Shield,
  Save as SaveIcon
} from 'lucide-react';
import '../styles/Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleDarkModeToggle = () => {
    setDarkMode(prev => !prev);
    // Here you would also update the theme in your app
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="subtitle">Manage your application settings</p>
      </div>

      <div className="settings-content">
        <div className="settings-nav">
          <button
            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <SettingsIcon size={20} />
            General
          </button>
          <button
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={20} />
            Notifications
          </button>
          <button
            className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <DollarSign size={20} />
            Billing
          </button>
          <button
            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={20} />
            Security
          </button>
          <button
            className={`nav-item ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            <Database size={20} />
            Data Management
          </button>
        </div>

        <div className="settings-panel">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>General Settings</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Dark Mode</h3>
                  <p>Enable dark mode for better visibility in low light</p>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={handleDarkModeToggle}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Language</h3>
                  <p>Select your preferred language</p>
                </div>
                <div className="setting-control">
                  <select defaultValue="en">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Time Zone</h3>
                  <p>Set your local time zone</p>
                </div>
                <div className="setting-control">
                  <select defaultValue="UTC+5:30">
                    <option value="UTC+5:30">India (UTC+5:30)</option>
                    <option value="UTC+0">London (UTC+0)</option>
                    <option value="UTC-5">New York (UTC-5)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Email Notifications</h3>
                  <p>Receive notifications via email</p>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Push Notifications</h3>
                  <p>Receive push notifications</p>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>SMS Notifications</h3>
                  <p>Receive notifications via SMS</p>
                </div>
                <div className="setting-control">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <div className="setting-control">
                  <button className="btn btn-secondary">Enable 2FA</button>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Change Password</h3>
                  <p>Update your account password</p>
                </div>
                <div className="setting-control">
                  <button className="btn btn-secondary">Change Password</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="settings-section">
              <h2>Data Management</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Export Data</h3>
                  <p>Download all your data in CSV format</p>
                </div>
                <div className="setting-control">
                  <button className="btn btn-secondary">Export Data</button>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Clear Data</h3>
                  <p>Delete all stored data and reset settings</p>
                </div>
                <div className="setting-control">
                  <button className="btn btn-danger">Clear Data</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="settings-section">
              <h2>Billing Settings</h2>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Payment Method</h3>
                  <p>Update your payment information</p>
                </div>
                <div className="setting-control">
                  <button className="btn btn-secondary">Update Payment</button>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Billing History</h3>
                  <p>View and download past invoices</p>
                </div>
                <div className="setting-control">
                  <button className="btn btn-secondary">View History</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="settings-footer">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary">
          <SaveIcon size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings; 