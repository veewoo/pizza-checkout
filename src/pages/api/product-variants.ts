// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "mock/productVariants.json";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
