import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetchTrafficData from './TrafficAPI'; 

// Definindo os estilos com styled-components
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

const TrafficInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const TrafficItem = styled.div`
  margin: 10px 0;
  font-size: 1.2rem;
  color: #555;
`;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;

// Componente Traffic
const Traffic: React.FC = () => {
    const [trafficData, setTrafficData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTraffic = async () => {
            try {
                const data = await fetchTrafficData(''); 
                setTrafficData(data);
            } catch (error) {
                setError('Failed to fetch traffic data');
            }
        };

        fetchTraffic();
    }, []);

    if (error) {
        return <Error>{error}</Error>;
    }

    if (!trafficData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Title>Traffic Information</Title>
            <TrafficInfo>
                <TrafficItem>Location: {trafficData.resourceSets[0].resources[0].name}</TrafficItem>
            </TrafficInfo>
        </Container>
    );
};

export default Traffic;
