import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getData } from '../utils/storage';

const Navbar = () => {
  const user = getData("userId");
  const location = useLocation();
  const currentPageUrl = location.pathname + location.search;
  const handleLogout = () => {
    localStorage.clear();
  }

  return (
    <nav className='bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link to="/home" className='text-white text-3xl font-bold tracking-wide'>
              Eventhub
            </Link>
          </div>
          <div className='flex space-x-6 text-md'>
            {user && currentPageUrl !== '/' ? (
              <>
                <Link to="/home" className='text-white hover:text-blue-100 transition-colors duration-300'>
                  Home
                </Link>
                <Link to="/explore" className='text-white hover:text-blue-100 transition-colors duration-300'>
                  Explore
                </Link>
                <Link to="/profile" className='text-white hover:text-blue-100 transition-colors duration-300'>
                  Profile
                </Link>
                <Link 
                  to="/" 
                  className='text-white hover:text-blue-100 transition-colors duration-300'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
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
