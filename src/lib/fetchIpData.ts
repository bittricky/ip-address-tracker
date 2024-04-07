const API_KEY: string = process.env.IPIFY_API_KEY || "";
const BASE_URL = "https://geo.ipify.org/api/v2/country,city?";

interface FetchIpDataResponse {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  domains: string[];
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
  proxy: {
    proxy: boolean;
    vpn: boolean;
    tor: boolean;
  };
}

async function fetchIpData(
  ipAddress: string = ""
): Promise<FetchIpDataResponse> {
  const url = new URL(BASE_URL);

  url.searchParams.append("apiKey", API_KEY);

  if (ipAddress) {
    url.searchParams.append("ipAddress", ipAddress);
  }

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error: Failed to fetch IP information", error);
    throw error;
  }
}

export default fetchIpData;
