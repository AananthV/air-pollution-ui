import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config';
import SensorData, { SensorDataWithAQIList } from '../interfaces/SensorData';
import { processSensorData } from "../utils/aqi";

function useSensors() {
    const [sensorDataWithAQIList, setSensorDataWithAQIList] = useState<SensorDataWithAQIList>(() => ({
        O3: [1, 2, 3, 4, 5].map(x => 25),
        PM10: [1, 2, 3, 4, 5].map(x => 75),
        PM25: [1, 2, 3, 4, 5].map(x => 125),
        NO2: [1, 2, 3, 4, 5].map(x => 175),
        SO2: [1, 2, 3, 4, 5].map(x => 225),
        CO: [1, 2, 3, 4, 5].map(x => 275),
        AQI: [1, 2, 3, 4, 5].map(x => 325)
    }));

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on("sensorUpdate", (sensorData: SensorData) => {
            const sensorDataWithAQI = processSensorData(sensorData);

            Object.keys(sensorDataWithAQIList).forEach(key => {
                // @ts-ignore
                sensorDataWithAQIList[key].pop();

                // @ts-ignore
                sensorDataWithAQIList[key].push(sensorDataWithAQI[key]);
            });

            setSensorDataWithAQIList(sensorDataWithAQIList);
        });

        return () => {
            socket.close();
        }
    })

    return sensorDataWithAQIList
}

export default useSensors;