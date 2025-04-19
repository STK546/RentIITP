import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateProfile } from '../features/auth/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone_number: '',
    hostel_name: '',
    hostel_block: '',
    room_number: '',
    profile_picture_url: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        phone_number: user.phone_number || '',
        hostel_name: user.hostel_name || '',
        hostel_block: user.hostel_block || '',
        room_number: user.room_number || '',
        profile_picture_url: user.profile_picture_url || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hostels = [
    'C.V. Raman',
    'Aryabhatta',
    'Kalam',
    'Asima',
    'Married Hostles',
    'Faculty Quarters',
    'D Quarters',
  ];

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-indigo-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="px-8 py-12 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative group">
                <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 shadow-lg group-hover:border-white/30 transition-all duration-300">
                  {user?.profile_picture_url ? (
                    <img
                      src={user.profile_picture_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white/80 text-6xl font-light">
                      {user?.username[0]}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg transform transition-all duration-300 hover:scale-110">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          console.log('Image selected:', file);
                        }
                      }}
                    />
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-semibold text-white">
                  {user?.username}
                </h2>
                <p className="text-white/80 mt-2">{user?.email}</p>
                <p className="text-white/80 text-sm mt-1">Roll Number: {user?.roll_number}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 gap-12">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200">
                    <span className="text-gray-600">Username</span>
                    <span className="text-gray-900 font-medium">{user?.username}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200">
                    <span className="text-gray-600">Account Status</span>
                    <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                      user?.account_status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user?.account_status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200">
                    <span className="text-gray-600">Registration Date</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(user?.registration_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Phone Number"
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label htmlFor="hostel_name" className="block text-sm text-gray-600 mb-1">
                        Hostel
                      </label>
                      <select
                        id="hostel_name"
                        name="hostel_name"
                        value={formData.hostel_name}
                        onChange={handleChange}
                        className="w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                      >
                        <option value="">Select</option>
                        {hostels.map((hostel) => (
                          <option key={hostel} value={hostel}>
                            {hostel}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-1">
                      <Input
                        label="Block"
                        id="hostel_block"
                        name="hostel_block"
                        type="text"
                        value={formData.hostel_block}
                        onChange={handleChange}
                        placeholder="A"
                        className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="col-span-1">
                      <Input
                        label="Room Number"
                        id="room_number"
                        name="room_number"
                        type="text"
                        value={formData.room_number}
                        onChange={handleChange}
                        placeholder="101"
                        className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 