import React, { useEffect, useState } from 'react';

interface Weather {
  description: string;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location via geolocation
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        // Fetch current weather data from OpenWeather API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=d15b612f110c0953feeee4fa5836bc10`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);

        // Fetch 5-day forecast data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=d15b612f110c0953feeee4fa5836bc10`
        );
        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);

        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-widget">
      {loading ? (
        <div className="spinner-rainbow"></div> // Show spinner while loading
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* Current Weather Display */}
          <h3>{weatherData.name}</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} mph</p>

          {/* 5-Day Forecast Accordion */}
          <div className="accordion" id="forecastAccordion">
            {forecastData.list.slice(0, 5).map((forecast: any, index: number) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index}`}
                  >
                    Day {index + 1} - {new Date(forecast.dt_txt).toLocaleDateString()}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#forecastAccordion"
                >
                  <div className="accordion-body">
                    <p>Temperature: {forecast.main.temp}°F</p>
                    <p>Weather: {forecast.weather[0].description}</p>
                    <p>Wind Speed: {forecast.wind.speed} mph</p>
                    <p>Humidity: {forecast.main.humidity}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;





// import React, { useEffect, useState } from 'react';

// interface Weather {
//   description: string;
//   icon: string;
// }

// const WeatherWidget: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         // Get user's location via geolocation
//         const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject);
//         });

//         const { latitude, longitude } = position.coords;

//         // Fetch weather data from OpenWeather API
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=d15b612f110c0953feeee4fa5836bc10`
//         );
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch weather data');
//         }

//         const data = await response.json();
//         setWeatherData(data);
//         setLoading(false); // Set loading to false when data is fetched
//       } catch (err) {
//         setError('Error fetching weather data');
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, []);

//   return (
//     <div className="weather-widget">
//       {loading ? (
//         <div className="spinner-rainbow"></div> // Show spinner while loading
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div>
//           <h3>{weatherData.name}</h3>
//           <p>{weatherData.weather[0].description}</p>
//           <p>Temperature: {weatherData.main.temp}°F</p>
//           <p>Humidity: {weatherData.main.humidity}%</p>
//           <p>Wind Speed: {weatherData.wind.speed} mph</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeatherWidget;






// import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap styles

// const WeatherWidget: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [airQuality, setAirQuality] = useState<any>(null);
//   const [forecastData, setForecastData] = useState<any>(null);
//   const [uvIndex, setUvIndex] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchWeather = async () => {
//     setLoading(true);
//     try {
//       const API_KEY = 'd15b612f110c0953feeee4fa5836bc10';
      
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;

//         // Fetch current weather data with imperial units
//         const weatherResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
//         );
//         const weatherData = await weatherResponse.json();

//         // Fetch air quality data
//         const airQualityResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//         );
//         const airQualityData = await airQualityResponse.json();

//         // Fetch 5-day forecast data with imperial units
//         const forecastResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
//         );
//         const forecastData = await forecastResponse.json();

//         // Fetch UV Index data
//         const uvIndexResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//         );
//         const uvIndexData = await uvIndexResponse.json();

//         // Set all the fetched data to state
//         setWeatherData(weatherData);
//         setAirQuality(airQualityData);
//         setForecastData(forecastData);
//         setUvIndex(uvIndexData.value);
//         setLoading(false);
//       });
//     } catch (error) {
//       setError('Could not fetch weather data');
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   if (loading) return <p>Loading weather data...</p>;
//   if (error) return <p>{error}</p>;

//   return weatherData ? (
//     <div className="weather-widget p-4 bg-light rounded shadow" style={{ width: '350px', textAlign: 'center' }}>
//       <h2>Current Weather</h2>
//       <p><strong>{weatherData.name}</strong></p>
//       <p>{weatherData.weather[0].description}</p>
//       <p><strong>Temperature:</strong> {weatherData.main.temp}°F</p>
//       <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
//       <p><strong>Wind Speed:</strong> {weatherData.wind.speed} mph</p>
      
//       {/* Display Air Quality */}
//       {airQuality && (
//         <div>
//           <h4>Air Quality Index (AQI)</h4>
//           <p><strong>AQI:</strong> {airQuality.list[0].main.aqi}</p>
//         </div>
//       )}

//       {/* Display UV Index */}
//       {uvIndex && (
//         <div>
//           <h4>UV Index</h4>
//           <p><strong>UV Index:</strong> {uvIndex}</p>
//         </div>
//       )}

