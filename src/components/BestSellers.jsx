import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductsContext";

export default function BestSellers() {
  const reduce = useReducedMotion();
  const { products } = useProducts();          // ← now comes from the backend

  return (
    <section className="bg-brand-cream py-10 lg:py-10">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold ring-1 ring-brand-gold/40">
              <Heart size={12} /> Customer favourites
            </span>

            <p className="mt-4 pb-1 font-script text-4xl leading-[1.35] text-brand-pink">
              Loved again and again
            </p>

            <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
              Best Loved Creations
            </h2>

            <p
              className="mt-4 max-w-lg text-base font-medium leading-7 text-brand-muted sm:text-lg sm:leading-8"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              The designs parents order most — and come back for when the next school year starts.
            </p>
          </div>

          <Link to="/products" className="group hidden shrink-0 items-center gap-1.5 font-semibold text-brand-magenta sm:inline-flex">
            View all products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {products.slice(0, 6).map((p, k) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : k * 0.08 }}
              whileHover={reduce ? {} : { y: -6 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-magenta px-6 py-3 font-semibold text-white shadow-sm transition-all hover:shadow-md"
          >
            View All Products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}