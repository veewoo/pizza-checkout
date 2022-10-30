// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import productVariants from "../../../mock/productVariants.json";
import customers from "../../../mock/customers.json";
import { CUSTOMER_CODE } from "../../utils/constants";
import {
  getTotalOfAmazon,
  getTotalOfFacebook,
  getTotalOfMicrosoft,
} from "../../utils/helpers";
import { CalculateTotalRequest } from "../../types/api";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: CalculateTotalRequest;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    let result = 0;
    const { customerId, orders } = req.body;

    if (!orders) {
      return res.status(500).json("Order not found!");
    }

    const customer = customers.find((item) => item.id == customerId);

    if (!customer) {
      return res.status(500).json("Customer not found!");
    }

    for (let i = 0; i < orders.length; i++) {
      const { productVariantId, quantity } = orders[i];

      const productVariant = productVariants.find(
        (item) => item.id == productVariantId
      );

      if (!productVariant) {
        return res.status(500).json(`Product not found!`);
      }

      if (!quantity || quantity < 1) {
        return res.status(500).json("Invalid quantity!");
      }

      switch (customer.code) {
        case CUSTOMER_CODE.MICROSOFT:
          result += getTotalOfMicrosoft({ ...productVariant, quantity });
          break;
        case CUSTOMER_CODE.AMAZON:
          result += getTotalOfAmazon({ ...productVariant, quantity });
          break;
        case CUSTOMER_CODE.FACEBOOK:
          result += getTotalOfFacebook({ ...productVariant, quantity });
          break;
        default:
          result += productVariant.price * quantity;
          break;
      }
    }

    res.status(200).json(result.toFixed(2));
  } catch (error) {
    res.status(500).json(error);
  }
}
