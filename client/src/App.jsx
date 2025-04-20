import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { initializeTheme } from './features/theme/themeSlice';
import { store } from './app/store';
import MyListings from './pages/MyListings';

function AppContent() {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/list-item" element={<ListItem />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-rentals" element={<MyRentals />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/edit-item/:id" element={<EditItem />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: isDarkMode ? '#1F2937' : '#FFFFFF',
            color: isDarkMode ? '#FFFFFF' : '#1F2937',
            border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
          },
          success: {
            style: {
              background: isDarkMode ? '#065F46' : '#ECFDF5',
              color: isDarkMode ? '#FFFFFF' : '#065F46',
              border: isDarkMode ? '1px solid #047857' : '1px solid #A7F3D0',
            },
          },
          error: {
            style: {
              background: isDarkMode ? '#991B1B' : '#FEF2F2',
              color: isDarkMode ? '#FFFFFF' : '#991B1B',
              border: isDarkMode ? '1px solid #B91C1C' : '1px solid #FECACA',
            },
          },
        }}
      />
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