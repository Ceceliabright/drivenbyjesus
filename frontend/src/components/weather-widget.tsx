import React, { useEffect, useState } from 'react';

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<Record<string, any[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const groupForecastByDay = (list: any[]) => {
    return list.reduce((acc: any, curr: any) => {
      const date = new Date(curr.dt_txt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
  };

  const getWeatherEmoji = (description: string) => {
    const weatherEmojis: Record<string, string> = {
      clear: "☀️",
      clouds: "☁️",
      rain: "🌧️",
      thunderstorm: "⛈️",
      drizzle: "💧",
      snow: "❄️",
      mist: "🌫️",
      smoke: "💨",
      haze: "🌫️",
      dust: "🌪️",
      fog: "🌫️",
      sand: "🏜️",
      ash: "🌋",
      squall: "💨",
      tornado: "🌪️",
    };

    const key = Object.keys(weatherEmojis).find((k) => description.toLowerCase().includes(k));
    return key ? weatherEmojis[key] : "🌤️"; // Default to a partly sunny emoji
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        // Fetch current weather data
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
        setForecastData(groupForecastByDay(forecastData.list));

        setLoading(false);
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
        <div className="spinner"></div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* Current Weather */}
          <h3>{weatherData.name}</h3>
          <p>Sunrise: {formatTime(weatherData.sys.sunrise)}</p>
          <p>Sunset: {formatTime(weatherData.sys.sunset)}</p>
          <p>
            Current: {getWeatherEmoji(weatherData.weather[0].description)} {weatherData.weather[0].description}
          </p>
          <p>Temperature: {weatherData.main.temp}°F</p>
          <p>High Temp: {weatherData.main.temp_max}°F</p>
          <p>Low Temp: {weatherData.main.temp_min}°F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} mph</p>

          {/* 5-Day Forecast Accordion */}
          <h4>5-Day Forecast</h4>
          <div className="accordion" id="forecastAccordion">
            {forecastData &&
              Object.entries(forecastData).map(([date, forecasts]: [string, any[]], index: number) => (
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
                      {date}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#forecastAccordion"
                  >
                    <div className="accordion-body">
                      {forecasts.map((hourlyForecast: any, idx: number) => (
                        <div key={idx}>
                          <h5>{new Date(hourlyForecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
                          <p>
                            {getWeatherEmoji(hourlyForecast.weather[0].description)} {hourlyForecast.weather[0].description}
                          </p>
                          <p>Temperature: {hourlyForecast.main.temp}°F</p>
                          <p>Wind Speed: {hourlyForecast.wind.speed} mph</p>
                          <p>Humidity: {hourlyForecast.main.humidity}%</p>
                        </div>
                      ))}
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

