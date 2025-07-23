import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  DollarSign,
  Bell,
  Database,
  Shield,
  Save as SaveIcon,
  User,
  Palette,
  Globe,
  Clock,
  Smartphone,
  Mail,
  Lock,
  Download,
  Trash2,
  CreditCard,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import '../styles/Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true
  });
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    clubName: 'Make A Break Snooker Club',
    currency: '₹',
    timezone: 'Asia/Kolkata',
    language: 'en',
    tableRate: 200,
    ps5Rate: 300,
    taxRate: 18,
    autoBackup: true,
    sessionTimeout: 30
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Implement save functionality
    console.log('Saving settings:', settings, notifications);
  };

  return (
    <div className="settings">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="subtitle">Manage your application preferences and configuration</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Download size={20} />
            Export Settings
          </button>
          <button className="btn btn-primary" onClick={handleSaveSettings}>
            <SaveIcon size={20} />
            Save Changes
          </button>
        </div>
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
            className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Palette size={20} />
            Appearance
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
            Billing & Rates
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
              <div className="section-header">
                <h2>General Settings</h2>
                <p>Basic configuration for your snooker club</p>
              </div>
              
              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <User size={20} />
                    </div>
                    <div>
                      <h3>Club Name</h3>
                      <p>The name of your snooker club</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <input
                      type="text"
                      value={settings.clubName}
                      onChange={(e) => handleSettingChange('clubName', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <h3>Currency</h3>
                      <p>Default currency for pricing</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('currency', e.target.value)}
                      className="form-select"
                    >
                      <option value="₹">Indian Rupee (₹)</option>
                      <option value="$">US Dollar ($)</option>
                      <option value="€">Euro (€)</option>
                      <option value="£">British Pound (£)</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3>Time Zone</h3>
                      <p>Set your local time zone</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="form-select"
                    >
                      <option value="Asia/Kolkata">India (UTC+5:30)</option>
                      <option value="UTC">London (UTC+0)</option>
                      <option value="America/New_York">New York (UTC-5)</option>
                      <option value="Asia/Dubai">Dubai (UTC+4)</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h3>Language</h3>
                      <p>Select your preferred language</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="form-select"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3>Session Timeout</h3>
                      <p>Auto-logout after inactivity (minutes)</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      className="form-input"
                      min="5"
                      max="120"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Appearance Settings</h2>
                <p>Customize the look and feel of your application</p>
              </div>
              
              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Palette size={20} />
                    </div>
                    <div>
                      <h3>Dark Mode</h3>
                      <p>Enable dark mode for better visibility in low light</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Palette size={20} />
                    </div>
                    <div>
                      <h3>Theme Color</h3>
                      <p>Choose your preferred accent color</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <div className="color-options">
                      <button className="color-option blue active" data-color="blue"></button>
                      <button className="color-option green" data-color="green"></button>
                      <button className="color-option purple" data-color="purple"></button>
                      <button className="color-option red" data-color="red"></button>
                    </div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Eye size={20} />
                    </div>
                    <div>
                      <h3>Compact Mode</h3>
                      <p>Reduce spacing for more content on screen</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Notification Settings</h2>
                <p>Configure how you receive notifications</p>
              </div>
              
              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3>Email Notifications</h3>
                      <p>Receive notifications via email</p>
                    </div>
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
                    <div className="setting-icon">
                      <Bell size={20} />
                    </div>
                    <div>
                      <h3>Push Notifications</h3>
                      <p>Receive push notifications in browser</p>
                    </div>
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
                    <div className="setting-icon">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h3>SMS Notifications</h3>
                      <p>Receive notifications via SMS</p>
                    </div>
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

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Bell size={20} />
                    </div>
                    <div>
                      <h3>Desktop Notifications</h3>
                      <p>Show desktop notifications</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={notifications.desktop}
                        onChange={() => handleNotificationChange('desktop')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Billing & Rates</h2>
                <p>Configure pricing and billing settings</p>
              </div>
              
              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <h3>Table Hourly Rate</h3>
                      <p>Standard rate per hour for table booking</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <div className="input-group">
                      <span className="input-prefix">{settings.currency}</span>
                      <input
                        type="number"
                        value={settings.tableRate}
                        onChange={(e) => handleSettingChange('tableRate', parseInt(e.target.value))}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <h3>PS5 Hourly Rate</h3>
                      <p>Standard rate per hour for PS5 gaming</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <div className="input-group">
                      <span className="input-prefix">{settings.currency}</span>
                      <input
                        type="number"
                        value={settings.ps5Rate}
                        onChange={(e) => handleSettingChange('ps5Rate', parseInt(e.target.value))}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3>Tax Rate</h3>
                      <p>Default tax percentage for billing</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <div className="input-group">
                      <input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) => handleSettingChange('taxRate', parseInt(e.target.value))}
                        className="form-input"
                      />
                      <span className="input-suffix">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Security Settings</h2>
                <p>Manage your account security and privacy</p>
              </div>
              
              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h3>Change Password</h3>
                      <p>Update your account password</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <button className="btn btn-secondary">Enable 2FA</button>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3>Login History</h3>
                      <p>View recent login activity</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <button className="btn btn-secondary">View History</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Data Management</h2>
                <p>Manage your data backup and storage</p>
              </div>
              
              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Database size={20} />
                    </div>
                    <div>
                      <h3>Auto Backup</h3>
                      <p>Automatically backup your data daily</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Download size={20} />
                    </div>
                    <div>
                      <h3>Export Data</h3>
                      <p>Download all your data in CSV format</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <button className="btn btn-secondary">Export Data</button>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <div className="setting-icon">
                      <Trash2 size={20} />
                    </div>
                    <div>
                      <h3>Clear Data</h3>
                      <p>Delete all stored data and reset settings</p>
                    </div>
                  </div>
                  <div className="setting-control">
                    <button className="btn btn-danger">Clear Data</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;