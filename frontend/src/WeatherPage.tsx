// src/components/WeatherPage.tsx
import React from 'react';
import WeatherWidget from './components/weather-widget';

const WeatherPage: React.FC = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4">Weather Information</h1>
      <p className="lead">Get up-to-date weather forecasts right here!</p>
      
      {/* Weather Widget */}
      <WeatherWidget />

      {/* Footer */}
      <footer className="mt-5">
        <p className="text-muted">© 2025 Total Wellness. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WeatherPage;
