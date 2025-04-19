import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: localStorage.getItem('darkMode') === 'true'
  },
  reducers: {
    toggleTheme: (state) => {
      console.log('Toggle theme reducer called');
      console.log('Previous state:', state.isDarkMode);
      state.isDarkMode = !state.isDarkMode;
      console.log('New state:', state.isDarkMode);
      localStorage.setItem('darkMode', state.isDarkMode.toString());
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      localStorage.setItem('darkMode', action.payload.toString());
    },
    initializeTheme: (state) => {
      console.log('Initialize theme reducer called');
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        state.isDarkMode = savedTheme === 'true';
      }
      console.log('Initialized theme state:', state.isDarkMode);
    },
  },
});

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer; 