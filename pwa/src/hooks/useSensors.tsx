import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config';
import SensorData, { SensorDataWithAQI } from '../interfaces/SensorData';
import { processSensorData } from "../utils/aqi";

function useSensors() : [SensorData, SensorDataWithAQI] {
    const [sensorDataWithAQI, setSensorDataWithAQI] = useState<SensorDataWithAQI>(() => ({
        O3: 0,
        PM10: 0,
        PM25: 0,
        NO2: 0,
        SO2: 0,
        CO: 0,
        AQI: 0,
    }));

    const [sensorData, setSensorData] = useState<SensorData>(() => ({
        O3: 0,
        PM10: 0,
        PM25: 0,
        NO2: 0,
        SO2: 0,
        CO: 0
    }));

    useEffect(() => {

        const socket = io(SOCKET_URL);

        socket.on("sensorUpdate", (sensorData: SensorData) => {
            const sensorDataWithAQI = processSensorData(sensorData);
            setSensorData(sensorData);
            setSensorDataWithAQI(sensorDataWithAQI);
        });

        return () => {
            socket.close();
        }
    }, [])

    return [sensorData, sensorDataWithAQI]
}

export default useSensors;