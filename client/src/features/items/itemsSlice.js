import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import itemsApi from '../../services/itemsApi';

const API_URL = process.env.REACT_APP_API_URL;
console.log("ENV API:", process.env);

console.log('API URL:', API_URL);

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Dispatching fetchItems action');
      const response = await axios.get(`${API_URL}/items/all`, {
        withCredentials: true
      });
      console.log('Items fetched in Redux:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchItems thunk:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Error fetching items');
    }
  }
);

export const getItem = createAsyncThunk(
  'items/getItem',
  async (itemId, { rejectWithValue }) => {
    try {
      console.log('Dispatching getItem action for ID:', itemId);
      const response = await itemsApi.getItem(itemId);
      // console.log('Item details fetched in Redux:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getItem thunk:', {
        itemId,
        error: error.response?.data || error.message
      });
      return rejectWithValue(error.response?.data?.message || 'Error fetching item details');
    }
  }
);

const initialState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
  success: false
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        console.log('fetchItems pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        console.log('fetchItems fulfilled:', action.payload);
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        console.error('fetchItems rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // Get Item
      .addCase(getItem.pending, (state) => {
        console.log('getItem pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        console.log('getItem fulfilled:', action.payload);
        state.loading = false;
        state.selectedItem = action.payload;
        state.error = null;
      })
      .addCase(getItem.rejected, (state, action) => {
        console.error('getItem rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.selectedItem = null;
      });
  }
});

export default itemsSlice.reducer; 