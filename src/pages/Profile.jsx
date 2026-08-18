import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package, MapPin, Heart, Settings, LogOut, ChevronRight, Pencil, Plus, Trash2,
  ShoppingCart, Check, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

const MENU = [
  ["orders", "My Orders", Package],
  ["addresses", "Saved Addresses", MapPin],
  ["wishlist", "My Wishlist", Heart],
  ["settings", "Account Settings", Settings],
];

const initials = (name = "") =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "PC";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const emptyAddress = {
  id: null, label: "Home", name: "", phone: "", line: "", line2: "",
  city: "Pune", state: "Maharashtra", pin: "", landmark: "", email: "",
};

export default function Profile() {
  const {
    user, isAuthed, logout, updateProfile, changePassword,
    saveAddress, removeAddress, cancelOrder,
  } = useAuth();
  const { wishlistItems, moveToCart, toggleWishlist } = useShop();
  const navigate = useNavigate();

  const [tab, setTab] = useState("orders");
  const [addr, setAddr] = useState(null);
  const [profileForm, setProfileForm] = useState(null);
  const [pwd, setPwd] = useState({ current: "", next: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!isAuthed) navigate("/login", { replace: true, state: { from: "/profile" } });
  }, [isAuthed, navigate]);

  if (!user) return null;

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2200); };

  const saveProfile = () => {
    updateProfile({
      name: profileForm.name.trim(),
      email: profileForm.email.trim().toLowerCase(),
      phone: profileForm.phone.trim(),
    });
    setProfileForm(null);
    flash("Profile updated");
  };

  const submitPassword = () => {
    if (pwd.next.length < 6) return flash("New password must be at least 6 characters");
    const res = changePassword(pwd.current, pwd.next);
    flash(res.ok ? "Password changed" : res.error);
    if (res.ok) setPwd({ current: "", next: "" });
  };

  const submitAddress = (e) => {
    e.preventDefault();
    if (!addr.name || !addr.line || !addr.city || !addr.pin) return flash("Please fill name, address, city and PIN");
    saveAddress(addr);
    setAddr(null);
    flash("Address saved");
  };

  const input =
    "h-11 w-full rounded-xl bg-brand-soft/70 px-3.5 text-sm text-brand-ink outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-brand-pink/50";

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-8 lg:py-12">
      <div className="container-page">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink p-6 text-white sm:p-8"
        >
          <span className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-wrap items-center gap-5">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-white/15 font-display text-2xl font-bold ring-2 ring-white/30">
              {initials(user.name)}
            </span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-2xl font-bold sm:text-3xl">{user.name}</h1>
                <span className="rounded-full bg-brand-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                  Member
                </span>
              </div>
              <p className="mt-1 break-all text-sm text-white/80">{user.phone} · {user.email}</p>
            </div>

            <button
              onClick={() => { setTab("settings"); setProfileForm({ name: user.name, email: user.email, phone: user.phone }); }}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold ring-1 ring-white/30 transition-colors hover:bg-white/25"
            >
              <Pencil size={15} /> Edit Profile
            </button>
          </div>
        </motion.div>

        {msg && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
            <Check size={13} /> {msg}
          </p>
        )}

        <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
          {/* ── menu ── */}
          <aside className="h-fit overflow-hidden rounded-[22px] border border-pink-100 bg-white">
            {MENU.map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex w-full items-center gap-3 border-b border-pink-50 px-5 py-4 text-left text-sm transition-colors ${
                  tab === key
                    ? "border-l-[3px] border-l-brand-magenta bg-brand-soft/60 font-semibold text-brand-magenta"
                    : "text-brand-ink hover:bg-brand-soft/40"
                }`}
              >
                <Icon size={17} className={tab === key ? "text-brand-magenta" : "text-brand-muted"} />
                {label}
                {key === "wishlist" && wishlistItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-brand-pink px-1.5 text-[10px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
                {key === "orders" && user.orders?.length > 0 && (
                  <span className="ml-1 rounded-full bg-brand-pink px-1.5 text-[10px] font-bold text-white">
                    {user.orders.length}
                  </span>
                )}
                <ChevronRight size={15} className="ml-auto text-brand-muted" />
              </button>
            ))}

            <button
              onClick={() => { logout(); navigate("/"); }}
              className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut size={17} /> Logout
            </button>
          </aside>

          {/* ── panel ── */}
          <div className="rounded-[22px] border border-pink-100 bg-white p-5 sm:p-7">
            {/* ══ ORDERS ══ */}
            {tab === "orders" && (
              <>
                <h2 className="font-display text-xl font-bold text-brand-ink">My Orders</h2>

                {user.orders?.length ? (
                  <div className="mt-5 grid gap-3">
                    {user.orders.map((o) => (
                      <div
                        key={o.orderNo}
                        className={`rounded-2xl border border-l-4 border-pink-100 p-4 ${
                          o.cancelled ? "border-l-red-400" : "border-l-brand-magenta"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-bold text-brand-ink">
                              {o.orderNo}
                              <span className="ml-2 text-[12px] font-normal text-brand-muted">{fmtDate(o.date)}</span>
                            </p>
                            <p className="mt-1 text-[13px] leading-6 text-brand-muted">
                              {o.items.map((i) => `${i.name}${i.size ? ` (${i.size})` : ""} ×${i.qty}`).join(", ")}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-brand-ink">₹{Number(o.total).toFixed(0)}</span>
                            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold text-brand-magenta">
                              {o.payment === "cod" ? "Pay on Delivery" : "Paid Online"}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                o.cancelled ? "bg-red-50 text-red-500" : "bg-green-50 text-green-700"
                              }`}
                            >
                              {o.status}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Link
                            to={`/track-order/${o.orderNo}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                          >
                            <Package size={13} /> Track Order
                          </Link>

                          {!o.cancelled && (o.statusIndex ?? 1) < 2 && (
                            <button
                              onClick={() => { cancelOrder(o.orderNo); flash("Order cancelled"); }}
                              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
                            >
                              <X size={13} /> Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-pink-200 bg-brand-soft/40 p-10 text-center">
                    <Package size={26} className="text-brand-magenta" />
                    <p className="mt-3 text-sm text-brand-muted">No orders yet.</p>
                    <Link to="/products" className="mt-4 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-6 py-2.5 text-sm font-semibold text-white">
                      Start shopping
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* ══ ADDRESSES ══ */}
            {tab === "addresses" && (
              <>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-bold text-brand-ink">Saved Addresses</h2>
                  {!addr && (
                    <button onClick={() => setAddr(emptyAddress)} className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-magenta">
                      <Plus size={14} /> Add new
                    </button>
                  )}
                </div>

                {addr && (
                  <form onSubmit={submitAddress} className="mt-5 grid gap-3 rounded-2xl border border-pink-100 bg-brand-soft/30 p-4 sm:grid-cols-2">
                    <input className={input} placeholder="Label (Home / Work)" value={addr.label} onChange={(e) => setAddr({ ...addr, label: e.target.value })} />
                    <input className={input} placeholder="Full name" value={addr.name} onChange={(e) => setAddr({ ...addr, name: e.target.value })} />
                    <input className={input} placeholder="Phone" inputMode="numeric" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} />
                    <input className={input} placeholder="PIN code" inputMode="numeric" value={addr.pin} onChange={(e) => setAddr({ ...addr, pin: e.target.value })} />
                    <input className={`${input} sm:col-span-2`} placeholder="Flat / building / street" value={addr.line} onChange={(e) => setAddr({ ...addr, line: e.target.value })} />
                    <input className={`${input} sm:col-span-2`} placeholder="Colony / locality (optional)" value={addr.line2} onChange={(e) => setAddr({ ...addr, line2: e.target.value })} />
                    <input className={input} placeholder="City" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
                    <input className={input} placeholder="State" value={addr.state} onChange={(e) => setAddr({ ...addr, state: e.target.value })} />

                    <div className="flex gap-2 sm:col-span-2">
                      <button type="submit" className="h-11 flex-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-sm font-semibold text-white">
                        Save address
                      </button>
                      <button type="button" onClick={() => setAddr(null)} className="grid h-11 w-11 place-items-center rounded-full border border-pink-200 text-brand-muted">
                        <X size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {user.addresses?.length ? (
                  <div className="mt-5 grid gap-3">
                    {user.addresses.map((a) => (
                      <div key={a.id} className="flex items-start gap-3 rounded-2xl border border-pink-100 p-4">
                        <MapPin size={17} className="mt-0.5 shrink-0 text-brand-gold" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-brand-ink">
                            {a.name} <span className="font-normal text-brand-muted">· {a.label}</span>
                          </p>
                          <p className="mt-0.5 text-[13px] leading-6 text-brand-muted">
                            {a.line}{a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} – {a.pin}
                            {a.phone ? ` · ${a.phone}` : ""}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button onClick={() => setAddr(a)} aria-label="Edit" className="grid h-8 w-8 place-items-center rounded-full text-brand-muted hover:bg-brand-soft hover:text-brand-magenta">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => removeAddress(a.id)} aria-label="Delete" className="grid h-8 w-8 place-items-center rounded-full text-brand-muted hover:bg-red-50 hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !addr && (
                    <p className="mt-6 rounded-2xl border border-dashed border-pink-200 bg-brand-soft/40 p-8 text-center text-sm text-brand-muted">
                      No saved addresses yet. Add one to make checkout faster.
                    </p>
                  )
                )}
              </>
            )}

            {/* ══ WISHLIST ══ */}
            {tab === "wishlist" && (
              <>
                <h2 className="font-display text-xl font-bold text-brand-ink">My Wishlist</h2>
                {wishlistItems.length ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {wishlistItems.map((p) => (
                      <div key={p.id} className="flex gap-3 rounded-2xl border border-pink-100 p-3">
                        <Link to={`/product/${p.id}`} className="shrink-0">
                          <img src={p.image} alt={p.name} className="h-20 w-20 rounded-xl object-cover" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <Link to={`/product/${p.id}`} className="truncate font-display text-sm font-semibold text-brand-ink hover:text-brand-magenta">
                            {p.name}
                          </Link>
                          <p className="mt-0.5 font-display text-base font-bold text-green-600">₹{p.price}</p>
                          <div className="mt-auto flex gap-2 pt-2">
                            <button onClick={() => moveToCart(p)} className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                              <ShoppingCart size={12} /> Move to cart
                            </button>
                            <button onClick={() => toggleWishlist(p)} className="text-[11px] font-medium text-brand-muted hover:text-brand-magenta">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-pink-200 bg-brand-soft/40 p-10 text-center">
                    <Heart size={26} className="text-brand-magenta" />
                    <p className="mt-3 text-sm text-brand-muted">Nothing saved yet.</p>
                    <Link to="/products" className="mt-4 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-6 py-2.5 text-sm font-semibold text-white">
                      Browse products
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* ══ SETTINGS ══ */}
            {tab === "settings" && (
              <>
                <h2 className="font-display text-xl font-bold text-brand-ink">Account Settings</h2>

                <div className="mt-5 rounded-2xl border border-pink-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-brand-ink">Profile details</p>
                    {!profileForm && (
                      <button
                        onClick={() => setProfileForm({ name: user.name, email: user.email, phone: user.phone })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-magenta"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                    )}
                  </div>

                  {profileForm ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <input className={input} value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} placeholder="Full name" />
                      <input className={input} value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder="Phone" inputMode="numeric" />
                      <input className={`${input} sm:col-span-2`} value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} placeholder="Email" type="email" />
                      <div className="flex gap-2 sm:col-span-2">
                        <button onClick={saveProfile} className="h-11 flex-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-sm font-semibold text-white">
                          Save changes
                        </button>
                        <button onClick={() => setProfileForm(null)} className="h-11 rounded-full border border-pink-200 px-5 text-sm font-semibold text-brand-muted">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <dl className="mt-3 grid gap-2 text-sm">
                      <div className="flex justify-between gap-4"><dt className="text-brand-muted">Name</dt><dd className="text-brand-ink">{user.name}</dd></div>
                      <div className="flex justify-between gap-4"><dt className="text-brand-muted">Phone</dt><dd className="text-brand-ink">{user.phone}</dd></div>
                      <div className="flex justify-between gap-4"><dt className="text-brand-muted">Email</dt><dd className="break-all text-brand-ink">{user.email}</dd></div>
                    </dl>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-pink-100 p-4">
                  <p className="text-sm font-semibold text-brand-ink">Change password</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input className={input} type="password" placeholder="Current password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} />
                    <input className={input} type="password" placeholder="New password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} />
                    <button onClick={submitPassword} className="h-11 rounded-full bg-brand-soft text-sm font-semibold text-brand-magenta sm:col-span-2">
                      Update password
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}