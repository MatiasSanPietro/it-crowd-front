import {
  Box,
  Text,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  brand: { logo_url: string; name: string };
};

function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        data.sort((a: Product, b: Product) =>
          a.brand.name.localeCompare(b.brand.name)
        );
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <>
      <br></br>
      <InputGroup px={10}>
        <Input
          type="text"
          placeholder="Search by name or description"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <br></br>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="md"
            p="4"
            m="2"
            width="200px"
            position="relative"
          >
            <Center>
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100px",
                }}
              />
            </Center>
            <Text fontWeight="bold">{product.name}</Text>
            <Text>${product.price}</Text>
            <Button onClick={() => openModal(product)}>Details</Button>
          </Box>
        ))}
        {selectedProduct && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedProduct.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Center>
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    style={{ width: "100%" }}
                  />
                </Center>
                <br></br>
                <p>
                  <b>Price:</b> ${selectedProduct.price}
                </p>
                <br></br>
                <p>
                  <b>Description: </b>
                </p>
                <p>{selectedProduct.description}</p>
                <br></br>
                <p>
                  <b>Brand:</b>
                </p>
                <p>
                  <img
                    src={selectedProduct.brand.logo_url}
                    alt={selectedProduct.brand.name}
                    style={{ width: "70px" }}
                  />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={closeModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    </>
  );
}

export default ProductCard;
