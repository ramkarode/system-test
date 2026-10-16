
const API_URL = "https://fakestoreapi.com/products";

const featuredProducts = [
  {
    id: "custom-kettle",
    title: "Electric Kettle",
    price: 45,
    category: "featured products",
    image: "/Image/Electric-Kettle.jpg",
    rating: { rate: 4.7, count: 84 },
  },
  {
    id: "custom-speaker",
    title: "Bluetooth Speaker",
    price: 130,
    category: "featured products",
    image: "/Image/BT%20Speaker.jpeg",
    rating: { rate: 4.6, count: 72 },
  },
];

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid product data");
  }

  return [...featuredProducts, ...data];
}
