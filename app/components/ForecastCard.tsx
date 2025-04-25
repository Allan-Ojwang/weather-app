"use client";

type Props = {
  date: string;
  icon: string;
  tempMin: number;
  tempMax: number;
};

const ForecastCard = ({ date, icon, tempMin, tempMax }: Props) => {
  return (
    <div className="card bg-white shadow-sm p-4 rounded-lg text-center w-[240px] h-[240px] ">
      <p className="text-sm font-medium mt-10">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt="icon"
        className="mx-auto h-10 my-5"
      />
      <p className="text-xs text-gray-500">
        {tempMin}° / {tempMax}°
      </p>
    </div>
  );
};

export default ForecastCard;
