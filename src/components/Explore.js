import React, { useState } from 'react';

const FriendListView = ({ friends, onRemoveFriend, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="p-4 w-full lg:w-1/3">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Friends</h2>
        <p className="text-sm text-gray-600">You have {friends.length} friends.</p>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search friends..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <ul>
        {friends.map(friend => (
          <li key={friend.id} className="flex justify-between items-center mb-2 p-2 border border-gray-200 rounded bg-white shadow">
            <span className="font-medium">{friend.name}</span>
            <button
              onClick={() => onRemoveFriend(friend.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FriendRequestsView = ({ incomingRequests, onAccept, onReject }) => {
  return (
    <div className="p-4 w-full lg:w-1/3">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Friend Requests</h2>
        <p className="text-sm text-gray-600">You have {incomingRequests.length} pending friend requests.</p>
      </div>
      <div className="mb-4 w-full">
        <h3 className="text-xl font-semibold mb-2">Incoming Requests</h3>
        <ul>
          {incomingRequests.map(request => (
            <li key={request.id} className="flex justify-between items-center mb-2 p-2 border border-gray-200 rounded bg-white shadow">
              <span className="font-medium">{request.name}</span>
              <div>
                <button
                  onClick={() => onAccept(request.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => onReject(request.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FriendRequestOutgoingView = ({ outgoingRequests, onCancelRequest }) => {
  return (
    <div className="p-4 w-full lg:w-1/3">
      <h3 className="text-xl font-semibold mb-2">Sent Requests</h3>
      <ul>
        {outgoingRequests.map(request => (
          <li key={request.id} className="flex justify-between items-center mb-2 p-2 border border-gray-200 rounded bg-white shadow">
            <span className="font-medium">{request.name}</span>
            <button
              onClick={() => onCancelRequest(request.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
            >
              Cancel Request
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Explore = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more friends here
  ]);

  const [incomingRequests, setIncomingRequests] = useState([
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Emily Davis' },
    // Add more incoming requests here
  ]);

  const [outgoingRequests, setOutgoingRequests] = useState([
    { id: 5, name: 'Chris Brown' },
    { id: 6, name: 'Sarah Lee' },
    // Add more outgoing requests here
  ]);

  const handleRemoveFriend = (id) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  const handleSearch = (term) => {
    // Implement search logic here
  };

  const handleAcceptRequest = (id) => {
    const acceptedRequest = incomingRequests.find(request => request.id === id);
    setFriends([...friends, acceptedRequest]);
    setIncomingRequests(incomingRequests.filter(request => request.id !== id));
  };

  const handleRejectRequest = (id) => {
    setIncomingRequests(incomingRequests.filter(request => request.id !== id));
  };

  const handleCancelRequest = (id) => {
    setOutgoingRequests(outgoingRequests.filter(request => request.id !== id));
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <FriendListView
        friends={friends}
        onRemoveFriend={handleRemoveFriend}
        onSearch={handleSearch}
      />
      <FriendRequestsView
        incomingRequests={incomingRequests}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
      />
      <FriendRequestOutgoingView
        outgoingRequests={outgoingRequests}
        onCancelRequest={handleCancelRequest}
      />
    </div>
  );
};

export default Explore;