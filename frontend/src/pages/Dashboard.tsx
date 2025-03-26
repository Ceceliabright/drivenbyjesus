import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/protected-route', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching protected data:', error);
        }
      } else {
        console.log('No token found. Please log in.');
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading protected data...</p>
      )}
    </div>
  );
};

export default Dashboard;
