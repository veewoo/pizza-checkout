export type OrderRequest = {
  productVariantId?: number;
  quantity?: number;
};

export type CalculateTotalRequest = {
  customerId?: number;
  orders?: OrderRequest[];
};
