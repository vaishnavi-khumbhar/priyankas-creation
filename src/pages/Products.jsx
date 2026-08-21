import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { CATEGORY_ORDER, slugify } from "../data/categories";

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

  /* only show tabs for categories that actually have products */
  const tabs = useMemo(
    () =>
      CATEGORY_ORDER.map((name) => ({
        name,
        slug: slugify(name),
        count: products.filter((p) => p.category === name).length,
      })).filter((t) => t.count > 0),
    []
  );

  const activeName = tabs.find((t) => t.slug === category)?.name;

  const list = useMemo(() => {
    const term = q.toLowerCase();
    let out = products.filter((p) => {
      const matchesQ =
        !term || `${p.name} ${p.category} ${p.description || ""}`.toLowerCase().includes(term);
      const matchesCat = !category || slugify(p.category) === category;
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

  const tabCls = (active) =>
    `shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all sm:text-sm ${
      active
        ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
        : "border border-pink-200 bg-white text-brand-ink hover:border-brand-pink/60"
    }`;

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-8 lg:py-12">
      <div className="container-page">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="pb-1 font-script text-[28px] leading-[1.4] text-brand-pink sm:text-4xl">
            Our full collection
          </p>
          <h1 className="mt-1 font-display text-[30px] font-bold leading-tight text-brand-ink sm:text-5xl">
            {activeName || "All Products"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] font-medium leading-[1.7] text-brand-muted sm:text-lg sm:leading-8">
            Every piece is made to order — your child&apos;s name, their photo, their favourite theme.
          </p>
        </motion.div>

        {/* ── active search term ── */}
        {q && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[15px] text-brand-ink ring-1 ring-pink-100">
              <Search size={15} className="text-brand-magenta" />
              Results for <b className="font-semibold">“{q}”</b>
              <button onClick={clearAll} aria-label="Clear search" className="text-brand-muted hover:text-brand-magenta">
                <X size={15} />
              </button>
            </span>
          </div>
        )}

        {/* ── filter bar ──
            all categories on ONE line — the row scrolls sideways on any
            screen too narrow to hold them, instead of wrapping into
            ragged rows. Sort sits on its own line underneath. */}
        <div className="mt-7">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <div className="flex w-max gap-2 lg:w-full lg:justify-center">
              <button onClick={() => setCategory("")} className={tabCls(!category)}>
                All ({products.length})
              </button>

              {tabs.map((t) => (
                <button key={t.slug} onClick={() => setCategory(t.slug)} className={tabCls(category === t.slug)}>
                  {t.name} ({t.count})
                </button>
              ))}
            </div>
          </div>

          {/* sort — below the categories */}
          <div className="mt-3 flex justify-center lg:justify-end">
            <label className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[13px] text-brand-muted sm:text-sm">
              <SlidersHorizontal size={15} className="shrink-0 text-brand-magenta" />
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
        </div>

        <p className="mt-4 text-[13px] font-medium text-brand-muted sm:text-sm">
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
          <div className="mt-8 grid place-items-center rounded-[24px] border border-dashed border-pink-200 bg-white/70 p-8 text-center sm:p-12">
            <Search size={28} className="text-brand-magenta" />
            <p className="mt-3 font-display text-[22px] font-semibold text-brand-ink sm:text-2xl">No products found</p>
            <p className="mt-2 max-w-sm text-[15px] leading-[1.7] text-brand-muted sm:text-base">
              {q ? <>Nothing matched “{q}”. Try “exam board”, “frame” or “kitchen”.</> : "Nothing in this category yet."}
            </p>
            <button
              onClick={clearAll}
              className="mt-5 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-7 py-3 text-[15px] font-semibold text-white"
            >
              View all products
            </button>
          </div>
        )}

        {/* ── help line ── */}
        <div className="mt-12 rounded-[24px] border border-pink-100 bg-white p-6 text-center sm:p-8">
          <p className="pb-0.5 font-script text-2xl leading-[1.4] text-brand-pink sm:text-3xl">
            Can&apos;t find what you need?
          </p>

          <p
            className="mx-auto mt-2 max-w-lg text-base font-medium leading-7 text-brand-muted sm:text-lg sm:leading-8"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Tell us the theme, size or occasion you have in mind — most of our work starts as a custom request.
          </p>

          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5 sm:text-base"
          >
            Send your requirement
          </Link>
        </div>
      </div>
    </section>
  );
}