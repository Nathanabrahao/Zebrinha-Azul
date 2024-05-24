import React, { useState } from 'react';
import './App.css';
import fetchWeatherData from './Components/Weather/WeatherApi';
import weatherTranslations from './Components/Weather/WeatherTranslation';
import fetchTrafficData from './Components/Traffic/TrafficAPI';

interface WeatherData {
  main: {
    temp: number;
    [key: string]: any;
  };
  weather: {
    description: string;
    icon: string;
    [key: string]: any;
  }[];
  name: string;
  [key: string]: any;
}

interface GeocodePoint {
  coordinates: number[];
  calculationMethod: string;
}

interface TrafficResource {
  name: string;
  trafficCongestion: string;
  geocodePoints: GeocodePoint[];
  [key: string]: any;
}

interface TrafficData {
  resourceSets: {
    resources: TrafficResource[];
    [key: string]: any;
  }[];
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [groupedGeocodePoints, setGroupedGeocodePoints] = useState<{ [key: string]: GeocodePoint[] }>({});
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const weatherData: WeatherData = await fetchWeatherData(city);
      const trafficData: TrafficData = await fetchTrafficData(city);
      setWeatherData(weatherData);
      setTrafficData(trafficData);
      
      const groupedGeocodePoints = trafficData.resourceSets[0].resources.reduce<{ [key: string]: GeocodePoint[] }>((acc, resource) => {
        resource.geocodePoints.forEach((point) => {
          if (!acc[point.calculationMethod]) {
            acc[point.calculationMethod] = [];
          }
          if (!acc[point.calculationMethod].find((p) => p.coordinates.join(',') === point.coordinates.join(','))) {
            acc[point.calculationMethod].push(point);
          }
        });
        return acc;
      }, {});
      
      setGroupedGeocodePoints(groupedGeocodePoints);
      setError(null);
    } catch (error) {
      setError('Desculpa, não consegui encontrar, tenha certeza que tenha digitado corretamente o nome do Estado');
      setWeatherData(null);
      setTrafficData(null);
      setGroupedGeocodePoints({});
    }
  };

  const translateDescription = (description: string): string => {
    return weatherTranslations[description] || description;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='search'>Localizar clima e tráfego na Zebrinha Azul</h1>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            className="City__search"
            alt="Barra de pesquisa"
            value={city}
            onChange={handleSearchChange}
          />
          <button type="submit">Pesquisar</button>
        </form>
      </header>

      {error && <p className="error">{error}</p>}

      <div className="content-container">
        <div className="weather-content">
          {weatherData ? (
            <div className='card__weather'>
              <p className='weather__temp'>A temperatura em {weatherData.name}: {weatherData.main.temp}°C</p>
              <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
                className="weather-icon"
              />
              <p className='weather__conditions'>Condições: {translateDescription(weatherData.weather[0].description)}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="traffic-content">
          {trafficData ? (
            <div className='card__traffic'>
              <p>A localização solicitada em: {city} possui as seguintes coordenadas:</p>
              {Object.keys(groupedGeocodePoints).length > 0 ? (
                Object.keys(groupedGeocodePoints).map((method) => (
                  <div key={method}>
                    <p>Calculation Method: {method}</p>
                    {groupedGeocodePoints[method].map((point, index) => (
                      <p key={index}>Coordinates: {point.coordinates.join(', ')}</p>
                    ))}
                  </div>
                ))
              ) : (
                <p>Não há informações de tráfego disponíveis.</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
