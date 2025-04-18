import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRightIcon, CheckCircleIcon, ShieldCheckIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import img from './img.jpg'
const Home = () => {
  const { user } = useSelector((state) => state.auth);

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Rent Items at</span>
                  <span className="block">IIT Patna</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Find and rent items from your fellow students. From books to electronics, find what you need at affordable prices.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {user ? (
                    <div className="rounded-md">
                      <Link
                        to="/browse"
                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-900 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                      >
                        Browse Items
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="rounded-md">
                      <Link
                        to="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-900 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
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
          <div className="h-56 w-full bg-gray-100 sm:h-72 md:h-96 lg:w-full lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
              <img 
                className='h-full w-auto object-contain' 
                src={img}
                // src='C:\Users\hp\Desktop\DBMS\RentIITP\client\public\IIT Patna.jpeg' 
                alt='IIT Patna Campus'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-gray-900 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose RentIITP?
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A platform designed specifically for IIT Patna students to share and rent items within the campus.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-900 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md">
              <Link
                to={user ? "/browse" : "/register"}
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-900 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
              >
                {user ? "Browse Items" : "Get Started"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 