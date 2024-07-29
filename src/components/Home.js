import React, { useEffect, useState } from 'react';
import EventCard from "./EventCard";
import { getData } from '../utils/storage';
import Loader from '../utils/Loader';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return (
    <div className='text-center mt-60'>
      <Loader />
    </div>
  );
  
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-wrap justify-center my-6 mx-5">
      {events && events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}

export default Home;
