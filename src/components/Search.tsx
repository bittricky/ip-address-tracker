import React from "react";

interface Props {
  ipAddress: string;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}

export const Search: React.FC<Props> = ({
  ipAddress,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full p-0">
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        id="ipInput"
        name="ipInput"
        value={ipAddress}
        onChange={handleChange}
        required
        className="text-lg border-none w-[465px] p-2 py-2 px-4 rounded-l-lg rounded-l-full focus:outline-none
                   sm:w-full sm:p-4"
      />
      <button
        type="submit"
        className="bg-gray-800 border-none text-lg p-2 py-2 px-4 text-white rounded-r-lg rounded-r-full
                   hover:cursor-pointer hover:outline hover:outline-1 hover:outline-red-500 focus:outline-none
                   sm:p-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

Search.displayName = "Search";
