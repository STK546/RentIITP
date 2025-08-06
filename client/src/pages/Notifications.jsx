import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Correct import for default export
import notificationsApi from '../services/api/notifications'; // Import notifications API
import { useTheme } from '../hooks/useTheme';

const Notifications = () => {
  const { user } = useAuth(); // Get user from useAuth
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'unread'
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        setError('Please log in to view notifications.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await notificationsApi.getNotifications(token);
        console.log(response);
        if (response && response.notifications) {
          setNotifications(response.notifications);
        } else {
          setError('Unexpected response structure.');
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Remove user dependency since token is from localStorage

  const filteredNotifications = notifications.filter(
    notification => activeTab === 'all' || !notification.read
  );

  if (loading) {
    return (
      <div className={`min-h-[calc(100vh-4rem)] flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-white' : 'border-gray-900'} mx-auto`}></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-[calc(100vh-4rem)] flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`text-center p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-red-400' : 'bg-white text-red-600'}`}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`${
                activeTab === 'all'
                  ? isDarkMode ? 'text-blue-400' : 'text-primary-600'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              } text-sm font-medium`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`${
                activeTab === 'unread'
                  ? isDarkMode ? 'text-blue-400' : 'text-primary-600'
                  : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              } text-sm font-medium`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Notification Popup */}
        <div className="relative">
          <button 
            onClick={() => setShowPopup(!showPopup)} 
            className={`text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-primary-600 hover:text-primary-700'}`}
          >
            Show Notifications
          </button>
          {showPopup && (
            <div className={`absolute right-0 mt-2 w-64 shadow-lg rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <ul className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredNotifications.slice(0, 5).map((notification) => (
                  <li key={notification.id} className="px-4 py-2">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{notification.message}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(notification.created_timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="text-center py-2">
                <Link to="/all-notifications" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-primary-600 hover:text-primary-700'}`}>
                  View All
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="mt-6">
          {filteredNotifications.length === 0 ? (
            <div className={`text-center py-12 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No notifications</h3>
              <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {activeTab === 'all'
                  ? "You don't have any notifications yet."
                  : "You don't have any unread notifications."}
              </p>
            </div>
          ) : (
            <div className={`shadow overflow-hidden sm:rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <ul className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredNotifications.map((notification) => (
                  <li key={notification.id}>
                    <Link
                      to={`/items/${notification.itemId}`}
                      className={`block ${
                        !notification.read 
                          ? isDarkMode ? 'bg-gray-700' : 'bg-primary-50'
                          : ''
                      } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-blue-400' : 'text-primary-600'}`}>
                            {notification.message}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            {!notification.read && (
                              <span className={`h-2 w-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-primary-600'}`} />
                            )}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {new Date(notification.created_timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 