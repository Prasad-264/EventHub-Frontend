import React from 'react';

const Navbar = () => {
  return (
    <div className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-gray-900'>Eventhub</h1>
          </div>
          <div className='flex space-x-10 text-md'>
            <a href="#" className='text-gray-700 hover:text-gray-900'>Home</a>
            <a href="#" className='text-gray-700 hover:text-gray-900'>Explore</a>
            <a href="#" className='text-gray-700 hover:text-gray-900'>Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
