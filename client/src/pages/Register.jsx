import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { register } from '../features/auth/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName:'',
    lastName:'',
    password: '',
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

    try {
      console.log(formData)
      await dispatch(register(formData)).unwrap();
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
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
          />

          {/* hostelName Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label htmlFor="hostelName" className="hostelBlock text-sm font-medium text-gray-700">
                hostelName
              </label>
              <select
                id="hostelName"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleChange}
                required
                className="mt-1 hostelBlock w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
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
              />
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>

          {/* Login link */}
          <div className="text-center text-sm">
            <span className="text-gray-500">Already have an account?</span>{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 