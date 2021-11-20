import React from 'react';
import Graph from '../components/Graph';
import Sensor from '../components/Sensor';
import { getAQIColor, getAQIDescriptor } from '../utils/aqi';

function Home() {
    const aqi = 126;

    return (
        <div>
            <div className="my-8 px-2 py-4 flex flex-col items-center">
                <div className="flex flex-row items-center">
                    <div className="flex flex-row justify-end items-start w-6/12">
                        <div className="text-8xl" style={{color: getAQIColor(aqi)}}>{aqi}</div>
                    </div>
                    <div className="w-6/12 pl-2 pr-14">
                        <div>Air Quality Index</div>
                        <strong>{getAQIDescriptor(aqi)}</strong>
                    </div>
                </div>
                <div className="mt-4">
                    <Graph values={[...Array(50)].map((x, i) => (Math.sin(i / 5) + 1) * 250)} />
                </div>
            </div>
            <div className="divide-y divide-black">
                {[1, 2, 3, 4, 5, 6].map(x => (
                    <Sensor name="Abcd" value={15} unit="ppm" aqi={x * 50} />
                ))}
            </div>
        </div>
    )
}

export default Home;