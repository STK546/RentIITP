import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import itemsReducer from './features/items/itemsSlice';
import categoriesReducer from './features/categories/categoriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    categories: categoriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/logout'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user.timestamp'],
      },
    }),
});

export default store; 