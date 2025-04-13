import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users';

type User = {
  id: string;
  username?: string;
  email: string;
  password: string;
  profileImage?: string;
  dateJoined?: string;
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '40px',
      color: 'white',
      backgroundImage: 'url(/src/images/ccCoder.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    },
    form: {
      marginBottom: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adding a slight dark background for the form
      padding: '20px',
      borderRadius: '8px',
    },
    list: {
      display: 'flex' as const,
      flexWrap: 'wrap' as const,
      gap: '16px',
      listStyle: 'none',
      padding: 0,
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid white',
      borderRadius: '8px',
      padding: '16px',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      minWidth: '200px',
      maxWidth: '300px',
      textAlign: 'center' as const,
    },
    button: {
      margin: '5px',
      padding: '8px 12px',
      background: 'transparent',
      border: '1px solid white',
      color: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    input: {
      margin: '5px 0',
      padding: '8px',
      border: '1px solid white',
      borderRadius: '4px',
      color: 'white',
      background: 'transparent',
    },
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data.reverse());
    } catch (err) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  const handleCreateUser = async () => {
    if (!newEmail || !newPassword) return;
    try {
      await createUser({ email: newEmail, password: newPassword, ...(newUsername && { username: newUsername }) });
      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
      fetchUsers();
    } catch (err) {
      setError('Error creating user');
    }
  };

  const handleEditClick = (user: User) => {
    setEditUserId(user.id);
    setEditUsername(user.username || '');
    setEditEmail(user.email);
    setEditPassword(user.password);
  };

  const handleUpdateUser = async () => {
    if (!editUserId) return;
    try {
      await updateUser(editUserId, { email: editEmail, password: editPassword, ...(editUsername && { username: editUsername }) });
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
    <div style={styles.container}>
      <h1>User List (src/users.tsx)</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div style={styles.form}>
        <h2>Create User</h2>
        <label style={{ color: 'white' }}>Username (Optional):</label>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={styles.input}
        />
        <label style={{ color: 'white' }}>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={styles.input}
        />
        <label style={{ color: 'white' }}>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCreateUser} style={styles.button}>Add User</button>
      </div>

      <ul style={styles.list}>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} style={styles.card}>
              {editUserId === user.id ? (
                <>
                  <label style={{ color: 'white' }}>Username (Optional):</label>
                  <input
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    style={styles.input}
                  />
                  <label style={{ color: 'white' }}>Email:</label>
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    style={styles.input}
                  />
                  <label style={{ color: 'white' }}>Password:</label>
                  <input
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={handleUpdateUser} style={styles.button}>Save</button>
                  <button onClick={() => setEditUserId(null)} style={styles.button}>Cancel</button>
                </>
              ) : (
                <>
                  <p>ID: {user.id}</p>
                  <p>Username: {user.username || 'N/A'}</p>
                  <p>Email: {user.email}</p>
                  <p>Profile Image: {user.profileImage || 'N/A'}</p>
                  <p>Date Joined: {user.dateJoined || 'N/A'}</p>
                  <button onClick={() => handleEditClick(user)} style={styles.button}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)} style={styles.button}>Delete</button>
                </>
              )}
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




