import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetchWeatherData from './WeatherApi';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const WeatherItem = styled.div`
  margin: 10px 0;
  font-size: 1.2rem;
  color: #555;
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;


const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await fetchWeatherData(''); 
                setWeatherData(data);
            } catch (error) {
                setError('Failed to fetch weather data');
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return <Error>{error}</Error>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Title>Weather in {weatherData.name}</Title>
            <WeatherInfo>
                <WeatherIcon src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
                <WeatherItem>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</WeatherItem>
                <WeatherItem>Humidity: {weatherData.main.humidity}%</WeatherItem>
                <WeatherItem>Pressure: {weatherData.main.pressure} hPa</WeatherItem>
                <WeatherItem>Condition: {weatherData.weather[0].description}</WeatherItem>
            </WeatherInfo>
        </Container>
    );
};

export default Weather;
