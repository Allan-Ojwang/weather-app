"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import ForecastCard from "./components/ForecastCard";
import WeatherStatCard from "./components/WeatherStatCard";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), {
  ssr: false,
});

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getTemperature = (temp: number) => {
    return isCelsius
      ? `${Math.round(temp)}°C`
      : `${Math.round(temp * 1.8 + 32)}°F`;
  };

  const handleSearch = async (searchCity: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/weather?city=${searchCity}`
      );
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Location not found.");
      }
      const data = await res.json();

      if (!data || !data.current) {
        throw new Error("Invalid weather data received.");
      }

      setWeatherData(data);
    } catch (err: any) {
      console.error("Error fetching weather:", err);
      toast.error("Location not found. Enter valid city.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocationFromIP = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Failed to fetch IP location.");
        const data = await res.json();
        const city = data.city;

        if (city) {
          await handleSearch(city);
        } else {
          setLocationError("Could not detect your city.");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLocationError("Location detection failed.");
        setLoading(false);
        toast.error("Your location can not be detected. Cannot fetch weather report.");
      }
    };

    getLocationFromIP();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <motion.main
      className="flex bg-gradient-to-b from-blue-100 to-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <Sidebar
        icon={
          weatherData?.current?.icon ? (
            <motion.img
              src={`https://openweathermap.org/img/wn/${weatherData.current.icon}@2x.png`}
              alt="weather icon"
              className="w-16 h-16"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
          )
        }
        temperature={
          weatherData ? getTemperature(weatherData.current.temperature) : "--"
        }
        condition={weatherData?.current?.description || "Loading..."}
        date={weatherData?.current?.date || "Loading..."}
        location={
          locationError
            ? locationError
            : weatherData?.city
            ? `${weatherData.city}, ${weatherData.country}`
            : "Fetching location..."
        }
      />

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Search Bar and Unit Switch */}
        <div className="flex justify-between items-center">
          <SearchBar onSearch={handleSearch} />
          <motion.label
            className="inline-flex items-center cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isCelsius}
              onChange={() => setIsCelsius((prev) => !prev)}
            />
            <motion.div
              className="relative w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <span className="ms-3 text-sm font-medium text-gray-900">
              {isCelsius ? "°C" : "°F"}
            </span>
          </motion.label>
        </div>

        {/* Forecast Cards */}
        <div className="flex justify-center space-x-4 flex-wrap">
          {weatherData?.forecast?.map((day: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ForecastCard
                date={day.date}
                icon={day.icon}
                tempMin={getTemperature(day.min_temp)}
                tempMax={getTemperature(day.max_temp)}
              />
            </motion.div>
          ))}
        </div>

        {/* Weather Stat Cards */}
        <div className="flex justify-center space-x-4 mt-6 flex-wrap">
          {weatherData && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <WeatherStatCard wind={weatherData.current.wind_speed} />
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <WeatherStatCard humidity={weatherData.current.humidity} />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.main>
  );
}
