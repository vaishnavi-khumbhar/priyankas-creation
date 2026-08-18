import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   DEMO AUTH — accounts live in this browser (localStorage).
   Fine for building/testing. Swap for Firebase or Supabase before
   launch; only signup / login / logout / changePassword change.
   ────────────────────────────────────────────────────────────── */

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const USERS_KEY = "pc_users";
const SESSION_KEY = "pc_session";

const load = (k, f) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : f;
  } catch {
    return f;
  }
};

const scramble = (s) => btoa(unescape(encodeURIComponent(`pc::${s}`)));
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

/* PC + ddmmyy + 4 digits → PC1808262650 */
const makeOrderNumber = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `PC${p(d.getDate())}${p(d.getMonth() + 1)}${String(d.getFullYear()).slice(2)}${Math.floor(1000 + Math.random() * 9000)}`;
};

export const ORDER_STEPS = ["Order Placed", "Confirmed", "Processing", "Out for Delivery", "Delivered"];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => load(USERS_KEY, []));
  const [sessionId, setSessionId] = useState(() => load(SESSION_KEY, null));

  useEffect(() => localStorage.setItem(USERS_KEY, JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem(SESSION_KEY, JSON.stringify(sessionId)), [sessionId]);

  const user = useMemo(() => users.find((u) => u.id === sessionId) || null, [users, sessionId]);

  const patchUser = useCallback(
    (patch) => setUsers((prev) => prev.map((u) => (u.id === sessionId ? { ...u, ...patch } : u))),
    [sessionId]
  );

  /* ── auth ── */
  const signup = useCallback(
    ({ name, email, phone, password }) => {
      const clean = email.trim().toLowerCase();
      if (users.some((u) => u.email === clean)) return { ok: false, error: "An account with this email already exists." };

      const newUser = {
        id: uid(),
        name: name.trim(),
        email: clean,
        phone: phone.trim(),
        pass: scramble(password),
        joined: new Date().toISOString(),
        addresses: [],
        orders: [],
      };
      setUsers((prev) => [...prev, newUser]);
      setSessionId(newUser.id);
      return { ok: true };
    },
    [users]
  );

  const login = useCallback(
    ({ email, password }) => {
      const clean = email.trim().toLowerCase();
      const found = users.find((u) => u.email === clean);
      if (!found) return { ok: false, error: "No account found with this email." };
      if (found.pass !== scramble(password)) return { ok: false, error: "Incorrect password. Please try again." };
      setSessionId(found.id);
      return { ok: true };
    },
    [users]
  );

  const logout = useCallback(() => setSessionId(null), []);
  const updateProfile = useCallback((patch) => patchUser(patch), [patchUser]);

  const changePassword = useCallback(
    (current, next) => {
      if (!user) return { ok: false, error: "Not signed in." };
      if (user.pass !== scramble(current)) return { ok: false, error: "Current password is incorrect." };
      patchUser({ pass: scramble(next) });
      return { ok: true };
    },
    [user, patchUser]
  );

  /* ── addresses ── */
  const saveAddress = useCallback(
    (address) => {
      if (!user) return;
      const list = user.addresses || [];
      patchUser({
        addresses: address.id
          ? list.map((a) => (a.id === address.id ? { ...a, ...address } : a))
          : [...list, { ...address, id: uid() }],
      });
    },
    [user, patchUser]
  );

  const removeAddress = useCallback(
    (id) => user && patchUser({ addresses: (user.addresses || []).filter((a) => a.id !== id) }),
    [user, patchUser]
  );

  /* ── orders ── */
  const addOrder = useCallback(
    (order) => {
      if (!user) return null;
      const created = {
        orderNo: makeOrderNumber(),
        date: new Date().toISOString(),
        status: "Confirmed",
        statusIndex: 1,           // 0 Placed · 1 Confirmed · 2 Processing · 3 Out for delivery · 4 Delivered
        cancelled: false,
        ...order,
      };
      patchUser({ orders: [created, ...(user.orders || [])] });
      return created;
    },
    [user, patchUser]
  );

  const getOrder = useCallback(
    (orderNo) => (user?.orders || []).find((o) => o.orderNo === orderNo) || null,
    [user]
  );

  const cancelOrder = useCallback(
    (orderNo) =>
      user &&
      patchUser({
        orders: (user.orders || []).map((o) =>
          o.orderNo === orderNo ? { ...o, cancelled: true, status: "Cancelled" } : o
        ),
      }),
    [user, patchUser]
  );

  /* for you to move an order forward while testing */
  const advanceOrder = useCallback(
    (orderNo) =>
      user &&
      patchUser({
        orders: (user.orders || []).map((o) => {
          if (o.orderNo !== orderNo || o.cancelled) return o;
          const next = Math.min(ORDER_STEPS.length - 1, (o.statusIndex ?? 1) + 1);
          return { ...o, statusIndex: next, status: ORDER_STEPS[next] };
        }),
      }),
    [user, patchUser]
  );

  const value = {
    user,
    isAuthed: !!user,
    signup, login, logout,
    updateProfile, changePassword,
    saveAddress, removeAddress,
    addOrder, getOrder, cancelOrder, advanceOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}