import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const ItemCard = ({ item }) => {
  const [isWishlisted, setIsWishlisted] = useState(item.isWishlisted);

  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsWishlisted(!isWishlisted);
    // TODO: Add API call to toggle wishlist
  };

  return (
    <Link to={`/items/${item.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Image */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center text-gray-400">
              Item Image
            </div>
          )}
          
          {/* Wishlist button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {isWishlisted ? (
              <HeartSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartOutline className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
          
          {/* Status and condition */}
          <div className="mt-1 flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              item.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {item.available ? 'Available' : 'Rented'}
            </span>
            <span className="text-sm text-gray-500">{item.condition}</span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
              <span className="text-sm text-gray-500">/day</span>
            </div>
          </div>

          {/* Location */}
          {item.location && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {item.location}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard; 