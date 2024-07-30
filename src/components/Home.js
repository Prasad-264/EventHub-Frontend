import React, { useEffect, useState } from 'react';
import EventCard from "./EventCard";
import { getData } from '../utils/storage';
import Loader from '../utils/Loader';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = getData("userId");
  const token = getData("token");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/user/${userId}/events`, {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log(data);
        setEvents(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvents();
  }, [userId, token]);

  const filteredEvents = events.filter(event =>
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredEvents);

  if (loading) return (
    <div className='text-center mt-60'>
      <Loader />
    </div>
  );
  
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-6 mx-5">
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition duration-300 ease-in-out"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))
        ) : (
          <div>No events found</div>
        )}
      </div>
    </div>
  );
}

export default Home;
