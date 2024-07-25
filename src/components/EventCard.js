import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/event/${event._id}`);
  };

  const date = new Date(event?.date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return (
    <div 
      className='max-w-xs mx-auto bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer m-4'
      onClick={handleCardClick}
    >
      <img className='w-full h-48 object-cover' src={event?.image} alt="Event" />
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-gray-800'>{event?.title}</h2>
        <p className='text-sm text-gray-500'>{formattedDate}</p>
        <p className='text-sm text-gray-500 mb-4'>Location: {event?.location}</p>
        <p className='text-base text-gray-700'>{event?.description}</p>
      </div>
    </div>
  );
}

export default EventCard;
