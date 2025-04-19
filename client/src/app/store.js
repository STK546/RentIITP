import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import itemsReducer from '../features/items/itemsSlice';
import rentalsReducer from '../features/rentals/rentalsSlice';
import themeReducer from '../features/theme/themeSlice';

// Load initial theme state from localStorage
const preloadedState = {
  theme: {
    isDarkMode: localStorage.getItem('darkMode') === 'true'
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    categories: categoriesReducer,
    items: itemsReducer,
    rentals: rentalsReducer,
    theme: themeReducer
  },
  preloadedState,
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