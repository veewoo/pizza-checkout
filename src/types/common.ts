export type ProductVariant = {
  id: number;
  name: string;
  price: number;
};

export type Customer = {
  id: number;
  name: string;
  code: string;
};

export type ProductVariantOrder = ProductVariant & {
  quantity: number;
};
