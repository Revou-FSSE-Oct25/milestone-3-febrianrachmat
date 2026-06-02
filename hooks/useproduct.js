import { useState, useEffect, useCallback } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  const refetch = useCallback(() => {
    return fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { products, refetch };
}
