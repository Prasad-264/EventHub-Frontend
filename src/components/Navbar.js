import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link to="/" className='text-white text-3xl font-bold tracking-wide'>
              Eventhub
            </Link>
          </div>
          <div className='flex space-x-6 text-md'>
            <Link to="/" className='text-white hover:text-blue-100 transition-colors duration-300'>
              Home
            </Link>
            <Link to="/explore" className='text-white hover:text-blue-100 transition-colors duration-300'>
              Explore
            </Link>
            <Link to="/profile" className='text-white hover:text-blue-100 transition-colors duration-300'>
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
