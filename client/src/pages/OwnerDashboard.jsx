import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Define possible rental statuses for the filter dropdown
const RENTAL_STATUSES = ['all', 'requested', 'confirmed', 'active', 'completed', 'cancelled', 'rejected'];

// Define the expected shape of a rental object for clarity
// interface Rental {
//   rental_id: number;
//   item_name: string;
//   renter_username: string;
//   start_date: string; // ISO date string
//   end_date: string; // ISO date string
//   agreed_price: number;
//   rental_status: string;
// }

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  // State for the status filter
  const [statusFilter, setStatusFilter] = useState('all'); // Default to 'all'
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRentals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only fetch on initial mount

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/rentals?role=owner`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data && Array.isArray(response.data.rentals)) {
        setRentals(response.data.rentals);
      } else {
        setRentals([]);
        console.warn('No rentals array found in response or response format is incorrect:', response.data);
        toast.error('Could not fetch rentals. Please check console.');
      }
    } catch (err) {
      console.error('Error fetching rentals:', err);
      const errorMessage = err.response?.data?.message || 'Failed to load rentals';
      toast.error(errorMessage);
      setRentals([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sorting when a column header is clicked
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Memoized function to filter and sort data
  const filteredAndSortedRentals = useMemo(() => {
    // 1. Filter based on statusFilter
    let filteredItems = rentals;
    if (statusFilter !== 'all') {
      filteredItems = rentals.filter(
        rental => rental.rental_status && rental.rental_status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // 2. Sort the filtered items
    let sortableItems = [...filteredItems]; // Create a mutable copy for sorting
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a ? a[sortConfig.key] : null;
        const bValue = b ? b[sortConfig.key] : null;

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        let comparison = 0;
        if (sortConfig.key === 'agreed_price' || sortConfig.key === 'rental_id') {
          comparison = parseFloat(aValue) - parseFloat(bValue);
        } else if (sortConfig.key === 'start_date' || sortConfig.key === 'end_date') {
          comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
        } else {
          comparison = String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase());
        }

        return sortConfig.direction === 'ascending' ? comparison : comparison * -1;
      });
    }
    return sortableItems;
    // Dependency array includes rentals, sortConfig, and statusFilter
  }, [rentals, sortConfig, statusFilter]);


  const handleStatusChange = async (rentalId, newStatus) => {
    if (!rentalId || typeof rentalId !== 'number' || rentalId <= 0) {
      toast.error('Invalid rental ID provided for status change.');
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/rentals/${rentalId}/status`,
        { newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        toast.success('Rental status updated successfully');
        fetchRentals(); // Refetch data to reflect changes
      } else {
        toast.warn(`Status update returned status: ${response.status}`);
        fetchRentals();
      }
    } catch (err) {
      console.error('Error updating rental status:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update rental status';
      toast.error(errorMessage);
    }
  };

  const getStatusBadgeColor = (status) => {
    const lowerCaseStatus = status ? status.toLowerCase() : 'unknown';
    switch (lowerCaseStatus) {
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Date Error';
    }
  };

  // Helper function to get sorting indicator
  const getSortIndicator = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽';
  };

  // Handler for the status filter dropdown change
  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading Rentals...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Rental Requests</h2>
            {/* Status Filter Dropdown */}
            <div className="flex items-center space-x-2">
                <label htmlFor="statusFilter" className="text-sm font-medium text-gray-600">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={handleFilterChange}
                    className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                >
                    {RENTAL_STATUSES.map(status => (
                        <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize */}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        {/* Display table or empty message */}
        {filteredAndSortedRentals.length === 0 ? (
           <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
             {statusFilter === 'all' ? 'No rental requests found.' : `No rental requests found with status "${statusFilter}".`}
           </div>
         ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => requestSort('rental_id')}>
                      Rental ID{getSortIndicator('rental_id')}
                    </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => requestSort('item_name')}>
                      Item{getSortIndicator('item_name')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => requestSort('renter_username')}>
                      Renter{getSortIndicator('renter_username')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => requestSort('start_date')}>
                      Dates{getSortIndicator('start_date')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => requestSort('agreed_price')}>
                      Price{getSortIndicator('agreed_price')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => requestSort('rental_status')}>
                      Status{getSortIndicator('rental_status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Use filteredAndSortedRentals for the table body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedRentals.map((rental) => (
                    <tr key={rental?.rental_id || `rental-fallback-${Math.random()}`}>
                       <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{rental?.rental_id ?? 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{rental?.item_name ?? 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rental?.renter_username ?? 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(rental?.start_date)} - {formatDate(rental?.end_date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {rental?.agreed_price != null ? `₹${rental.agreed_price}` : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(rental?.rental_status)}`}>
                          {rental?.rental_status ? rental.rental_status.charAt(0).toUpperCase() + rental.rental_status.slice(1) : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {rental?.rental_status === 'requested' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusChange(rental.rental_id, 'confirmed')}
                              className="text-green-600 hover:text-green-800 transition duration-150 ease-in-out"
                              aria-label={`Confirm rental ${rental.rental_id}`}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(rental.rental_id, 'rejected')}
                              className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                              aria-label={`Reject rental ${rental.rental_id}`}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {rental?.rental_status === 'active' && (
                          <button
                            onClick={() => handleStatusChange(rental.rental_id, 'completed')}
                            className="text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
                             aria-label={`Mark rental ${rental.rental_id} as completed`}
                          >
                            Mark as Completed
                          </button>
                        )}
                         {rental?.rental_status !== 'requested' && rental?.rental_status !== 'active' && (
                            <span className="text-xs text-gray-400">No actions</span>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
