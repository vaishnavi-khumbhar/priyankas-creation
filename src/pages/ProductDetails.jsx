import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus, Plus, Star, StarHalf, Heart, Share2, ShoppingCart, ChevronRight, X, ZoomIn,
  ShieldCheck, Droplets, Truck, Check,
} from "lucide-react";
import { products } from "../data/products";
import { discountOf, WA_NUMBER } from "../components/ProductCard";
import RelatedProducts from "../components/RelatedProducts";
import { useShop } from "../context/ShopContext";

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

const DEFAULT_SIZES = ["Standard", "Large"];
const DEFAULT_BENEFITS = [
  "100% waterproof, wipe-clean surface",
  "Personalised with name, photo and theme",
  "Design shared for your approval before making",
  "Durable finish built for daily school use",
];

export const Stars = ({ value = 0, size = 15 }) => (
  <span className="flex items-center gap-0.5">
    {[...Array(5)].map((_, s) => {
      const full = value >= s + 1;
      const half = !full && value >= s + 0.5;
      if (half) return <StarHalf key={s} size={size} className="fill-brand-gold text-brand-gold" />;
      return <Star key={s} size={size} className={full ? "fill-brand-gold text-brand-gold" : "text-pink-200"} />;
    })}
  </span>
);

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isWished } = useShop();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lens, setLens] = useState({ show: false, x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);
  const imgBox = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setCopied(false);
    setLightbox(false);
    setSize(product?.sizes?.length ? product.sizes[0] : DEFAULT_SIZES[0]);
  }, [id, product]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  if (!product) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-ink">Product not found</h1>
        <p className="mt-3 text-sm text-brand-muted">This design may have been renamed or removed.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-7 py-3 font-semibold text-white">
          Back to products
        </Link>
      </div>
    );
  }

  const off = discountOf(product);
  const sizes = product.sizes?.length ? product.sizes : DEFAULT_SIZES;
  const benefits = product.benefits?.length ? product.benefits : DEFAULT_BENEFITS;
  const wished = isWished(product.id);

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi Priyanka's Creation! I want to order:\n\n• Product: ${product.name}\n• Size: ${size}\n• Quantity: ${qty}\n• Price: ₹${product.price} each\n\nPlease guide me with the customization details.`
  )}`;

  const handleAdd = () => addToCart(product, qty, size);
  const handleBuyNow = () => {
    addToCart(product, qty, size);
    navigate("/cart");
  };
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url }); } catch { /* dismissed */ }
    } else {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const onMove = (e) => {
    const r = imgBox.current?.getBoundingClientRect();
    if (!r) return;
    setLens({
      show: true,
      x: Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)),
    });
  };

  return (
    <>
      <section className="bg-gradient-to-b from-brand-soft/70 to-white py-6 lg:py-10">
        <div className="container-page">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-brand-muted">
            <Link to="/" className="hover:text-brand-magenta">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-brand-magenta">Products</Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-brand-ink">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* ── image + zoom ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="relative rounded-[28px] bg-gradient-to-br from-brand-soft via-white to-purple-50 p-5 ring-1 ring-brand-gold/30">
                {product.tag && (
                  <span className="absolute left-5 top-5 z-20 rounded-full bg-brand-magenta px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                    {product.tag}
                  </span>
                )}
                <div className="absolute right-5 top-5 z-20 flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                    className={`grid h-9 w-9 place-items-center rounded-full bg-white shadow transition-all hover:scale-110 ${
                      wished ? "text-brand-magenta" : "text-brand-ink hover:text-brand-magenta"
                    }`}
                  >
                    <Heart size={16} className={wished ? "fill-brand-magenta" : ""} />
                  </button>
                  <button onClick={handleShare} aria-label="Share"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand-ink shadow hover:text-brand-magenta">
                    <Share2 size={16} />
                  </button>
                </div>

                <button
                  ref={imgBox}
                  onClick={() => setLightbox(true)}
                  onMouseMove={onMove}
                  onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
                  aria-label="Zoom image"
                  className="relative grid aspect-square w-full cursor-zoom-in place-items-center overflow-hidden rounded-[20px] bg-white/60"
                >
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />

                  {lens.show && (
                    <span
                      className="pointer-events-none absolute hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90 bg-white/15 shadow-lg xl:block"
                      style={{ left: `${lens.x}%`, top: `${lens.y}%` }}
                    />
                  )}

                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-brand-ink shadow">
                    <ZoomIn size={12} /> Tap to zoom
                  </span>
                </button>

                {lens.show && (
                  <div
                    className="pointer-events-none absolute left-full top-0 z-30 ml-4 hidden aspect-square w-[380px] rounded-[20px] border border-pink-100 bg-white bg-no-repeat shadow-2xl xl:block"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "220%",
                      backgroundPosition: `${lens.x}% ${lens.y}%`,
                    }}
                  />
                )}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  [Droplets, "100% Waterproof", "Wipe-clean surface"],
                  [ShieldCheck, "Design Approval", "Before we make it"],
                  [Truck, "Pune Delivery", "Local & courier"],
                ].map(([Icon, title, note]) => (
                  <div key={title} className="rounded-2xl border border-pink-100 bg-white p-3 text-center">
                    <Icon size={18} className="mx-auto text-brand-magenta" />
                    <p className="mt-1.5 text-[11px] font-semibold text-brand-ink">{title}</p>
                    <p className="text-[10px] leading-4 text-brand-muted">{note}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── details ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                {product.category}
              </span>

              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-ink sm:text-4xl">{product.name}</h1>

              {product.rating > 0 && (
                <div className="mt-2.5 flex items-center gap-2">
                  <Stars value={product.rating} size={15} />
                  {product.reviews ? <span className="text-[12px] text-brand-muted">({product.reviews} reviews)</span> : null}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="font-display text-4xl font-bold text-green-600">₹{product.price}</span>
                {product.oldPrice > product.price && (
                  <span className="text-base text-brand-muted line-through">₹{product.oldPrice}</span>
                )}
                {off > 0 && <span className="rounded-md bg-green-600 px-2 py-1 text-[11px] font-bold text-white">{off}% OFF</span>}
                <button onClick={handleShare} className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-brand-muted hover:text-brand-magenta">
                  {copied ? <><Check size={13} /> Link copied</> : <><Share2 size={13} /> Share</>}
                </button>
              </div>

              <p className="mt-4 text-base leading-7 text-brand-muted">{product.description}</p>

              <div className="my-6 h-px bg-pink-100" />

              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">Size</p>
                  <div className="mt-2 flex gap-2">
                    {sizes.map((s) => (
                      <button key={s} onClick={() => setSize(s)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                          size === s ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
                                     : "border border-pink-200 text-brand-ink hover:border-brand-pink/60"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">Quantity</p>
                  <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-pink-200 px-2 py-1.5">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"
                      className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand-purple"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-semibold text-brand-ink">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} aria-label="Increase"
                      className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand-purple"><Plus size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={handleAdd}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-green-600 text-sm font-semibold text-white shadow-[0_12px_26px_-14px_rgba(22,163,74,.9)] transition-all hover:-translate-y-0.5 hover:bg-green-700">
                  <ShoppingCart size={16} /> Add to Cart
                </button>
                <button onClick={handleBuyNow}
                  className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-sm font-semibold text-white shadow-[0_12px_26px_-14px_rgba(214,36,159,.9)] transition-all hover:-translate-y-0.5">
                  Buy Now
                </button>
              </div>

              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white shadow-[0_12px_26px_-14px_rgba(37,211,102,.9)] transition-all hover:-translate-y-0.5">
                <WhatsAppIcon size={19} /> Order via WhatsApp
              </a>

              <div className="mt-6 rounded-2xl border border-pink-100 bg-brand-soft/50 p-5">
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand-magenta">Why parents choose this</p>
                <ul className="mt-3 space-y-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-[15px] leading-6 text-brand-muted">
                      <Check size={14} className="mt-1 shrink-0 text-green-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-[15px] leading-6 text-brand-muted">
                To personalise this product, share your child&apos;s name, a clear photograph and your preferred theme
                after placing the order. We share the design for your approval before making it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <RelatedProducts currentId={product.id} category={product.category} />

      {/* ── full-screen zoom ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-brand-ink/90 p-4"
            onClick={() => setLightbox(false)}
          >
            <button aria-label="Close zoom"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-brand-ink shadow">
              <X size={20} />
            </button>
            <motion.img
              src={product.image}
              alt={product.name}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88dvh] max-w-[92vw] cursor-zoom-out rounded-2xl object-contain shadow-2xl"
            />
            <p className="absolute bottom-6 text-[11px] text-white/70">Tap outside to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}