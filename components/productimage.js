import { useState } from "react";
import {
  getProductImageFallback,
  resolveProductImageSrc,
} from "../lib/product-image";

/**
 * Product images use arbitrary URLs from the API or admin form.
 * Placeholder services and broken URLs fall back to a real photo.
 */
export default function ProductImage({
  src,
  alt,
  productId,
  className = "object-contain",
  priority,
}) {
  const initialSrc = resolveProductImageSrc(src, productId);
  const [imageSrc, setImageSrc] = useState(initialSrc);
  const [usedFallback, setUsedFallback] = useState(
    initialSrc !== (typeof src === "string" ? src.trim() : "")
  );

  const handleError = () => {
    const fallback = getProductImageFallback(productId);
    if (imageSrc !== fallback) {
      setImageSrc(fallback);
      setUsedFallback(true);
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={`absolute inset-0 h-full w-full ${className} ${
        usedFallback ? "object-cover" : ""
      }`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
