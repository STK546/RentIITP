import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { register } from '../features/auth/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Footer from '../components/layout/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName:'',
    lastName:'',
    password: '',
    confirmPassword: '',
    hostelName: '',
    hostelBlock: '',
    roomNumber: '',
    rollNumber: '',
    phoneNumber: '',
    profilePrictureUrl: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme || { isDarkMode: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email.endsWith('@iitp.ac.in')) {
      toast.error('Please use your @iitp.ac.in email address');
      setIsLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log(formData)
      const result = await dispatch(register(formData)).unwrap();
      console.log(result)
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.log(error)
      toast.error(error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const hostelNames = [
    'C.V. Raman',
    'Aryabhatta',
    'Kalam',
    'Asima',
    'Married Hostel',
    'Faculty Quarter',
    'D Quarter',
  ];

  return (
    <>
      <div className={`min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create an Account</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <Input
              label="User Name"
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={`appearance-none block w-full px-3 py-2 border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
            />

            {/* Roll Number */}
            <Input
              label="Roll Number"
              id="rollNumber"
              name="rollNumber"
              type="text"
              required
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="2301MC57"
              className={`appearance-none block w-full px-3 py-2 border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
            />

            {/* Email */}
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@iitp.ac.in"
              className={`appearance-none block w-full px-3 py-2 border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
            />

            {/* Password */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 text-gray-900 placeholder-gray-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
            />

            {/* hostelName Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label htmlFor="hostelName" className={`hostelBlock text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  hostelName
                </label>
                <select
                  id="hostelName"
                  name="hostelName"
                  value={formData.hostelName}
                  onChange={handleChange}
                  required
                  className={`mt-1 hostelBlock w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                    isDarkMode ? 'bg-gray-700 text-white' : ''
                  }`}
                >
                  <option value="">Select</option>
                  {hostelNames.map((hostelName) => (
                    <option key={hostelName} value={hostelName}>
                      {hostelName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <Input
                  label="hostelBlock"
                  id="hostelBlock"
                  name="hostelBlock"
                  type="text"
                  required
                  value={formData.hostelBlock}
                  onChange={handleChange}
                  placeholder="A"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'border-gray-300 text-gray-900 placeholder-gray-500'
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                />
              </div>

              <div className="col-span-1">
                <Input
                  label="Room No"
                  id="roomNumber"
                  name="roomNumber"
                  type="text"
                  required
                  value={formData.roomNumber}
                  onChange={handleChange}
                  placeholder="101"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'border-gray-300 text-gray-900 placeholder-gray-500'
                  } rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                />
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : ''
              }`}
            >
              Create Account
            </Button>

            {/* Login link */}
            <div className="text-center text-sm">
              <span className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : ''}`}>Already have an account?</span>{' '}
              <Link to="/login" className={`font-medium ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register; 