import type { NextRequest } from "next/server";
import fetchIpData from "../../lib/fetchIpData";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ipAddress: string = searchParams.get("ip") || "";
  const data = await fetchIpData(ipAddress);

  return Response.json({ data });
}
