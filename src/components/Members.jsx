import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Star,
  Clock,
  Calendar,
  UserPlus,
  Filter,
  ChevronDown,
  MoreVertical,
  CreditCard,
  History,
  Trophy,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import { useApp } from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';
import { membersApi } from '../services/api';
import '../styles/Members.css';

const Members = () => {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [timeRange, setTimeRange] = useState('month');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    membershipType: 'standard',
    address: '',
    birthDate: '',
    notes: '',
    preferredGames: [],
    creditBalance: 0
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersApi.getMembers();
        dispatch({ type: 'UPDATE_MEMBERS', payload: data });
      } catch (error) {
        console.error('Failed to fetch members:', error);
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now(),
            type: 'error',
            message: 'Failed to load members. Please try again.',
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [dispatch]);

  const membershipTypes = [
    { 
      value: 'standard', 
      label: 'Standard', 
      color: '#3b82f6',
      benefits: ['Basic rates', 'Member events']
    },
    { 
      value: 'premium', 
      label: 'Premium', 
      color: '#f59e0b',
      benefits: ['10% discount', 'Priority booking', 'Free snacks']
    },
    { 
      value: 'vip', 
      label: 'VIP', 
      color: '#ef4444',
      benefits: ['20% discount', 'Reserved tables', 'Free drinks', 'Personal locker']
    }
  ];

  const handleOpenDialog = (member = null) => {
    setSelectedMember(member);
    setFormData(
      member
        ? {
            name: member.name,
            phone: member.phone,
            email: member.email,
            membershipType: member.membershipType,
            address: member.address || '',
            birthDate: member.birthDate || '',
            notes: member.notes || '',
            preferredGames: member.preferredGames || [],
            creditBalance: member.creditBalance || 0
          }
        : {
            name: '',
            phone: '',
            email: '',
            membershipType: 'standard',
            address: '',
            birthDate: '',
            notes: '',
            preferredGames: [],
            creditBalance: 0
          }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMember(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      membershipType: 'standard',
      address: '',
      birthDate: '',
      notes: '',
      preferredGames: [],
      creditBalance: 0
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSaveMember = async () => {
    try {
      setLoading(true);
      if (selectedMember) {
        await membersApi.updateMember(selectedMember.id, formData);
      } else {
        await membersApi.addMember(formData);
      }

      // Fetch updated members
      const updatedMembers = await membersApi.getMembers();
      dispatch({ type: 'UPDATE_MEMBERS', payload: updatedMembers });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'success',
          message: `Member ${selectedMember ? 'updated' : 'added'} successfully!`,
        },
      });

      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save member:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'error',
          message: `Failed to ${selectedMember ? 'update' : 'add'} member. Please try again.`,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }

    try {
      setLoading(true);
      await membersApi.deleteMember(memberId);

      // Fetch updated members
      const updatedMembers = await membersApi.getMembers();
      dispatch({ type: 'UPDATE_MEMBERS', payload: updatedMembers });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'success',
          message: 'Member deleted successfully!',
        },
      });
    } catch (error) {
      console.error('Failed to delete member:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'error',
          message: 'Failed to delete member. Please try again.',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCredit = async (memberId, amount) => {
    try {
      setLoading(true);
      await membersApi.addCredit(memberId, amount);

      // Fetch updated members
      const updatedMembers = await membersApi.getMembers();
      dispatch({ type: 'UPDATE_MEMBERS', payload: updatedMembers });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'success',
          message: `Added ₹${amount} credit successfully!`,
        },
      });
    } catch (error) {
      console.error('Failed to add credit:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'error',
          message: 'Failed to add credit. Please try again.',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const getMembershipColor = (type) => {
    const membership = membershipTypes.find((m) => m.value === type);
    return membership ? membership.color : '#94a3b8';
  };

  const getMembershipBenefits = (type) => {
    const membership = membershipTypes.find((m) => m.value === type);
    return membership ? membership.benefits : [];
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading && !state.members.length) {
    return <LoadingSpinner />;
  }

  const members = state.members;
  const filteredMembers = members
    .filter(member => 
      searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery)
    )
    .filter(member => 
      selectedFilter === 'all' || 
      member.membershipType === selectedFilter
    );

  const totalMembers = members.length;
  const premiumMembers = members.filter(
    (m) => m.membershipType === 'premium' || m.membershipType === 'vip'
  ).length;
  const activeMembers = members.filter(m => m.lastVisit && 
    new Date(m.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  const totalRevenue = members.reduce((sum, m) => sum + (m.totalSpent || 0), 0);

  return (
    <div className="members">
      <div className="members-header">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="subtitle">Manage your club members</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={20} />
          </button>
          <button className="btn-new" onClick={() => handleOpenDialog()}>
            <UserPlus size={20} />
            Add Member
          </button>
        </div>
      </div>

      <div className="members-stats">
        <Card className="stat-card">
          <div className="stat-icon">
            <Users size={24} color="#3b82f6" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalMembers}</span>
            <span className="stat-label">Total Members</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">
            <Star size={24} color="#f59e0b" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{premiumMembers}</span>
            <span className="stat-label">Premium Members</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">
            <Clock size={24} color="#22c55e" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{activeMembers}</span>
            <span className="stat-label">Active Members</span>
            <span className="stat-subtitle">Last 30 days</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">
            <Wallet size={24} color="#ec4899" />
          </div>
          <div className="stat-info">
            <span className="stat-value">{formatCurrency(totalRevenue)}</span>
            <span className="stat-label">Total Revenue</span>
          </div>
        </Card>
      </div>

      {showFilters && (
        <div className="filter-bar">
          <div className="filter-group">
            <button 
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Members
            </button>
            {membershipTypes.map(type => (
              <button
                key={type.value}
                className={`filter-btn ${selectedFilter === type.value ? 'active' : ''}`}
                onClick={() => setSelectedFilter(type.value)}
                style={{
                  '--filter-color': type.color
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <select 
              className="time-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      )}

      <div className="members-list">
        {filteredMembers.length === 0 ? (
          <div className="empty-state">
            <Users size={48} />
            <h3>No members found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <Card key={member.id} className="member-card">
              <div className="member-info">
                <div className="member-primary">
                  <div className="member-name-badge">
                    <h3>{member.name}</h3>
                    <span
                      className="membership-badge"
                      style={{
                        backgroundColor: `${getMembershipColor(member.membershipType)}20`,
                        color: getMembershipColor(member.membershipType),
                      }}
                    >
                      {member.membershipType}
                    </span>
                    {member.isNew && (
                      <span className="new-badge">NEW</span>
                    )}
                  </div>
                  <div className="member-status">
                    {member.status === 'active' ? (
                      <Tooltip title="Active Member">
                        <span className="status-badge success">
                          <CheckCircle2 size={14} />
                          Active
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Inactive Member">
                        <span className="status-badge warning">
                          <AlertTriangle size={14} />
                          Inactive
                        </span>
                      </Tooltip>
                    )}
                  </div>
                </div>

                <div className="member-details">
                  <div className="detail-item">
                    <Phone size={16} />
                    <span>{member.phone}</span>
                  </div>
                  <div className="detail-item">
                    <Mail size={16} />
                    <span>{member.email}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Joined: {formatDate(member.joinDate)}</span>
                  </div>
                  <div className="detail-item">
                    <History size={16} />
                    <span>Last visit: {formatDate(member.lastVisit)}</span>
                  </div>
                </div>

                <div className="member-stats">
                  <div className="stat-item">
                    <Trophy size={16} />
                    <span>{member.visits || 0} visits</span>
                  </div>
                  <div className="stat-item">
                    <CreditCard size={16} />
                    <span>{formatCurrency(member.totalSpent || 0)} spent</span>
                  </div>
                  <div className="stat-item">
                    <Wallet size={16} />
                    <span>{formatCurrency(member.creditBalance || 0)} credit</span>
                  </div>
                </div>

                {member.preferredGames && member.preferredGames.length > 0 && (
                  <div className="member-preferences">
                    <h4>Preferred Games</h4>
                    <div className="game-tags">
                      {member.preferredGames.map((game, index) => (
                        <span key={index} className="game-tag">{game}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="member-actions">
                <Tooltip title="Edit Member">
                  <button onClick={() => handleOpenDialog(member)}>
                    <Edit2 size={16} />
                  </button>
                </Tooltip>
                <Tooltip title="Add Credit">
                  <button onClick={() => handleAddCredit(member.id, 500)}>
                    <Wallet size={16} />
                  </button>
                </Tooltip>
                <Tooltip title="Delete Member">
                  <button 
                    className="delete" 
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </Tooltip>
              </div>
            </Card>
          ))
        )}
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
          },
        }}
      >
        <DialogTitle>
          {selectedMember ? 'Edit Member' : 'Add New Member'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={formData.name}
            onChange={handleInputChange('name')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={formData.phone}
            onChange={handleInputChange('phone')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={formData.email}
            onChange={handleInputChange('email')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            value={formData.address}
            onChange={handleInputChange('address')}
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Birth Date"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange('birthDate')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Membership Type</InputLabel>
            <Select
              value={formData.membershipType}
              label="Membership Type"
              onChange={handleInputChange('membershipType')}
            >
              {membershipTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <div className="membership-option">
                    <span className="membership-name">{type.label}</span>
                    <div className="membership-benefits">
                      {type.benefits.map((benefit, index) => (
                        <span key={index} className="benefit-tag">{benefit}</span>
                      ))}
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Notes"
            value={formData.notes}
            onChange={handleInputChange('notes')}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveMember}
            disabled={loading}
          >
            {loading ? 'Saving...' : selectedMember ? 'Save Changes' : 'Add Member'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Members; 