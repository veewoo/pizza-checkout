import {
  VStack,
  Text,
  Button,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  price: number | "N/A";
  quantity?: number;
  addToCart?: () => void;
  onDelete?: () => void;
  onQuantityChange?: (valueAsString: string, valueAsNumber: number) => void;
};

export default function ProductCart({
  title,
  price,
  quantity,
  addToCart,
  onDelete,
  onQuantityChange,
}: Props) {
  return (
    <VStack
      alignItems="flex-start"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      padding={2}
    >
      <Text fontWeight="bold">{title}</Text>
      <HStack>
        <Text as="label">Quantity: </Text>
        {onQuantityChange && (
          <NumberInput
            min={1}
            name="quantity"
            value={quantity}
            onChange={onQuantityChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
        {!onQuantityChange && <Text>{quantity}</Text>}
      </HStack>
      <HStack>
        <Text>Price: </Text>
        <Text>${price}</Text>
      </HStack>
      {addToCart && (
        <Button colorScheme="green" w="full" onClick={() => addToCart()}>
          ADD TO CART
        </Button>
      )}
      {onDelete && (
        <Button colorScheme="red" w="full" onClick={() => onDelete()}>
          DELETE
        </Button>
      )}
    </VStack>
  );
}
