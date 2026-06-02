import { API_URLS, fetchWithTimeout } from "./api-config";
import { normalizeProductsFromApi } from "./normalize-api";

const SEED_PRODUCTS = [
  {
    id: 1,
    title: "Classic Leather Jacket",
    price: 89.99,
    description: "A timeless leather jacket for everyday wear.",
    category: "Clothes",
    image: "https://i.imgur.com/DMQHGA0.jpeg",
  },
  {
    id: 2,
    title: "Wireless Headphones",
    price: 59.99,
    description: "Comfortable over-ear headphones with rich sound.",
    category: "Electronics",
    image: "https://i.imgur.com/NWIJKUj.jpeg",
  },
  {
    id: 3,
    title: "Wooden Dining Table",
    price: 249.99,
    description: "Mid-century modern dining table with walnut finish.",
    category: "Furniture",
    image: "https://i.imgur.com/qrs9QBg.jpeg",
  },
  {
    id: 4,
    title: "Running Shoes",
    price: 79.99,
    description: "Lightweight shoes designed for daily training.",
    category: "Shoes",
    image: "https://i.imgur.com/XVp8T1I.jpeg",
  },
  {
    id: 5,
    title: "Smart Watch",
    price: 129.99,
    description: "Track fitness, notifications, and more on your wrist.",
    category: "Electronics",
    image: "https://i.imgur.com/Jn1YSLk.jpeg",
  },
];

let products = [...SEED_PRODUCTS];
let hasBootstrapped = false;
let usedFallback = false;
let bootstrapPromise = null;
const localOverrideIds = new Set();
const deletedIds = new Set();

async function loadProductsFromApi() {
  usedFallback = false;

  try {
    const res = await fetchWithTimeout(API_URLS.products);
    if (res.ok) {
      const data = await res.json();
      products = normalizeProductsFromApi(data);
      return;
    }
  } catch {
    // Fall through to seed catalog.
  }

  products = [...SEED_PRODUCTS];
  usedFallback = true;
}

export async function bootstrapProducts() {
  if (hasBootstrapped) {
    return { usedFallback };
  }

  if (!bootstrapPromise) {
    bootstrapPromise = loadProductsFromApi()
      .then(() => {
        hasBootstrapped = true;
        return { usedFallback };
      })
      .catch(() => {
        products = [...SEED_PRODUCTS];
        usedFallback = true;
        hasBootstrapped = true;
        return { usedFallback };
      });
  }

  return bootstrapPromise;
}

export function getUsedFallback() {
  return usedFallback;
}

export function getProducts() {
  return products;
}

export function getProductById(id) {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return null;

  return products.find((product) => Number(product.id) === numericId) ?? null;
}

export function setProducts(nextProducts) {
  products = nextProducts;
}

export function addProduct(product) {
  setProducts([...getProducts(), product]);
  localOverrideIds.add(product.id);
  deletedIds.delete(product.id);
}

export function updateProduct(productId, fields) {
  setProducts(
    getProducts().map((product) =>
      product.id === productId ? { ...product, ...fields } : product
    )
  );
  localOverrideIds.add(productId);
  deletedIds.delete(productId);
}

export function removeProduct(productId) {
  setProducts(getProducts().filter((product) => product.id !== productId));
  deletedIds.add(productId);
  localOverrideIds.delete(productId);
}

export function isLocallyManaged(productId) {
  return localOverrideIds.has(Number(productId));
}

export function isProductDeleted(productId) {
  return deletedIds.has(Number(productId));
}

export function resetProductCatalogState({ bootstrapped = false } = {}) {
  products = [...SEED_PRODUCTS];
  hasBootstrapped = bootstrapped;
  usedFallback = false;
  bootstrapPromise = null;
  localOverrideIds.clear();
  deletedIds.clear();
}
