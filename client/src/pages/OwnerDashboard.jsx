import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [listedItems, setListedItems] = useState([]);
  const [rentalRequests, setRentalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    try {
      // Fetch listed items
      const itemsResponse = await axios.get('http://localhost:3000/api/items/my-items', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      // Fetch rental requests
      const rentalsResponse = await axios.get('http://localhost:3000/api/rentals?role=owner', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      setListedItems(itemsResponse.data.items || []);
      setRentalRequests(rentalsResponse.data.rentals || []);
    } catch (err) {
      console.error('Error fetching owner data:', err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (rentalId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/rentals/${rentalId}/status`,
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
        fetchOwnerData(); // Refresh the data
      }
    } catch (err) {
      console.error('Error updating rental status:', err);
      toast.error(err.response?.data?.message || 'Failed to update rental status');
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Owner Dashboard</h1>

      {/* Listed Items Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Listed Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listedItems.map((item) => (
            <div key={item.item_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">₹{item.rental_price}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(item.availability_status)}`}>
                    {item.availability_status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Requests Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Rental Requests</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rentalRequests.map((rental) => (
                  <tr key={rental.rental_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rental.item_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{rental.renter_username}</div>
                      <div className="text-sm text-gray-500">{rental.renter_email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(rental.start_date).toLocaleDateString()} - {new Date(rental.end_date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{rental.rental_duration} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(rental.status)}`}>
                        {rental.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {rental.status === 'requested' && (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleStatusChange(rental.rental_id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleStatusChange(rental.rental_id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {rental.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(rental.rental_id, 'active')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Mark as Active
                        </button>
                      )}
                      {rental.status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(rental.rental_id, 'completed')}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Mark as Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard; 