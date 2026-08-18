import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { sendOtp as providerSendOtp, verifyOtp as providerVerifyOtp } from "../lib/otp";

/*  Phone + OTP auth.
    Accounts are keyed by mobile number. Profile details, addresses and
    orders stay exactly as before — only the way people sign in changed. */

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

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const clean = (p) => String(p || "").replace(/\D/g, "").slice(-10);

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

  /* ── OTP login ── */
  const sendOtp = useCallback(async (phone) => {
    const p = clean(phone);
    if (p.length !== 10) return { ok: false, error: "Please enter a valid 10-digit mobile number." };
    return providerSendOtp(p);
  }, []);

  const verifyOtp = useCallback(
    async (phone, code) => {
      const p = clean(phone);
      const res = await providerVerifyOtp(p, code);
      if (!res.ok) return res;

      /* existing account → sign in · new number → create account */
      const existing = users.find((u) => u.phone === p);
      if (existing) {
        setSessionId(existing.id);
        return { ok: true, isNew: false };
      }

      const newUser = {
        id: uid(),
        phone: p,
        name: "",
        email: "",
        joined: new Date().toISOString(),
        addresses: [],
        orders: [],
      };
      setUsers((prev) => [...prev, newUser]);
      setSessionId(newUser.id);
      return { ok: true, isNew: true };
    },
    [users]
  );

  const logout = useCallback(() => setSessionId(null), []);
  const updateProfile = useCallback((patch) => patchUser(patch), [patchUser]);

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
        statusIndex: 1,
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
    sendOtp, verifyOtp, logout,
    updateProfile,
    saveAddress, removeAddress,
    addOrder, getOrder, cancelOrder, advanceOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}