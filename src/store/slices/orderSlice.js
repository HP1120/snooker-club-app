import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tableOrders: {},  // Keyed by tableId
  walkInOrders: [], // For walk-in customers
  menu: {
    drinks: [
      { id: 1, name: 'Coca Cola', price: 40, category: 'drinks', inStock: true },
      { id: 2, name: 'Pepsi', price: 40, category: 'drinks', inStock: true },
      // Add more drinks
    ],
    cigarettes: [
      { id: 101, name: 'Marlboro', price: 350, category: 'cigarettes', inStock: true },
      { id: 102, name: 'Gold Flake', price: 150, category: 'cigarettes', inStock: true },
      // Add more cigarettes
    ]
  },
  orderHistory: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addTableOrder: (state, action) => {
      const { tableId, items, timestamp } = action.payload;
      if (!state.tableOrders[tableId]) {
        state.tableOrders[tableId] = [];
      }
      
      const orderTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      const newOrder = {
        id: Date.now().toString(),
        items,
        timestamp,
        total: orderTotal,
        status: 'active'
      };
      
      state.tableOrders[tableId].push(newOrder);
    },
    
    addWalkInOrder: (state, action) => {
      const { items, timestamp } = action.payload;
      const orderTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      const newOrder = {
        id: Date.now().toString(),
        items,
        timestamp,
        total: orderTotal,
        status: 'completed',
        type: 'walk-in'
      };
      
      state.walkInOrders.push(newOrder);
      state.orderHistory.push(newOrder);
    },
    
    updateOrderStatus: (state, action) => {
      const { tableId, orderId, status } = action.payload;
      const order = state.tableOrders[tableId]?.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        if (status === 'completed') {
          state.orderHistory.push({
            ...order,
            tableId,
            type: 'table'
          });
        }
      }
    },
    
    updateInventory: (state, action) => {
      const { itemId, category, inStock } = action.payload;
      const items = state.menu[category];
      const item = items.find(i => i.id === itemId);
      if (item) {
        item.inStock = inStock;
      }
    },
    
    cancelOrder: (state, action) => {
      const { tableId, orderId } = action.payload;
      if (state.tableOrders[tableId]) {
        state.tableOrders[tableId] = state.tableOrders[tableId].filter(
          order => order.id !== orderId
        );
      }
    }
  }
});

export const {
  addTableOrder,
  addWalkInOrder,
  updateOrderStatus,
  updateInventory,
  cancelOrder
} = orderSlice.actions;

export default orderSlice.reducer; 