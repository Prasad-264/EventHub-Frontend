import Navbar from "./components/Navbar";
import Home from "./components/Home";
import EventPage from "./components/EventPage";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div> 
    </>
  );
}

export default App;
