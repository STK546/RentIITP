import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const categoriesApi = {
  getAllCategories: async () => {
    const response = await axios.get(`${API_URL}/categories`, {
      withCredentials: true
    });
    return response.data;
  },

  getCategoryById: async (categoryId) => {
    const response = await axios.get(`${API_URL}/categories/${categoryId}`, {
      withCredentials: true
    });
    return response.data;
  },

  createCategory: async (categoryData, token) => {
    const response = await axios.post(
      `${API_URL}/categories`,
      categoryData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  updateCategory: async (categoryId, categoryData, token) => {
    const response = await axios.put(
      `${API_URL}/categories/${categoryId}`,
      categoryData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  deleteCategory: async (categoryId, token) => {
    await axios.delete(
      `${API_URL}/categories/${categoryId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
};

export default categoriesApi; 