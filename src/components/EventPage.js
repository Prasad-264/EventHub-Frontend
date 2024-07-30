import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/storage';
import Notification from './Notification';
import Loader from '../utils/Loader';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const token = getData("token");
  const userId = getData("userId");
  const date = new Date(event?.date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/event/${id}`, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        console.log(data);
        setEvent(data);
        setLoading(false);
        const isRegistered = data.participants.some(participant => participant._id === userId);
        setRegistered(isRegistered);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvent();
  }, [id, token, userId]);

  const handleRegister = async () => {
    console.log('Register for the event');
    try {
      const response = await fetch(`http://localhost:9000/api/user/${userId}/register-for-event`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: event?._id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register for the event');
      }
  
      const data = await response.json();
      console.log("Successfully registered for the event", data);
      setRegistered(true);
      setShowNotification(true);
    } catch (error) {
      console.error("Error registering for the event:", error.message);
    }
  };

  const handleAddFriend = (participantId) => {
    console.log(`Add friend with ID: ${participantId}`);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  if (loading) return (
    <div className='text-center mt-60'>
      <Loader />
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex flex-col lg:flex-row gap-4 justify-evenly p-4'>
      <div className="w-full lg:w-1/2 xl:w-6/12 bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4">{event?.title}</h1>
        <img className="w-full h-64 object-cover mb-4 rounded" src={event?.image} alt={event?.title} />
        <div className='flex justify-between mb-4'>
          <p className="text-gray-600">{event?.location}</p>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
        <p className="text-gray-700 mb-4">{event?.description}</p>
        <button
          onClick={registered ? null : handleRegister}
          className={`text-white py-2 px-4 w-full rounded ${registered ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition duration-300'}`}
          disabled={registered}
        >
          {registered ? 'Registered' : 'Register'}
        </button>
      </div>
      <div className="w-full lg:w-1/2 xl:w-3/12 bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Participants</h1>
        <div className="max-h-[29rem] overflow-y-auto no-scrollbar">
          {event.participants?.map((participant, index) => (
            <div key={index} className='flex justify-between items-center gap-3 mb-4 p-3 bg-white shadow-md rounded-lg'>
              <p className='text-lg font-medium text-gray-800'>{participant.firstName} {participant.lastName}</p>
              {participant._id === userId ? (
                <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 cursor-not-allowed">You</button>
              ) : (
                <button
                  onClick={() => handleAddFriend(participant._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Add Friend
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {showNotification && (
        <Notification
          message="Event registered successfully!"
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default EventPage;
