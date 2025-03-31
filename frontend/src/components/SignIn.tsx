import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { getUserByEmail } from "../api/users";
import bcrypt from "bcryptjs"; // Import bcryptjs for password comparison




const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }
  
    try {
      // Fetch user from JSON Server
      const user = await getUserByEmail(email);

      if (!user) {
        setError("User not found. Please check your email.");
        return;
      }

      // Compare hashed password with user input
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        alert("Login successful!");
        navigate("/home"); // Redirect to home page
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

