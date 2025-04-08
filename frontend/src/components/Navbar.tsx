import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';

const Navbar: React.FC = () => {
  const { isPlaying, togglePlay } = useContext(AudioContext);

  return (
    <nav className="navbar">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Welcome</Link>
        </li>
        <li className="nav-item">
          <Link to="/gratitude" className="nav-link">Gratitude</Link>
        </li>
        <li className="nav-item">
          <Link to="/prayers" className="nav-link">Prayers</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link">Sign In</Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link">Users</Link>
        </li>
        <li className="nav-item">
          <Link to="/weather" className="nav-link">Weather</Link>
        </li>
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>

        <li className="nav-item">
  <div className="outer-button">
    <p className="comment">🎵 Soothing Music</p>
    <button 
      className="inner-button" 
      onClick={togglePlay}
    >
      {isPlaying ? '⏸️ Pause' : '▶️ Play'}
    </button>
    <p className="music-description">
      Relax your mind with calming music
    </p>
  </div>
</li>

      </ul>
    </nav>
  );
};

export default Navbar;
