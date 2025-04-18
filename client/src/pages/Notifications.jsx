import { useState } from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'unread'

  // This will be replaced with actual data from the backend
  const notifications = {
    all: [
      {
        id: 1,
        type: 'rental_request',
        message: 'John Doe requested to rent "Introduction to Algorithms"',
        timestamp: '2024-04-17T10:30:00Z',
        read: true,
        itemId: 1,
      },
      {
        id: 2,
        type: 'rental_accepted',
        message: 'Your request to rent "Gaming Laptop" has been accepted',
        timestamp: '2024-04-17T09:15:00Z',
        read: false,
        itemId: 2,
      },
      {
        id: 3,
        type: 'rental_reminder',
        message: 'Your rental of "Introduction to Algorithms" ends tomorrow',
        timestamp: '2024-04-16T15:45:00Z',
        read: true,
        itemId: 1,
      },
    ],
  };

  const filteredNotifications = notifications.all.filter(
    notification => activeTab === 'all' || !notification.read
  );

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
                              {new Date(notification.timestamp).toLocaleString()}
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