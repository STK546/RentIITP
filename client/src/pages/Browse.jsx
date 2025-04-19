import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, getAllItems } from '../features/items/itemsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import axios from 'axios';

const Browse = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const { categories } = useSelector((state) => state.categories);
  const [itemImages, setItemImages] = useState({});
  
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    availability: 'available'
  });

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchItemImages = async () => {
      const imagesMap = {};
      for (const item of items) {
        try {
          const response = await axios.get(`http://localhost:3000/api/items/${item.item_id}/images`);
          if (response.data?.images) {
            const primaryImage = response.data.images.find(img => img.is_primary === 1) || response.data.images[0];
            imagesMap[item.item_id] = primaryImage?.image_url;
          }
        } catch (err) {
          console.error(`Error fetching images for item ${item.item_id}:`, err);
        }
      }
      setItemImages(imagesMap);
    };

    if (items.length > 0) {
      fetchItemImages();
    }
  }, [items]);

  const filteredItems = items?.filter(item => {
    const matchesSearch = !filters.search || 
      item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesMinPrice = !filters.minPrice || parseFloat(item.rental_price) >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || parseFloat(item.rental_price) <= parseFloat(filters.maxPrice);
    const matchesCondition = !filters.condition || item.item_condition === filters.condition;
    const matchesAvailability = !filters.availability || item.availability_status === filters.availability;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && 
           matchesCondition && matchesAvailability;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      availability: 'available'
    });
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Items</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search items..."
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">All Conditions</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min price"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max price"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <select
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="">All</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.condition && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Condition: {filters.condition}
              <button
                onClick={() => setFilters(prev => ({ ...prev, condition: '' }))}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.minPrice && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Min Price: ₹{filters.minPrice}
              <button
                onClick={() => setFilters(prev => ({ ...prev, minPrice: '' }))}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.maxPrice && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Max Price: ₹{filters.maxPrice}
              <button
                onClick={() => setFilters(prev => ({ ...prev, maxPrice: '' }))}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.availability && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Availability: {filters.availability}
              <button
                onClick={() => setFilters(prev => ({ ...prev, availability: '' }))}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems?.map(item => (
          <Link 
            to={`/items/${item.item_id}`} 
            key={item.item_id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {itemImages[item.item_id] ? (
                  <img
                    src={itemImages[item.item_id]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/20 to-transparent">
                <div className="text-xs text-white font-medium">Click to view details</div>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.availability_status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.availability_status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {item.name}
                </h3>
                <span className="text-lg font-bold text-blue-600 whitespace-nowrap ml-2">
                  ₹{item.rental_price}
                  <span className="text-xs font-normal text-gray-500">/{item.rental_unit}</span>
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.item_condition}
                </span>
                <span className="text-gray-500 capitalize">{item.category_name}</span>
              </div>
              
              {item.location_description && (
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="truncate">{item.location_description}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    {/* {item.owner_username.charAt(0).toUpperCase()} */}
                  </div>
                  {/* <span className="ml-2 text-sm text-gray-600">By {item.owner_username}</span> */}
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredItems?.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Browse; 