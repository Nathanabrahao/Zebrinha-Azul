import React from "react";


import axios from 'axios';


//Realiza armazenamento da chamada da API
const apiUrl = "http://dev.virtualearth.net/REST/v1/Locations";
const apiKeyTraffic = "Ag0CNv_mR7QrSkWWEtQKYjnU9ny9p8BosMgDCePa-LmWM9IT9enIVvnlP43PqLWW"


//Chamada da API para consumir
const fetchTrafficData = async (city: string) => {
    try {
        const response = await axios.get(apiUrl, {
            params: {
                q: city,
                appid: apiKeyTraffic
            },
        });
        return response.data;
    } catch (error) {
        console.error('Não foi possivel encontrar o Clima', error);
        throw error;
    }
};



export default fetchTrafficData;