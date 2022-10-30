import { ProductVariantOrder, ProductVariant } from "src/types/common";
import { AMAZON_LARGE_PIZZA_DISCOUNT_PRICE } from "./constants";

const SMALL_PIZZA_ID = 1;
const MEDIUM_PIZZA_ID = 2;
const LARGE_PIZZA_ID = 3;

export function getTotalOfMicrosoft(order: ProductVariantOrder) {
  const { quantity, ...productVariant } = order;

  if (productVariant.id === SMALL_PIZZA_ID) {
    return getDeal(productVariant, quantity, 3);
  }

  return productVariant.price * quantity;
}

export function getTotalOfFacebook(order: ProductVariantOrder) {
  const { quantity, ...productVariant } = order;

  if (productVariant.id === MEDIUM_PIZZA_ID) {
    return getDeal(productVariant, quantity, 5);
  }

  return productVariant.price * quantity;
}

export function getTotalOfAmazon(order: ProductVariantOrder) {
  const { quantity, id, price } = order;

  return (
    (id === LARGE_PIZZA_ID ? AMAZON_LARGE_PIZZA_DISCOUNT_PRICE : price) *
    quantity
  );
}

function getDeal(
  { price }: ProductVariant,
  quantity: number,
  discountQuantity: number
) {
  /* 
    THE FIRST WAY (time complexity: O(n))
  */
  // let result = 0;
  // let index = 1;
  // for (let i = 0; i < quantity; i++) {
  //   if (index === discountQuantity) {
  //     index = 1;
  //   } else {
  //     result = result + price;
  //     index++;
  //   }
  // }
  // return result;

  /* 
    THE SECOND WAY (time complexity: O(1))
  */
  const remainder = quantity % discountQuantity;
  const integerPart = quantity - remainder;

  return (
    (integerPart / discountQuantity) * (price * (discountQuantity - 1)) +
    remainder * price
  );
}
