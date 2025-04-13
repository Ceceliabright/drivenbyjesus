import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WelcomePage: React.FC = () => {
  const [verse, setVerse] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);

  // Fetch a random verse from the API
  const fetchRandomVerse = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/bibleVersesLove');
      if (!response.ok) {
        throw new Error('Failed to fetch Bible verses');
      }
      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data.length);
      const randomVerse = data[randomIndex];

      setVerse(randomVerse.verse);
      setReference(randomVerse.reference);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    } catch (error) {
      setError('Error fetching Bible verse');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch verse and set up AOS animations
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
    setTimeout(() => {
      fetchRandomVerse();
    }, 500);
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url("/images/welcomebackground.jpg")',
        backgroundSize: 'cover',
        width: '100vw',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed',
        border: '1px solid white', /* Thin white border */
        borderRadius: '8px', /* Rounded corners */
        padding: '10px', /* Optional padding for better spacing */
        minHeight: '100vh',
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        paddingTop: '820px', // 👈 Add this line (adjust the number as needed)

      }}
    >
      {/* Translucent Overlay */}
      <div
        style={{
          border: '1px solid white', /* Thin white border */
          borderRadius: '8px', /* Rounded corners */
          padding: '10px', /* Optional padding for better spacing */
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(49, 69, 49, 0.9)', // Black overlay with opacity
          filter: 'blur(5px)', // Optional: blur the background
          zIndex: -1, // Make sure the overlay is behind the content
        }}
      ></div>

      <div className="container text-center py-5 py-md-4 py-lg-3" style={{ paddingBottom: '60px' }}>
        {/* Translucent Card for Welcome Text and Features */}
        <div
          className="welcome-card p-4 rounded shadow-lg"
          style={{
            background: 'rgba(0, 0, 0, 0.6)', // Translucent background
            color: 'white',
            border: '1px solid white', /* Thin white border */
            borderRadius: '8px', /* Rounded corners */
            padding: '10px', /* Optional padding for better spacing */
            animation: 'moveCard 3s ease-in-out infinite',
          }}
          data-aos="fade-up"
        >
          <h1
            className="display-4"
            data-aos="fade-down"
            style={{
              color: 'white', // Set text color to white
              fontSize: '3.5rem', // Adjust font size (use rem, em, px, or % as needed)
              fontWeight: 'bold', // Optional: Make the text bold
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' // Optional: Add a shadow for better contrast
            }}
          >
            Welcome to Total Wellness
          </h1>
          <p className="lead" data-aos="zoom-in">
            Your journey towards holistic well-being starts here.
          </p>

          <div className="my-5">
            <h2 className="h3" data-aos="fade-up">
              <h2>Our Features</h2>

              <ul className="list-unstyled" style={{ display: 'grid', gap: '16px', padding: 0 }}>
                <li
                  data-aos="fade-left"
                  data-aos-delay="1000"
                  style={{
                    border: '1px solid white',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  🌟 Enjoy holy scriptures about God's love for you. ✝️
                </li>
                <li
                  data-aos="fade-right"
                  data-aos-delay="400"
                  style={{
                    border: '1px solid white',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  📖 Build your faith by recording your prayers. 🙏
                </li>
                <li
                  data-aos="fade-left"
                  data-aos-delay="200"
                  style={{
                    border: '1px solid white',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✨ List your blessings and document your gratitude. 💝
                </li>
                <li
                  data-aos="fade-right"
                  data-aos-delay="400"
                  style={{
                    border: '1px solid white',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  📜 Stay motivated with daily reflections and faith-building prayers. 🙌
                </li>
                <li
                  data-aos="fade-left"
                  data-aos-delay="600"
                  style={{
                    border: '1px solid white',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  🏆 But seek ye first the kingdom of God, and His righteousness; and all these things shall be added unto you. 🌿
                </li>
                <li
                  data-aos="fade-right"
                  data-aos-delay="600"
                  style={{
                    border: '1px solid white',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  💪 2 Timothy 1:7: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." 🕊️
                </li>
              </ul>
            </h2>
          </div>
        </div>

        {/* Bible Verse Section */}
        <div
          id="dailyVersesWrapper"
          className={`p-4 rounded shadow-sm mb-4 mb-md-5 mb-lg-6 verse-container ${animate ? 'animate-verse' : ''
            }`}
          style={{
            fontStyle: 'italic',
            fontSize: '1.1em',
            border: '10px solid white', /* Thin white border */
            borderRadius: '10px', /* Rounded corners */
            padding: '10px', /* Optional padding for better spacing */
            backgroundColor: 'rgba(42, 74, 62, 0.5)', // Similar translucent background
            color: 'white',
            marginBottom: '60px',
            width: '80vw',
            animation: 'moveVerse 3s ease-in-out infinite', // Smooth animation for the verse
          }}
          data-aos="slide-up"
        >
          {/* <h3 className="text-light">About Love</h3> */}
          {loading ? (
            <p>Loading daily Bible verse...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div>
              <p className="verse-text">"{verse}"</p>
              <p>
                <strong>- {reference}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Button to Refresh the Bible Verse */}
        <button
          onClick={fetchRandomVerse}
          className="btn btn-light btn-lg mx-2 my-4"
          style={{
            backgroundColor: 'rgba(42, 74, 62, 0.5)', // Similar translucent background
            border: '10px solid white', /* Thin white border */
            borderRadius: '8px', /* Rounded corners */
            color: 'white',
            width: '900px',
          }}
        >
          Click Here for
          <br></br>
          More of God's love for you
        </button>

        {/* Call to Action Buttons */}
        <div>
          <button
            className="btn btn-light btn-lg mx-2 my-4"
            style={{
              backgroundColor: 'rgba(42, 74, 62, 0.5)', // Similar translucent background
              color: 'white',
              width: '300px',
            }}

          >
            <Link to="/signin" className="custom-Link">
              Login Here
            </Link>
          </button>
        </div>

        <button
          className="btn btn-light btn-lg mx-2 my-4"
          style={{
            backgroundColor: 'rgba(193, 213, 206, 0.5)', // Similar translucent background
            // color: 'green',
            width: '300px',
          }}
          data-aos="zoom-in"
        >
          <Link to="/signup" className="text-decoration-none">
            Register Here
          </Link>
        </button>

        {/* Footer */}
        <footer className="mt-5" data-aos="slide-up">
          <p className="text-muted">© 2025 Total Wellness. All rights reserved.</p>
        </footer>
      </div>

      {/* CSS Animation Styles */}
      <style>{`
        .verse-container {
          transition: transform 0.3s ease-in-out, opacity 0.5s ease-in-out;
          opacity: 1;
        }
        .animate-verse {
          transform: scale(1.1);
          opacity: 0.1;
        }
        .verse-text {
          font-size: 1.5rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        /* Translucent Card Animation */
        @keyframes moveCard {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        /* Verse Section Animation */
        @keyframes moveVerse {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .welcome-card {
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;



