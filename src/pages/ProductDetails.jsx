import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus, Plus, Star, StarHalf, Share2, ChevronRight, X, ZoomIn, Check,
  Palette, Send, CheckCircle2, PackageCheck, TicketPercent, Ruler,
  Image as ImageIcon, MessageCircle, Loader2,
} from "lucide-react";

import { useProducts } from "../context/ProductsContext";
import { discountOf, WA_NUMBER } from "../components/ProductCard";
import RelatedProducts from "../components/RelatedProducts";

/* ── tracking ── */
import { trackProductView, trackWhatsAppClick } from "../lib/analytics";

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

const steps = [
  { Icon: Palette,      title: "Choose a theme",       text: "Pick the cartoon, colour or style you love." },
  { Icon: Send,         title: "Share the details",    text: "Send the name, photo and your customization details on WhatsApp." },
  { Icon: CheckCircle2, title: "Approve the design",   text: "We share a design preview before anything is made." },
  { Icon: PackageCheck, title: "Receive your product", text: "Your customized product is prepared and delivered safely." },
];

const firstOrderOffer = {
  Icon: TicketPercent,
  text: "Flat ₹100 OFF on your first order — code FIRST100",
  accent: "text-amber-500",
  bg: "bg-amber-100/70",
};

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
  const { byId, loading } = useProducts();
  const product = byId(id);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lens, setLens] = useState({ show: false, x: 50, y: 50 });
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const imgBox = useRef(null);

  const openLightbox = (src, alt) => { setLightboxSrc(src); setLightboxAlt(alt); };

  useEffect(() => {
    window.scrollTo(0, 0);

    /* records the product view — shows up in Admin → Analytics */
    if (product) trackProductView(product.id);

    setQty(1);
    setCopied(false);
    setLightboxSrc(null);
    setSize(product?.sizes?.[0] ?? null);
  }, [id, product]);

  useEffect(() => {
    document.body.style.overflow = lightboxSrc ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setLightboxSrc(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxSrc]);

  if (!product && loading) {
    return (
      <div className="container-page grid min-h-[50vh] place-items-center py-24 text-center">
        <div>
          <Loader2 size={30} className="mx-auto animate-spin text-brand-magenta" />
          <p className="mt-4 text-sm text-brand-muted">Loading product…</p>
        </div>
      </div>
    );
  }

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
  const sizes = product.sizes ?? [];
  const benefits = product.benefits ?? [];
  const dimensionsImage = product.dimensionsImage;
  const instructionImage = product.instructionImage;

  const detailSections = [
    product.dimensions?.length && { title: product.dimensionsTitle || "Dimensions & Details", items: product.dimensions },
    product.features?.length && { title: product.featuresTitle || "Features", items: product.features },
    product.perfectFor?.length && { title: product.perfectForTitle || "Perfect For", items: product.perfectFor },
    product.makingDelivery?.length && { title: "Making & Delivery", items: product.makingDelivery },
  ].filter(Boolean);

  const contactNote = product.contactNote;
  const contactTitle = product.contactTitle || "For Customization & Orders";

  /* ══════════════════════════════════════════════════════════
     Records the enquiry, gets a short ref code back, and puts
     that code inside the WhatsApp message. When the customer's
     message arrives, search the code in Admin → Enquiries to
     see which ad brought them.
     ══════════════════════════════════════════════════════════ */
  const openWhatsApp = () => {
    const ref = trackWhatsAppClick({
      product: product.id,
      productName: product.name,
      size,
      qty,
      price: product.price,
    });

    const text =
      `Hi Priyanka's Creation! I want to order:\n\n` +
      `• Product: ${product.name}` +
      (size ? `\n• Size: ${size}` : "") +
      `\n• Quantity: ${qty}` +
      `\n• Price: ₹${product.price} each\n\n` +
      `Ref: ${ref}\n\n` +
      `Please guide me with the customization details.`;

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, url }); } catch { /* cancelled */ }
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
      <section className="bg-gradient-to-b from-brand-soft/70 to-white py-5 lg:py-10">
        <div className="container-page">
          <nav className="flex items-center gap-1 text-[13px] text-brand-muted sm:gap-1.5 sm:text-sm">
            <Link to="/" className="shrink-0 hover:text-brand-magenta">Home</Link>
            <ChevronRight size={13} className="shrink-0" />
            <Link to="/products" className="shrink-0 hover:text-brand-magenta">Products</Link>
            <ChevronRight size={13} className="shrink-0" />
            <span className="truncate font-semibold text-brand-ink">{product.name}</span>
          </nav>

          <div className="mt-4 grid gap-6 sm:mt-6 lg:grid-cols-2 lg:gap-12">
            {/* ══════════ LEFT ══════════ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="relative rounded-[20px] bg-gradient-to-br from-brand-soft via-white to-purple-50 p-3 ring-1 ring-brand-gold/30 sm:rounded-[28px] sm:p-5">
                <div className="absolute left-3 top-3 z-20 flex flex-col gap-1 sm:left-5 sm:top-5">
                  {product.tag && (
                    <span className="w-fit rounded-full bg-brand-magenta px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow sm:px-3 sm:text-[10px]">
                      {product.tag}
                    </span>
                  )}
                  {off > 0 && (
                    <span className="w-fit rounded-full bg-green-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow sm:px-3 sm:text-[10px]">
                      {off}% OFF
                    </span>
                  )}
                </div>

                <div className="absolute right-3 top-3 z-20 sm:right-5 sm:top-5">
                  <button onClick={handleShare} aria-label="Share"
                    className="grid h-8 w-8 place-items-center rounded-full bg-white text-brand-ink shadow hover:text-brand-magenta sm:h-9 sm:w-9">
                    <Share2 size={15} />
                  </button>
                </div>

                <button
                  ref={imgBox}
                  onClick={() => openLightbox(product.image, product.name)}
                  onMouseMove={onMove}
                  onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
                  aria-label="Zoom image"
                  className="relative flex min-h-[260px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-[16px] bg-white/60 p-2 sm:min-h-[320px] sm:rounded-[20px] sm:p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-auto max-h-[340px] w-auto max-w-full rounded-[12px] object-contain sm:max-h-[420px] lg:max-h-[460px]"
                  />

                  {lens.show && (
                    <span
                      className="pointer-events-none absolute hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90 bg-white/15 shadow-lg xl:block"
                      style={{ left: `${lens.x}%`, top: `${lens.y}%` }}
                    />
                  )}

                  <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-brand-ink shadow sm:bottom-3 sm:right-3 sm:px-2.5 sm:py-1">
                    <ZoomIn size={11} /> Show Image
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

              {(dimensionsImage || instructionImage) && (
                <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
                  {[
                    dimensionsImage && { src: dimensionsImage, label: "Size & dimensions", Icon: Ruler },
                    instructionImage && { src: instructionImage, label: "How to customize", Icon: ImageIcon },
                  ].filter(Boolean).map(({ src, label, Icon }) => (
                    <button
                      key={label}
                      onClick={() => openLightbox(src, `${product.name} — ${label}`)}
                      className="group overflow-hidden rounded-[16px] border border-pink-100 bg-white text-left transition-all hover:-translate-y-0.5 hover:border-brand-pink/50 hover:shadow-[0_18px_36px_-24px_rgba(122,31,162,.6)] sm:rounded-[20px]"
                    >
                      <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-soft via-white to-purple-50 p-2">
                        <img
                          src={src}
                          alt={`${product.name} — ${label}`}
                          loading="lazy"
                          className="h-full w-full rounded-[10px] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </span>
                      <span className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
                        <span className="flex min-w-0 items-center gap-1.5">
                          <Icon size={14} className="shrink-0 text-brand-magenta" />
                          <span className="truncate text-[12px] font-semibold text-brand-ink sm:text-[13px]">{label}</span>
                        </span>
                        <ZoomIn size={13} className="shrink-0 text-brand-muted transition-colors group-hover:text-brand-magenta" />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-[20px] border border-pink-100 bg-white p-4 sm:mt-5 sm:rounded-[24px] sm:p-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-magenta sm:text-[13px]">
                  How your order works
                </p>
                <ol className="mt-3.5 grid gap-3.5">
                  {steps.map(({ Icon, title, text }, i) => (
                    <li key={title} className="flex gap-3">
                      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple text-white sm:h-10 sm:w-10">
                        <Icon size={17} strokeWidth={1.9} />
                        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-white text-[9px] font-bold text-brand-magenta ring-1 ring-pink-100">
                          {i + 1}
                        </span>
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-[14px] font-bold leading-tight text-brand-ink sm:text-[15px]">{title}</span>
                        <span className="mt-0.5 block text-[13px] leading-[1.55] text-brand-muted sm:text-[14px]">{text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            {/* ══════════ RIGHT ══════════ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="inline-block rounded-full bg-brand-soft px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-brand-gold sm:px-3 sm:tracking-[0.18em]">
                {product.category}
              </span>

              <h1 className="mt-2.5 font-display text-[28px] font-bold leading-[1.2] text-brand-ink sm:mt-3 sm:text-4xl">
                {product.name}
              </h1>

              {product.rating > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <Stars value={product.rating} size={15} />
                  {product.reviews ? <span className="text-[13px] text-brand-muted">({product.reviews} reviews)</span> : null}
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-2.5">
                <span className="font-display text-[32px] font-bold text-green-600 sm:text-4xl">₹{product.price}</span>
                {product.oldPrice > product.price && (
                  <span className="text-[15px] text-brand-muted line-through sm:text-base">₹{product.oldPrice}</span>
                )}
                {off > 0 && (
                  <span className="rounded-md bg-green-600 px-2 py-0.5 text-[11px] font-bold text-white sm:py-1">{off}% OFF</span>
                )}
                <button onClick={handleShare} className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-muted hover:text-brand-magenta">
                  {copied ? <><Check size={13} /> Link copied</> : <><Share2 size={13} /> Share</>}
                </button>
              </div>

              <div className={`mt-4 flex items-center gap-2.5 rounded-xl border border-amber-200 ${firstOrderOffer.bg} px-3 py-2.5`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white ${firstOrderOffer.accent}`}>
                  <firstOrderOffer.Icon size={17} strokeWidth={2} />
                </span>
                <p className={`text-[12px] font-semibold leading-[1.45] ${firstOrderOffer.accent} sm:text-[13px]`}>
                  {firstOrderOffer.text}
                </p>
              </div>

              <p className="mt-3 text-[15px] leading-[1.7] text-brand-muted sm:mt-4 sm:text-base sm:leading-7">
                {product.description}
              </p>

              {detailSections.length > 0 && (
                <div className="mt-5 rounded-[20px] border border-pink-100 bg-white p-4 shadow-sm sm:mt-6 sm:rounded-[24px] sm:p-5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand-magenta">
                      <Ruler size={17} />
                    </span>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-magenta sm:text-[13px]">
                        Product Information
                      </p>
                      <p className="text-[11px] text-brand-muted sm:text-xs">Dimensions, quality &amp; customization details</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    {detailSections.map((section) => (
                      <div key={section.title} className="rounded-xl bg-brand-soft/50 p-3.5 sm:p-4">
                        <h3 className="text-[14px] font-bold text-brand-ink sm:text-[15px]">{section.title}</h3>
                        <ul className="mt-2.5 space-y-2">
                          {section.items.map((item, k) => (
                            <li key={k} className="flex gap-2 text-[13px] leading-[1.6] text-brand-muted sm:text-[14px]">
                              <Check size={15} className="mt-0.5 shrink-0 text-green-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {contactNote && (
                    <button
                      onClick={openWhatsApp}
                      className="mt-4 flex w-full items-center gap-2.5 rounded-xl bg-[#25D366]/10 p-3 text-left transition-colors hover:bg-[#25D366]/15"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white">
                        <WhatsAppIcon size={15} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold uppercase tracking-wide text-[#128C4A]">{contactTitle}</span>
                        <span className="block text-[13px] font-semibold text-brand-ink">{contactNote}</span>
                      </span>
                    </button>
                  )}
                </div>
              )}

              <div className="my-5 h-px bg-pink-100 sm:my-6" />

              <div className="flex flex-wrap gap-6 sm:gap-8">
                {sizes.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">Size</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {sizes.map((s) => (
                        <button key={s} onClick={() => setSize(s)}
                          className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                            size === s ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
                                       : "border border-pink-200 text-brand-ink hover:border-brand-pink/60"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">Quantity</p>
                  <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-pink-200 px-2.5 py-1.5">
                    <button onClick={() => setQty((v) => Math.max(1, v - 1))} aria-label="Decrease"
                      className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand-purple"><Minus size={14} /></button>
                    <span className="w-6 text-center text-[15px] font-semibold text-brand-ink">{qty}</span>
                    <button onClick={() => setQty((v) => v + 1)} aria-label="Increase"
                      className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand-purple"><Plus size={14} /></button>
                  </div>
                </div>
              </div>

              {/* ── the tracked WhatsApp button ── */}
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={openWhatsApp}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-[14px] font-semibold text-white shadow-[0_12px_26px_-14px_rgba(37,211,102,.9)] transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:text-sm"
                >
                  <WhatsAppIcon size={18} /> Order via WhatsApp
                </button>
              </div>

              {benefits.length > 0 && (
                <div className="mt-5 rounded-2xl border border-pink-100 bg-brand-soft/50 p-4 sm:mt-6 sm:p-5">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-magenta sm:text-[13px]">
                    Why customers choose this
                  </p>
                  <ul className="mt-3 space-y-2">
                    {benefits.map((b, k) => (
                      <li key={k} className="flex gap-2 text-[14px] leading-[1.65] text-brand-muted sm:text-[15px]">
                        <Check size={15} className="mt-1 shrink-0 text-green-600" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex gap-3 rounded-2xl border border-pink-100 bg-gradient-to-r from-brand-soft to-purple-50 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-magenta shadow-sm">
                  <MessageCircle size={17} />
                </span>
                <p className="text-[13px] leading-[1.65] text-brand-muted sm:text-[14px]">
                  To personalise this product, share your photo, name, preferred theme and any special message on
                  WhatsApp. We share the design preview with you before making it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RelatedProducts currentId={product.id} category={product.category} />

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-brand-ink/90 p-3 sm:p-4"
            onClick={() => setLightboxSrc(null)}
          >
            <button aria-label="Close zoom" onClick={() => setLightboxSrc(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-brand-ink shadow sm:right-5 sm:top-5 sm:h-11 sm:w-11">
              <X size={20} />
            </button>
            <motion.img
              src={lightboxSrc}
              alt={lightboxAlt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85dvh] max-w-[94vw] cursor-zoom-out rounded-2xl object-contain shadow-2xl sm:max-h-[88dvh] sm:max-w-[92vw]"
            />
            <p className="absolute bottom-5 px-4 text-center text-[10px] text-white/70 sm:bottom-6 sm:text-[11px]">
              Tap outside to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}