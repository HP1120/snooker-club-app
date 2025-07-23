import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import orderReducer from './slices/orderSlice';
import inventoryReducer from './slices/inventorySlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    order: orderReducer,
    inventory: inventoryReducer,
  },
}); 