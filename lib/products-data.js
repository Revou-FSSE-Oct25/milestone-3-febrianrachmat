const SEED_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li7jNUePL._AC_UX679_.jpg",
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeHusLL._AC_UY879_.jpg",
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
];

let products = [...SEED_PRODUCTS];
let hasBootstrapped = false;

export async function bootstrapProducts() {
  if (hasBootstrapped) return;
  hasBootstrapped = true;

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (res.ok) {
      products = await res.json();
    }
  } catch {
    products = [...SEED_PRODUCTS];
  }
}

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === Number(id)) ?? null;
}

export function setProducts(nextProducts) {
  products = nextProducts;
}
