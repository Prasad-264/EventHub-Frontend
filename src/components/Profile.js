import { getData } from '../utils/storage';
import RegisteredEvents from './RegisteredEvents';
// import Interests from './Interests';

const Profile = () => {
  const userName = getData('firstName');
  const userId = getData('userId');
  const token = getData('token');

  return (
    <div className="mx-auto mt-10">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Welcome, {userName}!</h1>
      </div>
      <RegisteredEvents userId={userId} token={token} />
    </div>
  );
};

export default Profile;
