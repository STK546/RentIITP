import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, getAllItems } from '../features/items/itemsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import { useTheme } from '../hooks/useTheme';
import axios from 'axios';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Footer from '../components/layout/Footer';

const Browse = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const { items, loading, error } = useSelector((state) => state.items);
  const { categories } = useSelector((state) => state.categories);
  const [itemImages, setItemImages] = useState({});
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [ownerNames, setOwnerNames] = useState({});

  
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    availability: ''
  });


  
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  // console.log(items);

  useEffect(() => {
    const fetchItemImages = async () => {
      const imagesMap = {};
      for (const item of items) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/items/${item.item_id}/images`);
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

  
  useEffect(() => {
    const fetchOwnerNames = async () => {
      const uniqueOwnerIds = [...new Set(items.map(item => item.owner_id))];
      const namesMap = { ...ownerNames }; // avoid overwriting if already fetched
    
      await Promise.all(uniqueOwnerIds.map(async (ownerId) => {
        if (!namesMap[ownerId]) {
          try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${ownerId}/name`);
            if (res.data?.name) {
              namesMap[ownerId] = res.data.name;
            }
          } catch (err) {
            console.error(`Failed to fetch name for user ${ownerId}:`, err);
            namesMap[ownerId] = "Anonymous";
          }
        }
      }));
    
      setOwnerNames(namesMap);
    };
  
    if (items.length > 0) {
      fetchOwnerNames();
    }
  }, [items, ownerNames]);


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
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className={`${isDarkMode ? 'bg-red-900 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
            <p className={`${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Browse Items</h1>
          
          <div className="mb-8">
            {/* Search and Filters Row */}
            <div className="flex flex-row justify-end items-center gap-4 mb-4">
              {/* Search Bar */}
              <div className="w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search items..."
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Filters Toggle Button */}
              <button
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className={`w-32 px-4 py-2 rounded-md shadow-sm border flex items-center justify-between transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' 
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">Filters</span>
                {isFiltersVisible ? (
                  <ChevronUpIcon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDownIcon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>
            </div>
            
            {/* Filters Panel */}
            {isFiltersVisible && (
              <div className={`rounded-md shadow-sm border p-4 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-300'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Filters
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Condition
                    </label>
                    <select
                      name="condition"
                      value={filters.condition}
                      onChange={handleFilterChange}
                      className={`w-full px-3 py-1.5 border rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">All Conditions</option>
                      <option value="like new">Like New</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Price Range
                    </label>
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        className={`w-1/2 px-3 py-1.5 border rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        className={`w-1/2 px-3 py-1.5 border rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={filters.availability}
                      onChange={handleFilterChange}
                      className={`w-full px-3 py-1.5 border rounded-md focus:ring-primary-500 focus:border-primary-500 text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="available">Available</option>
                      <option value="rented">Rented</option>
                      <option value="">All</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(filters.condition || filters.minPrice || filters.maxPrice || filters.availability) && (
                    <div className="flex flex-wrap gap-2">
                      {filters.condition && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-primary-900 text-primary-200' 
                            : 'bg-primary-100 text-primary-800'
                        }`}>
                          Condition: {filters.condition}
                          <button
                            onClick={() => setFilters(prev => ({ ...prev, condition: '' }))}
                            className="ml-1.5 hover:text-primary-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </span>
                      )}
                      {filters.minPrice && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-primary-900 text-primary-200' 
                            : 'bg-primary-100 text-primary-800'
                        }`}>
                          Min Price: ₹{filters.minPrice}
                          <button
                            onClick={() => setFilters(prev => ({ ...prev, minPrice: '' }))}
                            className="ml-1.5 hover:text-primary-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </span>
                      )}
                      {filters.maxPrice && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-primary-900 text-primary-200' 
                            : 'bg-primary-100 text-primary-800'
                        }`}>
                          Max Price: ₹{filters.maxPrice}
                          <button
                            onClick={() => setFilters(prev => ({ ...prev, maxPrice: '' }))}
                            className="ml-1.5 hover:text-primary-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </span>
                      )}
                      {filters.availability && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-primary-900 text-primary-200' 
                            : 'bg-primary-100 text-primary-800'
                        }`}>
                          {filters.availability}
                          <button
                            onClick={() => setFilters(prev => ({ ...prev, availability: '' }))}
                            className="ml-1.5 hover:text-primary-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems?.map(item => (
              <Link 
                to={`/items/${item.item_id}`} 
                key={item.item_id}
                className={`group rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                {/* Image Container */}
                <div className={`relative w-full aspect-[4/3] overflow-hidden ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {itemImages[item.item_id] ? (
                      <img
                        src={itemImages[item.item_id]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className={`w-16 h-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm flex items-center justify-center`}>
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="text-xs text-white font-medium">Click to view details</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.availability_status === 'available' 
                        ? isDarkMode
                          ? 'bg-green-900 text-green-100'
                          : 'bg-green-100 text-green-800'
                        : isDarkMode
                          ? 'bg-red-900 text-red-100'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {item.availability_status}
                    </span>
                  </div>
                </div>

                <div className={`p-4 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-semibold group-hover:text-primary-500 transition-colors duration-200 line-clamp-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </h3>
                    <span className={`text-lg font-bold whitespace-nowrap ml-2 ${
                      isDarkMode ? 'text-primary-400' : 'text-primary-600'
                    }`}>
                      ₹{item.rental_price}
                      <span className={`text-xs font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/{item.rental_unit}</span>
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 line-clamp-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-200' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.item_condition}
                    </span>
                    <span className={`capitalize ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{item.category_name}</span>
                  </div>
                  
                  {item.location_description && (
                    <div className="flex items-center text-sm mb-3">
                      <svg className={`w-4 h-4 mr-1.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className={`truncate ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{item.location_description}</span>
                    </div>
                  )}
                  
                  <div className={`flex items-center justify-between pt-3 border-t ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  }`}>
                    <div className="flex items-center">
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center overflow-hidden`}>
                          {item.owner_image ? (
                            <img 
                              src={item.owner_image} 
                              alt={item.owner_username} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserCircleIcon className={`w-8 h-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          )}
                        </div>
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                          item.availability_status === 'available' 
                            ? 'bg-green-500' 
                            : 'bg-red-500'
                        } border-2 ${isDarkMode ? 'border-gray-800' : 'border-white'}`} />
                      </div>
                      <div className="ml-2">
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          <span>Owner: {ownerNames[item.owner_id] || "Loading..."}</span>
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.owner_department || 'IITP'}
                        </p>
                      </div>
                    </div>
                    <button className={`text-sm font-medium transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-primary-600 hover:text-primary-700'
                    }`}>
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
      </div>
      <Footer />
    </div>
  );
};

export default Browse; 