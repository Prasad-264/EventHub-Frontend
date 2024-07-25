import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils/storage';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getData("token");

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-4">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">{event.location}</p>
      <img className="w-full h-64 object-cover mb-4" src={event.image} alt={event.title} />
      <p className="text-gray-700">{event.description}</p>
    </div>
  );
}

export default EventPage;
