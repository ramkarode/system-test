
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../services/productService";

const CACHE_KEY = "shop-products-cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function readCache() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);

    if (!cached) return null;

    const parsed = JSON.parse(cached);

    if (
      !Array.isArray(parsed.products) ||
      !parsed.products.length ||
      !parsed.timestamp ||
      Date.now() - parsed.timestamp > CACHE_DURATION
    ) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed.products;
  } catch {
    sessionStorage.removeItem(CACHE_KEY);
    return null;
  }
}

function writeCache(products) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        products,
        timestamp: Date.now(),
      })
    );
  } catch {
    // Storage may be unavailable or full.
  }
}

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setError("");
    setLoading(true);
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setError("");

        // Use cached data on the initial load.
        if (retryCount === 0) {
          const cached = readCache();

          if (cached) {
            if (!cancelled) {
              setProducts(cached);
              setLoading(false);
            }
            return;
          }
        }

        const data = await getProducts();

        if (cancelled) return;

        setProducts(data);
        writeCache(data);
      } catch {
        if (!cancelled) {
          setError(
            "We couldn't load products. Check your connection and try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  return { products, loading, error, retry };
}
