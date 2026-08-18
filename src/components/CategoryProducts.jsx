import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const ORDER = ["Exam Boards", "Photo Frames", "Gift Creations", "School Essentials"];

const groupByCategory = (list) => {
  const map = list.reduce((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});
  const known = ORDER.filter((c) => map[c]);
  const rest = Object.keys(map).filter((c) => !ORDER.includes(c));
  return [...known, ...rest].map((c) => [c, map[c]]);
};

export default function CategoryProducts({ onAddToCart }) {
  const reduce = useReducedMotion();
  const groups = groupByCategory(products);

  return (
    <section className="py-16 lg:py-20 bg-brand-cream">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center rounded-full bg-white ring-1 ring-brand-gold/40 px-3.5 py-1.5 text-[11px] tracking-[0.22em] uppercase text-brand-gold font-semibold">
            Our collection
          </span>
          <p className="font-script text-2xl text-brand-pink mt-4">Loved again and again</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink">Shop by Category</h2>
          <p className="text-brand-muted text-sm mt-3 leading-6">
            Every piece is made to order — name, photo and theme chosen by you.
          </p>
        </motion.div>

        {groups.map(([category, items], gi) => (
          <div key={category} className={gi === 0 ? "mt-12" : "mt-16"}>
            <div className="flex items-center gap-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-ink shrink-0">{category}</h3>
              <span className="h-px flex-1 bg-gradient-to-r from-brand-gold/60 via-pink-200 to-transparent" />
              <span className="shrink-0 rounded-full bg-white ring-1 ring-pink-100 px-3 py-1 text-[11px] font-semibold text-brand-magenta">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
              {items.map((p, k) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : k * 0.07 }}
                  whileHover={reduce ? {} : { y: -6 }}
                >
                  <ProductCard product={p} onAddToCart={onAddToCart} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 text-center">
          <Link to="/shop"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-8 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5">
            View all products
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}