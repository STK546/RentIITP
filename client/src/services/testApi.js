import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const testItemsApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`, {
      withCredentials: true
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error testing items API:', error);
    throw error;
  }
}; 