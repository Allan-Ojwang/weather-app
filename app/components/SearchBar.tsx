"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: (city: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city.trim());
    }
  };

  return (
    <div className="flex justify-center mt-2 w-full">
      <div className="relative w-full max-w-md flex items-center">
        <input
          type="text"
          className="mr-4 w-full border border-gray-400 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} className="text-black">
          🔎
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
