import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Clock,
  DollarSign,
  Filter,
} from 'lucide-react';
import '../styles/Staff.css';

const Staff = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const staff = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Manager',
      email: 'john.smith@example.com',
      phone: '+91 98765 43210',
      joinDate: '2023-01-15',
      shift: 'Morning',
      salary: 35000,
      status: 'active',
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      role: 'Supervisor',
      email: 'sarah.wilson@example.com',
      phone: '+91 98765 43211',
      joinDate: '2023-02-20',
      shift: 'Evening',
      salary: 28000,
      status: 'active',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Staff',
      email: 'mike.johnson@example.com',
      phone: '+91 98765 43212',
      joinDate: '2023-03-10',
      shift: 'Night',
      salary: 22000,
      status: 'on_leave',
    },
  ];

  const stats = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.status === 'active').length,
    onLeave: staff.filter(s => s.status === 'on_leave').length,
    totalSalary: staff.reduce((acc, s) => acc + s.salary, 0),
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'manager':
        return '#ef4444';
      case 'supervisor':
        return '#eab308';
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className="staff">
      <div className="page-header">
        <div>
          <h1>Staff Management</h1>
          <p className="subtitle">Manage staff members, roles and schedules</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filter
          </button>
          <button className="btn btn-primary">
            <Plus size={20} />
            Add Staff
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Staff</h3>
            <div className="stat-value">{stats.totalStaff}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Staff</h3>
            <div className="stat-value">{stats.activeStaff}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>On Leave</h3>
            <div className="stat-value">{stats.onLeave}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Salary</h3>
            <div className="stat-value">₹{stats.totalSalary.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search staff members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="staff-list">
          {staff
            .filter((member) =>
              member.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((member) => (
              <div key={member.id} className="staff-card">
                <div className="staff-info">
                  <div className="staff-primary">
                    <div className="avatar">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3>{member.name}</h3>
                      <span
                        className="role-badge"
                        style={{
                          backgroundColor: `${getRoleColor(member.role)}20`,
                          color: getRoleColor(member.role),
                        }}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="staff-details">
                    <div className="detail-item">
                      <Mail size={16} />
                      <span>{member.email}</span>
                    </div>
                    <div className="detail-item">
                      <Phone size={16} />
                      <span>{member.phone}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>Joined: {member.joinDate}</span>
                    </div>
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>Shift: {member.shift}</span>
                    </div>
                    <div className="detail-item">
                      <DollarSign size={16} />
                      <span>Salary: ₹{member.salary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="staff-actions">
                  <button className="btn-icon">
                    <Edit2 size={20} />
                  </button>
                  <button className="btn-icon">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Staff; 