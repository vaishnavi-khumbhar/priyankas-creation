import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function BestSellers({ onAddToCart }) {
  const reduce = useReducedMotion();

  return (
    <section className="py-10 lg:py-10 bg-brand-cream">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-brand-gold/40 px-3.5 py-1.5 text-[11px] tracking-[0.22em] uppercase text-brand-gold font-semibold">
              <Heart size={12} /> Customer favourites
            </span>
            <p className="font-script text-4xl text-brand-pink mt-4">Loved again and again</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Best Loved Creations</h2>
        <p
  className="text-brand-muted text-base sm:text-lg mt-4 max-w-lg leading-7 sm:leading-8 font-medium"
  style={{ fontFamily: "'Poppins', sans-serif" }}
>
  The designs parents order most — and come back for when the next school year starts.
</p>
    </div>
          <Link to="/products" className="group hidden sm:inline-flex items-center gap-1.5 font-semibold text-brand-magenta shrink-0">
            View all products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        {/* CHANGED: 4 products -> 6 products, grid adjusted to a clean 3x2
            layout (lg:grid-cols-3) instead of 4-wide, so 6 items fill two
            full rows with no ragged trailing gap. */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-9">
          {products.slice(0, 6).map((p, k) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : k * 0.08 }}
              whileHover={reduce ? {} : { y: -6 }}
            >
              <ProductCard product={p} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>

        {/* NEW: "View all products" repeated as a button below the grid —
            the top-right link stays for larger screens, this makes the
            action reachable right after browsing the 6 items too, and is
            the only "view all" entry point on mobile (top link is hidden
            there via sm:hidden above). */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-magenta text-white font-semibold px-6 py-3 shadow-sm hover:shadow-md transition-all"
          >
            View All Products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}