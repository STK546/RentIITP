import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Correct import for default export
import notificationsApi from '../services/api/notifications'; // Import notifications API

const Notifications = () => {
  const { user } = useAuth(); // Get user from useAuth
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
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`${
                activeTab === 'all'
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              } text-sm font-medium`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`${
                activeTab === 'unread'
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              } text-sm font-medium`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Notification Popup */}
        <div className="relative">
          <button onClick={() => setShowPopup(!showPopup)} className="text-sm font-medium text-primary-600">
            Show Notifications
          </button>
          {showPopup && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
              <ul className="divide-y divide-gray-200">
                {filteredNotifications.slice(0, 5).map((notification) => (
                  <li key={notification.id} className="px-4 py-2">
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.created_timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="text-center py-2">
                <Link to="/all-notifications" className="text-primary-600 hover:underline">
                  View All
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="mt-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'all'
                  ? "You don't have any notifications yet."
                  : "You don't have any unread notifications."}
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <li key={notification.id}>
                    <Link
                      to={`/items/${notification.itemId}`}
                      className={`block hover:bg-gray-50 ${
                        !notification.read ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary-600 truncate">
                            {notification.message}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-primary-600" />
                            )}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
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