import { CartItem, Product } from "./types";

/* Error Handling */

const handleErrors = (response: any) => {
  return response.ok ? response.json() : response.statusText;
};

const mapResponseToProducts = (json: any) => {
  return json.map((p: any) => new Product(p));
};

const mapCartToJSON = (cart: CartItem[]) => {
  return JSON.stringify({
    userId: Math.floor(Math.random() * 100),
    date: new Date().toISOString().split("T")[0],
    products: cart.map((p) => ({
      productId: p.product.id,
      quantity: p.quantity,
    })),
  });
};

/* Products */

export const getAllProducts = async () => {
  return fetch("https://fakestoreapi.com/products")
    .then(handleErrors)
    .then(mapResponseToProducts);
};

/* Cart */

export const processCart = async (cart: CartItem[]) => {
  return fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    body: mapCartToJSON(cart),
  })
    .then(handleErrors)
    .then((json) => true);
};
