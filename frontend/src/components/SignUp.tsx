// Import necessary libraries and tools
import React, { useState } from 'react'; // React and useState for managing form state
import { useNavigate } from 'react-router-dom'; // Navigation after sign-up
import { createUser } from '../api/users'; // Function to call API for creating users
import { AxiosError } from 'axios'; // Axios error handling

// Define a functional component called SignUp
const SignUp: React.FC = () => {
  // State variables to store email, password, and error messages
  const [email, setEmail] = useState(''); // Email input
  const [password, setPassword] = useState(''); // Password input
  const [error, setError] = useState(''); // Error messages

  // Hook to navigate to different pages after successful sign-up
  const navigate = useNavigate();

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from reloading when the form is submitted

    // Check if both email and password are provided
    if (!email || !password) {
      setError('Email and password are required!'); // Show an error if one is missing
      console.log(error); // Log the error for debugging
      return; // Stop here if inputs are missing
    }

    try {
     // Create a user object with email and password
      const user = { 
        email, 
        password, 
        dateJoined: new Date().toLocaleString() // Automatically set the current date and time
      };
      
      
      
      const response = await createUser(user); // Call the API to create the user
      alert('Account created successfully!'); // Show a success message

      // Automatically log in the user after account creation
      localStorage.setItem('authToken', response.authToken); // Save the token provided by the server
      navigate('/home'); // Redirect the user to the home page
    } catch (error: unknown) {
      const axiosError = error as AxiosError; // Cast the error to an AxiosError for detailed info
      console.error('Error creating user:', axiosError.response || error); // Log the error details
      alert('Failed to create account. Please try again.'); // Show an error message to the user
    }
  };

  // Return the UI for the SignUp component
  return (
    <div>



      {/* Title of the page */}
      <h1>Sign Up</h1>

      {/* Form for user sign-up */}
      <form onSubmit={handleSubmit}>
        {/* Email input field */}
        <input
          type="email" // Specifies the input is for email
          value={email} // Links the input value to the state
          onChange={(e) => setEmail(e.target.value)} // Updates state when input changes
          placeholder="Email" // Text shown inside the input when empty
        />

        {/* Password input field */}
        <input
          type="password" // Specifies the input is for a password
          value={password} // Links the input value to the state
          onChange={(e) => setPassword(e.target.value)} // Updates state when input changes
          placeholder="Password" // Text shown inside the input when empty
        />

        {/* Submit button to create the account */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

// Export the SignUp component so it can be used in other parts of the app
export default SignUp;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../api/users';
// // import axios from 'axios';
// import { AxiosError } from 'axios'

// const SignUp: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       setError("Email and password are required!");
//       console.log(error);
//       return;
//     }

//     try {
//       const user = { email, password };
//       const response = await createUser(user);
//       alert('Account created successfully!');
    
//             // Automatically log in user
//             localStorage.setItem('authToken', response.authToken); // Save the token locally if provided by the API
//             navigate('/home'); // Redirect to the home page

//           } catch (error: unknown) {
//             const axiosError = error as AxiosError;
//             console.error('Error creating user:', axiosError.response || error);
//             alert('Failed to create account. Please try again.');
//           }
//         };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;


