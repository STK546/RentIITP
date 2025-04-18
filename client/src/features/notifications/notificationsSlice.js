import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationsApi from '../../services/api/notifications';

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      return await notificationsApi.getNotifications(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async ({ notificationId, token }, { rejectWithValue }) => {
    try {
      return await notificationsApi.markAsRead(notificationId, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read');
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (token, { rejectWithValue }) => {
    try {
      return await notificationsApi.markAllAsRead(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.isRead).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.notifications[index] = action.payload;
          state.unreadCount = state.notifications.filter(n => !n.isRead).length;
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark all notifications as read
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = 0;
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = notificationsSlice.actions;
export default notificationsSlice.reducer; 