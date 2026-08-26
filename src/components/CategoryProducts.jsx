import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { CATEGORY_ORDER, slugify } from "../data/categories";

const groupByCategory = (list) => {
  const map = list.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }

    acc[product.category].push(product);
    return acc;
  }, {});

  // Show categories in the exact order defined in categories.js
  const knownCategories = CATEGORY_ORDER.filter(
    (category) => map[category]?.length
  );

  // Keep any extra categories that may exist in products.js
  const extraCategories = Object.keys(map).filter(
    (category) => !CATEGORY_ORDER.includes(category)
  );

  return [...knownCategories, ...extraCategories].map((category) => [
    category,
    map[category],
  ]);
};

export default function CategoryProducts() {
  const reduce = useReducedMotion();
  const groups = groupByCategory(products);

  return (
    <section className="bg-brand-cream py-16 lg:py-20">
      <div className="container-page">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold ring-1 ring-brand-gold/40">
            Our collection
          </span>

          <p className="mt-4 pb-0.5 font-script text-[28px] leading-[1.4] text-brand-pink sm:text-3xl">
            Loved again and again
          </p>

          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Shop by Category
          </h2>

          <p className="mt-3 text-[15px] leading-7 text-brand-muted sm:text-base">
            Every piece is made to order — name, photo and theme chosen by you.
          </p>
        </motion.div>

        {/* Categories */}
        {groups.map(([category, items], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : categoryIndex * 0.05,
            }}
            className={categoryIndex === 0 ? "mt-12" : "mt-16"}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 sm:gap-4">
              <h3 className="shrink-0 font-display text-[20px] font-bold text-brand-ink sm:text-3xl">
                {category}
              </h3>

              <span className="h-px flex-1 bg-gradient-to-r from-brand-gold/60 via-pink-200 to-transparent" />

              <Link
                to={`/products?category=${slugify(category)}`}
                className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-brand-magenta ring-1 ring-pink-100 transition hover:ring-brand-pink/50 sm:px-3.5 sm:text-[12px]"
              >
                View all ({items.length})
              </Link>
            </div>

            {/* Products */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {items.slice(0, 4).map((product, productIndex) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : productIndex * 0.07,
                  }}
                  whileHover={reduce ? {} : { y: -6 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* View All Products */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-8 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5"
          >
            View all products

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}