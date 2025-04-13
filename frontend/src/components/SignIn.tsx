import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../api/users";
import bcrypt from "bcryptjs";
import image4 from "../images/image4.webp";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        setError("User not found. Please check your email.");
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        localStorage.setItem("id", user.id.toString());
        alert("Login successful!");
        navigate("/home");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 70,
        backgroundColor: "pink",
        backgroundImage: `url(${image4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ textAlign: "center", padding: "10px" }}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            value={email} // Controlled component
            onChange={(e) => setEmail(e.target.value)} // Updates state
            placeholder="Email" // Placeholder text
            style={{
              margin: "10px 0",
              padding: "10px",
              width: "200px",
              fontSize: "16px",
            }}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            value={password} // Controlled component
            onChange={(e) => setPassword(e.target.value)} // Updates state
            placeholder="Password" // Placeholder text
            style={{
              margin: "10px 0",
              padding: "10px",
              width: "200px",
              fontSize: "16px",
            }}
            required
          />

          {/* Display Error */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

