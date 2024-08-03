import { useState, useEffect } from 'react';
import Notification from './Notification';

const availableInterests = [
  'Music', 'Art', 'Technology', 'Sports', 'Health & Fitness', 'Food & Drink',
  'Business', 'Travel', 'Education', 'Fashion', 'Photography', 'Film',
  'Literature', 'Gaming', 'Science'
];

const Interests = ({ userId, token }) => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const getInterests = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/user/${userId}/getInterests`, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        setInterests(data);
      } catch (error) {
        console.error('Error fetching user Interests:', error);
      }
    }
    getInterests();
  }, [userId, token]);

  const handleAddInterest = async () => {
    if (!newInterest) return;
    try {
      const response = await fetch(`http://localhost:9000/api/user/${userId}/addInterest`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interestName: newInterest }),
      });
      if (response.ok) {
        console.log('Add interest successfully');
        setInterests([...interests, { _id: Date.now().toString(), name: newInterest }]);
        setNewInterest('');
        setShowNotification(true);
        setNotificationMessage('Interest added successfully!');
      } else {
        console.error('Failed to add interest');
      }
    } catch (err) {
      console.error('Error adding interest:', err);
    }
  };

  const handleRemoveInterest = async (interestName) => {
    try {
      const response = await fetch(`http://localhost:9000/api/user/${userId}/removeInterest`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interestName }),
      });
      if (response.ok) {
        console.log('Interest removed successfully');
        setInterests((prevInterests) => prevInterests.filter((interest) => interest.name !== interestName));
        setShowNotification(true);
        setNotificationMessage('Interest removed successfully!');
      } else {
        console.error('Failed to remove interest');
      }
    } catch (err) {
      console.error('Error removing interest:', err);
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <section className="max-w-6xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Interests</h2>
      <ul className="flex flex-row flex-wrap mt-4 gap-6">
        {interests.map(interest => (
          <li
            key={interest?._id}
            className="relative p-2 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <span className="text-gray-700 mr-3"><strong>{interest?.name}</strong></span>
            <button
              onClick={() => handleRemoveInterest(interest?.name)}
              className="bg-red-500 text-white hover:bg-red-600 rounded-full h-6 w-6 font-bold absolute top-[-10px] right-[-7px]"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <label htmlFor="interest" className="block mb-2 text-lg font-medium text-gray-700">Add a new interest</label>
        <select
          id="interest"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select an interest</option>
          {availableInterests
            .filter(interest => !interests.some(i => i.name === interest))
            .map(interest => (
              <option key={interest} value={interest}>{interest}</option>
            ))}
        </select>
        <button
          onClick={handleAddInterest}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Add Interest
        </button>
      </div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={closeNotification}
        />
      )}
    </section>
  );  
}

export default Interests