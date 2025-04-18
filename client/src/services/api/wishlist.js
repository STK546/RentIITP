import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const wishlistApi = {
  addToWishlist: async (itemId, token) => {
    const response = await axios.post(
      `${API_URL}/wishlist`,
      { itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  removeFromWishlist: async (itemId, token) => {
    const response = await axios.delete(
      `${API_URL}/wishlist/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  getUserWishlist: async (token) => {
    const response = await axios.get(`${API_URL}/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export default wishlistApi; 