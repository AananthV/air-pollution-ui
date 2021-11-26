import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import { getAQIColor, getAQIDescriptor } from "../utils/aqi";

interface SensorParams {
  name: string;
  value: number;
  unit: string;
  aqi: number;
}

interface SensorHeaderParams extends SensorParams {
  toggleOpen: () => void;
}

function SensorHeader({
  name,
  value,
  unit,
  aqi,
  toggleOpen,
}: SensorHeaderParams) {
  return (
    <div
      className="flex flex-row justify-between items-center text-2xl p-2"
      style={{ backgroundColor: getAQIColor(aqi) }}
      onClick={toggleOpen}
    >
      <div>{name}</div>
      <div>
        {value} {unit}
      </div>
    </div>
  );
}

function SensorInfo({ name, value, unit, aqi }: SensorParams) {
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
    <div className="px-2 py-4 bg-gray-200 flex flex-col items-center">
      <div className="flex flex-row items-center">
        <div className="flex flex-row justify-center items-start w-6/12">
          <div className="text-4xl">{aqi}</div>
          <div>AQI</div>
        </div>
        <div className="text-center w-6/12 pl-2">
          <div>{getAQIDescriptor(aqi)}</div>
        </div>
      </div>
      <div className="mt-4">
        <Graph values={values} />
      </div>
    </div>
  );
}

function Sensor(params: SensorParams) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div>
      <SensorHeader {...params} toggleOpen={toggleOpen} />
      {open && <SensorInfo {...params} />}
    </div>
  );
}

export default Sensor;
