import type { NextApiRequest, NextApiResponse } from "next";
import fetchIPData from "../../lib/fetchIpData";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ip } = req.query;

  try {
    const data = await fetchIPData(Array.isArray(ip) ? ip[0] : ip);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch IP data` });
  }
};

export default handler;
