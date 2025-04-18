import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/common/Button';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleRent = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`/api/items/${id}/rent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to rent item');
      }

      // Refresh item data
      const updatedItem = await response.json();
      setItem(updatedItem);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add to wishlist');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <p className="text-2xl font-bold mb-4">₹{item.price}/day</p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleRent}
              disabled={!item.available}
            >
              {item.available ? 'Rent Now' : 'Not Available'}
            </Button>
            
            <Button 
              variant="secondary"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; 