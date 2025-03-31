import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // Fetch users when the component loads
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

  // Create User
  const handleCreateUser = async () => {
    if (!newEmail || !newPassword) return;
    try {
      await createUser({ email: newEmail, password: newPassword });
      setNewEmail('');
      setNewPassword('');
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError('Error creating user');
    }
  };

  // Start Editing
  const handleEditClick = (user: any) => {
    setEditUserId(user.id);
    setEditEmail(user.email);
    setEditPassword(user.password);
  };

  // Update User
  const handleUpdateUser = async () => {
    if (!editUserId) return;
    try {
      await updateUser(editUserId, { email: editEmail, password: editPassword });
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      setError('Error updating user');
    }
  };

  // Delete User
  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>User List (src/users.tsx)</h1>

      {/* Show loading or error message */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Create User Form */}
      <h2>Create User</h2>
      <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleCreateUser}>Add User</button>

      {/* List Users */}
      <ul>
        {users.length > 0 ? (
          users.slice().reverse().map((user) => (
            <li key={user.id}>
              {editUserId === user.id ? (
                <>
                  <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  <input value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                  <button onClick={handleUpdateUser}>Save</button>
                  <button onClick={() => setEditUserId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>ID: {user.id}</p>
                  <p>Email: {user.email}</p>
                  <p>Hashed Password: {user.password}</p>
                  <p>Profile Image: {user.profileImage}</p>
                  <p>Date Joined: {user.dateJoined}</p>
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
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



// import React, { useEffect, useState } from 'react';
// import { getUsers, createUser, updateUser, deleteUser } from '../api/users';

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Form State
//   const [newEmail, setNewEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [editUserId, setEditUserId] = useState<string | null>(null);
//   const [editEmail, setEditEmail] = useState('');
//   const [editPassword, setEditPassword] = useState('');

//   // Fetch users when the component loads
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const data = await getUsers();
//       setUsers(data.reverse());
//     } catch (err) {
//       setError('Error fetching data');
//     }
//     setLoading(false);
//   };

//   // Create User
//   const handleCreateUser = async () => {
//     if (!newEmail || !newPassword) return;
//     try {
//       await createUser({ email: newEmail, password: newPassword });
//       setNewEmail('');
//       setNewPassword('');
//       fetchUsers(); // Refresh the list
//     } catch (err) {
//       setError('Error creating user');
//     }
//   };

//   // Start Editing
//   const handleEditClick = (user: any) => {
//     setEditUserId(user.id);
//     setEditEmail(user.email);
//     setEditPassword(user.password);
//   };

//   // Update User
//   const handleUpdateUser = async () => {
//     if (!editUserId) return;
//     try {
//       await updateUser(editUserId, { email: editEmail, password: editPassword });
//       setEditUserId(null);
//       fetchUsers();
//     } catch (err) {
//       setError('Error updating user');
//     }
//   };

//   // Delete User
//   const handleDeleteUser = async (id: string) => {
//     try {
//       await deleteUser(id);
//       fetchUsers();
//     } catch (err) {
//       setError('Error deleting user');
//     }
//   };

//   return (
//     <div>
//       <h1>User List (src/users.tsx)</h1>

//       {/* Show loading or error message */}
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {/* Create User Form */}
//       <h2>Create User</h2>
//       <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//       <button onClick={handleCreateUser}>Add User</button>

//       {/* List Users */}


      
//       <ul>
//         {users.length > 0 ? (
//           users.map((user) => (
//             <li key={user.id}>
//               {editUserId === user.id ? (
//                 <>
//                   <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
//                   <input value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
//                   <button onClick={handleUpdateUser}>Save</button>
//                   <button onClick={() => setEditUserId(null)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <p>ID: {user.id}</p>
//                   <p>Email: {user.email}</p>
//                   <button onClick={() => handleEditClick(user)}>Edit</button>
//                   <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                 </>
//               )}
//             </li>
//           ))
//         ) : (
//           <p>No users available</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Users;





// // Importing necessary libraries
// import React, { useEffect, useState } from 'react';

// // Define a functional component called Users
// const Users: React.FC = () => {
//   // State variables to manage data, loading status, and errors
//   const [users, setUsers] = useState<any[]>([]); // Stores the list of users
//   const [loading, setLoading] = useState(true); // Indicates if data is still loading
//   const [error, setError] = useState<string | null>(null); // Stores any error message

//   // useEffect runs when the component loads
//   useEffect(() => {
//     // Fetch data from the backend
//     fetch('http://localhost:5000/users') // Call the API endpoint
//       .then((response) => response.json()) // Convert the response to JSON
//       .then((data) => {
//         setUsers(data); // Save the data in the state
//         setLoading(false); // Loading is done
//       })
//       .catch((error) => {
//         setError('Error fetching data'); // Save the error message
//         setLoading(false); // Loading is done, but with an error
//         console.error('Error fetching users:', error); // Log the error to the console
//       });
//   }, []); // Empty array means this only runs once when the component loads

//   // Return the UI for the Users component
//   return (
//     <div>
//       {/* Add some space at the top for styling */}
//       <div style={{ paddingTop: '2000px' }}></div>

//       {/* Show loading message if data is still being fetched */}
//       {loading && <p>Loading...</p>}

//       {/* Show error message if something went wrong */}
//       {error && <p>{error}</p>}

//       {/* Display a title */}
//       <h1>User List (src/users.tsx)</h1>

//       {/* Show the list of users if data is available */}
//       <ul>
//         {users.length > 0 ? (
//           // If users exist, map through them and display their info
//           users.slice().reverse().map((user) => (
//             <li key={user.id}> {/* Unique key for each user */}
//               <p>ID: {user.id}</p> {/* User ID */}
//               <p>Email: {user.email}</p> {/* User email */}
//               <p>Password: {user.password}</p> {/* User password (shouldn’t be shown in real apps) */}
//               <p>Hashed Password: {user.hashedPassword}</p> {/* Encrypted password */}
//               <p>Profile Image: {user.profileImage}</p> {/* Profile picture URL */}
//               <p>Date Joined: {user.dateJoined}</p> {/* When the user joined */}
//             </li>
//           ))
//         ) : (
//           // If no users are available, show a message
//           <p>No users available</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// // Export the Users component so it can be used elsewhere
// export default Users;



