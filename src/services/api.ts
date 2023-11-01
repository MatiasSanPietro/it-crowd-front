const BASE_URL = "http://localhost:3001/api/products/";

export async function getProducts() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Error when getting products");
  }
  return response.json();
}

export async function getProductsById(productId: number) {
  const url = `${BASE_URL}/${productId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error when getting product by id");
  }
  return response.json();
}

export async function createProduct(productData: {
  name: string;
  description: string;
  image_url: string;
  price: number;
  brandId: number;
}) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Error when creating new product");
  }
  return response.json();
}

export async function updateProduct(
  productId: number,
  productData: {
    name: string;
    description: string;
    image_url: string;
    price: number;
    brandId: number;
  }
) {
  const url = `${BASE_URL}/${productId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Error when updating product");
  }
  return response.json();
}

export async function deleteProduct(productId: number) {
  const url = `${BASE_URL}/${productId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error when deleting product");
  }
  return response.json();
}
