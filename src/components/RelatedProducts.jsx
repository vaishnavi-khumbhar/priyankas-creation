import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductsContext";
import { slugify } from "../data/categories";

export default function RelatedProducts({ currentId, category }) {
  const reduce = useReducedMotion();
  const { products } = useProducts();

  const list = useMemo(
    () =>
      products
        .filter((p) => p.category === category && String(p.id) !== String(currentId))
        .slice(0, 4),
    [products, category, currentId]
  );

  if (!list.length) return null;

  return (
    <section className="bg-brand-cream py-10 lg:py-14">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="pb-0.5 font-script text-[26px] leading-[1.4] text-brand-pink sm:text-3xl">
              You may also like
            </p>
            <h2 className="font-display text-2xl font-bold text-brand-ink sm:text-3xl">
              More from {category}
            </h2>
          </div>

          <Link
            to={`/products?category=${slugify(category || "")}`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-magenta"
          >
            View all <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {list.map((p, k) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : k * 0.07 }}
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