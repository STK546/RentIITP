import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../features/items/itemsSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const ItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedItem, loading, error } = useSelector((state) => state.items);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getItem(itemId));
    checkWishlistStatus();
  }, [dispatch, itemId]);

  const checkWishlistStatus = async () => {
    if (!token) return;
    
    try {
      const response = await axios.get('http://localhost:3000/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data?.wishlist) {
        const isInWishlist = response.data.wishlist.some(item => item.item_id === parseInt(itemId));
        setIsWishlisted(isInWishlist);
      }
    } catch (err) {
      console.error('Error checking wishlist status:', err);
    }
  };

  const handleWishlistToggle = async () => {
    if (!token) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      if (isWishlisted) {
        await axios.delete(`http://localhost:3000/api/wishlist/${itemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setIsWishlisted(false);
        toast.success('Item removed from wishlist');
      } else {
        await axios.post('http://localhost:3000/api/wishlist', 
          { itemId },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        setIsWishlisted(true);
        toast.success('Item added to wishlist');
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      toast.error(err.response?.data?.message || 'Failed to update wishlist');
    }
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleRent = async () => {
    if (!token) {
      toast.error('Please login to rent items');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    const calculatedDuration = calculateDuration(startDate, endDate);
    
    if (selectedItem.max_rental_duration !== null && calculatedDuration > selectedItem.max_rental_duration) {
      toast.error(`Maximum rental duration is ${selectedItem.max_rental_duration} days`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/rentals', {
        itemId: parseInt(itemId),
        startDate: startDate,
        endDate: endDate,
        rentalDuration: calculatedDuration,
        totalPrice: (selectedItem.rental_price * calculatedDuration).toFixed(2)
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Rental request sent successfully!');
        navigate('/my-rentals');
      } else {
        throw new Error(response.data?.message || 'Failed to request rental');
      }
    } catch (err) {
      console.error('Error requesting rental:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to request rental';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Item not found</p>
        </div>
      </div>
    );
  }

  const totalPrice = (selectedItem.rental_price * rentalDuration).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Image Placeholder */}
          <div className="relative h-96 bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {isWishlisted ? (
                <HeartSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartOutline className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedItem.item_name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {selectedItem.item_condition}
                  </span>
                  <span className="text-gray-500">{selectedItem.category_name}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">₹{selectedItem.rental_price}</div>
                <div className="text-sm text-gray-500">per {selectedItem.rental_unit}</div>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">{selectedItem.description}</p>
            </div>

            <div className="border-t border-b border-gray-100 py-4 mb-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{selectedItem.location_description}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>Owner: {selectedItem.owner_username}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rental Details</h3>
              
              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Rental Duration</span>
                  <span className="text-sm text-gray-600">
                    {startDate && endDate ? `${calculateDuration(startDate, endDate)} days` : 'Select dates'}
                  </span>
                </div>
                
                {selectedItem.max_rental_duration !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Maximum Rental Duration</span>
                    <span className="text-sm text-gray-600">{selectedItem.max_rental_duration} days</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Total Price</span>
                  <span className="text-xl font-bold text-blue-600">
                    ₹{startDate && endDate ? (selectedItem.rental_price * calculateDuration(startDate, endDate)).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleRent}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedItem.availability_status !== 'available' || !startDate || !endDate}
              >
                {selectedItem.availability_status === 'available' ? 'Rent Now' : 'Not Available'}
              </button>
              <button 
                onClick={() => setShowOwnerModal(true)}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Details Modal */}
      {showOwnerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Owner Details</h3>
              <button
                onClick={() => setShowOwnerModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {selectedItem.owner_first_name[0]}{selectedItem.owner_last_name[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {selectedItem.owner_first_name} {selectedItem.owner_last_name}
                  </h4>
                  <p className="text-sm text-gray-500">@{selectedItem.owner_username}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${selectedItem.owner_email}`} className="hover:text-blue-600">
                    {selectedItem.owner_email}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    window.location.href = `mailto:${selectedItem.owner_email}`;
                  }}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails; 