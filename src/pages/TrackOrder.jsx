import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package, CheckCircle2, Clock, Truck, Home, ArrowLeft, MapPin, CreditCard, XCircle, Store,
} from "lucide-react";
import { useAuth, ORDER_STEPS } from "../context/AuthContext";

const STEP_ICONS = [Package, CheckCircle2, Clock, Truck, Home];

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function TrackOrder() {
  const { orderNo } = useParams();
  const { getOrder, advanceOrder } = useAuth();
  const navigate = useNavigate();
  const order = getOrder(orderNo);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!order) navigate("/profile", { replace: true });
  }, [order, navigate]);

  if (!order) return null;

  const current = order.cancelled ? -1 : order.statusIndex ?? 1;

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-8 lg:py-12">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <Link to="/profile" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-magenta hover:underline">
            <ArrowLeft size={15} /> Back to My Orders
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="mt-4 rounded-[28px] border border-pink-100 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(80,20,80,.5)] sm:p-9"
          >
            <h1 className="font-display text-3xl font-bold text-brand-ink">Track Order</h1>
            <p className="mt-1 text-[14px] text-brand-muted">{order.orderNo} · {fmtDate(order.date)}</p>

            {order.cancelled ? (
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-5">
                <XCircle size={20} className="mt-0.5 shrink-0 text-red-500" />
                <div>
                  <p className="font-bold text-red-600">Order cancelled</p>
                  <p className="mt-1 text-[13px] leading-6 text-brand-muted">
                    This order was cancelled. Message us on WhatsApp if this was a mistake — nothing has been made yet.
                  </p>
                </div>
              </div>
            ) : (
              <ol className="mt-7">
                {ORDER_STEPS.map((label, i) => {
                  const Icon = STEP_ICONS[i];
                  const done = i <= current;
                  const isCurrent = i === current;
                  const last = i === ORDER_STEPS.length - 1;

                  return (
                    <li key={label} className="relative flex gap-4 pb-8 last:pb-0">
                      {!last && (
                        <span className={`absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 ${i < current ? "bg-green-500" : "bg-pink-100"}`} />
                      )}

                      <motion.span
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.08 * i, duration: 0.3 }}
                        className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                          done ? "bg-green-600 text-white" : "bg-brand-soft text-brand-muted"
                        } ${isCurrent ? "ring-4 ring-green-100" : ""}`}
                      >
                        <Icon size={18} />
                      </motion.span>

                      <span className="pt-1.5">
                        <span className={`block text-[15px] font-bold ${done ? "text-brand-ink" : "text-brand-muted"}`}>
                          {label}
                        </span>
                        {isCurrent && <span className="text-[12px] font-semibold text-green-600">Current status</span>}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}

            <div className="mt-6 border-t border-pink-100 pt-5">
              <p className="flex items-center gap-2 text-[14px] text-brand-muted">
                {order.deliveryMethod === "pickup"
                  ? <Store size={15} className="text-brand-magenta" />
                  : <MapPin size={15} className="text-brand-magenta" />}
                {order.deliveryMethod === "pickup" ? "Store Pickup · Pune" : "Home Delivery"}
              </p>
              {order.deliveryMethod !== "pickup" && order.address && (
                <p className="mt-1 pl-6 text-[13px] leading-6 text-brand-muted">{order.address}</p>
              )}

              <p className="mt-2.5 flex items-center gap-2 text-[14px] text-brand-muted">
                <CreditCard size={15} className="text-brand-magenta" />
                {order.payment === "cod" ? "Cash on Delivery" : "Paid Online"} · ₹{Number(order.total).toFixed(2)}
              </p>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Items</p>
              <ul className="mt-2 grid gap-2">
                {order.items.map((it, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-3 text-[14px]">
                    <span className="text-brand-ink">
                      {it.name}{it.size ? ` (${it.size})` : ""} <span className="text-brand-muted">× {it.qty}</span>
                    </span>
                    <span className="shrink-0 font-semibold text-brand-ink">₹{(it.price * it.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* testing helper — delete before launch */}
            {!order.cancelled && current < ORDER_STEPS.length - 1 && (
              <button
                onClick={() => advanceOrder(order.orderNo)}
                className="mt-6 w-full rounded-full border border-dashed border-pink-200 py-2.5 text-[12px] font-semibold text-brand-muted hover:border-brand-pink/50 hover:text-brand-magenta"
              >
                Move to next stage (for testing — remove before launch)
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}