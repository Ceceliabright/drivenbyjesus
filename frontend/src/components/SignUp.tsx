import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/users';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Email and password are required!");
      console.log(error);
      return;
    }

    try {
      const user = { email, password };
      await createUser(user);
      alert('Account created successfully!');
    

      // Generate signup date and fake hashed password
      const signupDate = new Date().toISOString();
      const hashedPassword = btoa(password); // Simulated hash (Base64 encoding)
      const authToken = Math.random().toString(36).substring(2); // Random string as a fake token

    // Post to the JSON server
    const response = await axios.post("http://localhost:3000/users", {
      email,
      password, // Store the original password
      hashedPassword, // Store the "hashed" password
      signupDate,
      authToken, // Store the generated token
    });

    if (response.status === 201) {

      
      // Automatically log in user
      localStorage.setItem("authToken", authToken); // Save the token locally
      navigate("/home"); // Redirect to the home page
    }


    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
  );
};

export default SignUp;


