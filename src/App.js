import Navbar from "./components/Navbar";
import Home from "./components/Home";
import EventPage from "./components/EventPage";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div> 
    </>
  );
}

export default App;
