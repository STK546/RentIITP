import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;;

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token'); // Remove JSON.parse since we're storing as string

const initialState = {
  user: user || null,
  isLoading: false,
  error: null,
  token: token || null
};

// Helper function to set cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Helper function to get cookie
const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Helper function to delete cookie
const deleteCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true
      });
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        withCredentials: true
      });
      
      // After successful registration, fetch the complete user profile
      const profileResponse = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true
      });
      
      // Store complete user data in localStorage
      localStorage.setItem('user', JSON.stringify(profileResponse.data));
      localStorage.setItem('token', response?.data?.accessToken); // Store token directly without JSON.stringify

      return profileResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true
      });
      
      // After successful login, fetch the complete user profile
      const profileResponse = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true
      });
      
      // Store complete user data in localStorage
      localStorage.setItem('user', JSON.stringify(profileResponse.data));
      localStorage.setItem('token', response?.data?.accessToken); // Store token directly without JSON.stringify
      return profileResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        withCredentials: true
      });
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');  
      deleteCookie('token');
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, profileData, {
        withCredentials: true
      });
      
      // After successful update, fetch the complete user profile
      const profileResponse = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true
      });
      
      // Update localStorage with complete user data
      localStorage.setItem('user', JSON.stringify(profileResponse.data));
      return profileResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;  
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearError, logout } = authSlice.actions;

export default authSlice.reducer; 