import { motion, useReducedMotion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function RelatedProducts({ currentId, category, limit = 4 }) {
  const reduce = useReducedMotion();

  const sameCategory = products.filter((p) => p.id !== currentId && p.category === category);
  const others = products.filter((p) => p.id !== currentId && p.category !== category);
  const list = [...sameCategory, ...others].slice(0, limit);

  if (!list.length) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold ring-1 ring-brand-gold/40">
            You may also like
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Related <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-brand-muted">
            More personalized creations made with the same care — name, photo and theme of your choice.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {list.map((p, k) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : k * 0.07 }}
              whileHover={reduce ? {} : { y: -6 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}