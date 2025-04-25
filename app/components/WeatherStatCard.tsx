"use client";
import { motion } from "framer-motion";
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
      <p className="text-2xl font-medium">{label}</p>
      <p className="text-3xl font-bold text-black my-6">{value}</p>
      <motion.div
        whileHover={{
          scale: 1.2, 
          transition: { type: "spring", stiffness: 300, damping: 10 },
        }}
      >
        <Icon className={`mx-auto h-15 w-15 ${iconColor}`} />
      </motion.div>
    </div>
  );
};

export default WeatherStatCard;