import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    drinks: [
      {
        id: 1,
        name: 'Coca Cola',
        category: 'drinks',
        price: 40,
        stock: 100,
        minStock: 20,
        unit: 'bottles',
        supplier: 'Beverage Distributor',
        lastRestocked: new Date().toISOString(),
        reorderQuantity: 50
      },
      {
        id: 2,
        name: 'Pepsi',
        category: 'drinks',
        price: 40,
        stock: 85,
        minStock: 20,
        unit: 'bottles',
        supplier: 'Beverage Distributor',
        lastRestocked: new Date().toISOString(),
        reorderQuantity: 50
      }
    ],
    cigarettes: [
      {
        id: 101,
        name: 'Marlboro',
        category: 'cigarettes',
        price: 350,
        stock: 30,
        minStock: 10,
        unit: 'packs',
        supplier: 'Tobacco Supplier',
        lastRestocked: new Date().toISOString(),
        reorderQuantity: 20
      },
      {
        id: 102,
        name: 'Gold Flake',
        category: 'cigarettes',
        price: 150,
        stock: 45,
        minStock: 15,
        unit: 'packs',
        supplier: 'Tobacco Supplier',
        lastRestocked: new Date().toISOString(),
        reorderQuantity: 30
      }
    ]
  },
  alerts: [],
  reorderHistory: [],
  suppliers: [
    { id: 1, name: 'Beverage Distributor', contact: '+91-9876543210', email: 'beverages@supplier.com' },
    { id: 2, name: 'Tobacco Supplier', contact: '+91-9876543211', email: 'tobacco@supplier.com' }
  ]
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    updateStock: (state, action) => {
      const { category, itemId, quantity, type } = action.payload;
      const item = state.items[category].find(i => i.id === itemId);
      
      if (item) {
        // Update stock
        item.stock = type === 'add' 
          ? item.stock + quantity 
          : Math.max(0, item.stock - quantity);

        // Check for low stock alert
        if (item.stock <= item.minStock) {
          const alertExists = state.alerts.some(
            alert => alert.itemId === itemId && alert.type === 'low_stock'
          );

          if (!alertExists) {
            state.alerts.push({
              id: Date.now(),
              itemId,
              category,
              type: 'low_stock',
              message: `Low stock alert: ${item.name} (${item.stock} ${item.unit} remaining)`,
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    },

    addReorderEntry: (state, action) => {
      const { category, itemId, quantity, supplier } = action.payload;
      const item = state.items[category].find(i => i.id === itemId);
      
      if (item) {
        const reorderEntry = {
          id: Date.now(),
          itemId,
          category,
          itemName: item.name,
          quantity,
          supplier,
          status: 'pending',
          orderDate: new Date().toISOString(),
          deliveryDate: null
        };

        state.reorderHistory.push(reorderEntry);
      }
    },

    updateReorderStatus: (state, action) => {
      const { orderId, status, deliveryDate } = action.payload;
      const order = state.reorderHistory.find(o => o.id === orderId);
      
      if (order) {
        order.status = status;
        if (status === 'delivered' && deliveryDate) {
          order.deliveryDate = deliveryDate;
          
          // Update stock and last restocked date
          const item = state.items[order.category].find(i => i.id === order.itemId);
          if (item) {
            item.stock += order.quantity;
            item.lastRestocked = deliveryDate;
            
            // Remove low stock alert if exists
            state.alerts = state.alerts.filter(
              alert => !(alert.itemId === order.itemId && alert.type === 'low_stock')
            );
          }
        }
      }
    },

    dismissAlert: (state, action) => {
      const { alertId } = action.payload;
      state.alerts = state.alerts.filter(alert => alert.id !== alertId);
    },

    addSupplier: (state, action) => {
      const supplier = {
        id: Date.now(),
        ...action.payload
      };
      state.suppliers.push(supplier);
    },

    updateSupplier: (state, action) => {
      const { id, ...updates } = action.payload;
      const supplier = state.suppliers.find(s => s.id === id);
      if (supplier) {
        Object.assign(supplier, updates);
      }
    }
  }
});

export const {
  updateStock,
  addReorderEntry,
  updateReorderStatus,
  dismissAlert,
  addSupplier,
  updateSupplier
} = inventorySlice.actions;

export default inventorySlice.reducer; 