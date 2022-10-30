import "@testing-library/jest-dom";
import handler from "./calculate-total";
import { createMocks } from "node-mocks-http";
import { CalculateTotalRequest } from "src/types/api";

const testCases: { input: CalculateTotalRequest; output: string }[] = [
  {
    input: {
      customerId: 1, // Amazon
      orders: [],
    },
    output: "0.00",
  },
  {
    input: {
      customerId: 4, // Normal customer
      orders: [
        {
          productVariantId: 1,
          quantity: 1,
        },
        {
          productVariantId: 2,
          quantity: 1,
        },
        {
          productVariantId: 3,
          quantity: 1,
        },
      ],
    },
    output: "49.97",
  },
  {
    input: {
      customerId: 3, // Microsoft
      orders: [
        {
          productVariantId: 1,
          quantity: 3,
        },
        {
          productVariantId: 3,
          quantity: 1,
        },
      ],
    },
    output: "45.97",
  },
  {
    input: {
      customerId: 1,
      orders: [
        {
          productVariantId: 2,
          quantity: 3,
        },
        {
          productVariantId: 3,
          quantity: 1,
        },
      ],
    },
    output: "67.96",
  },
];

describe("Calculation API", () => {
  testCases.forEach(async ({ input, output }) => {
    test("/api/calculate-total", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: input,
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(res._getJSONData()).toEqual(output);
    });
  });
});
