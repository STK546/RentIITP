import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    description: '',
    rentalPrice: '',
    rentalUnit: 'day',
    itemCondition: 'good',
    locationDescription: '',
    maxRentalDuration: '',
    primaryImageUrl: ''
  });
  
  const [image, setImage] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewImage(null);
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
      if (!image) {
        throw new Error('Please upload an image for your item');
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(image);

      // Create the request data object
      const requestData = {
        categoryId: formData.categoryId,
        name: formData.name,
        description: formData.description,
        rentalPrice: formData.rentalPrice,
        rentalUnit: formData.rentalUnit,
        itemCondition: formData.itemCondition,
        locationDescription: formData.locationDescription,
        maxRentalDuration: formData.maxRentalDuration,
        primaryImageUrl: imageUrl
      };

      // Make the API request with credentials
      const response = await axios.post(
        'http://localhost:3000/api/items', 
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              List an Item for Rent
            </h3>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="1">Books</option>
                  <option value="2">Electronics</option>
                  <option value="3">Sports Equipment</option>
                  <option value="4">Clothing</option>
                  <option value="5">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              {/* Rental Price */}
              <div>
                <label htmlFor="rentalPrice" className="block text-sm font-medium text-gray-700">
                  Rental Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="rentalPrice"
                    id="rentalPrice"
                    required
                    min="0"
                    step="0.01"
                    value={formData.rentalPrice}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 pr-12 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      name="rentalUnit"
                      value={formData.rentalUnit}
                      onChange={handleChange}
                      className="h-full rounded-r-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="hour">per hour</option>
                      <option value="day">per day</option>
                      <option value="week">per week</option>
                      <option value="month">per month</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Item Condition */}
              <div>
                <label htmlFor="itemCondition" className="block text-sm font-medium text-gray-700">
                  Item Condition
                </label>
                <select
                  name="itemCondition"
                  id="itemCondition"
                  required
                  value={formData.itemCondition}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="new">New</option>
                  <option value="like new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              {/* Location Description */}
              <div>
                <label htmlFor="locationDescription" className="block text-sm font-medium text-gray-700">
                  Location Description
                </label>
                <input
                  type="text"
                  name="locationDescription"
                  id="locationDescription"
                  required
                  value={formData.locationDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              {/* Max Rental Duration */}
              <div>
                <label htmlFor="maxRentalDuration" className="block text-sm font-medium text-gray-700">
                  Maximum Rental Duration (days)
                </label>
                <input
                  type="number"
                  name="maxRentalDuration"
                  id="maxRentalDuration"
                  min="1"
                  value={formData.maxRentalDuration}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              {/* Primary Image URL */}
              {/* <div>
                <label htmlFor="primaryImageUrl" className="block text-sm font-medium text-gray-700">
                  Primary Image URL
                </label>
                <input
                  type="url"
                  name="primaryImageUrl"
                  id="primaryImageUrl"
                  value={formData.primaryImageUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div> */}

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                  <div className="space-y-1 text-center">
                    {!previewImage && (
                      <>
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-500">
                          <label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-gray-600 hover:text-gray-800 focus-within:outline-none">
                            <span>Upload an image</span>
                            <input
                              id="image"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}

                    {/* Single Image Preview */}
                    {previewImage && (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={uploading}
                  className={`px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? 'Listing...' : 'List Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem; 