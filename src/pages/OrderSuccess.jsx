import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, Store, CreditCard, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const WA = "919130059818";

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function OrderSuccess() {
  const { orderNo } = useParams();
  const { getOrder, user } = useAuth();
  const navigate = useNavigate();
  const order = getOrder(orderNo);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!order) navigate("/profile", { replace: true });
  }, [order, navigate]);

  if (!order) return null;

  const waMsg = encodeURIComponent(
    `Hi Priyanka's Creation! My order ${order.orderNo} is placed.\n\n` +
      order.items
        .map((i, n) => `${n + 1}. ${i.name}${i.size ? ` (${i.size})` : ""} × ${i.qty}`)
        .join("\n") +
      `\n\nTotal: ₹${Number(order.total).toFixed(0)}` +
      `\nPayment: ${order.payment === "cod" ? "Cash on delivery" : "Paid online"}` +
      `\n${order.deliveryMethod === "pickup" ? "Store pickup" : `Deliver to: ${order.address}`}` +
      `\n\nHere are the customization details:\nChild's name: \nTheme: \n(photo attached)`
  );

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-10 lg:py-16">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-xl rounded-[28px] border border-pink-100 bg-white p-6 text-center shadow-[0_20px_60px_-40px_rgba(80,20,80,.5)] sm:p-9"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 14 }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full ring-4 ring-green-100"
          >
            <CheckCircle2 size={44} className="text-green-600" strokeWidth={1.8} />
          </motion.span>

          <h1 className="mt-5 font-display text-3xl font-bold text-brand-ink sm:text-[34px]">
            Order Placed Successfully!
          </h1>
          <p className="mt-1.5 text-[14px] text-brand-muted">
            {order.orderNo} · {fmtDate(order.date)}
          </p>

          {/* items */}
          <div className="mt-6 rounded-[20px] border border-pink-100 p-4 text-left">
            <p className="flex items-center gap-2 text-[13px] font-bold text-brand-magenta">
              <Package size={15} /> Items
            </p>
            <ul className="mt-3 grid gap-2">
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

          {/* delivery */}
          <div className="mt-3 rounded-[20px] border border-pink-100 p-4 text-left">
            <p className="flex items-center gap-2 text-[13px] font-bold text-brand-magenta">
              {order.deliveryMethod === "pickup" ? <Store size={15} /> : <Truck size={15} />}
              {order.deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"}
            </p>
            <p className="mt-2 flex gap-2 text-[14px] leading-6 text-brand-muted">
              <MapPin size={15} className="mt-0.5 shrink-0 text-brand-gold" />
              {order.deliveryMethod === "pickup" ? "Collect from our Pune studio" : order.address}
            </p>
          </div>

          {/* payment */}
          <div className="mt-3 rounded-[20px] border border-pink-100 p-4 text-left">
            <p className="flex items-center gap-2 text-[13px] font-bold text-brand-magenta">
              <CreditCard size={15} /> {order.payment === "cod" ? "Cash on Delivery" : "Paid Online"}
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-base font-bold text-brand-ink">Total</span>
              <span className="text-xl font-bold text-green-600">₹{Number(order.total).toFixed(2)}</span>
            </div>
          </div>

          {/* next step — customer taps this themselves */}
          <div className="mt-5 rounded-[20px] border border-green-100 bg-green-50/60 p-4 text-left">
            <p className="text-[13px] font-bold text-green-700">One last step</p>
            <p className="mt-1 text-[13px] leading-6 text-brand-muted">
              Send us your child&apos;s name, photo and preferred theme on WhatsApp. We&apos;ll share the design for
              your approval before making it.
            </p>
            <a
              href={`https://wa.me/${WA}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white shadow-[0_12px_26px_-14px_rgba(37,211,102,.9)] transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon size={18} /> Send details on WhatsApp
            </a>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              to={`/track-order/${order.orderNo}`}
              className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-sm font-bold text-white shadow-[0_12px_26px_-14px_rgba(214,36,159,.9)]"
            >
              Track Order
            </Link>
            <Link
              to="/products"
              className="flex h-12 items-center justify-center rounded-full border border-brand-pink/40 text-sm font-bold text-brand-ink hover:bg-pink-50"
            >
              Continue Shopping
            </Link>
          </div>

          <Link to="/profile" className="mt-4 inline-block text-[13px] font-semibold text-brand-magenta hover:underline">
            View My Orders
          </Link>
        </motion.div>
      </div>
    </section>
  );
}