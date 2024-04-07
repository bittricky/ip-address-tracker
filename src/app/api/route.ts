import type { NextApiRequest, NextApiResponse } from "next";
import fetchIpData from "../../lib/fetchIpData";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ipAddress = (req.query.ip as string) || "";

  try {
    const data = await fetchIpData(ipAddress);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch IP data` });
  }
};

export default handler;
