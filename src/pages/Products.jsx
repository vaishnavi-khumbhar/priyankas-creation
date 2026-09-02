import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

import {
  CATEGORIES,
  slugify,
} from "../data/categories";

/* ============================================================
   SORT OPTIONS
   ============================================================ */

const SORTS = [
  ["featured", "Featured"],
  ["low", "Price: low to high"],
  ["high", "Price: high to low"],
  ["name", "Name A–Z"],
];

/* ============================================================
   PRODUCTS PAGE
   ============================================================ */

export default function Products() {
  const [params, setParams] = useSearchParams();

  const reduce = useReducedMotion();

  const {
    products = [],
    loading,
  } = useProducts();

  /* ==========================================================
     URL PARAMS
     ========================================================== */

  const q = (params.get("q") || "").trim();

  const categoryParam = (
    params.get("category") || ""
  ).trim();

  /* ==========================================================
     NORMALIZE CATEGORY FROM URL

     Example:
     writing-and-exam-boards
     ↓
     writing-and-exam-boards
     ========================================================== */

  const category = slugify(categoryParam);

  const [sort, setSort] = useState("featured");

  /* ==========================================================
     SCROLL TO TOP WHEN FILTER CHANGES
     ========================================================== */

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [q, category, sort]);

  /* ==========================================================
     FORCE LAYOUT REFRESH
     ========================================================== */

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });

    return () => cancelAnimationFrame(id);
  }, [q, category, sort, products.length]);

  /* ==========================================================
     CATEGORY TABS

     IMPORTANT:
     We compare using slugify() on BOTH sides.

     So all these work:
     Writing & Exam Boards
     writing & exam boards
     Writing and Exam Boards
     writing-and-exam-boards
     ========================================================== */

  const tabs = useMemo(() => {
    return CATEGORIES
      .map((cat) => {
        const categorySlug = slugify(cat.name);

        const count = products.filter((product) => {
          const productCategory = slugify(
            product?.category || ""
          );

          return productCategory === categorySlug;
        }).length;

        return {
          name: cat.name,
          slug: categorySlug,
          count,
        };
      })
      .filter((tab) => tab.count > 0);
  }, [products]);

  /* ==========================================================
     ACTIVE CATEGORY NAME

     URL:
     writing-and-exam-boards

     DISPLAY:
     Writing & Exam Boards
     ========================================================== */

  const activeCategory = useMemo(() => {
    if (!category) return null;

    return CATEGORIES.find(
      (cat) => slugify(cat.name) === category
    );
  }, [category]);

  const activeName = activeCategory?.name || "";

  /* ==========================================================
     FILTER + SEARCH + SORT PRODUCTS
     ========================================================== */

  const list = useMemo(() => {
    const term = q.toLowerCase();

    let result = products.filter((product) => {
      const productName = String(
        product?.name || ""
      );

      const productCategory = String(
        product?.category || ""
      );

      const productDescription = String(
        product?.description || ""
      );

      /* -----------------------------------------------
         SEARCH
         ----------------------------------------------- */

      const searchableText = `
        ${productName}
        ${productCategory}
        ${productDescription}
      `.toLowerCase();

      const matchesSearch =
        !term ||
        searchableText.includes(term);

      /* -----------------------------------------------
         CATEGORY
         ----------------------------------------------- */

      const productCategorySlug = slugify(
        productCategory
      );

      const matchesCategory =
        !category ||
        productCategorySlug === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

    /* ======================================================
       SORT
       ====================================================== */

    if (sort === "low") {
      result = [...result].sort(
        (a, b) =>
          Number(a?.price || 0) -
          Number(b?.price || 0)
      );
    }

    if (sort === "high") {
      result = [...result].sort(
        (a, b) =>
          Number(b?.price || 0) -
          Number(a?.price || 0)
      );
    }

    if (sort === "name") {
      result = [...result].sort(
        (a, b) =>
          String(a?.name || "").localeCompare(
            String(b?.name || "")
          )
      );
    }

    return result;
  }, [
    products,
    q,
    category,
    sort,
  ]);

  /* ==========================================================
     SET CATEGORY

     Frontend:
     Writing & Exam Boards

     URL:
     writing-and-exam-boards
     ========================================================== */

  const setCategory = (value) => {
    const next = new URLSearchParams(params);

    if (value) {
      next.set(
        "category",
        slugify(value)
      );
    } else {
      next.delete("category");
    }

    setParams(next, {
      replace: true,
    });
  };

  /* ==========================================================
     CLEAR ALL
     ========================================================== */

  const clearAll = () => {
    setParams(
      new URLSearchParams(),
      {
        replace: true,
      }
    );

    setSort("featured");
  };

  /* ==========================================================
     TAB STYLE
     ========================================================== */

  const tabCls = (active) =>
    `
      shrink-0
      whitespace-nowrap
      rounded-full
      px-4
      py-2.5
      text-[13px]
      font-semibold
      transition-all
      sm:text-sm

      ${
        active
          ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
          : "border border-pink-200 bg-white text-brand-ink hover:border-brand-pink/60"
      }
    `;

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section className="min-h-[70vh] overflow-x-hidden bg-gradient-to-b from-brand-soft/60 to-white py-8 lg:py-12">

      <div className="container-page">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-center"
        >

          <p className="pb-1 font-script text-[28px] leading-[1.4] text-brand-pink sm:text-4xl">
            Our full collection
          </p>

          <h1 className="mt-1 font-display text-[30px] font-bold leading-tight text-brand-ink sm:text-5xl">
            {activeName || "All Products"}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-[15px] font-medium leading-[1.7] text-brand-muted sm:text-lg sm:leading-8">
            Every piece is made to order — your name, your photo, your favourite theme.
          </p>

        </motion.div>

        {/* =====================================================
            SEARCH RESULT
            ===================================================== */}

        {q && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">

            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[15px] text-brand-ink ring-1 ring-pink-100">

              <Search
                size={15}
                className="text-brand-magenta"
              />

              Results for{" "}

              <b className="font-semibold">
                “{q}”
              </b>

              <button
                onClick={clearAll}
                aria-label="Clear search"
                className="text-brand-muted hover:text-brand-magenta"
              >
                <X size={15} />
              </button>

            </span>

          </div>
        )}

        {/* =====================================================
            CATEGORY FILTER
            ===================================================== */}

        <div className="mt-7">

          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">

            <div className="flex w-max gap-2 lg:w-full lg:justify-center">

              {/* ALL */}

              <button
                type="button"
                onClick={() => setCategory("")}
                className={tabCls(!category)}
              >
                All ({products.length})
              </button>

              {/* CATEGORIES */}

              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.slug}
                  onClick={() =>
                    setCategory(tab.name)
                  }
                  className={tabCls(
                    category === tab.slug
                  )}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}

            </div>

          </div>

          {/* =================================================
              SORT
              ================================================= */}

          <div className="mt-3 flex justify-center lg:justify-end">

            <label className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[13px] text-brand-muted sm:text-sm">

              <SlidersHorizontal
                size={15}
                className="shrink-0 text-brand-magenta"
              />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="bg-transparent font-semibold text-brand-ink outline-none"
              >

                {SORTS.map(
                  ([value, label]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  )
                )}

              </select>

            </label>

          </div>

        </div>

        {/* =====================================================
            PRODUCT COUNT
            ===================================================== */}

        <p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-brand-muted sm:text-sm">

          Showing {list.length}{" "}

          {list.length === 1
            ? "product"
            : "products"}

          {loading && (
            <span className="inline-flex items-center gap-1.5 text-brand-magenta">

              <Loader2
                size={13}
                className="animate-spin"
              />

              updating…

            </span>
          )}

        </p>

        {/* =====================================================
            PRODUCT GRID
            ===================================================== */}

        {list.length > 0 ? (

          <div
            key={`${category}|${q}|${sort}`}
            className="mt-5 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >

            {list.map(
              (product, index) => (

                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: reduce
                      ? 0
                      : Math.min(index, 7) * 0.06,
                  }}
                  whileHover={
                    reduce
                      ? {}
                      : { y: -6 }
                  }
                >

                  <ProductCard
                    product={product}
                  />

                </motion.div>

              )
            )}

          </div>

        ) : (

          /* ===================================================
             NO PRODUCTS
             =================================================== */

          <div className="mt-8 grid place-items-center rounded-[24px] border border-dashed border-pink-200 bg-white/70 p-8 text-center sm:p-12">

            <Search
              size={28}
              className="text-brand-magenta"
            />

            <p className="mt-3 font-display text-[22px] font-semibold text-brand-ink sm:text-2xl">
              No products found
            </p>

            <p className="mt-2 max-w-sm text-[15px] leading-[1.7] text-brand-muted sm:text-base">

              {q ? (
                <>
                  Nothing matched “{q}”.
                  Try “exam board”, “frame”
                  or “kitchen”.
                </>
              ) : (
                "Nothing in this category yet."
              )}

            </p>

            <button
              type="button"
              onClick={clearAll}
              className="mt-5 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-7 py-3 text-[15px] font-semibold text-white"
            >
              View all products
            </button>

          </div>

        )}

        {/* =====================================================
            HELP SECTION
            ===================================================== */}

        <div className="mt-12 rounded-[24px] border border-pink-100 bg-white p-6 text-center sm:p-8">

          <p className="pb-0.5 font-script text-2xl leading-[1.4] text-brand-pink sm:text-3xl">
            Can&apos;t find what you need?
          </p>

          <p className="mx-auto mt-2 max-w-lg text-base font-medium leading-7 text-brand-muted sm:text-lg sm:leading-8">
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