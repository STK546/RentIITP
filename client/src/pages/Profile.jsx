import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateProfile } from '../features/auth/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useTheme } from '../hooks/useTheme';
import { UserCircleIcon, PhoneIcon, HomeIcon, AcademicCapIcon, IdentificationIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useTheme();
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
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-white' : 'border-indigo-500'} mx-auto`}></div>
          <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-indigo-600'}`}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden mb-8`}>
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="absolute -bottom-20 left-8">
              <div className="relative group">
                <div className="w-40 h-40 rounded-2xl bg-white p-1 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden">
                    {user?.profile_picture_url ? (
                      <img
                        src={user.profile_picture_url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-6xl font-light">
                        {user?.username?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-24 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user?.username}
                </h1>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user?.email}
                </p>
                <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  user?.account_status === 'active'
                    ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                    : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    user?.account_status === 'active'
                      ? 'bg-green-400'
                      : 'bg-red-400'
                  }`}></span>
                  {user?.account_status}
                </div>
              </div>
              <div className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="text-sm">Member since</p>
                <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {new Date(user?.registration_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="md:col-span-1">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Basic Information
              </h2>
              <div className="space-y-4">
                <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <IdentificationIcon className="w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm">Roll Number</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.roll_number}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <AcademicCapIcon className="w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm">Department</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.department || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Location */}
          <div className="md:col-span-2">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact & Location
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className={`pl-10 w-full rounded-lg shadow-sm ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500'
                            : 'border-gray-300 focus:border-indigo-500'
                        } focus:ring-1 focus:ring-indigo-500`}
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Hostel
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HomeIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                      <select
                        name="hostel_name"
                        value={formData.hostel_name}
                        onChange={handleChange}
                        className={`pl-10 w-full rounded-lg shadow-sm ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500'
                            : 'border-gray-300 focus:border-indigo-500'
                        } focus:ring-1 focus:ring-indigo-500`}
                      >
                        <option value="">Select Hostel</option>
                        {hostels.map((hostel) => (
                          <option key={hostel} value={hostel}>
                            {hostel}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Block
                    </label>
                    <input
                      type="text"
                      name="hostel_block"
                      value={formData.hostel_block}
                      onChange={handleChange}
                      className={`w-full rounded-lg shadow-sm ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500'
                          : 'border-gray-300 focus:border-indigo-500'
                      } focus:ring-1 focus:ring-indigo-500`}
                      placeholder="Enter block"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Room Number
                    </label>
                    <input
                      type="text"
                      name="room_number"
                      value={formData.room_number}
                      onChange={handleChange}
                      className={`w-full rounded-lg shadow-sm ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500'
                          : 'border-gray-300 focus:border-indigo-500'
                      } focus:ring-1 focus:ring-indigo-500`}
                      placeholder="Enter room number"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors duration-200`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 