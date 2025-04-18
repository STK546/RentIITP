import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/my-rentals"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">My Rentals</h2>
          <p className="text-gray-600">View and manage your current and past rentals</p>
        </Link>

        <Link
          to="/add-item"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Add Item</h2>
          <p className="text-gray-600">List a new item for rent</p>
        </Link>

        <Link
          to="/profile"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600">Manage your account settings</p>
        </Link>

        <Link
          to="/notifications"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-gray-600">View your notifications</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 