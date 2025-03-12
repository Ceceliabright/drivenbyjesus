import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const [verse, setVerse] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomVerse = async () => {
    setLoading(true);
    try {
      // Call the mock server API to get all Bible verses
      const response = await fetch('http://localhost:5000/bibleVersesLove');
      if (!response.ok) {
        throw new Error('Failed to fetch Bible verses');
      }
      const data = await response.json();

      // Pick a random verse from the array
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomVerse = data[randomIndex];

      setVerse(randomVerse.verse);
      setReference(randomVerse.reference);
      setLoading(false);
    } catch (error) {
      setError('Error fetching Bible verse');
      console.error(error);
      setLoading(false);
    }
  };

  // Initial fetch for the random verse when the component mounts
  useEffect(() => {
    fetchRandomVerse();
  }, []);

  return (
    <div className="container text-center py-5" style={{ background: 'linear-gradient(45deg,rgb(137, 158, 150),rgb(93, 151, 160))' }}>
      {/* Main Headline */}
      <h1 className="display-4 text-white">Welcome to Total Wellness</h1>
      <p className="lead text-white">Your journey towards holistic well-being starts here.</p>

      {/* Service Highlights */}
      <div className="my-5">
        <h2 className="h3 text-white">Our Features</h2>
        <ul className="list-unstyled text-white">
          <li>- Track your Gratitude and Prayers</li>
          <li>- Stay motivated with daily reflections</li>
          <li>- Manage your wellness goals effortlessly</li>
        </ul>
      </div>

      {/* Bible Verse of the Day */}
      <div
        id="dailyVersesWrapper"
        className="bg-white p-4 rounded shadow-sm mb-4"
        style={{ fontStyle: 'italic', fontSize: '1.1em' }}
      >
        {loading ? (
          <p>Loading daily Bible verse...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <p>"{verse}"</p>
            <p>
              <strong>- {reference}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Button to refresh the Bible verse */}
      <button
        onClick={fetchRandomVerse}
        className="btn btn-success btn-lg mx-2 my-4"
        style={{ width: '250px' }}
      >
        Get New Verse
      </button>

      {/* Call to Action: Sign Up / Login */}
      <div>
        <button className="btn btn-success btn-lg mx-2 my-2" style={{ width: '250px' }}>
          <Link to="/signup" className="text-white text-decoration-none">
            Get Started
          </Link>
        </button>

        <button className="btn btn-primary btn-lg mx-2 my-2" style={{ width: '250px' }}>
          <Link to="/signin" className="text-white text-decoration-none">
            Already Have an Account?
          </Link>
        </button>
      </div>

      {/* Footer Links */}
      <footer className="mt-5">
        <p className="text-muted">© 2025 Total Wellness. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const WelcomePage: React.FC = () => {
//   const [verse, setVerse] = useState<string>('');
//   const [reference, setReference] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRandomVerse = async () => {
//     setLoading(true);
//     try {
//       // Call the mock server API to get all Bible verses
//       const response = await fetch('http://localhost:5000/bibleVersesLove');
//       if (!response.ok) {
//         throw new Error('Failed to fetch Bible verses');
//       }
//       const data = await response.json();

//       // Pick a random verse from the array
//       const randomIndex = Math.floor(Math.random() * data.length);
//       const randomVerse = data[randomIndex];

//       setVerse(randomVerse.verse);
//       setReference(randomVerse.reference);
//       setLoading(false);
//     } catch (error) {
//       setError('Error fetching Bible verse');
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   // Initial fetch for the random verse when the component mounts
//   useEffect(() => {
//     fetchRandomVerse();
//   }, []);

//   return (
//     <div
//       style={{
//         textAlign: 'center',
//         padding: '50px 20px',
//         background: 'linear-gradient(45deg, #ffafcc, #ffb3ff)',
//         color: '#333',
//       }}
//     >
//       {/* Main Headline */}
//       <h1>Welcome to Total Wellness</h1>
//       <p>Your journey towards holistic well-being starts here.</p>

//       {/* Service Highlights */}
//       <div style={{ margin: '40px 0' }}>
//         <h2>Our Features</h2>
//         <p>
//           - Track your Gratitude and Prayers<br />
//           - Stay motivated with daily reflections<br />
//           - Manage your wellness goals effortlessly
//         </p>
//       </div>

//       {/* Bible Verse of the Day */}
//       <div
//         id="dailyVersesWrapper"
//         style={{
//           margin: '40px auto',
//           padding: '20px',
//           background: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           fontStyle: 'italic',
//           fontSize: '1.2em',
//         }}
//       >
//         {loading ? (
//           <p>Loading daily Bible verse...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <div>
//             <p>"{verse}"</p>
//             <p>
//               <strong>- {reference}</strong>
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Button to refresh the Bible verse */}
//       <div>
//         <button
//           onClick={fetchRandomVerse}
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#FF5733',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '20px 10px',
//           }}
//         >
//           Get New Verse
//         </button>
//       </div>

//       {/* Call to Action: Sign Up / Login */}
//       <div>
//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
//             Get Started
//           </Link>
//         </button>

//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>
//             Already Have an Account?
//           </Link>
//         </button>
//       </div>

//       {/* Footer Links */}
//       <footer style={{ marginTop: '40px' }}>
//         <p style={{ color: '#777' }}>© 2025 Total Wellness. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default WelcomePage;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const WelcomePage: React.FC = () => {
//   const [verse, setVerse] = useState<string>('');
//   const [reference, setReference] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchRandomVerse = async () => {
//     setLoading(true);
//     try {
//       // Example API to get a random verse

//       const response = await fetch('http://localhost:5000/bibleVerses/1');
//       if (!response.ok) {
//         throw new Error('Failed to fetch random verse');
//       }
//       const data = await response.json();
//       setVerse(data.text);
//       setReference(data.reference);
//       setLoading(false);
//     } catch (error) {
//       setError('Error fetching  a backend Bible verse');
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   // Initial fetch for the random verse when the component mounts
//   useEffect(() => {
//     fetchRandomVerse();
//   }, []);

//   return (
//     <div
//       style={{
//         textAlign: 'center',
//         padding: '50px 20px',
//         background: 'linear-gradient(45deg, #ffafcc, #ffb3ff)',
//         color: '#333',
//       }}
//     >
//       {/* Main Headline */}
//       <h1>Welcome to Total Wellness</h1>
//       <p>Your journey towards holistic well-being starts here.</p>

//       {/* Service Highlights */}
//       <div style={{ margin: '40px 0' }}>
//         <h2>Our Features</h2>
//         <p>
//           - Track your Gratitude and Prayers<br />
//           - Stay motivated with daily reflections<br />
//           - Manage your wellness goals effortlessly
//         </p>
//       </div>

//       {/* Bible Verse of the Day */}
//       <div
//         id="dailyVersesWrapper"
//         style={{
//           margin: '40px auto',
//           padding: '20px',
//           background: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           fontStyle: 'italic',
//           fontSize: '1.2em',
//         }}
//       >
//         {loading ? (
//           <p>Loading daily Bible verse...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <div>
//             <p>"{verse}"</p>
//             <p>
//               <strong>- {reference}</strong>
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Button to refresh the Bible verse */}
//       <div>
//         <button
//           onClick={fetchRandomVerse}
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#FF5733',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '20px 10px',
//           }}
//         >
//           Get New Verse
//         </button>
//       </div>

//       {/* Call to Action: Sign Up / Login */}
//       <div>
//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
//             Get Started
//           </Link>
//         </button>

//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>
//             Already Have an Account?
//           </Link>
//         </button>
//       </div>

//       {/* Footer Links */}
//       <footer style={{ marginTop: '40px' }}>
//         <p style={{ color: '#777' }}>© 2025 Total Wellness. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default WelcomePage;





// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const WelcomePage: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   // Function to load the Bible verse script
//   const loadBibleVerse = () => {
//     setLoading(true);
//     // Remove the previous script if it exists
//     const existingScript = document.getElementById('dailyVersesScript');
//     if (existingScript) {
//       existingScript.remove();
//     }

//     // Add the script for the Bible verse dynamically
//     const script = document.createElement('script');
//     script.src = 'https://dailyverses.net/get/verse.js?language=niv';
//     script.async = true;
//     script.defer = true;
//     script.id = 'dailyVersesScript'; // Adding ID for easy removal
//     document.getElementById('dailyVersesWrapper')?.appendChild(script);

//     // Set loading to false when the script is successfully added
//     script.onload = () => {
//       setLoading(false);
//     };
//   };

//   // Initial load
//   useEffect(() => {
//     loadBibleVerse(); // Load the verse when the component mounts

//     return () => {
//       const existingScript = document.getElementById('dailyVersesScript');
//       if (existingScript) {
//         existingScript.remove(); // Cleanup when component unmounts
//       }
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         textAlign: 'center',
//         padding: '50px 20px',
//         background: 'linear-gradient(45deg, #ffafcc, #ffb3ff)',
//         color: '#333',
//       }}
//     >
//       {/* Main Headline */}
//       <h1>Welcome to Total Wellness</h1>
//       <p>Your journey towards holistic well-being starts here.</p>

//       {/* Service Highlights */}
//       <div style={{ margin: '40px 0' }}>
//         <h2>Our Features</h2>
//         <p>
//           - Track your Gratitude and Prayers<br />
//           - Stay motivated with daily reflections<br />
//           - Manage your wellness goals effortlessly
//         </p>
//       </div>

//       {/* Bible Verse of the Day */}
//       <div
//         id="dailyVersesWrapper"
//         style={{
//           margin: '40px auto',
//           padding: '20px',
//           background: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           fontStyle: 'italic',
//           fontSize: '1.2em',
//         }}
//       >
//         {loading ? <p>Loading daily Bible verse...</p> : <p>Verse will appear here.</p>}
//       </div>

//       {/* Button to refresh the Bible verse */}
//       <div>
//         <button
//           onClick={loadBibleVerse}
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#FF5733',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '20px 10px',
//           }}
//         >
//           Get New Verse
//         </button>
//       </div>

//       {/* Call to Action: Sign Up / Login */}
//       <div>
//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
//             Get Started
//           </Link>
//         </button>

//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>
//             Already Have an Account?
//           </Link>
//         </button>
//       </div>

//       {/* Footer Links */}
//       <footer style={{ marginTop: '40px' }}>
//         <p style={{ color: '#777' }}>© 2025 Total Wellness. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default WelcomePage;





// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const WelcomePage: React.FC = () => {
//   const [verse, setVerse] = useState<string>(''); // State to store the verse
//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   const fetchVerse = async () => {
//     setLoading(true);
//     setError(null); // Reset error when fetching a new verse

//     try {
//       const response = await fetch('https://bible-api.com/john%203:16'); // Example verse URL
//       if (!response.ok) {
//         throw new Error('Failed to fetch verse');
//       }
//       const data = await response.json();
//       setVerse(data.text); // Update the verse text
//     } catch (error) {
//       setError('Error fetching Bible verse');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Fetch verse when the component first loads
//     fetchVerse();

//     // Cleanup function to avoid errors when the component is unmounted
//     return () => {
//       setVerse(''); // Clear the verse when the component is unmounted
//       setLoading(false); // Reset loading state
//       setError(null); // Reset any error states
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         textAlign: 'center',
//         padding: '50px 20px',
//         background: 'linear-gradient(45deg, #ffafcc, #ffb3ff)',
//         color: '#333',
//       }}
//     >
//       {/* Main Headline */}
//       <h1>Welcome to Total Wellness</h1>
//       <p>Your journey towards holistic well-being starts here.</p>

//       {/* Service Highlights */}
//       <div style={{ margin: '40px 0' }}>
//         <h2>Our Features</h2>
//         <p>
//           - Track your Gratitude and Prayers<br />
//           - Stay motivated with daily reflections<br />
//           - Manage your wellness goals effortlessly
//         </p>
//       </div>

//       {/* Bible Verse of the Day */}
//       <div
//         id="dailyVersesWrapper"
//         style={{
//           margin: '40px auto',
//           padding: '20px',
//           background: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           fontStyle: 'italic',
//           fontSize: '1.2em',
//         }}
//       >
//         {loading ? (
//           <p>Loading daily Bible verse...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <div>
//             <p>"{verse}"</p>
//           </div>
//         )}
//       </div>

//       {/* Button to update Bible verse */}
//       <div>
//         <button
//           onClick={fetchVerse}
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           Get New Verse
//         </button>
//       </div>

//       {/* Call to Action: Sign Up / Login */}
//       <div>
//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
//             Get Started
//           </Link>
//         </button>

//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>
//             Already Have an Account?
//           </Link>
//         </button>
//       </div>

//       {/* Footer Links */}
//       <footer style={{ marginTop: '40px' }}>
//         <p style={{ color: '#777' }}>© 2025 Total Wellness. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default WelcomePage;




// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const WelcomePage: React.FC = () => {
//   useEffect(() => {
//     // Add the script for the Bible verse dynamically
//     const script = document.createElement('script');
//     script.src = 'https://dailyverses.net/get/verse.js?language=niv';
//     script.async = true;
//     script.defer = true;
//     document.getElementById('dailyVersesWrapper')?.appendChild(script);

//     return () => {
//       // Clean up the script when the component unmounts
//       document.getElementById('dailyVersesWrapper')?.removeChild(script);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         textAlign: 'center',
//         padding: '50px 20px',
//         background: 'linear-gradient(45deg, #ffafcc, #ffb3ff)',
//         color: '#333',
//       }}
//     >
//       {/* Main Headline */}
//       <h1>Welcome to Total Wellness</h1>
//       <p>Your journey towards holistic well-being starts here.</p>

//       {/* Service Highlights */}
//       <div style={{ margin: '40px 0' }}>
//         <h2>Our Features</h2>
//         <p>
//           - Track your Gratitude and Prayers<br />
//           - Stay motivated with daily reflections<br />
//           - Manage your wellness goals effortlessly
//         </p>
//       </div>

//       {/* Bible Verse of the Day */}
//       <div
//         id="dailyVersesWrapper"
//         style={{
//           margin: '40px auto',
//           padding: '20px',
//           background: '#fff',
//           borderRadius: '10px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           fontStyle: 'italic',
//           fontSize: '1.2em',
//         }}
//       >
//         <p>Loading daily Bible verse...</p>
//       </div>

//       {/* Call to Action: Sign Up / Login */}
//       <div>
//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
//             Get Started
//           </Link>
//         </button>

//         <button
//           style={{
//             padding: '15px 30px',
//             backgroundColor: '#007BFF',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             margin: '10px',
//           }}
//         >
//           <Link to="/signin" style={{ color: 'white', textDecoration: 'none' }}>
//             Already Have an Account?
//           </Link>
//         </button>
//       </div>

//       {/* Footer Links */}
//       <footer style={{ marginTop: '40px' }}>
//         <p style={{ color: '#777' }}>© 2025 Total Wellness. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default WelcomePage;


