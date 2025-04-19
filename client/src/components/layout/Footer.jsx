import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const contributors = [
    { name: 'Malaram', role: 'Full Stack Developer', github: 'https://github.com/Malaram' },
    { name: 'Sarthak', role: 'Frontend Developer', github: 'https://github.com/STK546' },
    { name: 'Kushal', role: 'Backend Developer', github: 'https://github.com/Krishal23' },
    { name: 'Kulshrestha', role: 'Full Stack Developer', github: 'https://github.com/kulshreshthasingh' },
    { name: 'Ashis', role: 'UI/UX Developer', github: 'https://github.com/Ashis' },
    { name: 'Nani', role: 'Backend Developer', github: 'https://github.com/Nani' }
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">RentIITP</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A platform designed for IIT Patna students to easily rent and share items within the campus community. Making resource sharing simple and efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/add-item" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  List an Item
                </Link>
              </li>
              <li>
                <Link to="/my-rentals" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  My Rentals
                </Link>
              </li>
            </ul>
          </div>

          {/* Contributors Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contributors</h3>
            <div className="grid grid-cols-2 gap-4">
              {contributors.map((contributor, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">{contributor.name}</h4>
                    <p className="text-xs text-gray-400">{contributor.role}</p>
                  </div>
                  <a
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} RentIITP. Made with ❤️ by IITP Students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 