import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Import the updated CSS file for colors

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './pages/Home'; // Your home page component
import WelcomePage from './components/WelcomePage';
import WeatherPage from './WeatherPage';
import { AudioProvider } from './context/AudioContext';
import Navbar from './components/Navbar';  // ✅ Import your Navbar

// Pages
import Gratitude from './components/gratitude';
import Users from './components/users';
import Prayers from './components/prayers';

const App: React.FC = () => {
  return (
    <AudioProvider> {/* ✅ Wrap everything inside AudioProvider */}
      <Router>
        <Navbar />  {/* ✅ Navbar appears on all pages */}
        <div className="welcome-container">
          <h1 className="welcome-header">A Total Wellness App</h1>

          <div className="main-content">
            <Routes>
              {/* Define the routes for each page */}
              <Route path="/" element={<WelcomePage />} />
              <Route path="/gratitude" element={<Gratitude />} />
              <Route path="/users" element={<Users />} />
              <Route path="/prayers" element={<Prayers />} />
              <Route path="/weather" element={<WeatherPage />} /> 
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AudioProvider>
  );
};

export default App;




