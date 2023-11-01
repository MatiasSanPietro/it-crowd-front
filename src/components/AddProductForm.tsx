import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

type AddProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  createProduct: (productData: any) => void;
};

const AddProductForm: React.FC<AddProductFormProps> = ({
  isOpen,
  onClose,
  createProduct,
}) => {
  const [productData, setProductData] = useState<any>({
    brandId: "1",
  });

  const handleFormSubmit = () => {
    createProduct(productData);
    onClose();
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="text"
              onChange={(e) =>
                setProductData({ ...productData, image_url: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="text"
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Select
              value={productData.brandId}
              onChange={(e) =>
                setProductData({ ...productData, brandId: e.target.value })
              }
            >
              <option value="1">Sony</option>
              <option value="2">Samsung</option>
              <option value="3">Iphone</option>
              <option value="4">Huawei</option>
              <option value="5">Xiaomi</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductForm;
