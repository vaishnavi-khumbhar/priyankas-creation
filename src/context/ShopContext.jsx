import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { products } from "../data/products";
import { useAccountStorage } from "../hooks/useAccountStorage";

const ShopContext = createContext(null);

export const useShop = () => useContext(ShopContext);
export const useCart = () => useContext(ShopContext);   // alias

/*  A product in two sizes must stay as TWO cart lines with their own price
    and quantity — matching only on id would merge them and keep whichever
    size was added first.                                                  */
export const cartKey = (item) => `${item.id}::${item.size || "default"}`;

export function ShopProvider({ children }) {
  const [cart, setCart] = useAccountStorage("pc_cart", []);            // [{ id, qty, size }]
  const [wishlist, setWishlist] = useAccountStorage("pc_wishlist", []); // [id]
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, icon = "cart") => {
    const at = Date.now();
    setToast({ message, icon, at });
    setTimeout(() => setToast((t) => (t && t.at === at ? null : t)), 2200);
  }, []);

  /* ── cart ── */
  const addToCart = useCallback(
    (product, qty = 1, size = null) => {
      const qtyToAdd = Math.max(1, Number(qty) || 1);
      const chosenSize = size ?? product.sizes?.[0] ?? null;
      const key = cartKey({ id: product.id, size: chosenSize });

      setCart((prev) => {
        const existing = prev.find((item) => cartKey(item) === key);
        if (existing) {
          return prev.map((item) =>
            cartKey(item) === key ? { ...item, qty: item.qty + qtyToAdd } : item
          );
        }
        return [...prev, { id: product.id, qty: qtyToAdd, size: chosenSize }];
      });

      notify("Added to cart");
    },
    [setCart, notify]
  );

  const updateQty = useCallback(
    (id, size, qty) => {
      const key = cartKey({ id, size });
      setCart((prev) =>
        qty <= 0
          ? prev.filter((item) => cartKey(item) !== key)
          : prev.map((item) => (cartKey(item) === key ? { ...item, qty } : item))
      );
    },
    [setCart]
  );

  const updateCartQty = useCallback(
    (key, delta) =>
      setCart((prev) =>
        prev.map((item) =>
          cartKey(item) === key ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
      ),
    [setCart]
  );

  const removeFromCart = useCallback(
    (id, size) => {
      const key = cartKey({ id, size });
      setCart((prev) => prev.filter((item) => cartKey(item) !== key));
      notify("Removed from cart");
    },
    [setCart, notify]
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const isInCart = useCallback((id) => cart.some((item) => item.id === id), [cart]);

  /* ── wishlist ── */
  const isWished = useCallback((id) => wishlist.includes(id), [wishlist]);

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const has = prev.includes(product.id);
        notify(has ? "Removed from wishlist" : "Saved to wishlist", "heart");
        return has ? prev.filter((x) => x !== product.id) : [...prev, product.id];
      });
    },
    [setWishlist, notify]
  );

  const moveToCart = useCallback(
    (product) => {
      addToCart(product, 1, product.sizes?.[0] ?? null);
      setWishlist((prev) => prev.filter((x) => x !== product.id));
    },
    [addToCart, setWishlist]
  );

  /* ── derived ── */
  const cartItems = useMemo(
    () =>
      cart
        .map((line) => {
          const product = products.find((p) => p.id === line.id);
          return product ? { ...line, product } : null;
        })
        .filter(Boolean),
    [cart]
  );

  const wishlistItems = useMemo(
    () => wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [wishlist]
  );

  const cartCount = useMemo(() => cart.reduce((n, x) => n + x.qty, 0), [cart]);

  const cartTotal = useMemo(
    () => cartItems.reduce((n, x) => n + x.product.price * x.qty, 0),
    [cartItems]
  );

  const cartSavings = useMemo(
    () =>
      cartItems.reduce(
        (n, x) => n + Math.max(0, (x.product.oldPrice || x.product.price) - x.product.price) * x.qty,
        0
      ),
    [cartItems]
  );

  const value = {
    cart, cartItems, cartCount, cartTotal, cartSavings,
    addToCart, updateQty, updateCartQty, removeFromCart, clearCart, isInCart,
    wishlist, wishlistItems, wishlistCount: wishlist.length,
    isWished, toggleWishlist, moveToCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}

      {/* ── toast ──
          Was a fixed-width pill with `truncate`, sitting at the same height
          as the floating WhatsApp button — so the text got cut and the
          button overlapped it. Now: centred wrapper, wraps to two lines,
          and clears the WhatsApp button on mobile. */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-x-4 bottom-28 z-[130] flex justify-center sm:inset-x-0 sm:bottom-8"
          >
            <span className="pointer-events-auto flex max-w-[26rem] items-start gap-2.5 rounded-2xl bg-brand-ink px-4 py-3 text-sm font-medium text-white shadow-2xl">
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  toast.icon === "heart" ? "bg-brand-pink" : "bg-green-600"
                }`}
              >
                {toast.icon === "heart" ? <Heart size={13} className="fill-white" /> : <Check size={14} />}
              </span>
              <span className="leading-5">{toast.message}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </ShopContext.Provider>
  );
}