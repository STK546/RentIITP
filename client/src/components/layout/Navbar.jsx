import { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { logout } from '../../features/auth/authSlice';
import { useTheme } from '../../hooks/useTheme';
import notificationsApi from '../../services/api/notifications';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate();
  console.log(user)

  // console.log(user);
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await notificationsApi.getNotifications();
      if (response.notifications) {
        setNotifications(response.notifications);
      }
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log('fetching notifications');
      fetchNotifications();
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [fetchNotifications, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());

    navigate('/');


  };

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">
                RentIITP
              </span>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden sm:flex sm:items-center sm:justify-center sm:flex-1">
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`${
                  location.pathname === '/' 
                    ? 'text-white font-bold'
                    : 'text-gray-300 font-medium'
                } hover:text-white px-3 py-2 text-sm transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className={`${
                  location.pathname === '/browse' 
                    ? 'text-white font-bold'
                    : 'text-gray-300 font-medium'
                } hover:text-white px-3 py-2 text-sm transition-colors duration-200`}
              >
                Browse
              </Link>
              {user && (
                <>
                  <Link
                    to="/add-item"
                    className={`${
                      location.pathname === '/add-item' 
                        ? 'text-white font-bold'
                        : 'text-gray-300 font-medium'
                    } hover:text-white px-3 py-2 text-sm transition-colors duration-200`}
                  >
                    List Item
                  </Link>
                  <Link
                    to="/my-rentals"
                    className={`${
                      location.pathname === '/my-rentals' 
                        ? 'text-white font-bold'
                        : 'text-gray-300 font-medium'
                    } hover:text-white px-3 py-2 text-sm transition-colors duration-200`}
                  >
                    My Rentals
                  </Link>
                  <Link
                    to="/wishlist"
                    className={`${
                      location.pathname === '/wishlist' 
                        ? 'text-white font-bold'
                        : 'text-gray-300 font-medium'
                    } hover:text-white px-3 py-2 text-sm transition-colors duration-200`}
                  >
                    Wishlist
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowPopup(!showPopup)}
                    className="relative p-1 text-gray-300 hover:text-white focus:outline-none"
                  >
                    <BellIcon className="h-6 w-6" />
                  </button>
                  {showPopup && (
                    <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg overflow-hidden z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="p-4">
                        <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Notifications
                        </h3>
                        {loading ? (
                          <div className="text-center py-4">
                            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? 'border-white' : 'border-gray-900'} mx-auto`}></div>
                          </div>
                        ) : error ? (
                          <div className="text-red-500 text-center py-4">{error}</div>
                        ) : notifications.length === 0 ? (
                          <div className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No notifications
                          </div>
                        ) : (
                          <div className="max-h-96 overflow-y-auto">
                            {notifications.slice(0, 5).map((notification) => (
                              <div
                                key={notification.notification_id}
                                className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${
                                  !notification.is_read ? (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : ''
                                }`}
                              >
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                  {notification.message}
                                </p>
                                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {new Date(notification.created_timestamp).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 text-center">
                          <Link
                            to="/notifications"
                            className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                          >
                            View all notifications
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative z-50">
                  <Menu.Button className="flex items-center space-x-2 text-sm focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${
                              active ? 'bg-gray-600' : ''
                            } block px-4 py-2 text-sm text-gray-300 hover:text-white`}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/my-listings"
                            className={`${
                              active ? 'bg-gray-600' : ''
                            } block px-4 py-2 text-sm text-gray-300 hover:text-white`}
                          >
                            My-Listings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-gray-600' : ''
                            } block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white`}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 