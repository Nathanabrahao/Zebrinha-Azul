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

interface TrafficResource {
  name: string;
  trafficCongestion: string;
  [key: string]: any;
}

interface TrafficData {
  resourceSets: {
    resources: TrafficResource[];
    [key: string]: any;
  }[]
}


function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const weatherData: WeatherData = await fetchWeatherData(city);
      setWeatherData(weatherData);
  
      const trafficData: TrafficData = await fetchTrafficData(city);
      setTrafficData(trafficData);
  
      setError(null);
    } catch (error) {
      setError('Desculpa, não consegui encontrar, tenha certeza que tenha digitado corretamente o nome do Estado');
      setWeatherData(null);
      setTrafficData(null);
    }
  };


  const translateDescription = (description: string): string => {
    return weatherTranslations[description] || description;
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1 className='search'>Localizar clima e trafégo na Zebrinha Azul</h1>
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
              <p>O tráfego em: {city} está:</p>
              {trafficData.resourceSets[0].resources.map((resource, index) => (
                <div key={index}>
                  <p>{resource.name}: {resource.trafficCongestion}</p>
                </div>
              ))}
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
