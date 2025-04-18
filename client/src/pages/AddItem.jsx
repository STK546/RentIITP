import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/items', formData, {
        withCredentials: true
      });

      toast.success('Item listed successfully!');
      navigate(`/items/${response.data.itemId}`);
    } catch (error) {
      console.error('Error listing item:', error);
      toast.error(error.response?.data?.message || 'Failed to list item');
    } finally {
      setLoading(false);
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
              <div>
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
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? 'Listing...' : 'List Item'}
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