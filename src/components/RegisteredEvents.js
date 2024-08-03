import { useEffect, useState } from "react";
import Loader from "../utils/Loader";
import Notification from "./Notification";
import { getData } from "../utils/storage";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const userId = getData("userId");
  const token = getData("token");
  
  useEffect(() => {
    const getRegisteredEvents = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/user/${userId}/registered-events`, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    }
    getRegisteredEvents();
  }, [userId, token]);

  const handleCancelRegistration = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:9000/api/user/${userId}/cancel-registration`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      });

      if (response.ok) {
        console.log('Registration cancelled successfully');
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        setShowNotification(true);
      } else {
        console.error('Failed to cancel registration');
      }
    } catch (err) {
      console.error('Error cancelling registration:', err);
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  if (loading) return (
    <div className='text-center'>
      <Loader />
    </div>
  );

  return (
    <section className="my-8 mx-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Registered Events</h2>
      <div className="flex flex-wrap justify-center">
        {events.map((event) => (
          <div key={event?._id} className="max-w-xs rounded-lg overflow-hidden shadow-lg m-4 bg-white hover:shadow-xl transition-shadow duration-300">
            <img className="w-full h-24 object-cover" src={event?.image} alt={event?.title} />
            <div className="px-4 py-4 flex flex-col gap-2">
              <div className="font-bold text-xl text-gray-900">{event?.title}</div>
              <p className="text-gray-600 text-sm">
                <strong>Date:</strong> {new Date(event?.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Location:</strong> {event?.location}
              </p>
              <button
                onClick={() => handleCancelRegistration(event?._id)}
                className="bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cancel Registration
              </button>
            </div>
          </div>
        ))}
      </div>
      {showNotification && (
        <Notification
          message="Registration cancelled successfully!"
          onClose={closeNotification}
        />
      )}
    </section>
  );
};

export default RegisteredEvents;
