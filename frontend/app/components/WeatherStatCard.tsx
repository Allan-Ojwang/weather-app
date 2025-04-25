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
    <div className="card ripple bg-white shadow-lg p-8 rounded-lg text-center min-h-[260px] min-w-[340px] flex flex-col justify-between">
      <p className="text-2xl font-medium">{label}</p>
      <p className="text-3xl font-bold text-black my-6">{value}</p>
      <motion.div
        whileHover={{
          scale: 1.2,
          transition: { type: "spring", stiffness: 300, damping: 10 },
        }}
      >
        <Icon className={`mx-auto h-16 w-16 ${iconColor}`} />
      </motion.div>
    </div>
  );
};

export default WeatherStatCard;
