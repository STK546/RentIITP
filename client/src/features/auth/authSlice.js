import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Initial localStorage data
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

const initialState = {
  user: user || null,
  token: token || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  error: null
};


export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      let token='';
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        withCredentials: true
      });


      token = response?.data?.accessToken;
      console.log(token);

      const profileResponse = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });


      // const profileResponse = await axios.get(`${API_URL}/users/profile`, {
      //   withCredentials: true
      // });
      
      localStorage.setItem('user', JSON.stringify(profileResponse.data));
      localStorage.setItem('token', response?.data?.accessToken);

      return profileResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        withCredentials: true
      });

      const profileResponse = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true
      });

      localStorage.setItem('user', JSON.stringify(profileResponse.data));
      localStorage.setItem('token', response?.data?.accessToken);
      return profileResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// export const logoutUser = createAsyncThunk(
//   'auth/logout',
//   async (_, { dispatch }) => {
//     try {

//       console.log("hello")
//       await axios.post(`${API_URL}/auth/logout`, {}, {
//         withCredentials: true
//       });
//     } finally {
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//       deleteCookie('token');
//       dispatch(logout());
//     }
//   }
// );

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {

      await axios.put(`${API_URL}/users/profile`, profileData, {
        withCredentials: true
      });

      const profileResponse = await axios.get(`${API_URL}/users/profile`, {
        withCredentials: true
      });

      localStorage.setItem('user', JSON.stringify(profileResponse.data));
      return profileResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);

// Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.message = '';
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH PROFILE ---
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // --- REGISTER ---
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
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

      // --- LOGIN ---
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
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

      // // --- LOGOUT ---
      // .addCase(logoutUser.fulfilled, (state) => {
      //   state.user = null;
      //   state.token = null;
      //   state.isLoading = false;
      //   state.isSuccess = false;
      //   state.isError = false;
      //   state.message = '';
      //   state.error = null;
      // })

      // --- UPDATE PROFILE ---
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
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
