import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { CATEGORY_ORDER, slugify } from "../data/categories";

/* Extra phrases shown alongside the real categories.
   Keep these to things you actually make. */
const EXTRA = [
  "Name + Photo Boards",
  "Cartoon Theme Boards",
  "School & Coaching Class Sets",
  "Personalized Return Gifts",
  "Birthday Gift Frames",
];

const Track = ({ items }) => (
  <div className="pm-track flex items-center gap-3 px-2">
    {items.map(({ label, to }, k) => (
      <span key={`${label}-${k}`} className="flex shrink-0 items-center gap-3">
        <Link
          to={to}
          className="group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-[#F1B8D7] bg-gradient-to-r from-[#FFF0F8] via-white to-[#F4EDFF] px-5 py-2.5 text-[13px] font-semibold tracking-wide text-[#30243A] shadow-[0_5px_18px_rgba(214,36,159,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink hover:shadow-[0_12px_28px_rgba(214,36,159,0.25)] sm:px-6 sm:text-[14px]"
        >
          <span className="relative z-10 flex h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple shadow-[0_0_8px_rgba(214,36,159,0.35)] transition-transform duration-300 group-hover:scale-125" />
          <span className="relative z-10 whitespace-nowrap">{label}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-brand-pink/10 via-transparent to-brand-purple/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        <span className="h-1 w-1 shrink-0 rounded-full bg-brand-purple/35" />
      </span>
    ))}
  </div>
);

export default function ProductMarquee() {
  const { products } = useProducts();          // ← from the backend

  /* real categories first, each linking to its filtered page */
  const items = useMemo(() => {
    const cats = CATEGORY_ORDER
      .filter((c) => products.some((p) => p.category === c))
      .map((c) => ({ label: c, to: `/products?category=${slugify(c)}` }));

    return [...cats, ...EXTRA.map((label) => ({ label, to: "/products" }))];
  }, [products]);

  if (!items.length) return null;

  return (
    <section className="bg-gradient-to-b from-[#FFF9FD] via-white to-[#FFF9FD] py-5">
      <style>{`
        .pm-row { display:flex; overflow:hidden; width:100%; }
        .pm-track {
          display:flex; flex-shrink:0; min-width:max-content; will-change:transform;
          animation: pm-scroll 55s linear infinite;
        }
        .pm-row:hover .pm-track { animation-play-state: paused; }
        @keyframes pm-scroll { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @media (max-width:640px) { .pm-track { animation-duration: 40s; } }
        @media (prefers-reduced-motion: reduce) {
          .pm-track { animation: none; }
          .pm-row { overflow-x:auto; scrollbar-width:none; }
          .pm-row::-webkit-scrollbar { display:none; }
        }
      `}</style>

      <div className="container-page">
        <div className="relative overflow-hidden rounded-[26px] border border-pink-100 bg-white/70 px-2 py-3 shadow-[0_16px_40px_-24px_rgba(122,31,162,.28)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

          <div className="pm-row">
            <Track items={items} />
            <Track items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}