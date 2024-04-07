"use client";

import React, { useState } from "react";
import { Details, Search, Map } from "../../components";

import { IPAddressData } from "../../types";

const initialState: IPAddressData = {
  status: "empty",
  details: [
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
      setIpData({ ...initialState, status: "loading" });

      const response = await fetch(`/api?ip=${ip}`, {
        method: "GET",
      });

      const { data } = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "An error occurred while fetching the data."
        );
      }

      setIpData({
        status: "loaded",
        details: [
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
      <header
        className="relative flex flex-col justify-between items-center w-full h-56 shadow-md text-black md:bg-auto md:bg-center lg:px-8"
        style={{ background: "#ffe100" }}
      >
        <h1 className="font-normal text-xl">IP Address Tracker</h1>
        <Search
          ipAddress={inputValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        {ipData.status !== "empty" && <Details data={ipData} />}
      </header>
      <Map position={[ipData.location.lat, ipData.location.lng]} />
    </div>
  );
};

export default Home;
