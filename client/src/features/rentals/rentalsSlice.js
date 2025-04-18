import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rentalsApi from '../../services/api/rentals';

// Async thunks
export const createRentalRequest = createAsyncThunk(
  'rentals/create',
  async ({ rentalData, token }, { rejectWithValue }) => {
    try {
      return await rentalsApi.createRentalRequest(rentalData, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create rental request');
    }
  }
);

export const changeRentalStatus = createAsyncThunk(
  'rentals/changeStatus',
  async ({ rentalId, status, token }, { rejectWithValue }) => {
    try {
      return await rentalsApi.changeRentalStatus(rentalId, status, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change rental status');
    }
  }
);

export const fetchUserRentals = createAsyncThunk(
  'rentals/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      return await rentalsApi.fetchUserRentals(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch rentals');
    }
  }
);

const initialState = {
  rentals: [],
  currentRental: null,
  loading: false,
  error: null
};

const rentalsSlice = createSlice({
  name: 'rentals',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRental: (state) => {
      state.currentRental = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create rental request
      .addCase(createRentalRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRentalRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals.push(action.payload);
      })
      .addCase(createRentalRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change rental status
      .addCase(changeRentalStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeRentalStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rentals.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.rentals[index] = action.payload;
        }
        if (state.currentRental?.id === action.payload.id) {
          state.currentRental = action.payload;
        }
      })
      .addCase(changeRentalStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user rentals
      .addCase(fetchUserRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = action.payload;
      })
      .addCase(fetchUserRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentRental } = rentalsSlice.actions;
export default rentalsSlice.reducer; 