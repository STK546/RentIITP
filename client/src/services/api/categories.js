import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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

  createCategory: async (categoryData) => {
    const response = await axios.post(
      `${API_URL}/categories`,
      categoryData,
      {
        withCredentials: true
      }
    );
    return response.data;
  },

  updateCategory: async (categoryId, categoryData) => {
    const response = await axios.put(
      `${API_URL}/categories/${categoryId}`,
      categoryData,
      {
        withCredentials: true
      }
    );
    return response.data;
  },

  deleteCategory: async (categoryId) => {
    await axios.delete(
      `${API_URL}/categories/${categoryId}`,
      {
        withCredentials: true
      }
    );
  }
};

export default categoriesApi; 