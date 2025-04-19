import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme || { isDarkMode: false });

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  // Common class combinations for dark mode
  const getThemeClasses = {
    // Backgrounds
    background: isDarkMode ? 'bg-gray-900' : 'bg-white',
    backgroundSecondary: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
    backgroundHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    
    // Text
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-500',
    textHover: isDarkMode ? 'hover:text-white' : 'hover:text-gray-900',

    // Borders
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    borderSecondary: isDarkMode ? 'border-gray-600' : 'border-gray-300',

    // Cards
    card: `${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-sm rounded-lg`,
    
    // Inputs
    input: `${isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
    } rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`,

    // Buttons
    buttonPrimary: 'bg-primary-600 hover:bg-primary-700 text-white',
    buttonSecondary: `${isDarkMode 
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
    }`,
  };

  return {
    isDarkMode,
    toggleDarkMode,
    getThemeClasses,
  };
}; 