import React, { useEffect, useState } from 'react';
import Graph from '../components/Graph';
import Sensor from '../components/Sensor';
import { getAQIColor, getAQIDescriptor } from '../utils/aqi';
import useSensors from '../hooks/useSensors';

function Home() {
    const [sensorData, sensorDataWithAQI] = useSensors();

    console.log(sensorDataWithAQI);

    const aqi = sensorDataWithAQI.AQI;

    console.log(aqi);

    const [values, setValues] = useState<number[]>(() =>
      [...Array(50)].map((x, i) => 0)
    );

    useEffect(() => {
      const t = setInterval(() => {
        const newValues = values;
        newValues.slice(1);
        newValues.push(aqi);
        setValues(newValues);
      }, 250);

      return () => {
        clearInterval(t);
      };
    }, [aqi]);
    

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
                    <Graph values={values} />
                </div>
            </div>
            <div className="divide-y divide-black">
                {["O3", "PM10", "PM25", "NO2", "SO2", "CO"].map(x => (
                    // @ts-ignore
                    <Sensor name={sensorName[x]} value={sensorData[x]} unit={sensorUnit[x]} aqi={sensorDataWithAQI[x]} />
                ))}
            </div>
        </div>
    )
}

const sensorUnit = {
    O3: "ppm",
    PM10: "μg/m\xB3",
    PM25: "μg/m\xB3",
    NO2: "ppb",
    SO2: "ppb",
    CO: "ppm"
}

const sensorName = {
    O3: "O₃",
    PM10: "PM10",
    PM25: "PM2.5",
    NO2: "NO₂",
    SO2: "SO₂",
    CO: "CO"
}

export default Home;