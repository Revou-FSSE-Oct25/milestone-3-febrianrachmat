import { useState, useEffect, useCallback } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    setLoading(true);

    return fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { products, refetch, loading };
}
