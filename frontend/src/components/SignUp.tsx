import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/users';
import { AxiosError } from 'axios';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState(''); // Manage the state of the email input
  const [password, setPassword] = useState(''); // Manage the state of the password input
  const [username, setUsername] = useState(''); // Manage the state of the username input
  const [error, setError] = useState(''); // Store error messages
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validation check
    if (!email || !password || !username) {
      setError('Email, username, and password are required!');
      return;
    }

    try {
      const user = {
        email,
        password,
        username,
        dateJoined: new Date().toLocaleString(), // Add current date and time
      };

      await createUser(user); // Create the user via API call

      // Save user data in localStorage for login
      localStorage.setItem('email', email);
      localStorage.setItem('username', username);

      // Navigate to the home page
      navigate('/home');
    } catch (error: unknown) {
      const axiosError = error as AxiosError; // Handle AxiosError
      console.error('Error creating user:', axiosError.response || error); // Log the error
      setError('Failed to create account. Please try again.'); // Set error message
    }
  };

  return (
    <div>
      <div className="backgroundImage"></div>
      <div className="signUpContainer">
        <h1>Sign Up</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

