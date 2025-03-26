import React, { useEffect, useState } from 'react';
import { getUserById } from '../api/users'; // Import your API function

const Home: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID
      if (!userId) {
        setError('No user logged in');
        return;
      }

      try {
        const user = await getUserById(userId); // Fetch user data from API
        setUsername(user.username); // Assuming your user object has a `username` field
      } catch (error) {
        setError('Failed to fetch user data');
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      {username ? (
        <h1>Welcome, {username}, to the most amazing Total Wellness App!</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Home;

