import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import rentalsApi from '../services/api/rentals';
import { toast } from 'react-hot-toast';
import axios from 'axios';
// import Button from '../components/common/Button';

const MyRentals = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState({ current: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

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
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Please log in to view your rentals.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const RentalCard = ({ rental }) => {
    const isOwner = rental.owner_id === user.userId;
    const isRenter = rental.renter_id === user.userId;

    const handleStatusChange = async (newStatus) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/rentals/${rental.rental_id}/status`,
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
          fetchRentals(); // Refresh the data
        }
      } catch (err) {
        console.error('Error updating rental status:', err);
        const errorMessage = err.response?.data?.message || 'Failed to update rental status';
        toast.error(errorMessage);
      }
    };

    const renderActionButtons = () => {
      switch (rental.rental_status.toLowerCase()) {
        case 'requested':
          if (isOwner) {
            return (
              <div className="space-x-2">
                <button
                  onClick={() => handleStatusChange('confirmed')}
                  className="text-green-600 hover:text-green-900"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className="text-red-600 hover:text-red-900"
                >
                  Reject
                </button>
              </div>
            );
          } else if (isRenter) {
            return (
              <button
                onClick={() => handleStatusChange('cancelled')}
                className="text-red-600 hover:text-red-900"
              >
                Cancel
              </button>
            );
          }
          return null;

        case 'confirmed':
          if (isRenter) {
            return (
              <div className="space-x-2">
                <button
                  onClick={() => handleStatusChange('active')}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Mark as Active
                </button>
                <button
                  onClick={() => handleStatusChange('cancelled')}
                  className="text-red-600 hover:text-red-900"
                >
                  Cancel
                </button>
              </div>
            );
          } else if (isOwner) {
            return (
              <button
                onClick={() => handleStatusChange('cancelled')}
                className="text-red-600 hover:text-red-900"
              >
                Cancel
              </button>
            );
          }
          return null;

        case 'active':
          if (isOwner) {
            return (
              <button
                onClick={() => handleStatusChange('completed')}
                className="text-gray-600 hover:text-gray-900"
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
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{rental.item_name}</h3>
            <p className="text-gray-600">
              <span className="font-medium">{isOwner ? 'Renter' : 'Owner'}:</span> {isOwner ? rental.renter_username : rental.owner_username}
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Dates:</span>{' '}
              {formatDate(rental.start_date)} - {formatDate(rental.end_date)}
            </p>
            <p className="text-lg font-bold">₹{rental.agreed_price}</p>
            <div className="flex justify-between items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(rental.rental_status)}`}>
                {rental.rental_status.charAt(0).toUpperCase() + rental.rental_status.slice(1)}
              </span>
              {renderActionButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Rentals</h1>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'current'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Current Rentals ({rentals.current.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Past Rentals ({rentals.past.length})
        </button>
      </div>

      {activeTab === 'current' ? (
        rentals.current.length === 0 ? (
          <p className="text-gray-600">No current rentals found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.current.map((rental) => (
              <RentalCard key={rental.rental_id} rental={rental} />
            ))}
          </div>
        )
      ) : (
        rentals.past.length === 0 ? (
          <p className="text-gray-600">No past rentals found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.past.map((rental) => (
              <RentalCard key={rental.rental_id} rental={rental} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default MyRentals; 