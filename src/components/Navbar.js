import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getData } from '../utils/storage';

const Navbar = () => {
  const user = getData("userId");
  const location = useLocation();
  const currentPageUrl = location.pathname + location.search;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className='bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link to="/home" className='text-white text-3xl font-bold tracking-wide'>
              Eventhub
            </Link>
          </div>
          <div className='flex space-x-6 text-md items-center'>
            {user && currentPageUrl !== '/' ? (
              <>
                <Link to="/home" className='text-white hover:text-blue-100 transition-colors duration-300'>
                  Home
                </Link>
                <Link to="/explore" className='text-white hover:text-blue-100 transition-colors duration-300'>
                  Explore
                </Link>
                <div className='relative' ref={dropdownRef}>
                  <button onClick={toggleDropdown} className='focus:outline-none'>
                    <img
                      src="/user.png"
                      alt="Profile"
                      className='h-9 w-9 rounded-full object-cover hover:ring-2 hover:ring-white transition-all duration-300'
                    />
                  </button>
                  {dropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10'>
                      <Link 
                        to="/profile/registered-events" 
                        className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                        onClick={toggleDropdown}
                      >
                        Registered Events
                      </Link>
                      <Link 
                        to="/profile" 
                        className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                        onClick={toggleDropdown}
                      >
                        Manage Profile
                      </Link>
                      <Link 
                        to="/" 
                        className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/signup" className='text-white hover:text-blue-100 transition-colors duration-300'>
                  Sign Up
                </Link>
                <Link to="/login" className='text-white hover:text-blue-100 transition-colors duration-300'>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
