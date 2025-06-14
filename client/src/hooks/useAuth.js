import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

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
      console.log("hello")
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
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
