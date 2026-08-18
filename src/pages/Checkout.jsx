import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Truck, Store, Banknote, QrCode, CreditCard, Landmark, Wallet, MapPin, Lock,
  Check, AlertCircle, ArrowLeft, ShieldCheck, Plus, X,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

/* ── settings you control ───────────────────────────────── */
const DELIVERY_CHARGE = 50;      // ₹0 for pickup
const ONLINE_DISCOUNT = 10;      // real reduction for paying online
const RAZORPAY_KEY = "";         // "rzp_live_xxxxx" — leave empty until you have one
/* ───────────────────────────────────────────────────────── */

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const s = document.createElement("script");
    s.id = "razorpay-sdk";
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const Radio = ({ selected }) => (
  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${selected ? "border-brand-magenta" : "border-pink-300"}`}>
    {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-magenta" />}
  </span>
);

const Tick = () => (
  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brand-magenta text-white shadow">
    <Check size={13} strokeWidth={3} />
  </span>
);

const emptyAddress = {
  id: null, label: "Home", name: "", phone: "", line: "", line2: "",
  city: "Pune", state: "Maharashtra", pin: "",
};

const input =
  "h-11 w-full rounded-xl border border-pink-200 bg-white px-3.5 text-sm text-brand-ink outline-none transition-all placeholder:text-brand-muted/70 focus:border-brand-pink/60 focus:ring-2 focus:ring-brand-pink/15";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, clearCart } = useShop();
  const { user, isAuthed, addOrder, saveAddress } = useAuth();

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addressId, setAddressId] = useState(user?.addresses?.[0]?.id || null);
  const [form, setForm] = useState(null);        // inline "add address"
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");

  const addresses = user?.addresses || [];
  const address = addresses.find((a) => a.id === addressId) || null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthed) navigate("/login", { replace: true, state: { from: "/checkout" } });
  }, [isAuthed, navigate]);

  useEffect(() => {
    /* clearCart() empties the cart a moment before we navigate to the
       success page — the `placed` guard stops this bouncing the customer
       to the empty-cart screen. */
    if (!cartCount && !placed) navigate("/cart", { replace: true });
  }, [cartCount, placed, navigate]);

  /* keep the newest saved address selected */
  useEffect(() => {
    if (!addressId && addresses.length) setAddressId(addresses[addresses.length - 1].id);
  }, [addresses, addressId]);

  const deliveryCharge = deliveryMethod === "delivery" ? DELIVERY_CHARGE : 0;
  const baseTotal = cartTotal + deliveryCharge;
  const onlineDiscount = paymentMethod === "online" ? Math.min(ONLINE_DISCOUNT, baseTotal) : 0;
  const total = baseTotal - onlineDiscount;

  const addressText = address
    ? `${address.name}, ${address.line}${address.line2 ? `, ${address.line2}` : ""}, ${address.city}, ${address.state} – ${address.pin} · ${address.phone}`
    : "Store pickup — Pune";

  const submitAddress = (e) => {
    e.preventDefault();
    if (!form.name || !form.line || !form.city || !form.pin || !form.phone) {
      return setError("Please fill name, phone, address, city and PIN.");
    }
    saveAddress(form);
    setForm(null);
    setAddressId(null);      // the effect above picks the new one
    setError("");
  };

  const finishOrder = (payment) => {
    const created = addOrder({
      items: cartItems.map((x) => ({
        name: x.product.name,
        size: x.size,
        qty: x.qty,
        price: x.product.price,
      })),
      subtotal: cartTotal,
      deliveryCharge,
      discount: onlineDiscount,
      total,
      payment,                    // "cod" | "online"
      deliveryMethod,             // "delivery" | "pickup"
      address: addressText,
      customerPhone: user.phone,
    });

    if (!created) {
      setPlacing(false);
      return setError("Could not save the order. Please try again.");
    }

    setPlaced(true);
    clearCart();
    navigate(`/order-success/${created.orderNo}`);
  };

  const handlePlaceOrder = async () => {
    setError("");

    if (deliveryMethod === "delivery" && !address) {
      return setError("Please add or select a delivery address, or choose store pickup.");
    }

    if (paymentMethod === "cod") return finishOrder("cod");

    if (!RAZORPAY_KEY) {
      return setError(
        "Online payment isn't switched on yet. Please choose Cash on Delivery — we'll confirm everything on WhatsApp."
      );
    }

    setPlacing(true);
    const ok = await loadRazorpay();
    if (!ok) {
      setPlacing(false);
      return setError("Razorpay could not load. Please check your connection or choose Cash on Delivery.");
    }

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY,
      amount: total * 100,
      currency: "INR",
      name: "Priyanka's Creation",
      description: `${cartCount} item(s)`,
      prefill: { name: user?.name || "", email: user?.email || "", contact: user?.phone || "" },
      theme: { color: "#D6249F" },
      handler: () => finishOrder("online"),
      modal: { ondismiss: () => setPlacing(false) },
    });
    rzp.on("payment.failed", () => {
      setPlacing(false);
      setError("Payment failed. Please try again or choose Cash on Delivery.");
    });
    rzp.open();
  };

  if (!isAuthed || (!cartCount && !placed)) return null;

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-8 lg:py-12">
      <div className="container-page">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-muted hover:text-brand-magenta">
          <ArrowLeft size={15} /> Back to cart
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="mx-auto mt-4 max-w-3xl rounded-[28px] border border-pink-100 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(80,20,80,.5)] sm:p-8 lg:p-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">Almost there</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-brand-ink sm:text-5xl">Checkout</h1>
          <p className="mt-2 text-[13px] text-brand-muted">Ordering as +91 {user.phone}</p>

          {/* ── delivery method ── */}
          <div className="mt-7">
            <p className="font-display text-lg font-bold text-brand-ink">How would you like it?</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["delivery", Truck, "Home Delivery", `₹${DELIVERY_CHARGE} in Pune`],
                ["pickup", Store, "Store Pickup", "Free · collect in Pune"],
              ].map(([key, Icon, label, note]) => (
                <button
                  key={key}
                  onClick={() => setDeliveryMethod(key)}
                  className={`relative flex flex-col items-center gap-1.5 rounded-2xl border-2 bg-white py-4 text-sm font-bold transition-colors ${
                    deliveryMethod === key ? "border-brand-magenta text-brand-magenta" : "border-pink-100 text-brand-ink hover:border-brand-pink/50"
                  }`}
                >
                  {deliveryMethod === key && <Tick />}
                  <Icon size={23} />
                  {label}
                  <span className="text-[11px] font-medium text-brand-muted">{note}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── address ── */}
          {deliveryMethod === "delivery" && (
            <div className="mt-7">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-brand-ink">
                  <MapPin size={17} className="text-brand-magenta" /> Deliver to
                </p>
                {!form && (
                  <button
                    onClick={() => setForm({ ...emptyAddress, name: user.name || "", phone: user.phone || "" })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-magenta hover:underline"
                  >
                    <Plus size={13} /> Add new
                  </button>
                )}
              </div>

              {!form && addresses.length ? (
                <div className="mt-3 grid gap-2.5">
                  {addresses.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAddressId(a.id)}
                      className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
                        addressId === a.id ? "border-brand-magenta bg-brand-soft/30" : "border-pink-100 hover:border-brand-pink/50"
                      }`}
                    >
                      <Radio selected={addressId === a.id} />
                      <span className="min-w-0 text-[14px] leading-6 text-brand-muted">
                        <b className="text-brand-ink">{a.name}</b>
                        <span className="text-brand-muted"> · {a.label}</span>
                        <br />
                        {a.line}{a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} – {a.pin}
                        <br />
                        {a.phone}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}

              {/* inline address form — no need to leave checkout */}
              {form && (
                <form onSubmit={submitAddress} className="mt-3 grid gap-3 rounded-2xl border border-pink-100 bg-brand-soft/30 p-4 sm:grid-cols-2">
                  <input className={input} placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input className={input} placeholder="Mobile number *" inputMode="numeric" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <input className={`${input} sm:col-span-2`} placeholder="Flat / building / street *" value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })} />
                  <input className={`${input} sm:col-span-2`} placeholder="Colony / locality (optional)" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} />
                  <input className={input} placeholder="City *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  <input className={input} placeholder="PIN code *" inputMode="numeric" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} />
                  <input className={input} placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                  <input className={input} placeholder="Label (Home / Work)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />

                  <div className="flex gap-2 sm:col-span-2">
                    <button type="submit" className="h-11 flex-[2] rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-sm font-semibold text-white">
                      Save &amp; deliver here
                    </button>
                    <button type="button" onClick={() => setForm(null)} className="grid h-11 w-11 place-items-center rounded-full border border-pink-200 text-brand-muted">
                      <X size={16} />
                    </button>
                  </div>
                </form>
              )}

              {!form && !addresses.length && (
                <p className="mt-3 rounded-2xl border border-dashed border-pink-200 bg-brand-soft/40 p-5 text-center text-[14px] text-brand-muted">
                  No saved address yet. Tap <b className="text-brand-magenta">+ Add new</b> above, or choose store pickup.
                </p>
              )}
            </div>
          )}

          {/* ── payment ── */}
          <div className="mt-7">
            <p className="font-display text-lg font-bold text-brand-ink">Payment Method</p>

            <div className="mt-3 grid gap-3.5">
              {/* COD */}
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all ${
                  paymentMethod === "cod" ? "border-brand-magenta shadow-[0_8px_22px_-14px_rgba(214,36,159,.6)]" : "border-pink-100 hover:border-brand-pink/50"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="whitespace-nowrap text-[15px] font-bold text-brand-ink">₹{baseTotal}</span>
                  <span className="h-9 w-px bg-pink-100" />
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-magenta">
                    <Banknote size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold text-brand-ink">Cash on Delivery</span>
                    <span className="block text-[12px] text-brand-muted">Pay when your order arrives</span>
                  </span>
                </span>
                <Radio selected={paymentMethod === "cod"} />
              </button>

              {/* Online */}
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all ${
                  paymentMethod === "online" ? "border-brand-magenta shadow-[0_10px_26px_-14px_rgba(214,36,159,.7)]" : "border-pink-100 hover:border-brand-pink/50"
                }`}
              >
                <span className="absolute right-5 top-0 rounded-b-md bg-green-600 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                  RECOMMENDED
                </span>

                <button onClick={() => setPaymentMethod("online")} className="flex w-full items-center justify-between gap-3 p-4 pt-5 text-left">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="whitespace-nowrap leading-tight">
                      <span className="block text-[12px] text-brand-muted line-through">₹{baseTotal}</span>
                      <span className="block text-[15px] font-extrabold text-green-600">
                        ₹{baseTotal - Math.min(ONLINE_DISCOUNT, baseTotal)}
                      </span>
                    </span>
                    <span className="h-9 w-px bg-pink-100" />
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-magenta">
                      <QrCode size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-bold text-brand-ink">Pay Online</span>
                      <span className="block text-[12px] text-brand-muted">UPI, card or netbanking via Razorpay</span>
                    </span>
                  </span>
                  <Radio selected={paymentMethod === "online"} />
                </button>

                <div className="flex flex-wrap items-center gap-2 px-4 pb-4">
                  {[[QrCode, "UPI"], [CreditCard, "Cards"], [Landmark, "Netbanking"], [Wallet, "Wallet"]].map(
                    ([Icon, label]) => (
                      <span key={label} className="flex items-center gap-1.5 rounded-full bg-brand-soft/70 py-1.5 pl-2 pr-3 text-[11px] font-semibold text-brand-purple">
                        <Icon size={13} /> {label}
                      </span>
                    )
                  )}
                </div>

                {ONLINE_DISCOUNT > 0 && (
                  <p className="bg-green-50 py-1.5 text-center text-[12px] font-bold text-green-700">
                    Save ₹{Math.min(ONLINE_DISCOUNT, baseTotal)} by paying online instead of COD
                  </p>
                )}
              </div>
            </div>

            <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-brand-muted">
              <Lock size={13} /> Your payment details are handled by Razorpay and never stored by us.
            </p>
          </div>

          {/* ── summary ── */}
          <div className="-mx-5 mt-8 border-t-2 border-dashed border-pink-100 bg-brand-soft/40 px-5 pb-2 pt-5 text-[15px] sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Order Summary</p>

            <div className="mb-1.5 flex justify-between text-brand-muted">
              <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
              <span className="font-semibold text-brand-ink">₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="mb-1.5 flex justify-between text-brand-muted">
              <span>Delivery charge</span>
              <span className="font-semibold text-brand-ink">{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}</span>
            </div>
            {onlineDiscount > 0 && (
              <div className="mb-1.5 flex justify-between text-green-600">
                <span>Online payment discount</span>
                <span className="font-semibold">− ₹{onlineDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="mt-3 flex items-baseline justify-between border-t border-pink-100 pt-3">
              <span className="text-base font-bold text-brand-ink">Total</span>
              <span className="text-xl font-bold text-green-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3.5 text-[13px] text-red-600">
              <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
            </p>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-brand-pink to-brand-purple py-4 text-base font-bold text-white shadow-[0_14px_32px_-14px_rgba(214,36,159,.95)] transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
          >
            {placing ? "Processing…" : `Place Order · ₹${total.toFixed(2)}`}
          </button>

          <p className="mt-4 flex gap-2 text-[13px] leading-6 text-brand-muted">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-brand-magenta" />
            After you place the order, share your Order ID on WhatsApp — or we&apos;ll message you on
            +91 {user.phone} to collect your child&apos;s name, photo and theme, then share the design for
            approval before making it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}