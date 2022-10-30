import axios from "axios";
import { CalculateTotalRequest } from "src/types/api";
import { Customer, ProductVariant } from "src/types/common";

const commonService = {
  getCustomers: async function (): Promise<Customer[]> {
    try {
      const response = await axios.get<Customer[]>("/api/customers");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getProductVariants: async function () {
    try {
      const response = await axios.get<ProductVariant[]>(
        "/api/product-variants"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  calculateTotal: async function (data: CalculateTotalRequest) {
    try {
      const response = await axios.post<string>("/api/calculate-total", data);
      return Number(response.data);
    } catch (error) {
      throw error;
    }
  },
};

export default commonService;
