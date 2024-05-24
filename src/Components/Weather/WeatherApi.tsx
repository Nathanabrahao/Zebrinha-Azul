import axios from 'axios';


const apiUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKeyWeather = "0fdaf349e60f5a4fe7c39d596d617f7b"


const fetchWeatherData = async (city: string) => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                q: city,
                appid: apiKeyWeather,
                units: 'metric'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Não foi possivel encontrar o Clima', error);
        throw error;
    }
};



export default fetchWeatherData;