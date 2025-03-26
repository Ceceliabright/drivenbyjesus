
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Make API call to authenticate the user
    // For now, just navigate to the Home page after "signing in".
    navigate('/home');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white' }}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;



