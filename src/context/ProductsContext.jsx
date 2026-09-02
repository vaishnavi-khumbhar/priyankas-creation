import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as staticProducts } from "../data/products";
import { fetchProducts } from "../api/productsApi";

/* ============================================================
   ONE place that loads products for the whole site.

   • starts with the built-in products, so the site never looks empty
   • fetches the backend once and replaces/adds by id
   • if the backend is down, the built-in list keeps working

   Any component can now do:   const { products } = useProducts();
   ============================================================ */

const ProductsContext = createContext({
  products: staticProducts,
  loading: true,
  error: null,
  byId: () => undefined,
  refresh: () => {},
});

export const useProducts = () => useContext(ProductsContext);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const fromApi = await fetchProducts();
        if (!alive) return;

        /* backend wins where the id matches; anything new is appended */
        const map = new Map(staticProducts.map((p) => [String(p.id), p]));
        fromApi.forEach((p) => map.set(String(p.id), p));

        setProducts([...map.values()]);
        setError(null);
      } catch (err) {
        console.error("Products API failed, using built-in list:", err);
        if (alive) setError(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [tick]);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      byId: (id) => products.find((p) => String(p.id).trim() === String(id).trim()),
      refresh: () => setTick((t) => t + 1),
    }),
    [products, loading, error]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}