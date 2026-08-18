import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

/*  Per-account localStorage.

    Without this, one fixed key ("pc_cart") is shared by every account on
    the browser — so a second parent signing in on the same phone inherits
    the first one's cart. Here the key is scoped to the logged-in user id,
    and a guest gets their own "guest" bucket which is merged into the
    account the first time they log in.                                   */
export function useAccountStorage(baseKey, initial) {
  const { user } = useAuth();
  const accountId = user?.id || "guest";
  const storageKey = `${baseKey}::${accountId}`;
  const prevKey = useRef(storageKey);

  const read = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const [value, setValue] = useState(() => read(storageKey, initial));

  /* account changed → load that account's data (merging the guest bucket in on first login) */
  useEffect(() => {
    if (prevKey.current === storageKey) return;

    const wasGuest = prevKey.current.endsWith("::guest");
    const guestData = read(`${baseKey}::guest`, initial);
    const accountData = read(storageKey, initial);

    if (wasGuest && Array.isArray(guestData) && guestData.length && accountId !== "guest") {
      /* merge guest cart/wishlist into the account, then empty the guest bucket */
      const merged = Array.isArray(accountData) ? [...accountData] : [];
      guestData.forEach((g) => {
        const i = merged.findIndex((m) => JSON.stringify({ ...m, qty: 0 }) === JSON.stringify({ ...g, qty: 0 }));
        if (i > -1 && typeof merged[i].qty === "number") merged[i] = { ...merged[i], qty: merged[i].qty + g.qty };
        else if (!merged.some((m) => JSON.stringify(m) === JSON.stringify(g))) merged.push(g);
      });
      setValue(merged);
      localStorage.setItem(`${baseKey}::guest`, JSON.stringify(initial));
    } else {
      setValue(accountData);
    }

    prevKey.current = storageKey;
  }, [storageKey, baseKey, accountId, initial]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* quota full or private mode — ignore */
    }
  }, [storageKey, value]);

  return [value, setValue];
}