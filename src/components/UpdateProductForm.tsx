import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

type UpdateProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  productData: {
    name: string;
    description: string;
    image_url: string;
    price: string | number;
    brandId: string;
  };
  updateProduct: (productData: any) => void;
};

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  isOpen,
  onClose,
  productData,
  updateProduct,
}) => {
  const [formData, setFormData] = useState(productData);

  useEffect(() => {
    setFormData(productData);
  }, [productData]);

  const handleFormSubmit = () => {
    updateProduct(formData);
    onClose();
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="text"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Select
              value={formData.brandId}
              onChange={(e) =>
                setFormData({ ...formData, brandId: e.target.value })
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
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProductForm;
