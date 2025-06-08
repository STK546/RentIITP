import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

const CATEGORIES = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Books' },
  { id: 3, name: 'Cycles' },
  { id: 4, name: 'Sports Equipment' },
  { id: 5, name: 'Stationery' },
  { id: 6, name: 'Room Essentials' },
  { id: 7, name: 'Clothing & Accessories' },
  { id: 8, name: 'Musical Instruments' },
  { id: 9, name: 'Tools & Hardware' },
  { id: 10, name: 'Gaming' },
  { id: 11, name: 'Furniture' },
  { id: 12, name: 'Kitchen Appliances' },
  { id: 13, name: 'Outdoor Gear' },
  { id: 14, name: 'Photography' },
  { id: 15, name: 'Vehicles' },
  { id: 16, name: 'Health & Fitness' },
  { id: 17, name: 'Toys & Games' },
  { id: 18, name: 'Art Supplies' },
  { id: 19, name: 'Electronics Accessories' },
  { id: 20, name: 'Books - Fiction' }
];

const AddItem = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '1', // Default to Electronics
    condition: 'New',
    rentalPrice: '',
    rentalPeriod: 'Per Hour',
    image: null,
    locationDescription: '',
    maxRentalDuration: ''
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Cloudinary configuration
  const CLOUDINARY_UPLOAD_PRESET = 'my_unsigned_preset';
  const CLOUDINARY_CLOUD_NAME = 'dty5nvjnc';
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setPreviewImage(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      if (!formData.image) {
        throw new Error('Please upload an image for your item');
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(formData.image);

      // Create the request data object
      const requestData = {
        name: formData.title,
        description: formData.description,
        categoryId: getCategoryId(formData.category),
        itemCondition: formData.condition,
        rentalPrice: parseFloat(formData.rentalPrice),
        rentalUnit: getRentalUnit(formData.rentalPeriod),
        primaryImageUrl: imageUrl,
        locationDescription: formData.locationDescription,
        maxRentalDuration: parseInt(formData.maxRentalDuration)
      };

      // Make the API request with credentials
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/items`, 
        requestData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Item listed successfully!');
      navigate(`/items/${response.data.itemId}`);
    } catch (error) {
      console.error('Error creating item:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create item. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Add New Item</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Fill in the details below to list your item for rent</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Information Box */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Item Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Item Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter item title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe your item"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  >
                    {CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  >
                    <option>New</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Pricing & Terms</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Rental Price</label>
                  <div className="relative">
                    <span className={`absolute left-3 top-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                    <input
                      type="number"
                      name="rentalPrice"
                      placeholder="0.00"
                      value={formData.rentalPrice}
                      onChange={handleChange}
                      className={`w-full pl-7 pr-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Rental Period</label>
                  <select
                    name="rentalPeriod"
                    value={formData.rentalPeriod}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  >
                    <option>Per Hour</option>
                    <option>Per Day</option>
                    <option>Per Week</option>
                    <option>Per Month</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Location</label>
                  <input
                    type="text"
                    name="locationDescription"
                    placeholder="Enter pickup location"
                    value={formData.locationDescription}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Maximum Duration</label>
                  <input
                    type="number"
                    name="maxRentalDuration"
                    placeholder="Enter maximum rental duration"
                    value={formData.maxRentalDuration}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'} rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images Box */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <h2 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Images</h2>
            
            {previewImage ? (
              <div className="mb-4">
                <div className="relative inline-block">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-48 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-6`}
                onDrop={handleImageUpload}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className={`mt-4 flex text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} justify-center`}>
                    <label className={`relative cursor-pointer rounded-md font-medium ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-primary-600 hover:text-primary-500'} focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500`}>
                      <span>Drag and drop image here or click to upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                    PNG or JPG (max. 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={uploading}
              className={`px-4 py-2 ${
                isDarkMode 
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-900 hover:bg-gray-800'
              } text-white text-sm rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {uploading ? 'Saving...' : 'Save Item'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`px-4 py-2 text-sm rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } focus:outline-none`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const getCategoryId = (categoryId) => {
  // Since we're now using the category ID directly from the select,
  // we can just return it as a number
  return parseInt(categoryId);
};

const getRentalUnit = (period) => {
  const unitMap = {
    'Per Hour': 'hour',
    'Per Day': 'day',
    'Per Week': 'week',
    'Per Month': 'month'
  };
  return unitMap[period] || 'day'; // Default to day if period not found
};

export default AddItem; 