"use client";

import React, { useState } from "react";
import { Search } from "../../components";

type Output = {
  heading: string;
  body: string;
};

type Location = {
  lat: number;
  lng: number;
};

type IPAddressData = {
  status: "empty" | "loaded" | "error";
  outputs: Output[];
  location: Location;
};

const initialState: IPAddressData = {
  status: "empty",
  outputs: [
    { heading: "IP Address", body: "" },
    { heading: "Location", body: "" },
    { heading: "Timezone", body: "" },
    { heading: "ISP", body: "" },
  ],
  location: {
    lat: 0,
    lng: 0,
  },
};

const Home: React.FC = () => {
  const [ipData, setIpData] = useState<IPAddressData>(initialState);
  const [inputValue, setInputValue] = useState<string>("");

  const fetchData = async (ip: string) => {
    try {
      const response = await fetch(`/api/ip?ip=${encodeURIComponent(ip)}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("data: ", data);
      if (!response.ok) {
        throw new Error(
          data.message || "An error occurred while fetching the data."
        );
      }

      setIpData({
        status: "loaded",
        outputs: [
          { heading: "IP Address", body: data.ip || "N/A" },
          {
            heading: "Location",
            body: `${data.location.city}, ${data.location.region}, ${data.location.country}`,
          },
          { heading: "Timezone", body: `UTC ${data.location.timezone}` },
          { heading: "ISP", body: data.isp },
        ],
        location: {
          lat: data.location.lat,
          lng: data.location.lng,
        },
      });
    } catch (error) {
      console.error("Fetch error:", error);
      setIpData({ ...initialState, status: "error" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(inputValue);
    setInputValue("");
  };

  return (
    <div className="app">
      <Search
        ipAddress={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {/* TODO: Map & Details component go here */}
    </div>
  );
};

export default Home;
