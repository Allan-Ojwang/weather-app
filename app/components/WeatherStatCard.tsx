
"use client";
import { Droplets, Wind } from "lucide-react";
type Props = {
  wind?: number;
  humidity?: number;
};

const WeatherStatCard = ({ wind, humidity }: Props) => {
  const isWind = wind !== undefined;
  const value = isWind ? `${wind} KM/H` : `${humidity}%`;
  const label = isWind ? "Wind Status" : "Humidity";
  const Icon = isWind ? Wind : Droplets;
  const iconColor = isWind ? "text-gray-600" : "text-blue-600"; 

  return (
    <div className="card bg-white shadow-sm p-10 rounded-lg text-center w-[300px]">
      <p className="text-2xl font-medium mb-6">{label}</p>
      <p className="text-3xl font-bold text-black my-6">{value}</p>
      <Icon className={`mx-auto h-10 w-10 ${iconColor}`} />
    </div>
  );
};

export default WeatherStatCard;
