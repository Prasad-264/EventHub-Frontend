import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:9000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      setSuccess(true);
      navigate("/login");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative mt-[-64px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-md p-6 bg-white bg-opacity-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Sign Up</h1>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center">Registration successful!</div>}
        <form onSubmit={handleSubmit}>
          <div className='flex gap-2'>         
            <div className="mb-4">
              <label className="block mb-2 text-gray-900">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-900">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-900">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition duration-300"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
