import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck, Store,
  MapPin, FileText, Check, X, BadgeCheck, Lock,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

const WA = "919130059818";
const PHONE_DISPLAY = "+91 9130059818";

/* ── your coupon codes — edit freely ── */
const COUPONS = {
  FIRST10: { type: "percent", value: 10, label: "10% off your first order" },
  PUNE50: { type: "flat", value: 50, label: "₹50 off in Pune" },
  SCHOOL15: { type: "percent", value: 15, label: "15% off bulk school orders" },
};

const emptyAddress = {
  id: null, label: "Home", name: "", line: "", line2: "", pin: "", city: "Pune",
  state: "Maharashtra", landmark: "", email: "", phone: "",
};

const input =
  "h-11 w-full rounded-xl border border-pink-200 bg-white px-3.5 text-sm text-brand-ink outline-none transition-all placeholder:text-brand-muted/70 focus:border-brand-pink/60 focus:ring-2 focus:ring-brand-pink/15";

export default function Cart() {
  const { cartItems, cartCount, cartTotal, updateQty, removeFromCart, clearCart } = useShop();
  const { user, isAuthed, saveAddress } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("deliver");         // deliver | pickup
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [selected, setSelected] = useState(user?.addresses?.[0]?.id || null);
  const [form, setForm] = useState(null);
  const [guestAddress, setGuestAddress] = useState(null);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [payError, setPayError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const addresses = user?.addresses || [];
  const chosen = addresses.find((a) => a.id === selected) || guestAddress || null;

  const discount = useMemo(() => {
    if (!coupon) return 0;
    return coupon.type === "percent"
      ? Math.round((cartTotal * coupon.value) / 100)
      : Math.min(coupon.value, cartTotal);
  }, [coupon, cartTotal]);

  const grandTotal = Math.max(0, cartTotal - discount);

  const applyCoupon = () => {
    const key = code.trim().toUpperCase();
    if (!key) return;
    const found = COUPONS[key];
    if (!found) {
      setCoupon(null);
      return setCouponMsg("That code isn't valid. Please check and try again.");
    }
    setCoupon({ ...found, code: key });
    setCouponMsg("");
  };

  const submitAddress = (e) => {
    e.preventDefault();
    if (!form.name || !form.line || !form.pin || !form.city || !form.phone) return;
    if (isAuthed) {
      saveAddress(form);
      setForm(null);
      setTimeout(() => setSelected(user?.addresses?.slice(-1)[0]?.id ?? null), 0);
    } else {
      setGuestAddress({ ...form, id: "guest" });
      setForm(null);
    }
  };

  const proceedToPay = () => {
    if (mode === "deliver" && !chosen) {
      setPayError("Please add a delivery address before placing your order.");
      return;
    }
    setPayError("");
    navigate("/checkout");
  };

  const handlePayNow = () => {
    if (!isAuthed) {
      setPayError("");
      setShowLogin(true);          // ask them to login, then continue
      return;
    }
    proceedToPay();
  };

  /* ── empty ── */
  if (!cartCount) {
    return (
      <div className="container-page py-20 text-center lg:py-28">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-soft text-brand-magenta">
          <ShoppingBag size={30} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold text-brand-ink">Your cart is empty</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-brand-muted">
          Browse our personalized exam boards, frames and gifts — every piece is made to order.
        </p>
        <Link
          to="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-8 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5"
        >
          Start shopping <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-8 lg:py-12">
      <div className="container-page">
        {/* ── header ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pb-0.5 font-script text-2xl leading-[1.45] text-brand-pink">Almost yours</p>
            <h1 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">Cart</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/products"
              className="rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(214,36,159,.9)]"
            >
              Shop Now
            </Link>
            <button onClick={clearCart} className="rounded-full px-3 py-2.5 text-sm font-semibold text-brand-muted hover:text-brand-magenta">
              Clear cart
            </button>
          </div>
        </div>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_370px]">
          {/* ══════════ LEFT ══════════ */}
          <div className="grid gap-5">
            {/* offers */}
            <div className="rounded-[22px] border border-pink-100 bg-white p-5">
              <p className="flex items-center gap-2 font-display text-lg font-bold text-brand-ink">
                <Tag size={17} className="text-brand-magenta" /> Available offers
              </p>

              <div className="mt-3 flex gap-3">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setCouponMsg(""); }}
                  placeholder="Enter coupon code"
                  className={input}
                />
                <button
                  onClick={applyCoupon}
                  className="shrink-0 rounded-xl px-4 text-sm font-bold text-brand-magenta hover:underline"
                >
                  Apply
                </button>
              </div>

              {coupon && (
                <p className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-green-50 px-3.5 py-2.5 text-[13px] text-green-700">
                  <span className="flex items-center gap-2">
                    <Check size={14} /> <b>{coupon.code}</b> applied — {coupon.label}
                  </span>
                  <button onClick={() => { setCoupon(null); setCode(""); }} aria-label="Remove coupon">
                    <X size={14} />
                  </button>
                </p>
              )}
              {couponMsg && <p className="mt-3 text-[13px] text-red-500">{couponMsg}</p>}
            </div>

            {/* delivery mode */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["deliver", Truck, "Deliver to an address", "Delivery is confirmed on WhatsApp after your design is approved."],
                ["pickup", Store, "Pickup from Pune", "Collect your order from us once it's ready."],
              ].map(([key, Icon, title, note]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`rounded-[20px] border-2 p-4 text-left transition-all ${
                    mode === key ? "border-brand-magenta bg-brand-soft/40" : "border-pink-100 bg-white hover:border-brand-pink/40"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${mode === key ? "border-brand-magenta" : "border-pink-300"}`}>
                      {mode === key && <span className="h-2 w-2 rounded-full bg-brand-magenta" />}
                    </span>
                    <Icon size={16} className="text-brand-magenta" />
                    <b className="text-[15px] text-brand-ink">{title}</b>
                  </span>
                  <p className="mt-1.5 pl-7 text-[14px] leading-6 text-brand-muted">{note}</p>
                </button>
              ))}
            </div>

            {/* address */}
            {mode === "deliver" && (
              <div className="rounded-[22px] border border-pink-100 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-display text-lg font-bold text-brand-ink">
                    <MapPin size={17} className="text-brand-magenta" /> Delivery Address
                  </p>
                  {!form && (
                    <button onClick={() => setForm(emptyAddress)} className="text-xs font-bold text-brand-magenta hover:underline">
                      + Add New
                    </button>
                  )}
                </div>

                {!form && (addresses.length || guestAddress) ? (
                  <div className="mt-4 grid gap-3">
                    {[...addresses, ...(guestAddress ? [guestAddress] : [])].map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSelected(a.id)}
                        className={`rounded-[18px] border-2 p-4 text-left transition-all ${
                          chosen?.id === a.id ? "border-brand-magenta bg-brand-soft/30" : "border-pink-100 hover:border-brand-pink/40"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${chosen?.id === a.id ? "border-brand-magenta" : "border-pink-300"}`}>
                            {chosen?.id === a.id && <span className="h-2 w-2 rounded-full bg-brand-magenta" />}
                          </span>
                          <b className="text-[15px] text-brand-ink">{a.name}</b>
                          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-magenta">
                            {a.label}
                          </span>
                        </span>
                        <p className="mt-1.5 pl-7 text-[14px] leading-6 text-brand-muted">
                          {a.phone}<br />
                          {a.line}{a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} – {a.pin}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : null}

                {form && (
                  <form onSubmit={submitAddress} className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input className={`${input} sm:col-span-2`} placeholder="Recipient name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input className={`${input} sm:col-span-2`} placeholder="Flat / house no. / floor *" value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })} />
                    <input className={`${input} sm:col-span-2`} placeholder="Colony / street / locality" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} />
                    <input className={input} placeholder="Pincode *" inputMode="numeric" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} />
                    <input className={input} placeholder="City *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                    <input className={input} placeholder="State *" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                    <input className={input} placeholder="Landmark (optional)" value={form.landmark} onChange={(e) => setForm({ ...form, landmark: e.target.value })} />
                    <input className={input} placeholder="Mobile number *" inputMode="numeric" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    <input className={input} placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

                    <div className="flex gap-2 sm:col-span-2">
                      {["Home", "Work", "Other"].map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setForm({ ...form, label: l })}
                          className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                            form.label === l
                              ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white"
                              : "border border-pink-200 text-brand-ink hover:border-brand-pink/60"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3 sm:col-span-2">
                      <button type="button" onClick={() => setForm(null)} className="h-11 flex-1 rounded-full border border-pink-200 text-sm font-semibold text-brand-muted">
                        Cancel
                      </button>
                      <button type="submit" className="h-11 flex-[2] rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-sm font-semibold text-white">
                        Save &amp; deliver here
                      </button>
                    </div>

                    {!isAuthed && (
                      <p className="text-[13px] text-brand-muted sm:col-span-2">
                        <Link to="/login" className="font-semibold text-brand-magenta hover:underline">Login</Link> to save this address for next time.
                      </p>
                    )}
                  </form>
                )}

                {!form && !addresses.length && !guestAddress && (
                  <p className="mt-4 rounded-[18px] border border-dashed border-pink-200 bg-brand-soft/40 p-6 text-center text-[15px] text-brand-muted">
                    No address added yet. Tap <b className="text-brand-magenta">+ Add New</b> to enter delivery details.
                  </p>
                )}
              </div>
            )}

            {/* order instructions */}
            <div className="rounded-[22px] border border-pink-100 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-brand-ink">
                  <FileText size={17} className="text-brand-magenta" /> Order instructions
                </p>
                {!showNotes && (
                  <button onClick={() => setShowNotes(true)} className="text-xs font-bold text-brand-magenta hover:underline">
                    Add
                  </button>
                )}
              </div>

              {showNotes ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Child's name, class, favourite cartoon theme, colour preference, delivery date…"
                  className="mt-3 w-full rounded-xl border border-pink-200 bg-white p-3.5 text-sm text-brand-ink outline-none transition-all placeholder:text-brand-muted/70 focus:border-brand-pink/60 focus:ring-2 focus:ring-brand-pink/15"
                />
              ) : (
                <p className="mt-2 text-[14px] leading-6 text-brand-muted">
                  Tell us the name, theme and any special request — it goes straight into your order.
                </p>
              )}
            </div>
          </div>

          {/* ══════════ RIGHT — summary ══════════ */}
          <aside className="h-fit rounded-[22px] border border-pink-100 bg-white p-5 lg:sticky lg:top-28">
            <div className="grid gap-4">
              {cartItems.map(({ product, qty, size }) => {
                const off = product.oldPrice > product.price
                  ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
                return (
                  <div key={`${product.id}-${size}`} className="flex gap-3 border-b border-pink-50 pb-4 last:border-0 last:pb-0">
                    <Link to={`/product/${product.id}`} className="shrink-0">
                      <img src={product.image} alt={product.name} className="h-[72px] w-[72px] rounded-xl object-cover" />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/product/${product.id}`} className="truncate text-[15px] font-semibold text-brand-ink hover:text-brand-magenta">
                          {product.name}
                        </Link>
                        <span className="shrink-0 text-[15px] font-bold text-brand-ink">₹{(product.price * qty).toFixed(2)}</span>
                      </div>

                      {size && <p className="mt-0.5 text-[12px] text-brand-muted">{size}</p>}

                      <p className="mt-1 flex flex-wrap items-center gap-2 text-[13px]">
                        <span className="font-bold text-green-600">₹{product.price}</span>
                        {off > 0 && (
                          <>
                            <span className="text-brand-muted line-through">₹{product.oldPrice}</span>
                            <span className="font-bold text-green-600">{off}% OFF</span>
                          </>
                        )}
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <button onClick={() => removeFromCart(product.id, size)} aria-label="Remove" className="text-brand-muted hover:text-red-500">
                          <Trash2 size={15} />
                        </button>
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-pink-200 px-2.5 py-1">
                          <button onClick={() => updateQty(product.id, size, qty - 1)} aria-label="Decrease" className="text-brand-purple"><Minus size={13} /></button>
                          <span className="w-5 text-center text-sm font-semibold text-brand-ink">{qty}</span>
                          <button onClick={() => updateQty(product.id, size, qty + 1)} aria-label="Increase" className="text-brand-purple"><Plus size={13} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <dl className="mt-5 grid gap-3 border-t border-pink-100 pt-4 text-[15px]">
              <div className="flex justify-between text-brand-muted">
                <dt>Item total ({cartCount})</dt>
                <dd className="font-semibold text-brand-ink">₹{cartTotal.toFixed(2)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <dt>Coupon {coupon.code}</dt>
                  <dd className="font-semibold">− ₹{discount}</dd>
                </div>
              )}
              <div className="mt-2 flex items-baseline justify-between border-t border-pink-100 pt-3">
                <dt className="text-base font-bold text-brand-ink">Grand Total</dt>
                <dd className="text-xl font-bold text-green-600">₹{grandTotal.toFixed(2)}</dd>
              </div>
            </dl>

            {payError && (
              <p className="mt-4 rounded-xl bg-red-50 px-3.5 py-2.5 text-[13px] text-red-600">{payError}</p>
            )}

            <button
              onClick={handlePayNow}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-14px_rgba(214,36,159,.95)] transition-transform hover:-translate-y-0.5"
            >
              Pay Now
            </button>

            <Link
              to="/products"
              className="mt-3 flex h-11 items-center justify-center rounded-full border border-brand-pink/30 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-pink/60 hover:bg-pink-50"
            >
              Continue shopping
            </Link>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[12px] text-brand-muted">
              <span className="flex items-center gap-1"><Lock size={13} /> Secured payment</span>
              <span className="flex items-center gap-1"><BadgeCheck size={13} /> Verified merchant</span>
            </div>

           
          </aside>
        </div>
      </div>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={proceedToPay}
        title="Login to place your order"
      />
    </section>
  );
}