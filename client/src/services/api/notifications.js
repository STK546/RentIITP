import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;

const notificationsApi = {
  getNotifications: async () => {
    const response = await axios.get(`${API_URL}/notifications`, {
      withCredentials: true
    });
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await axios.put(
      `${API_URL}/notifications/${notificationId}/read`,
      {},
      {
        withCredentials: true
      }
    );
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axios.put(
      `${API_URL}/notifications/read-all`,
      {},
      {
        withCredentials: true
      }
    );
    return response.data;
  }
};

export default notificationsApi;