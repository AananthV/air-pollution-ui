export default interface SensorData {
    O3: number,
    PM10: number,
    PM25: number,
    NO2: number,
    SO2: number,
    CO: number
}

export interface SensorDataWithAQI extends SensorData {
    AQI: number
}

export interface SensorDataWithAQIList {
    O3: number[],
    PM10: number[],
    PM25: number[],
    NO2: number[],
    SO2: number[],
    CO: number[],
    AQI: number[]
}