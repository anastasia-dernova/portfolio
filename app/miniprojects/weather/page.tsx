'use client';
import { useState } from 'react';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: [{
    description: string;
    icon: string;
  }];
  wind: {
    speed: number;
  };
  cod: number;
}

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';
    
    if (!apiKey) {
      setError('API key is missing. Please check your environment configuration.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod !== 200) {
        setError(data.message || 'Error fetching weather data');
        setWeather(null);
        return;
      }
      
      setWeather(data);
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeather(null);
      console.error(error); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">
          Weather Dashboard
        </h1>
        
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
            placeholder="Enter city name..."
            className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-500">
            Loading...
          </div>
        )}

        {weather && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-5xl font-bold">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-gray-500 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>
              <div className="space-y-2">
                <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;