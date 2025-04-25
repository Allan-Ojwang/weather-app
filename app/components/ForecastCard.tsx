"use client";
import { motion } from "framer-motion";

type Props = {
  date: string;
  icon: string;
  tempMin: string;
  tempMax: string;
};

const ForecastCard = ({ date, icon, tempMin, tempMax }: Props) => {
  return (
    <div className="card bg-white shadow-sm p-4 rounded-lg text-center w-[240px] h-[240px]">
      <p className="text-2xl font-medium mt-10">{date}</p>
      <motion.img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt="icon"
        className="mx-auto h-20 w-20 my-1"
        whileHover={{
          scale: 1.2,
          transition: { type: "spring", stiffness: 300, damping: 10 },
        }}
      />
      <p className="text-xl text-gray-500">
        {tempMin}° / {tempMax}°
      </p>
    </div>
  );
};

export default ForecastCard;