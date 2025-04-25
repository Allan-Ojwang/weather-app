"use client";

import { Droplet, Thermometer, Wind } from "lucide-react";

type Props = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
};

const WeatherCard = ({
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  description,
  icon,
}: Props) => {
  return (
    <div className="card bg-base-100 rounded-lg shadow-lg w-full max-w-md mx-auto p-10">
      <div className="card-body">
        <div className="flex justify-center mb-2">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <h2 className="text-center text-3xl font-bold">{temperature}°C</h2>
        <p className="text-center text-gray-500">{description}</p>
        <div className="flex justify-around mt-4 text-sm text-center">
          <div>
            <Thermometer className="mx-auto text-blue-500" />
            <div className="text-xs">Feels like</div>
            <div>{feelsLike}°C</div>
          </div>
          <div>
            <Droplet className="mx-auto text-blue-500" />
            <div className="text-xs">Humidity</div>
            <div>{humidity}%</div>
          </div>
          <div>
            <Wind className="mx-auto text-blue-500" />
            <div className="text-xs">Wind</div>
            <div>{windSpeed} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
