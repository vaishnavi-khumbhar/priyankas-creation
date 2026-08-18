import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");
const CATEGORIES = [...new Set(products.map((p) => p.category))];

const SORTS = [
  ["featured", "Featured"],
  ["low", "Price: low to high"],
  ["high", "Price: high to low"],
  ["name", "Name A–Z"],
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const reduce = useReducedMotion();

  const q = (params.get("q") || "").trim();
  const category = params.get("category") || "";
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [q, category]);

  const list = useMemo(() => {
    const term = q.toLowerCase();
    let out = products.filter((p) => {
      const matchesQ = !term || `${p.name} ${p.category} ${p.description || ""}`.toLowerCase().includes(term);
      const matchesCat = !category || slug(p.category) === category;
      return matchesQ && matchesCat;
    });

    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "name") out = [...out].sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [q, category, sort]);

  const setCategory = (value) => {
    const next = new URLSearchParams(params);
    if (value) next.set("category", value);
    else next.delete("category");
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-8 lg:py-12">
      <div className="container-page">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-script text-2xl text-brand-pink sm:text-3xl">Our full collection</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            {category ? CATEGORIES.find((c) => slug(c) === category) || "Products" : "All Products"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-brand-muted">
            Every piece is made to order — your child&apos;s name, their photo, their favourite theme.
          </p>
        </motion.div>

        {/* ── active search term ── */}
        {q && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-brand-ink ring-1 ring-pink-100">
              <Search size={14} className="text-brand-magenta" />
              Results for <b className="font-semibold">“{q}”</b>
              <button onClick={clearAll} aria-label="Clear search" className="text-brand-muted hover:text-brand-magenta">
                <X size={14} />
              </button>
            </span>
          </div>
        )}

        {/* ── filter bar ── */}
        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                !category
                  ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
                  : "border border-pink-200 bg-white text-brand-ink hover:border-brand-pink/60"
              }`}
            >
              All ({products.length})
            </button>

            {CATEGORIES.map((c) => {
              const active = category === slug(c);
              const count = products.filter((p) => p.category === c).length;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(slug(c))}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
                      : "border border-pink-200 bg-white text-brand-ink hover:border-brand-pink/60"
                  }`}
                >
                  {c} ({count})
                </button>
              );
            })}
          </div>

          <label className="inline-flex shrink-0 items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-xs text-brand-muted">
            <SlidersHorizontal size={14} className="text-brand-magenta" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent font-semibold text-brand-ink outline-none"
            >
              {SORTS.map(([v, label]) => (
                <option key={v} value={v}>{label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-xs text-brand-muted">
          Showing {list.length} {list.length === 1 ? "product" : "products"}
        </p>

        {/* ── grid ── */}
        {list.length ? (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {list.map((p, k) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : Math.min(k, 7) * 0.06 }}
                whileHover={reduce ? {} : { y: -6 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid place-items-center rounded-[24px] border border-dashed border-pink-200 bg-white/70 p-12 text-center">
            <Search size={26} className="text-brand-magenta" />
            <p className="mt-3 font-display text-xl font-semibold text-brand-ink">No products found</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-brand-muted">
              {q ? <>Nothing matched “{q}”. Try “exam board”, “frame” or “gift”.</> : "Nothing in this category yet."}
            </p>
            <button
              onClick={clearAll}
              className="mt-5 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-7 py-3 text-sm font-semibold text-white"
            >
              View all products
            </button>
          </div>
        )}

        {/* ── help line ── */}
        <div className="mt-12 rounded-[24px] border border-pink-100 bg-white p-6 text-center">
          <p className="font-script text-2xl text-brand-pink">Can&apos;t find what you need?</p>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-brand-muted">
            Tell us the theme, size or occasion you have in mind — most of our work starts as a custom request.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5"
          >
            Send your requirement
          </Link>
        </div>
      </div>
    </section>
  );
}