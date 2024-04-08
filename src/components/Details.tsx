import { IPAddressData } from "../types";

interface Props {
  data: IPAddressData;
}

export const Details: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <aside className="relative z-30 mt-9 flex items-center w-auto bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
        <p
          className="w-full text-center text-lg font-medium text-black"
          data-testid="error"
        >
          Network Error
        </p>
      </aside>
    );
  } else if (data.status === "loading") {
    return (
      <aside className="relative z-30 mt-9 flex items-center w-auto bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
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
      <aside className="relative z-30 mt-9 flex items-center w-auto bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
        <p
          className="w-full text-center text-lg font-medium text-red-600"
          data-testid="invalid"
        >
          Not a valid IP address or domain
        </p>
      </aside>
    );
  } else if (data.status === "empty") {
    return (
      <aside className="relative z-30 mt-9 flex items-center w-auto bg-white rounded-lg shadow-md p-6 md:w-full md:min-h-fit">
        <p
          className="w-full text-center text-lg font-medium text-black-600"
          data-testid="empty"
        >
          Type an IP address or domain to begin searching...
        </p>
      </aside>
    );
  }

  return (
    <aside className="relative z-30 mt-9 flex w-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      <ul className="space-y-4 md:space-y-0 md:divide-y md:divide-gray-200">
        {data.details.map((output, index) => (
          <li
            key={index}
            className={`flex flex-col items-center space-y-2 p-2 md:flex-row md:items-start md:justify-between md:space-y-0 md:p-4 ${
              index === 0 ? "rounded-tl-lg rounded-tr-lg" : ""
            } ${
              index === data.details.length - 1
                ? "rounded-bl-lg rounded-br-lg"
                : ""
            }`}
          >
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider md:text-xs lg:text-sm">
              {output.heading}
            </h2>
            <p className="text-lg font-bold text-gray-800 md:text-base lg:text-lg">
              {output.body}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Details.displayName = "Details";
