import SensorData, { SensorDataWithAQI } from "../interfaces/SensorData";

export function getAQIDescriptor(aqi: number) {
    if (aqi < 50) {
        return "Good";
    } else if (aqi < 100) {
        return "Moderate";
    } else if (aqi < 150) {
        return "Unhealthy for Sensitive Groups";
    } else if (aqi < 200) {
        return "Unhealthy";
    } else if (aqi < 300) {
        return "Very Unhealthy";
    } else {
        return "Hazardous";
    }
}

export function getAQIColor(aqi: number) {
    if (aqi < 50) {
        return "rgb(0, 228, 0)";
    } else if (aqi < 100) {
        return "rgb(255, 255, 0)";
    } else if (aqi < 150) {
        return "rgb(255, 126, 0)";
    } else if (aqi < 200) {
        return "rgb(255, 0, 0)";
    } else if (aqi < 300) {
        return "rgb(143, 63, 151)";
    } else {
        return "rgb(126, 0, 35)";
    }
}

export function processSensorData(sensorData: SensorData): SensorDataWithAQI {
    const sensorDataWithAQI: Record<string, number> = {}

    Object.entries(sensorData).forEach(([sensorName, value]) => {
        let i = 0;
        while (BREAKPOINTS[sensorName][i] < value) i++;

        sensorDataWithAQI[sensorName] = calculateAQI(
            value, 
            BREAKPOINTS[sensorName][i + 1],
            BREAKPOINTS[sensorName][i],
            INDICES[i + 1],
            INDICES[i]
        )
    });

    sensorDataWithAQI['AQI'] = Math.max(...Object.values(sensorDataWithAQI));

    // @ts-ignore
    return sensorDataWithAQI;
}

function calculateAQI(c: number, bp_hi: number, bp_lo: number, i_hi: number, i_lo: number): number {
    return i_lo + (i_hi - i_lo) * (c - bp_lo) / (bp_hi - bp_lo)
}

const INDICES = [0, 50, 100, 150, 200, 300, 400, 500]
const BREAKPOINTS: Record<string, number[]> = {
    O3: [0, 0.054, 0.070, 0.085, 0.105, 0.200, 0.400, 0.600],
    PM10: [0, 54, 154, 254, 354, 424, 504, 604],
    PM25: [0, 12, 35.4, 55.4, 150.4, 250.4, 350.4, 500.4],
    NO2: [0, 53, 100, 360, 649, 1249, 1649, 2049],
    SO2: [0, 35, 75, 185, 304, 604, 804, 1004],
    CO: [0, 4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4],
}