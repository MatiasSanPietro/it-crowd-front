import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../services/api";
import React from "react";
import AddProductForm from "./AddProductForm";
import UpdateProductForm from "./UpdateProductForm";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  brand: { name: string };
  brandId: string;
};

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const handleCreateProduct = (productData: any) => {
    createProduct(productData)
      .then((newProduct) => {
        setProducts([...products, newProduct]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId)
      .then(() => {
        const updatedProducts = products.filter(
          (product) => product.id !== productId
        );
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openUpdateForm = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setSelectedProduct(null);
    setIsUpdateFormOpen(false);
  };

  const handleUpdateProduct = (productData: any) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData)
        .then((updatedProduct) => {
          const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
          setProducts(updatedProducts);
          closeUpdateForm();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const initialProductData = selectedProduct || {
    name: "",
    description: "",
    image_url: "",
    price: 0,
    brandId: "1",
  };

  return (
    <Box>
      <h1>Administrator panel</h1>
      <br></br>
      <Grid templateColumns="0fr 1fr 3fr 1fr 1fr 1fr 0fr" gap={5}>
        <GridItem fontWeight="bold">ID</GridItem>
        <GridItem fontWeight="bold">Name</GridItem>
        <GridItem fontWeight="bold">Description</GridItem>
        <GridItem fontWeight="bold">Price</GridItem>
        <GridItem fontWeight="bold">Image</GridItem>
        <GridItem fontWeight="bold">Brand</GridItem>
        <GridItem fontWeight="bold">
          <Button colorScheme="green" size="sm" onClick={onOpen}>
            New product
          </Button>
        </GridItem>
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <GridItem>{product.id}</GridItem>
            <GridItem>{product.name}</GridItem>
            <GridItem>{product.description}</GridItem>
            <GridItem>${product.price}</GridItem>
            <GridItem>
              <Image
                src={product.image_url}
                alt={product.name}
                maxW="70px"
                maxH="70px"
              />
            </GridItem>
            <GridItem>
              {product.brand ? product.brand.name : "No Brand"}
            </GridItem>
            <GridItem display="flex">
              <Button
                colorScheme="yellow"
                size="sm"
                onClick={() => openUpdateForm(product)}
              >
                Update
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </Button>
            </GridItem>
          </React.Fragment>
        ))}
      </Grid>
      <AddProductForm
        isOpen={isOpen}
        onClose={onClose}
        createProduct={handleCreateProduct}
      />
      <UpdateProductForm
        isOpen={isUpdateFormOpen}
        onClose={closeUpdateForm}
        productData={selectedProduct || initialProductData}
        updateProduct={handleUpdateProduct}
      />
    </Box>
  );
};

export default AdminPage;
