import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;

const rentalsApi = {
  createRentalRequest: async (rentalData) => {
    const response = await axios.post(
      `${API_URL}/rentals`,
      rentalData,
      {
        withCredentials: true
      }
    );
    return response.data;
  },

  changeRentalStatus: async (rentalId, status) => {
    const response = await axios.put(
      `${API_URL}/rentals/${rentalId}/status`,
      { status },
      {
        withCredentials: true
      }
    );
    return response.data;
  },

  fetchUserRentals: async (role) => {
    const response = await axios.get(`${API_URL}/rentals`, {
      withCredentials: true,
      params: {
        role: role
      }
    });
    return response.data;
  }
};

export default rentalsApi; 