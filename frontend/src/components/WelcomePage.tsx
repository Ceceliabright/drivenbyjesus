import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import WeatherWidget from './weather-widget';

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
    <div>
      {/* Weather Widget */}
      <div>
        <h1>Welcome to Total Wellness App!</h1>
        {/* <WeatherWidget /> */}
      </div>

      {/* Main Content */}
      <div
        className="container text-center py-5"
        style={{ background: 'linear-gradient(45deg,rgb(137, 158, 150),rgb(93, 151, 160))' }}
      >
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
          className="bg-success p-4 rounded shadow-sm mb-4"
          style={{ fontStyle: 'italic', fontSize: '1.1em' }}
          >
          <h2 className="text-gray">What God says about how much He loves you</h2>
    
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
          More about how much God loves you
        </button>

        {/* Call to Action: Sign Up / Login */}
        <div>
          <button className="btn btn-success btn-lg mx-2 my-2" style={{ width: '250px' }}>
            <Link to="/signup" className="text-white text-decoration-none">
              Get Started
            </Link>
          </button>

          <button className="btn btn-success btn-lg mx-2 my-2" style={{ width: '250px' }}>
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
    </div>
  );
};

export default WelcomePage;