//       {/* 5-Day Forecast in an Accordion */}
//       {forecastData && (
//         <div>
//           <h4>5-Day Forecast</h4>
//           <div className="accordion" id="forecastAccordion">
//             {forecastData.list.slice(0, 5).map((forecast: any, index: number) => (
//               <div className="accordion-item" key={index}>
//                 <h2 className="accordion-header" id={`heading${index}`}>
//                   <button
//                     className="accordion-button"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target={`#collapse${index}`}
//                     aria-expanded="true"
//                     aria-controls={`collapse${index}`}
//                   >
//                     {new Date(forecast.dt * 1000).toLocaleDateString()}
//                   </button>
//                 </h2>
//                 <div
//                   id={`collapse${index}`}
//                   className="accordion-collapse collapse"
//                   aria-labelledby={`heading${index}`}
//                   data-bs-parent="#forecastAccordion"
//                 >
//                   <div className="accordion-body">
//                     <p><strong>Temp:</strong> {forecast.main.temp}°F</p>
//                     <p>{forecast.weather[0].description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   ) : (
//     <p>Unable to display weather data.</p>
//   );
// };

// export default WeatherWidget;





// import React, { useState, useEffect } from 'react';

// const WeatherWidget: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [airQuality, setAirQuality] = useState<any>(null);
//   const [forecastData, setForecastData] = useState<any>(null);
//   const [uvIndex, setUvIndex] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchWeather = async () => {
//     setLoading(true);
//     try {
//       const API_KEY = 'd15b612f110c0953feeee4fa5836bc10';
      
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;

//         // Fetch current weather data
//         const weatherResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
//         );
//         const weatherData = await weatherResponse.json();

//         // Fetch air quality data
//         const airQualityResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//         );
//         const airQualityData = await airQualityResponse.json();

//         // Fetch 5-day forecast data
//         const forecastResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
//         );
//         const forecastData = await forecastResponse.json();

//         // Fetch UV Index data
//         const uvIndexResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//         );
//         const uvIndexData = await uvIndexResponse.json();

//         // Set all the fetched data to state
//         setWeatherData(weatherData);
//         setAirQuality(airQualityData);
//         setForecastData(forecastData);
//         setUvIndex(uvIndexData.value);
//         setLoading(false);
//       });
//     } catch (error) {
//       setError('Could not fetch weather data');
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   if (loading) return <p>Loading weather data...</p>;
//   if (error) return <p>{error}</p>;

//   return weatherData ? (
//     <div className="weather-widget p-4 bg-light rounded shadow" style={{ width: '350px', textAlign: 'center' }}>
//       <h2>Current Weather</h2>
//       <p><strong>{weatherData.name}</strong></p>
//       <p>{weatherData.weather[0].description}</p>
//       <p><strong>Temperature:</strong> {weatherData.main.temp}°F</p>
//       <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
//       <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
      
//       {/* Display Air Quality */}
//       {airQuality && (
//         <div>
//           <h4>Air Quality Index (AQI)</h4>
//           <p><strong>AQI:</strong> {airQuality.list[0].main.aqi}</p>
//         </div>
//       )}

//       {/* Display UV Index */}
//       {uvIndex && (
//         <div>
//           <h4>UV Index</h4>
//           <p><strong>UV Index:</strong> {uvIndex}</p>
//         </div>
//       )}

//       {/* 5-Day Forecast */}
//       {forecastData && (
//         <div>
//           <h4>5-Day Forecast</h4>
//           {forecastData.list.slice(0, 5).map((forecast: any, index: number) => (
//             <div key={index}>
//               <p><strong>{new Date(forecast.dt * 1000).toLocaleDateString()}</strong></p>
//               <p>Temp: {forecast.main.temp}°F</p>
//               <p>{forecast.weather[0].description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   ) : (
//     <p>Unable to display weather data.</p>
//   );
// };

// export default WeatherWidget;





// import React, { useState, useEffect } from 'react';

// interface WeatherData {
//   temperature: number;
//   condition: string;
//   city: string;
// }

// const WeatherWidget = () => {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWeather = async (latitude: number, longitude: number) => {
//       try {
//         // Replace with your OpenWeatherMap API key
//         const apiKey = 'd15b612f110c0953feeee4fa5836bc10';
//         const unit = 'imperial'; // Use 'imperial' for Fahrenheit
//         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Failed to fetch weather data');
//         }
//         const data = await response.json();

//         const weatherData: WeatherData = {
//           temperature: data.main.temp,



//           condition: data.weather[0].description,
//           city: data.name,
//         };

//         setWeather(weatherData);
//         setLoading(false);
//       } catch (error: any) {
//         setError('Failed to load weather');
//         setLoading(false);
//       }
//     };

//     const getGeolocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             fetchWeather(latitude, longitude);
//           },
//           (error) => {
//             setError('Geolocation error: ' + error.message);
//             setLoading(false);
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by this browser.');
//         setLoading(false);
//       }
//     };

//     getGeolocation();
//   }, []);

//   if (loading) return <div>Loading weather...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="weather-widget">
//       <h3>Weather in {weather?.city}</h3>
//       <p>Temperature: {weather?.temperature}°C</p>
//       <p>Condition: {weather?.condition}</p>
//      </div>
    
//   );
// };

// export default WeatherWidget;
