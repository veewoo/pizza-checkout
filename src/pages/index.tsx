import commonService from "src/services/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { CalculateTotalRequest, OrderRequest } from "src/types/api";
import {
  Container,
  Box,
  Select,
  Button,
  Heading,
  Text,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import ProductCart from "src/components/ProductCard";

type TOrderRequest = OrderRequest & { name: string; price?: number };
const queryOptions = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

export default function Home() {
  const [total, setTotal] = useState<number>(0);
  const [orderRequests, setOrderRequests] = useState<TOrderRequest[]>([]);
  const [request, setRequest] = useState<CalculateTotalRequest>({
    customerId: 1,
    orders: [],
  });

  const { data: customers } = useQuery(
    ["fetch-customers"],
    () => commonService.getCustomers(),
    queryOptions
  );

  const { data: productVariants } = useQuery(
    ["fetch-product"],
    () => commonService.getProductVariants(),
    {
      ...queryOptions,
      onSuccess: (data) =>
        setOrderRequests(
          data.map(({ id: productVariantId, name, price }) => ({
            productVariantId,
            quantity: 1,
            name,
            price,
          }))
        ),
    }
  );

  const mutation = useMutation(() => commonService.calculateTotal(request), {
    onSuccess: (data) => setTotal(data),
  });

  const addToCart = useCallback(
    ({ productVariantId, quantity }: TOrderRequest) => {
      setRequest((prev) => {
        const currentOrder = prev.orders?.find(
          (item) => item.productVariantId === productVariantId
        );

        if (currentOrder && currentOrder.quantity) {
          currentOrder.quantity += quantity ?? 0;
        } else {
          prev.orders = prev.orders ?? [];
          prev.orders.push({
            productVariantId,
            quantity,
          });
        }

        return { ...prev };
      });
    },
    []
  );

  const deleteProduct = useCallback((productVariantId: number) => {
    setRequest((prev) => {
      if (prev.orders) {
        prev.orders = prev.orders.filter(
          (order) => order.productVariantId !== productVariantId
        );
      }

      return { ...prev };
    });
  }, []);

  return (
    <Container my={10}>
      <Box border="1px" borderColor={"gray.200"} borderRadius="md">
        <Box mb={4} p={4}>
          <Heading as="h4" size="md" mb="2">
            Customer
          </Heading>
          <Select
            placeholder="Customer"
            value={request.customerId}
            onChange={(e) =>
              setRequest((prev) => ({
                ...prev,
                customerId: Number(e.target.value),
              }))
            }
          >
            {customers?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
        <Divider />
        <Heading as="h4" size="md" mb="2" px="4" my="4">
          Product Listing
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} px={4}>
          {orderRequests.map((item, index) => (
            <ProductCart
              key={"product-" + index}
              quantity={item.quantity}
              title={item.name}
              price={item.price ?? "N/A"}
              addToCart={() => addToCart(item)}
              onQuantityChange={(_, value) => {
                setOrderRequests((prev) => {
                  prev[index].quantity = value;
                  return [...prev];
                });
              }}
            />
          ))}
        </SimpleGrid>
        <Divider mt="4" />
        <Heading as="h4" size="md" mb="2" px="4" my="4">
          Cart
        </Heading>
        <SimpleGrid columns={3} spacing={4} px={4} pb={4}>
          {request.orders?.map((item, index) => {
            const productVariant = productVariants?.find(
              (p) => p.id === item.productVariantId
            );

            return (
              <ProductCart
                key={"cart-item" + index}
                quantity={item.quantity}
                title={productVariant?.name ?? ""}
                price={productVariant?.price ?? "N/A"}
                onDelete={() => deleteProduct(item.productVariantId ?? 0)}
              />
            );
          })}
        </SimpleGrid>
        <Box p="4">
          <Button
            w="full"
            colorScheme="green"
            isLoading={mutation.isLoading}
            disabled={mutation.isLoading}
            onClick={() => mutation.mutate()}
          >
            CHECKOUT
          </Button>
        </Box>
        {total > 0 && (
          <>
            <Divider />
            <Text p={4}>Total: ${total}</Text>
          </>
        )}
      </Box>
    </Container>
  );
}
