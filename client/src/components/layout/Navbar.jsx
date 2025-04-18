import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { unreadCount = 0 } = useSelector((state) => state.notifications) || {};

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">RentIITP</span>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden sm:flex sm:items-center sm:justify-center sm:flex-1">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Browse
              </Link>
              {user && (
                <>
                  <Link
                    to="/add-item"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    List Item
                  </Link>
                  <Link
                    to="/my-rentals"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    My Rentals
                  </Link>
                  <Link
                    to="/wishlist"
                    className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    Wishlist
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="text-gray-400 hover:text-gray-500 relative p-1 rounded-full"
                >
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                  )}
                </Link>

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 text-sm focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.name?.charAt(0)}
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
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/owner-dashboard"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block w-full text-left px-4 py-2 text-sm text-gray-700`}
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
              <>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 