export interface Product {
  id: number;
  nombre: string;
  precio: number;
}

const API_URL = "http://localhost:3000/api/productos";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Producto no encontrado");
  }

  return response.json();
}

export async function createProduct(
  nombre: string,
  precio: number
): Promise<Product> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      precio,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el producto");
  }

  return response.json();
}