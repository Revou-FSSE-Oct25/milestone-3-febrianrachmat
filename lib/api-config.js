const DEFAULT_TIMEOUT_MS = 8000;

export const API_URLS = {
  products: "https://api.escuelajs.co/api/v1/products",
  productById: (id) => `https://api.escuelajs.co/api/v1/products/${id}`,
  categories: "https://api.escuelajs.co/api/v1/categories",
  users: "https://api.escuelajs.co/api/v1/users",
};

export async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}