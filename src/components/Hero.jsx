import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

/* Add files in src/assets/ → any shape works (they are fitted, not cropped) */
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

const WA_LINK = `https://wa.me/919130059818?text=${encodeURIComponent(
  "Hi Priyanka's Creation! I want to order a customized exam board. My child's name is ___"
)}`;

const slides = [
  { src: hero1, title: "Made for you",   note: "Your name. Your photo. Your story." },
  { src: hero2, title: "Cartoon themes", note: "Pick the theme your child loves." },
  { src: hero3, title: "Gift ready",     note: "Birthdays, return gifts, milestones." },
];

const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

const chips = ["Waterproof", "Personalized", "Made with care"];

export default function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduce || slides.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 3800);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const blob = (d) =>
    reduce ? {} : {
      animate: { x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.12, 0.95, 1] },
      transition: { duration: d, repeat: Infinity, ease: "easeInOut" },
    };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-soft via-white to-purple-50">
      <motion.div {...blob(16)} className="pointer-events-none absolute -top-28 -left-24 w-[420px] h-[420px] rounded-full bg-brand-pink/25 blur-[90px]" />
      <motion.div {...blob(20)} className="pointer-events-none absolute top-10 -right-32 w-[460px] h-[460px] rounded-full bg-brand-purple/20 blur-[100px]" />
      <motion.div {...blob(24)} className="pointer-events-none absolute -bottom-32 left-1/3 w-[380px] h-[380px] rounded-full bg-brand-gold/15 blur-[90px]" />

      {!reduce && [
        { l: "12%", t: "22%", d: 5 }, { l: "78%", t: "16%", d: 6.5 }, { l: "62%", t: "72%", d: 5.8 },
        { l: "28%", t: "78%", d: 7 }, { l: "90%", t: "52%", d: 6 },
      ].map((s, k) => (
        <motion.span key={k} className="pointer-events-none absolute w-1.5 h-1.5 rounded-full bg-brand-magenta/50"
          style={{ left: s.l, top: s.t }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: s.d, repeat: Infinity, ease: "easeInOut", delay: k * 0.4 }} />
      ))}

      <div className="container-page relative grid items-center gap-8 pt-6 pb-16 lg:grid-cols-[1fr_1.2fr] lg:gap-10 lg:pt-10 lg:pb-16">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-script text-3xl sm:text-5xl text-brand-pink">Personalized with love</p>
          <h1 className="mt-2 font-display text-[40px] sm:text-6xl lg:text-[64px] font-bold leading-[1.03] text-brand-ink">
            Make Every Little Thing{" "}
            <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">Special.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base text-brand-muted leading-6 sm:leading-7 font-medium">
            Customized exam boards, photo frames, and thoughtful creations made specially for your little achievers
            and loved ones.
          </p>

          <div className="mt-7 flex w-fit max-w-full gap-2.5 sm:gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-4 py-3 text-[11px] font-semibold text-white shadow-[0_12px_26px_-12px_rgba(214,36,159,.9)] transition-all duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <span className="whitespace-nowrap">Shop Collection</span>
              <ArrowRight size={15} className="shrink-0" />
            </Link>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-pink/30 bg-white px-4 py-3 text-[11px] font-semibold text-brand-ink shadow-[0_6px_18px_rgba(214,36,159,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-pink/60 hover:bg-pink-50 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <WhatsAppIcon size={16} className="shrink-0 text-[#25D366]" />
              <span className="whitespace-nowrap">Order on WhatsApp</span>
            </a>
          </div>

          <div className="mt-7 flex w-full flex-wrap gap-2 sm:gap-2.5">
            {chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-gradient-to-r from-pink-50 via-white to-pink-50 px-3.5 py-2 text-[12px] font-semibold text-brand-magenta shadow-[0_4px_14px_rgba(214,36,159,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-pink/50 hover:shadow-[0_7px_18px_rgba(214,36,159,0.18)] sm:px-4 sm:py-2.5 sm:text-[13px]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-pink to-brand-purple text-[10px] font-bold text-white shadow-[0_2px_7px_rgba(214,36,159,0.25)]">
                  ✓
                </span>
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          className="relative mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[580px]"
        >
          {/* both badges now sit at the TOP corners — nothing covers the caption below */}
          <div className="absolute -top-3 -left-2 z-20 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2 shadow-xl sm:-left-4">
            <span className="text-brand-gold text-xs leading-none"></span>
            <p className="text-[12px] font-semibold text-brand-ink sm:text-[15px]">Loved by little achievers</p>
          </div>

          <div className="absolute -top-3 -right-2 z-20 rounded-2xl bg-white px-3.5 py-2 shadow-xl sm:-right-4">
            <p className="text-[12px] font-semibold text-brand-magenta sm:text-[15px]">100% Waterproof</p>
          </div>

          <div className="relative rounded-[36px] bg-white p-3 pt-5 sm:p-4 sm:pt-6 shadow-[0_30px_80px_rgba(80,20,80,.16)] rotate-1">
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[28px] bg-gradient-to-br from-pink-50 via-white to-purple-50 ring-1 ring-brand-gold/30 p-2 sm:p-3">
              <AnimatePresence mode="wait">
                <motion.img
                  key={i}
                  src={slides[i].src}
                  alt={`${slides[i].title} — customized exam board by Priyanka's Creation`}
                  loading={i === 0 ? "eager" : "lazy"}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="max-h-full max-w-full rounded-[18px] object-contain shadow-[0_10px_30px_-14px_rgba(80,20,80,.45)]"
                />
              </AnimatePresence>
            </div>

            <div className="px-2 pt-3 text-center">
              <p className="font-script text-3xl leading-none bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
                {slides[i].title}
              </p>
<p className="mt-1 text-[13px] sm:text-[14px] lg:text-[15px] text-brand-muted leading-5">
  {slides[i].note}
</p>            </div>

            <div className="flex justify-center gap-2 pt-3 pb-1">
              {slides.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-gradient-to-r from-brand-pink to-brand-purple" : "w-1.5 bg-pink-200"}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
    </section>
  );
}