import { useState, useEffect, useCallback } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback((setLoadingOnStart = true) => {
    if (setLoadingOnStart) {
      setLoading(true);
    }

    return fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const refetch = useCallback(() => {
    return fetchProducts(true);
  }, [fetchProducts]);

  useEffect(() => {
    // Initial data load for this hook is intentionally triggered on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts(false);
  }, [fetchProducts]);

  return { products, refetch, loading };
}
