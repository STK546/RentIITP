import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import rentalsApi from '../services/api/rentals';
// import Button from '../components/common/Button';

const MyRentals = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState({ current: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
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
          (rental.rental_status === 'active' || rental.rental_status === 'requested')
        );
        
        const pastRentals = sortedRentals.filter(rental => 
          new Date(rental.end_date) < now || 
          rental.rental_status === 'completed' || 
          rental.rental_status === 'cancelled'
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

    fetchRentals();
  }, [user]);

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

  const RentalCard = ({ rental }) => (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{rental.item_name}</h3>
          <p className="text-gray-600">
            <span className="font-medium">Owner:</span> {rental.owner_username}
          </p>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Dates:</span>{' '}
            {new Date(rental.start_date).toLocaleDateString()} -{' '}
            {new Date(rental.end_date).toLocaleDateString()}
          </p>
          <p className="text-lg font-bold">₹{rental.agreed_price}/day</p>
          <p className={`text-sm font-medium ${
            rental.rental_status === 'active' ? 'text-green-600' : 
            rental.rental_status === 'requested' ? 'text-yellow-600' : 
            rental.rental_status === 'completed' ? 'text-blue-600' : 
            rental.rental_status === 'cancelled' ? 'text-red-600' : 'text-gray-600'
          }`}>
            Status: {rental.rental_status.charAt(0).toUpperCase() + rental.rental_status.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );

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