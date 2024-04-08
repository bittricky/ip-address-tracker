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
    <aside className="relative z-10 mt-9 mx-auto bg-white rounded-lg shadow-md p-6">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.details.map((output, index) => (
          <li
            key={index}
            className={`flex flex-col justify-between p-4 ${
              index !== data.details.length - 1 ? "border-b md:border-b-0" : ""
            } md:border-r border-gray-200 last:md:border-r-0`}
          >
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
              {output.heading}
            </h2>
            <p className="text-lg font-bold text-gray-900">{output.body}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Details.displayName = "Details";
