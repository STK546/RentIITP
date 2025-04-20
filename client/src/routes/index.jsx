import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';

// Pages
import Home from '../pages/Home';
import Browse from '../pages/Browse';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import ItemDetail from '../pages/ItemDetail';
import MyRentals from '../pages/MyRentals';
import Notifications from '../pages/Notifications';
import AddItem from '../pages/AddItem';
import TestApi from '../pages/TestApi';
import ItemDetails from '../pages/ItemDetails';
import Dashboard from '../pages/Dashboard';
import TestWishlist from '../pages/TestWishlist';
import OwnerDashboard from '../pages/OwnerDashboard';
import MyListings from '../pages/MyListings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/items/:itemId" element={<ItemDetails />} />
      <Route path="/test-api" element={<TestApi />} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/my-rentals" element={
        <PrivateRoute>
          <MyRentals />
        </PrivateRoute>
      } />
      <Route path="/my-listings" element={
        <PrivateRoute>
          <MyListings />
        </PrivateRoute>
      } />
      <Route path="/notifications" element={
        <PrivateRoute>
          <Notifications />
        </PrivateRoute>
      } />
      <Route path="/add-item" element={
        <PrivateRoute>
          <AddItem />
        </PrivateRoute>
      } />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/owner-dashboard" element={
        <PrivateRoute>
          <OwnerDashboard />
        </PrivateRoute>
      } />
      <Route path="/wishlist" element={
        <PrivateRoute>
          <TestWishlist />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default AppRoutes; 