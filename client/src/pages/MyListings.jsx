import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/layout/Footer';

const MyListings = () => {
  const { isDarkMode, getThemeClasses } = useTheme();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("hello")

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/items/owner`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        console.log(response?.data);

        if (response.status === 200) {
          setItems(response.data);
        }
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to fetch your listings. Please try again later.');
        toast.error('Failed to fetch your listings');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/items/${itemId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        if (response.status === 200) {
          toast.success('Item deleted successfully');
          setItems(items.filter(item => item.item_id !== itemId));
        }
      } catch (err) {
        console.error('Error deleting item:', err);
        toast.error('Failed to delete item');
      }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${getThemeClasses.background} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${getThemeClasses.background} flex items-center justify-center`}>
        <div className={`${getThemeClasses.card} p-6 rounded-lg shadow-sm max-w-md w-full text-center`}>
          <h2 className={`text-xl font-semibold ${getThemeClasses.text} mb-4`}>Error</h2>
          <p className={`${getThemeClasses.secondaryText} mb-4`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen ${getThemeClasses.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-3xl font-bold ${getThemeClasses.text}`}>My Listings</h1>
            <Link
              to="/add-item"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-colors duration-200`}
            >
              List New Item
            </Link>
          </div>

          {items.length === 0 ? (
            <div className={`${getThemeClasses.card} rounded-lg shadow-sm p-6 text-center`}>
              <h3 className={`text-lg font-medium ${getThemeClasses.text} mb-2`}>No Listings Yet</h3>
              <p className={`${getThemeClasses.secondaryText} mb-4`}>You haven't listed any items for rent yet.</p>
              <Link
                to="/list-item"
                className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent'
                    : 'bg-blue-500 hover:bg-blue-600 text-white border-transparent'
                } transition-colors duration-200`}
              >
                List Your First Item
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.item_id} className={`${getThemeClasses.card} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden hover:shadow-md transition-shadow duration-200`}>
                  <div className="flex">
                    {/* <div className={`flex-shrink-0 w-52 h-52 ${getThemeClasses.secondaryBackground}`}>
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="object-contain w-full h-full p-2"
                        />
                      )}
                    </div> */}
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className={`text-lg font-semibold ${getThemeClasses.text}`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${getThemeClasses.secondaryText}`}>
                            Category: {item?.category_id}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          item?.availability_status=='available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {`${item?.availability_status}`}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm font-medium ${getThemeClasses.secondaryText}`}>Price</p>
                          <p className={`text-sm ${getThemeClasses.text}`}>₹{item?.rental_price}/{item?.rental_unit}</p>
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${getThemeClasses.secondaryText}`}>Condition</p>
                          <p className={`text-sm ${getThemeClasses.text}`}>{item?.item_condition}</p>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className={`text-sm ${getThemeClasses.text}`}>
                              {item.location || 'IIT Patna Campus'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end space-x-3">
                        {/* <Link
                          to={`/edit-item/${item.item_id}`}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            isDarkMode
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          Edit
                        </Link> */}
                        <button
                          onClick={() => handleDelete(item.item_id)}
                          className="px-4 py-2 rounded-md text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyListings; 