import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import rentalsApi from '../services/api/rentals';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Footer from '../components/layout/Footer';

const MyRentals = () => {
  const { user } = useAuth();
  const { isDarkMode, getThemeClasses } = useTheme();
  const [rentals, setRentals] = useState({ current: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [itemImages, setItemImages] = useState({});

  const fetchRentals = async () => {
    if (!user) {
      setError('Authentication required. Please log in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch both renter and owner rentals
      const [renterResponse, ownerResponse] = await Promise.all([
        rentalsApi.fetchUserRentals('renter'),
        rentalsApi.fetchUserRentals('owner')
      ]);

      // Check if either response has an error message
      if (renterResponse.message && !renterResponse.message.toLowerCase().startsWith('successfully')) {
        throw new Error(`Renter rentals: ${renterResponse.message}`);
      }
      if (ownerResponse.message && !ownerResponse.message.toLowerCase().startsWith('successfully')) {
        throw new Error(`Owner rentals: ${ownerResponse.message}`);
      }

      // Combine rentals from both responses
      const allRentals = [
        ...(renterResponse.rentals || []),
        ...(ownerResponse.rentals || [])
      ];

      // Sort rentals by start date
      const sortedRentals = allRentals.sort((a, b) => 
        new Date(b.start_date) - new Date(a.start_date)
      );

      // Separate current and past rentals
      const now = new Date();
      const currentRentals = sortedRentals.filter(rental => 
        new Date(rental.end_date) >= now && 
        (rental.rental_status === 'active' || rental.rental_status === 'requested' || rental.rental_status === 'confirmed')
      );
      
      const pastRentals = sortedRentals.filter(rental => 
        new Date(rental.end_date) < now || 
        rental.rental_status === 'completed' || 
        rental.rental_status === 'cancelled' ||
        rental.rental_status === 'rejected'
      );

      setRentals({
        current: currentRentals,
        past: pastRentals
      });

      // Fetch images for all rentals
      const imagesMap = {};
      for (const rental of sortedRentals) {
        try {
          const imageResponse = await axios.get(`${process.env.REACT_APP_API_URL}/items/${rental.item_id}/images`);
          if (imageResponse.data?.images) {
            const primaryImage = imageResponse.data.images.find(img => img.is_primary === 1) || imageResponse.data.images[0];
            imagesMap[rental.item_id] = primaryImage?.image_url;
          }
        } catch (err) {
          console.error(`Error fetching images for item ${rental.item_id}:`, err);
        }
      }
      setItemImages(imagesMap);

    } catch (err) {
      console.error('Error fetching rentals:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('Network error: Could not connect to the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchRentals, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <>
        <div className={`min-h-screen ${getThemeClasses.background} py-12 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-7xl mx-auto">
            <div className={`${getThemeClasses.card} rounded-lg shadow-sm p-6 text-center`}>
              <h2 className={`text-2xl font-semibold ${getThemeClasses.text} mb-4`}>Access Required</h2>
              <p className={`${getThemeClasses.secondaryText} mb-6`}>Please log in to view your rentals.</p>
              <Link
                to="/login"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm ${getThemeClasses.button}`}
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

  if (loading) {
    return (
      <>
        <div className={`min-h-screen ${getThemeClasses.background} py-12 px-4 sm:px-6 lg:px-8`}>
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
        <div className={`min-h-screen ${getThemeClasses.background} py-12 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-7xl mx-auto">
            <div className={`${isDarkMode ? 'bg-red-900 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg p-6`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className={`h-6 w-6 ${isDarkMode ? 'text-red-400' : 'text-red-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className={`text-lg font-medium ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>Error Loading Rentals</h3>
                  <p className={`mt-2 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const RentalCard = ({ rental }) => {
    const isOwner = rental.owner_id === user.userId;
    const isRenter = rental.renter_id === user.userId;

    const handleStatusChange = async (newStatus) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/rentals/${rental.rental_id}/status`,
          { newStatus },
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );

        if (response.status === 200) {
          toast.success('Rental status updated successfully');
          fetchRentals();
        }
      } catch (err) {
        console.error('Error updating rental status:', err);
        const errorMessage = err.response?.data?.message || 'Failed to update rental status';
        toast.error(errorMessage);
      }
    };

    const renderActionButtons = () => {
      const buttonBaseClasses = "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
      
      switch (rental.rental_status.toLowerCase()) {
        case 'requested':
          if (isOwner) {
            return (
              <div className="flex space-x-3">
                <button
                  onClick={() => handleStatusChange('confirmed')}
                  className={`${buttonBaseClasses} bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500`}
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className={`${buttonBaseClasses} bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500`}
                >
                  Reject
                </button>
              </div>
            );
          } else if (isRenter) {
            return (
              <button
                onClick={() => handleStatusChange('cancelled')}
                className={`${buttonBaseClasses} bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500`}
              >
                Cancel Request
              </button>
            );
          }
          return null;

        case 'confirmed':
          if (isRenter) {
            return (
              <div className="flex space-x-3">
                <button
                  onClick={() => handleStatusChange('active')}
                  className={`${buttonBaseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500`}
                >
                  Mark as Active
                </button>
                <button
                  onClick={() => handleStatusChange('cancelled')}
                  className={`${buttonBaseClasses} bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500`}
                >
                  Cancel
                </button>
              </div>
            );
          } else if (isOwner) {
            return (
              <button
                onClick={() => handleStatusChange('cancelled')}
                className={`${buttonBaseClasses} bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500`}
              >
                Cancel
              </button>
            );
          }
          return null;

        case 'active':
          if (isOwner || isRenter) {
            return (
              <button
                onClick={() => handleStatusChange('completed')}
                className={`${buttonBaseClasses} bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500`}
              >
                Mark as Completed
              </button>
            );
          }
          return null;

        default:
          return null;
      }
    };

    return (
      <div className={`${getThemeClasses.card} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden hover:shadow-md transition-shadow duration-200`}>
        <div className="flex">
          <div className={`flex-shrink-0 w-52 h-52 ${getThemeClasses.secondaryBackground}`}>
            {itemImages[rental.item_id] && (
              <img
                src={itemImages[rental.item_id]}
                alt={rental.item_name}
                className="object-contain w-full h-full p-2"
              />
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className={`text-lg font-semibold ${getThemeClasses.text}`}>
                  {rental.item_name}
                </h3>
                <p className={`text-sm ${getThemeClasses.secondaryText}`}>
                  {isOwner ? 'Rented to' : 'Rented from'}: {isOwner ? rental.renter_name : rental.username}
                </p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(rental.rental_status)}`}>
                {rental.rental_status.charAt(0).toUpperCase() + rental.rental_status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm font-medium ${getThemeClasses.secondaryText}`}>Start Date</p>
                <p className={`text-sm ${getThemeClasses.text}`}>{formatDate(rental.start_date)}</p>
              </div>
              <div>
                <p className={`text-sm font-medium ${getThemeClasses.secondaryText}`}>End Date</p>
                <p className={`text-sm ${getThemeClasses.text}`}>{formatDate(rental.end_date)}</p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className={`text-sm ${getThemeClasses.text}`}>
                    {rental.location || 'IIT Patna Campus'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              {renderActionButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`min-h-screen ${getThemeClasses.background}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-3xl font-bold ${getThemeClasses.text}`}>My Rentals</h1>
            <Link
              to="/browse"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-colors duration-200`}
            >
              Browse More Items
            </Link>
          </div>

          <div className="mb-8">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('current')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'current'
                    ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Current Rentals ({rentals.current.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'past'
                    ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Past Rentals ({rentals.past.length})
              </button>
            </nav>
          </div>

          <div className="space-y-6">
            {activeTab === 'current' && rentals.current.length === 0 && (
              <div className={`${getThemeClasses.card} rounded-lg shadow-sm p-6 text-center`}>
                <h3 className={`text-lg font-medium ${getThemeClasses.text} mb-2`}>No Current Rentals</h3>
                <p className={`${getThemeClasses.secondaryText} mb-4`}>You don't have any active rentals at the moment.</p>
                <Link
                  to="/browse"
                  className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent'
                      : 'bg-blue-500 hover:bg-blue-600 text-white border-transparent'
                  } transition-colors duration-200`}
                >
                  Browse Available Items
                </Link>
              </div>
            )}

            {activeTab === 'past' && rentals.past.length === 0 && (
              <div className={`${getThemeClasses.card} rounded-lg shadow-sm p-6 text-center`}>
                <h3 className={`text-lg font-medium ${getThemeClasses.text} mb-2`}>No Past Rentals</h3>
                <p className={`${getThemeClasses.secondaryText}`}>Your rental history will appear here.</p>
              </div>
            )}

            {activeTab === 'current' &&
              rentals.current.map((rental) => (
                <RentalCard key={rental.rental_id} rental={rental} />
              ))}

            {activeTab === 'past' &&
              rentals.past.map((rental) => (
                <RentalCard key={rental.rental_id} rental={rental} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyRentals; 