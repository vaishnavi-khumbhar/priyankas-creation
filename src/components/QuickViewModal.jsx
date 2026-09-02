import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { X, Minus, Plus, Star, Share2, ShieldCheck, Droplets, Truck, Check } from "lucide-react";
import { discountOf, WA_NUMBER } from "./ProductCard";

/* This modal receives the product as a prop, so it needs no products import.
   All fields come straight from the backend product object. */

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

export default function QuickViewModal({ product, onClose }) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [copied, setCopied] = useState(false);

  const sizes = product?.sizes ?? [];
  const benefits = product?.benefits ?? [];

  useEffect(() => {
    setQty(1);
    setCopied(false);
    setSize(product?.sizes?.[0] ?? null);
    document.body.style.overflow = product ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return <AnimatePresence />;

  const off = discountOf(product);
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi Priyanka's Creation! I want to order:\n\n• Product: ${product.name}${size ? `\n• Size: ${size}` : ""}\n• Quantity: ${qty}\n• Price: ₹${product.price} each\n\nPlease guide me with the customization details.`
  )}`;

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url }); } catch { /* dismissed */ }
    } else {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-brand-ink/50 backdrop-blur-sm"
      />
      <div key="wrap" className="pointer-events-none fixed inset-0 z-[95] grid place-items-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-auto relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-2xl"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-brand-ink shadow hover:text-brand-magenta"
          >
            <X size={18} />
          </button>

          <div className="grid lg:grid-cols-2">
            {/* ── LEFT ── */}
            <div className="bg-gradient-to-br from-brand-soft via-white to-purple-50 p-5 sm:p-6">
              <div className="relative rounded-[22px] bg-white/70 p-4 ring-1 ring-brand-gold/30">
                {product.tag && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-magenta px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                    {product.tag}
                  </span>
                )}

                <button
                  onClick={handleShare}
                  aria-label="Share"
                  className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white text-brand-ink shadow hover:text-brand-magenta"
                >
                  <Share2 size={15} />
                </button>

                <div className="grid aspect-square place-items-center overflow-hidden rounded-[16px]">
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  [Droplets, "100% Waterproof", "Wipe-clean surface"],
                  [ShieldCheck, "Design Approval", "You approve before we make"],
                ].map(([Icon, title, note]) => (
                  <div key={title} className="rounded-2xl border border-pink-100 bg-white p-3 text-center">
                    <Icon size={18} className="mx-auto text-brand-magenta" />
                    <p className="mt-1.5 text-[11px] font-semibold text-brand-ink">{title}</p>
                    <p className="text-[10px] leading-4 text-brand-muted">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="p-5 sm:p-7">
              <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                {product.category}
              </span>

              <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-brand-ink sm:text-[28px]">
                {product.name}
              </h3>

              {product.rating > 0 && (
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} className={s < Math.round(product.rating) ? "fill-brand-gold text-brand-gold" : "text-pink-200"} />
                  ))}
                  {product.reviews ? <span className="ml-1.5 text-[11px] text-brand-muted">({product.reviews} reviews)</span> : null}
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <span className="font-display text-3xl font-bold text-green-600">₹{product.price}</span>
                {product.oldPrice > product.price && (
                  <span className="text-sm text-brand-muted line-through">₹{product.oldPrice}</span>
                )}
                {off > 0 && <span className="rounded-md bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">{off}% OFF</span>}
                <button onClick={handleShare} className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-brand-muted hover:text-brand-magenta">
                  {copied ? <><Check size={13} /> Link copied</> : <><Share2 size={13} /> Share</>}
                </button>
              </div>

              <p className="mt-3 text-[13px] leading-6 text-brand-muted">{product.description}</p>

              <div className="my-5 h-px bg-pink-100" />

              <div className="flex flex-wrap gap-8">
                {sizes.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">Size</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                            size === s
                              ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
                              : "border border-pink-200 text-brand-ink hover:border-brand-pink/60"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">Quantity</p>
                  <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-pink-200 px-2 py-1">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"
                      className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand-purple"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-semibold text-brand-ink">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} aria-label="Increase"
                      className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand-purple"><Plus size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white shadow-[0_12px_26px_-14px_rgba(37,211,102,.9)] transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon size={19} /> Order via WhatsApp
                </a>

                <button
                  onClick={() => { onClose(); navigate(`/product/${product.id}`); }}
                  className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-sm font-semibold text-white shadow-[0_12px_26px_-14px_rgba(214,36,159,.9)] transition-all hover:-translate-y-0.5"
                >
                  View full details
                </button>
              </div>

              {benefits.length > 0 && (
                <div className="mt-5 rounded-2xl border border-pink-100 bg-brand-soft/50 p-4">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-magenta">
                    <Truck size={13} /> Why customers choose this
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {benefits.map((b, k) => (
                      <li key={k} className="flex gap-2 text-[12px] leading-5 text-brand-muted">
                        <Check size={13} className="mt-0.5 shrink-0 text-green-600" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="mt-4 block text-center text-xs font-semibold text-brand-magenta hover:underline"
              >
                View full product details →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}