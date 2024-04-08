"use client";

import React, { useState, useEffect } from "react";
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

const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(:[0-9]+)?(\/[\w\.-]*)*\/?$/;
const IP_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const Home: React.FC = () => {
  const [ipData, setIpData] = useState<IPAddressData>(initialState);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    fetchUserIp();
  }, []);

  const fetchData = async (ip: string) => {
    if (URL_REGEX.test(ip) || IP_REGEX.test(ip)) {
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
    }
  };

  const fetchUserIp = async () => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setInputValue(data.ip);
        fetchData(data.ip);
      })
      .catch((error) => {
        console.error("Fetch User IP error:", error);
        setIpData({ ...initialState, status: "error" });
      });
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
        className="relative flex flex-col justify-evenly items-center w-full h-56 shadow-lg text-black lg:bg-auto lg:bg-center lg:px-8"
        style={{ background: "#ffe100" }}
      >
        <h1 className="font-normal text-2xl text-centers my-4">
          IP Address Tracker
        </h1>
        <Search
          ipAddress={inputValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Details data={ipData} />
      </header>
      <Map position={[ipData.location.lat, ipData.location.lng]} />
    </div>
  );
};

export default Home;
