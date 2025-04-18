import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const authState = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const [itemImages, setItemImages] = useState({});

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setError('Please login to view wishlist');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/wishlist', {
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
              const imageResponse = await axios.get(`http://localhost:3000/api/items/${item.item_id}/images`);
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
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
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
      await axios.delete(`http://localhost:3000/api/wishlist/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      // Update local state
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
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login to View Wishlist</h2>
          <Link
            to="/login"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (!data?.wishlist?.length) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-6">Browse items to add them to your wishlist</p>
          <Link
            to="/browse"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Browse Items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Remove from Wishlist</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove "{itemToDelete.name}" from your wishlist?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(itemToDelete.item_id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-gray-600">{data.wishlist.length} items</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.wishlist.map((item) => (
          <div key={item.item_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                <button
                  onClick={() => confirmDelete(item)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-gray-900">₹{item.rental_price}</span>
                  <span className="text-sm text-gray-500 ml-1">/ {item.rental_unit}</span>
                </div>
                
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.availability_status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.availability_status}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{item.location_description}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <Link
                  to={`/items/${item.item_id}`}
                  className="flex-1 bg-blue-500 text-white text-center px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 