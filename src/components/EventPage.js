import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/storage';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getData("token");
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
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleRegister = () => {
    console.log('Register for the event');
  };

  const handleAddFriend = (participantId) => {
    console.log(`Add friend with ID: ${participantId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex flex-wrap flex-row gap-4 justify-evenly p-4'>
      <div className="max-w-2xl bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <img className="w-full h-64 object-cover mb-4 rounded" src={event.image} alt={event.title} />
        <div className='flex justify-between mb-4'>
          <p className="text-gray-600">{event.location}</p>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <button
          onClick={handleRegister}
          className="text-white py-2 px-4 w-full rounded bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition duration-300"
        >
          Register
        </button>
      </div>
      <div className="max-w-2xl bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Participants</h1>
        <div className="max-h-[29rem] overflow-y-auto no-scrollbar">
          {/* {event.participants?.map((participant, index) => (
            <div key={index} className='flex justify-between mb-4'>
              <p>{participant.name}</p>
              <button
                onClick={() => handleAddFriend(participant.id)}
                className="bg-gray-300 text-gray-700 py-1 px-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Add Friend
              </button>
            </div>
          ))} */}
          <div className='flex justify-between items-center gap-3 mb-4 p-4 bg-white shadow-md rounded-lg'>
            <p className='text-lg font-medium text-gray-800'>Prasad Kandekar</p>
            <button
              onClick={() => handleAddFriend()}
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Add Friend
            </button>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default EventPage;
