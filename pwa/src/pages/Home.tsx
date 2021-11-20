import React from 'react';
import Graph from '../components/Graph';
import Sensor from '../components/Sensor';
import { getAQIColor, getAQIDescriptor } from '../utils/aqi';
import useSensors from '../hooks/useSensors';

function Home() {
    const sensorDataWithAQIList = useSensors();

    console.log(sensorDataWithAQIList);

    const n = sensorDataWithAQIList.AQI.length;

    const aqi = sensorDataWithAQIList.AQI[n - 1];

    console.log(n, aqi);

    return (
        <div>
            <div className="my-8 px-2 py-4 flex flex-col items-center">
                <div className="flex flex-row items-center justify-center">
                    <div className="text-8xl" style={{color: getAQIColor(aqi)}}>{aqi}</div>
                    <div className="pl-2">
                        <div>Air Quality Index</div>
                        <strong>{getAQIDescriptor(aqi)}</strong>
                    </div>
                </div>
                <div className="mt-4">
                    <Graph values={[...Array(50)].map((x, i) => (Math.sin(i / 5) + 1) * 250)} />
                </div>
            </div>
            <div className="divide-y divide-black">
                {["O3", "PM10", "PM25", "NO2", "SO2", "CO"].map(x => (
                    // @ts-ignore
                    <Sensor name={x} value={15} unit="ppm" aqi={sensorDataWithAQIList[x][n - 1]} />
                ))}
            </div>
        </div>
    )
}

export default Home;