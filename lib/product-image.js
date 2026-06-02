const PLACEHOLDER_HOSTS = new Set([
  "placehold.co",
  "via.placeholder.com",
  "placeholder.com",
  "dummyimage.com",
  "fakeimg.pl",
]);

export function isPlaceholderImageUrl(src) {
  if (!src || typeof src !== "string") return true;

  try {
    const { hostname } = new URL(src.trim());
    return PLACEHOLDER_HOSTS.has(hostname);
  } catch {
    return true;
  }
}

export function getProductImageFallback(productId) {
  const seed = encodeURIComponent(String(productId ?? "default"));
  return `https://picsum.photos/seed/${seed}/600/400`;
}

export function resolveProductImageSrc(src, productId) {
  const trimmed = typeof src === "string" ? src.trim() : "";

  if (!trimmed || isPlaceholderImageUrl(trimmed)) {
    return getProductImageFallback(productId);
  }

  return trimmed;
}
