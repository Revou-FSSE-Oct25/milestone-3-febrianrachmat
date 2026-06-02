import {
  getProductImageFallback,
  isPlaceholderImageUrl,
  resolveProductImageSrc,
} from "../product-image";

describe("product-image", () => {
  it("detects common placeholder hosts", () => {
    expect(isPlaceholderImageUrl("https://placehold.co/600x400")).toBe(true);
    expect(isPlaceholderImageUrl("https://via.placeholder.com/150")).toBe(true);
  });

  it("accepts real image hosts", () => {
    expect(isPlaceholderImageUrl("https://i.imgur.com/sample.jpeg")).toBe(false);
  });

  it("replaces placeholder URLs with a stable fallback", () => {
    expect(resolveProductImageSrc("https://placehold.co/600x400", 42)).toBe(
      getProductImageFallback(42)
    );
  });

  it("keeps valid image URLs", () => {
    const url = "https://images.unsplash.com/photo-123";
    expect(resolveProductImageSrc(url, 1)).toBe(url);
  });
});
