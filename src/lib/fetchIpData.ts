const API_KEY = process.env.IPIFY_API_KEY;
console.log(API_KEY);
const BASE_URL = "https://geo.ipify.org/api/v2/country,city?";

async function fetchIpData(ipAddress: string = ""): Promise<any> {
  const url = new URL(BASE_URL);

  url.searchParams.append("apiKey", API_KEY);

  if (ipAddress) {
    url.searchParams.append("ipAddress", ipAddress);
    console.log(url);
  }

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`ErrorL ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error: Failed to fetch IP information", error);
    throw error;
  }
}

export default fetchIpData;
