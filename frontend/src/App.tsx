import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Import the updated CSS file for colors

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './pages/Home'; // Your home page component
import WelcomePage from './components/WelcomePage';

// Pages
import Gratitude from './components/gratitude';
import Users from './components/users';
import Prayers from './components/prayers';

const App: React.FC = () => {
  return (
    <Router>
      <div className="welcome-container">
        <h1 className="welcome-header">A Total Wellness App</h1>

        <nav>
          <ul>
          <li>
              <Link to="/" className="nav-link">Welcome</Link>
            </li>
            <li>
              <Link to="/gratitude" className="nav-link">Gratitude</Link>
            </li>
           
            <li>
              <Link to="/prayers" className="nav-link">Prayers</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin" className="nav-link">Sign In</Link>
            </li>
            <li>
              <Link to="/users" className="nav-link">Users</Link>
            </li>

          </ul>
        </nav>

        <Routes>
          {/* Define the routes for each page */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/gratitude" element={<Gratitude />} />
          <Route path="/users" element={<Users />} />
          <Route path="/prayers" element={<Prayers />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


