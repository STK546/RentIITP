import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const notificationsApi = {
  getNotifications: async (token) => {
    const response = await axios.get(`${API_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  markAsRead: async (notificationId, token) => {
    const response = await axios.put(
      `${API_URL}/notifications/${notificationId}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  markAllAsRead: async (token) => {
    const response = await axios.put(
      `${API_URL}/notifications/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
};

export default notificationsApi;