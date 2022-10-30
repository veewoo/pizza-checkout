import "@testing-library/jest-dom";
import {
  getTotalOfMicrosoft,
  getTotalOfFacebook,
  getTotalOfAmazon,
} from "./helpers";
import productVariant from "../../mock/productVariants.json";
import { AMAZON_LARGE_PIZZA_DISCOUNT_PRICE } from "./constants";

const commonTestCases = [
  {
    input: {
      ...productVariant[0],
      quantity: 1,
    },
    output: productVariant[0].price,
  },
  {
    input: {
      ...productVariant[1],
      quantity: 1,
    },
    output: productVariant[1].price,
  },
];

const microsoftTestCases = [
  {
    input: {
      ...productVariant[0],
      quantity: 3,
    },
    output: productVariant[0].price * 2,
  },
  {
    input: {
      ...productVariant[0],
      quantity: 5,
    },
    output: productVariant[0].price * 4,
  },
  {
    input: {
      ...productVariant[0],
      quantity: 6,
    },
    output: productVariant[0].price * 4,
  },
  {
    input: {
      ...productVariant[1],
      quantity: 6,
    },
    output: productVariant[1].price * 6,
  },
  {
    input: {
      ...productVariant[0],
      quantity: 3000,
    },
    output: productVariant[0].price * 2000,
  },
];

const amazonTestCases = [
  {
    input: {
      ...productVariant[2],
      quantity: 1,
    },
    output: AMAZON_LARGE_PIZZA_DISCOUNT_PRICE,
  },
  {
    input: {
      ...productVariant[2],
      quantity: 6789,
    },
    output: AMAZON_LARGE_PIZZA_DISCOUNT_PRICE * 6789,
  },
];

const facebookTestCases = [
  {
    input: {
      ...productVariant[1],
      quantity: 5,
    },
    output: productVariant[1].price * 4,
  },
];

describe("Calculation functions", () => {
  commonTestCases.forEach(({ input, output }) => {
    test("All functions", () => {
      expect(getTotalOfMicrosoft(input)).toEqual(output);
      expect(getTotalOfAmazon(input)).toEqual(output);
      expect(getTotalOfFacebook(input)).toEqual(output);
    });
  });

  microsoftTestCases.forEach(({ input, output }) => {
    test("For Microsoft", () => {
      expect(parseFloat(getTotalOfMicrosoft(input).toFixed(2))).toEqual(output);
    });
  });

  amazonTestCases.forEach(({ input, output }) => {
    test("For Amazon", () => {
      expect(parseFloat(getTotalOfAmazon(input).toFixed(2))).toEqual(output);
    });
  });

  facebookTestCases.forEach(({ input, output }) => {
    test("For Facebook", () => {
      expect(parseFloat(getTotalOfFacebook(input).toFixed(2))).toEqual(output);
    });
  });
});
