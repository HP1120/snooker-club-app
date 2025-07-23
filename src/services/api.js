// Mock API service for development
// Replace these with actual API calls in production

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Tables API
export const tablesApi = {
  async getTables() {
    await delay(500);
    return [
      { id: 1, name: 'Table 1', status: 'occupied', startTime: '14:30', players: ['John D.', 'Mike S.'], duration: '1:45' },
      { id: 2, name: 'Table 2', status: 'available', startTime: null, players: [], duration: null },
      { id: 3, name: 'Table 3', status: 'maintenance', startTime: null, players: [], duration: null },
      { id: 4, name: 'Table 4', status: 'occupied', startTime: '15:15', players: ['Alex R.'], duration: '0:30' },
      { id: 5, name: 'Table 5', status: 'available', startTime: null, players: [], duration: null },
      { id: 6, name: 'Table 6', status: 'occupied', startTime: '13:45', players: ['Tom K.', 'Sam P.'], duration: '2:15' },
      { id: 7, name: 'Table 7', status: 'available', startTime: null, players: [], duration: null },
      { id: 8, name: 'Table 8', status: 'available', startTime: null, players: [], duration: null },
    ];
  },

  async updateTableStatus(tableId, status, players = []) {
    await delay(500);
    return { success: true };
  },
};

// PS5 API
export const ps5Api = {
  async getConsoles() {
    await delay(500);
    return [
      {
        id: 1,
        name: 'PS5 Console 1',
        status: 'available',
        currentGame: null,
        players: [],
        startTime: null,
        endTime: null,
      },
      {
        id: 2,
        name: 'PS5 Console 2',
        status: 'occupied',
        currentGame: 'FIFA 24',
        players: ['Alex', 'John'],
        startTime: '15:30',
        endTime: '17:30',
      },
    ];
  },

  async bookConsole(consoleId, booking) {
    await delay(500);
    return { success: true, bookingId: Math.random().toString(36).substr(2, 9) };
  },
};

// Members API
export const membersApi = {
  async getMembers() {
    await delay(500);
    return [
      {
        id: 1,
        name: 'John Doe',
        phone: '+91 98765 43210',
        email: 'john@example.com',
        membershipType: 'premium',
        joinDate: '2023-01-15',
        visits: 45,
        status: 'active',
      },
      {
        id: 2,
        name: 'Alice Smith',
        phone: '+91 98765 43211',
        email: 'alice@example.com',
        membershipType: 'standard',
        joinDate: '2023-03-20',
        visits: 28,
        status: 'active',
      },
      {
        id: 3,
        name: 'Bob Wilson',
        phone: '+91 98765 43212',
        email: 'bob@example.com',
        membershipType: 'premium',
        joinDate: '2023-02-10',
        visits: 52,
        status: 'inactive',
      },
    ];
  },

  async addMember(member) {
    await delay(500);
    return { success: true, memberId: Math.random().toString(36).substr(2, 9) };
  },

  async updateMember(memberId, updates) {
    await delay(500);
    return { success: true };
  },

  async deleteMember(memberId) {
    await delay(500);
    return { success: true };
  },
};

// Auth API
export const authApi = {
  async login(credentials) {
    await delay(500);
    return {
      user: {
        id: 1,
        name: 'Admin User',
        role: 'admin',
        email: 'admin@example.com',
      },
      token: 'mock-jwt-token',
    };
  },

  async logout() {
    await delay(500);
    return { success: true };
  },
};

// Settings API
export const settingsApi = {
  async getSettings() {
    await delay(500);
    return {
      theme: 'dark',
      currency: '₹',
      tableRate: 200,
      ps5Rate: 300,
    };
  },

  async updateSettings(settings) {
    await delay(500);
    return { success: true };
  },
};

// Analytics API
export const analyticsApi = {
  async getDashboardStats() {
    await delay(500);
    return {
      totalRevenue: 25000,
      activeMembers: 256,
      premiumMembers: 45,
      recentVisits: 12,
      weeklyRevenue: [12000, 19000, 15000, 17000, 22000, 25000, 20000],
    };
  },
}; 