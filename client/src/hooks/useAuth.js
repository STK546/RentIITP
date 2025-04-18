import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logoutUser, register } from '../features/auth/authSlice';
import axios from 'axios';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  console.log(user)

  const handleLogin = async (username, password) => {
    try {
      const result = await dispatch(login({ username, password })).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.post('http://localhost:3000/api/auth/logout', {}, {
        withCredentials: true
      });
      
      // Dispatch the logout action to clear Redux state
      dispatch(logoutUser());
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, we should still clear the local state
      dispatch(logoutUser());
      navigate('/');
    }
  };

  const handleRegister = async (userData) => {
    try {
      const result = await dispatch(register(userData)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading: isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    isAuthenticated: !!user
  };
};

export default useAuth; 