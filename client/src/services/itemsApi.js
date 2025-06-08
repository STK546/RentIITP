import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const itemsApi = {
  // Get all items
  getAllItems: async () => {
    try {
      console.log('Fetching all items from:', `${API_URL}/items`);
      const response = await axios.get(`${API_URL}/items`, {
        withCredentials: true
      });
      // console.log('Items fetched successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching items:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get item by ID
  getItem: async (itemId) => {
    try {
      console.log(`Fetching item details for ID: ${itemId}`);
      console.log('API URL:', `${API_URL}/items/${itemId}`);
      const response = await axios.get(`${API_URL}/items/${itemId}`, {
        withCredentials: true
      });
      console.log('Item details fetched successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching item details:', {
        itemId,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
      throw error;
    }
  },

  // Create new item
  createItem: async (itemData) => {
    try {
      const response = await axios.post(`${API_URL}/items`, itemData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update item
  updateItem: async (itemId, itemData) => {
    try {
      const response = await axios.put(`${API_URL}/items/${itemId}`, itemData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  // Delete item
  deleteItem: async (itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/items/${itemId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },

  // Add image to item
  addItemImage: async (itemId, imageData) => {
    try {
      const response = await axios.post(`${API_URL}/items/${itemId}/images`, imageData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error adding item image:', error);
      throw error;
    }
  },

  // Update item status
  updateItemStatus: async (itemId, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/items/${itemId}/status`, 
        { newStatus },
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating item status:', error);
      throw error;
    }
  }
};

export default itemsApi; 