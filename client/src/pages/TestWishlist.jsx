import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Footer from '../components/layout/Footer';
import { useTheme } from '../hooks/useTheme';

const Wishlist = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const authState = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const [itemImages, setItemImages] = useState({});
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setError('Please login to view wishlist');
        setLoading(false);
        return;
      }

      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        if (response.data && response.data.wishlist) {
          setData(response.data);
          // Fetch images for all wishlist items
          const imagesMap = {};
          for (const item of response.data.wishlist) {
            try {
              const imageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/items/${item.item_id}/images`);
              if (imageResponse.data?.images) {
                const primaryImage = imageResponse.data.images.find(img => img.is_primary === 1) || imageResponse.data.images[0];
                imagesMap[item.item_id] = primaryImage?.image_url;
              }
            } catch (err) {
              console.error(`Error fetching images for item ${item.item_id}:`, err);
            }
          }
          setItemImages(imagesMap);
        } else {
          setError('Invalid response format from server');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token, authState]);

  const handleRemoveFromWishlist = async (itemId) => {
    if (!token) {
      toast.error('Please login to modify wishlist');
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/wishlist/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      setData(prevData => ({
        ...prevData,
        wishlist: prevData.wishlist.filter(item => item.item_id !== itemId)
      }));
      
      toast.success('Item removed from wishlist');
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      toast.error(err.response?.data?.message || 'Failed to remove item from wishlist');
    } finally {
      setItemToDelete(null);
    }
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
  };

  if (loading) {
    return (
      <>
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center py-12">
              <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-white' : 'border-gray-900'}`}></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className={`rounded-lg shadow-sm p-6 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Access Required</h2>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Please log in to view your wishlist.</p>
              <Link
                to="/login"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!data?.wishlist?.length) {
    return (
      <>
        <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className={`rounded-lg shadow-sm p-6 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Wishlist is Empty</h2>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Browse items to add them to your wishlist</p>
              <Link
                to="/browse"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
              >
                Browse Items
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Confirmation Modal */}
          {itemToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Remove from Wishlist</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Are you sure you want to remove "{itemToDelete.name}" from your wishlist?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setItemToDelete(null)}
                    className={`px-4 py-2 font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(itemToDelete.item_id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Wishlist</h1>
              <Link
                to="/browse"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700`}
              >
                Browse More Items
              </Link>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{data.wishlist.length} items in your wishlist</p>
          </div>
          
          <div className="space-y-4">
            {data.wishlist.map((item) => (
              <div key={item.item_id} className={`rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex">
                  <div className={`flex-shrink-0 w-48 h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {itemImages[item.item_id] && (
                      <img
                        src={itemImages[item.item_id]}
                        alt={item.name}
                        className="object-contain w-full h-full p-2"
                      />
                    )}
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className={`text-lg font-medium truncate mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                        <p className={`text-sm line-clamp-2 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <button
                          onClick={() => confirmDelete(item)}
                          className={`transition-colors p-1 -mr-1 -mt-1 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                          item.availability_status === 'available' 
                            ? isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                            : isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.availability_status.charAt(0).toUpperCase() + item.availability_status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="space-y-3">
                        <div className="flex items-baseline">
                          <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.rental_price}</span>
                          <span className={`text-sm ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/ {item.rental_unit}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{item.location_description}</span>
                          </div>
                          <Link
                            to={`/items/${item.item_id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist; 