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
        className="text-lg border-none w-[465px] p-2 rounded-l-lg focus:outline-none
                   sm:w-full sm:p-4 sm:rounded-t-lg sm:rounded-b-lg"
      />
      <button
        type="submit"
        className="bg-gray-800 border-none text-lg p-2 text-white rounded-r-lg
                   hover:cursor-pointer hover:outline hover:outline-1 hover:outline-red-500 focus:outline-none
                   sm:p-4 sm:rounded-t-lg sm:rounded-b-lg"
      >
        {`>`}
      </button>
    </form>
  );
};

Search.displayName = "Search";
