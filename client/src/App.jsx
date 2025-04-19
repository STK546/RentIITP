import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { initializeTheme } from './features/theme/themeSlice';
import { store } from './app/store';

function AppContent() {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme || { isDarkMode: false });

  // Initialize theme from localStorage on app load
  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  // Apply dark mode class to html element for Tailwind dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      <div className={`flex flex-col min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            className: `${isDarkMode ? '!bg-gray-800 !text-white' : '!bg-white !text-gray-900'}`,
            style: {
              background: isDarkMode ? '#1f2937' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#111827',
              boxShadow: isDarkMode 
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.36)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            success: {
              style: {
                background: isDarkMode ? '#065f46' : '#059669',
                color: '#ffffff',
              },
            },
            error: {
              style: {
                background: isDarkMode ? '#991b1b' : '#dc2626',
                color: '#ffffff',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App; 