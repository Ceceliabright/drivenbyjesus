//src/components/WeatherPage.tsx
import React from 'react';
import WeatherWidget from './components/weather-widget';

const WeatherPage: React.FC = () => {
  return (
      <div
        style={{
          color: 'white',

          backgroundImage: 'url("/images/beachJesus.png ")',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundAttachment: 'fixed',
          border: '1px solid white', /* Thin white border */
          borderRadius: '8px', /* Rounded corners */
          padding: '10px', /* Optional padding for better spacing */
          minHeight: '100vh',
          width: '100vw',
          position: 'relative',
          backgroundRepeat: 'no-repeat',
          paddingTop: '820px', // 👈 Add this line (adjust the number as needed)
          // filter: 'blur(5px)',
        }}
      >

 {/* Scripture Verses */}
 <div
        style={{
          marginTop: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '15px',
          textAlign: 'center',
          fontSize: '1.1rem',
          maxWidth: '500px',
        }}
      >
        
        <p style={{ marginTop: '10px' }}>
          <strong>Psalm 19:1:</strong> <br />
          "The heavens declare the glory of God; the skies proclaim the work of His hands."
        </p>
      </div>

    <div className="container text-center py-5">
      <h1 className="display-4" style={{ color: 'white' }}>Weather Information</h1>
      <p className="lead" style={{ color: 'white' }}>Get up-to-date weather forecasts right here and plan your outdoor activities!</p>
      
      {/* Weather Widget */}
      <h1 className="display-4" style={{ color: 'white' }}>Weather Widget</h1>
      <WeatherWidget />

      {/* Footer */}
      <footer className="mt-5">
        <p className="text-muted">© 2025 Total Wellness. </p>Stay blessed and weather-ready!
      </footer>
    </div>
    </div>
  );
};

export default WeatherPage; 

