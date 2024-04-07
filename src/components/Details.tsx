import { IPAddressData } from "../types";

interface Props {
  data: IPAddressData;
}

export const Details: React.FC<Props> = ({ data }) => {
  if (!data || (data.status !== "empty" && data.status !== "error")) {
    return (
      <aside className="relative z-30 mt-9 flex items-center w-auto min-h-[120px] bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
        <p
          className="w-full text-center text-lg font-medium text-black"
          data-testid="error"
        >
          Network Error
        </p>
      </aside>
    );
  } else if (data.status === "empty") {
    return (
      <aside className="relative z-30 mt-9 flex items-center w-auto min-h-[120px] bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
        <p
          className="w-full text-center text-lg font-medium text-black"
          data-testid="loading"
        >
          Loading...
        </p>
      </aside>
    );
  } else if (data.status === "error") {
    return (
      <aside className="relative z-30 mt-9 flex items-center w-auto min-h-[120px] bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
        <p
          className="w-full text-center text-lg font-medium text-red-600"
          data-testid="invalid"
        >
          IP Address is not a valid IP address or domain
        </p>
      </aside>
    );
  }

  return (
    <aside className="relative z-30 mt-9 flex items-center w-[calc(100%-72rem)] min-h-[120px] bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
      <ul className="flex flex-row justify-around items-center w-full h-[72%] m-0 p-0 list-none md:flex-col md:justify-center md:h-fit">
        {data.outputs.map((output, index) => (
          <li
            key={index}
            className={`relative text-gray-700 ${
              (index === data.outputs.length - 1 ? "true" : undefined)
                ? ""
                : "border-r border-gray-200"
            } flex flex-col items-start justify-center p-4 md:text-center md:p-4 h-full w-full`}
          >
            <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wider -mt-1.5 mb-0">
              {output.heading}
            </h2>
            <p
              className="text-lg text-gray-700 mt-1.5 m-0 p-0 animate-fadeIn"
              style={{ animation: "fadeIn 0.3s linear" }}
            >
              {output.body}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Details.displayName = "Details";
