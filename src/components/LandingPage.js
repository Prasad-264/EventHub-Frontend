import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center mt-[-64px] relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white p-4 rounded-lg bg-opacity-80 max-w-md">
        <h1 className="text-5xl font-bold">Welcome to EventHub!</h1>
        <p className="text-xl mt-4">Your go-to platform for discovering and sharing events.</p>
        <div className="mt-8">
          <Link   
            to="/signup"
            className="bg-blue-500 py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 mx-2 inline-block"
          >
            Sign Up
          </Link>
          <Link 
            to="/login"
            className="bg-gray-700 py-3 px-6 rounded-full hover:bg-gray-800 transition duration-300 mx-2 inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
