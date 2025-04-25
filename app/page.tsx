"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import ForecastCard from "./components/ForecastCard";
import WeatherStatCard from "./components/WeatherStatCard";

export default function Home() {
  const [city, setCity] = useState("");
  const [isCelsius, setIsCelsius] = useState(true); // State for the switch (Celsius or Fahrenheit)

  const handleSearch = async (searchCity: string) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/weather?city=${searchCity}`
      );
      const data = await res.json();
      setCity(data);
      console.log(data); // you’ll parse this and feed into your components
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <main className="flex bg-gradient-to-b from-blue-100 to-white">
      {/* Sidebar */}
      <Sidebar
        icon={
          <img
            src="https://openweathermap.org/img/wn/10d.png"
            alt="weather icon"
          />
        }
        temperature="22°C" // Replace with dynamic temperature
        condition="Cloudy"
        date="April 24, 2025"
        location={city || "Enter a city"}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Search Bar and Switch */}
        <div className="flex justify-between items-center mb-8">
          <SearchBar onSearch={handleSearch} />

          {/* Switch for Celsius/Fahrenheit */}
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isCelsius}
              onChange={() => setIsCelsius((prev) => !prev)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {isCelsius ? "°C" : "°F"}
            </span>
          </label>
        </div>

        {/* Forecast Cards */}
        <div className="flex space-x-4">
          <ForecastCard date="Apr 25" icon="04d" tempMin={18} tempMax={24} />
          <ForecastCard date="Apr 26" icon="10d" tempMin={19} tempMax={25} />
          <ForecastCard date="Apr 27" icon="01d" tempMin={20} tempMax={26} />
        </div>

        {/* Weather Stat Cards */}
        <div className="flex space-x-4 mt-6">
          <WeatherStatCard wind={15} />
          <WeatherStatCard humidity={75} />
        </div>
      </div>
    </main>
  );
}
