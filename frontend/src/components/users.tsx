import React, { useEffect, useState } from 'react';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the backend
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h1>User List</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <h3>{user.username}</h3>
              <p>{user.id}</p>
              <p>{user.password}</p>
              <p>{user.email}</p>
              <p>{user.profileImage}</p>
              <p><strong>Joined:</strong> {user.joinedDate}</p>
            </li>
          ))
        ) : (
          <p>No users available</p>
        )}
      </ul>
    </div>
  );
};

export default Users;
