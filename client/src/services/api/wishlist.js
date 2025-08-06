import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;

const wishlistApi = {
  addToWishlist: async (itemId) => {
    const response = await axios.post(
      `${API_URL}/wishlist`,
      { itemId },
      {
        withCredentials: true
      }
    );
    return response.data;
  },

  removeFromWishlist: async (itemId) => {
    const response = await axios.delete(
      `${API_URL}/wishlist/${itemId}`,
      {
        withCredentials: true
      }
    );
    return response.data;
  },

  getUserWishlist: async () => {
    const response = await axios.get(`${API_URL}/wishlist`, {
      withCredentials: true
    });
    return response.data;
  }
};

export default wishlistApi; 