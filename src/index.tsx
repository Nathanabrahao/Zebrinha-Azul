import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Weather, Traffic, TrafficResource } from './Components/entities';
import "reflect-metadata";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();


createConnection({
  type: 'mssql',
  host: 'localhost',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  synchronize: true,
  logging: true,
  entities: [Weather, Traffic, TrafficResource]
}).then(async connection => {
  console.log('Connected to the database');

  const weatherRepository = connection.getRepository(Weather);
  const trafficRepository = connection.getRepository(Traffic);
  const trafficResourceRepository = connection.getRepository(TrafficResource);

}).catch(error => console.log(error));