import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRightIcon, CheckCircleIcon, ShieldCheckIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import img from './img.jpg'
import Footer from '../components/layout/Footer';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme || { isDarkMode: false });

  const features = [
    {
      name: 'Easy to Use',
      description: 'Simple and intuitive interface to browse and rent items.',
      icon: CheckCircleIcon,
    },
    {
      name: 'Secure',
      description: 'Verified users and secure payment system.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Community',
      description: 'Connect with fellow students and share resources.',
      icon: UserGroupIcon,
    },
    {
      name: 'Affordable',
      description: 'Rent items at student-friendly prices.',
      icon: CurrencyDollarIcon,
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      {/* Hero Section */}
      <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left py-12 md:py-16 lg:py-20">
                <h1 className={`text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <span className="block">Rent Items at</span>
                  <span className="block text-primary-600">IIT Patna</span>
                </h1>
                <p className={`mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Find and rent items from your fellow students. From books to electronics, find what you need at affordable prices.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {user ? (
                    <div className="rounded-md">
                      <Link
                        to="/browse"
                        className={`w-full flex items-center justify-center px-8 py-3 border ${
                          isDarkMode 
                            ? 'border-gray-700 text-gray-200 bg-gray-800 hover:bg-gray-700' 
                            : 'border-gray-900 text-gray-900 bg-white hover:bg-gray-50'
                        } text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 transition-colors duration-200`}
                      >
                        Browse Items
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="rounded-md">
                      <Link
                        to="/register"
                        className={`w-full flex items-center justify-center px-8 py-3 border ${
                          isDarkMode 
                            ? 'border-gray-700 text-gray-200 bg-gray-800 hover:bg-gray-700' 
                            : 'border-gray-900 text-gray-900 bg-white hover:bg-gray-50'
                        } text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 transition-colors duration-200`}
                      >
                        Get Started
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className={`h-56 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} sm:h-72 md:h-96 lg:w-full lg:h-full transition-colors duration-200`}>
            <div className={`absolute inset-0 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
                : 'bg-gradient-to-r from-gray-100 to-gray-50'
            } flex items-center justify-center transition-colors duration-200`}>
              <img 
                className="h-full w-auto object-contain" 
                src={img}
                alt="IIT Patna Campus"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold tracking-wide uppercase`}>Features</h2>
            <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'} sm:text-4xl`}>
              Why Choose RentIITP?
            </p>
            <p className={`mt-4 max-w-2xl text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} lg:mx-auto`}>
              A platform designed specifically for IIT Patna students to share and rent items within the campus.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-900'
                  } text-white transition-colors duration-200`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className={`text-lg leading-6 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.name}</h3>
                    <p className={`mt-2 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'} sm:text-4xl`}>
            <span className="block">Ready to get started?</span>
            <span className="block">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md">
              <Link
                to={user ? "/browse" : "/register"}
                className={`inline-flex items-center justify-center px-5 py-3 border ${
                  isDarkMode 
                    ? 'border-gray-700 text-gray-200 bg-gray-800 hover:bg-gray-700' 
                    : 'border-gray-900 text-gray-900 bg-white hover:bg-gray-50'
                } text-base font-medium rounded-md transition-colors duration-200`}
              >
                {user ? "Browse Items" : "Get Started"}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home; 