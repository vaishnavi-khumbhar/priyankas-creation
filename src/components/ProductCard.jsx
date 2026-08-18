import { Link } from "react-router-dom";
import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const WA_NUMBER = "919130059818";

export const waOrderLink = (name) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi Priyanka's Creation! I want to order: ${name}. Please share the details.`
  )}`;

export const discountOf = (p) =>
  p.oldPrice && p.oldPrice > p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export default function ProductCard({ product }) {
  const off = discountOf(product);
  const to = `/product/${product.id}`;
  const { addToCart, toggleWishlist, isWished } = useShop();
  const wished = isWished(product.id);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-pink-100 bg-white shadow-[0_2px_12px_-8px_rgba(122,31,162,.3)] transition-all duration-300 hover:border-brand-pink/40 hover:shadow-[0_24px_45px_-26px_rgba(122,31,162,.7)]">
      {/* image → product page */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-soft via-white to-purple-50">
        <Link to={to} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tag && (
            <span className="rounded-full bg-brand-magenta px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow">
              {product.tag}
            </span>
          )}
          {off > 0 && (
            <span className="rounded-full bg-green-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow">
              {off}% OFF
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow transition-all duration-300 hover:scale-110 ${
            wished ? "text-brand-magenta" : "text-brand-ink hover:text-brand-magenta"
          }`}
        >
          <Heart size={15} className={wished ? "fill-brand-magenta" : ""} />
        </button>

        {/* Quick View → opens the full product page */}
        <Link
          to={to}
          className="absolute inset-x-0 bottom-3 mx-auto flex w-fit translate-y-4 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-[11px] font-semibold text-brand-ink opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:text-brand-magenta group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye size={13} /> Quick View
        </Link>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4 text-center">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-gold">{product.category}</p>

        <Link to={to}>
          <h3 className="mt-1.5 line-clamp-2 font-display text-[16px] font-semibold leading-[1.3] text-brand-ink transition-colors hover:text-brand-magenta sm:text-[18px] lg:text-[19px]">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="mt-1.5 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, s) => (
              <Star
                key={s}
                size={12}
                className={s < Math.round(product.rating) ? "fill-brand-gold text-brand-gold" : "text-pink-200"}
              />
            ))}
            {product.reviews ? <span className="ml-1 text-[10px] text-brand-muted">({product.reviews})</span> : null}
          </div>
        )}

        <div className="mb-4 mt-2 flex items-baseline justify-center gap-2">
          <span className="font-display text-xl font-bold text-green-600 sm:text-2xl">₹{product.price}</span>
          {product.oldPrice > product.price && (
            <span className="text-sm text-brand-muted line-through sm:text-base">₹{product.oldPrice}</span>
          )}
        </div>

        <button
          onClick={() => addToCart(product, 1, product.sizes?.[0] ?? null)}
          className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-full bg-green-600 px-3 py-2.5 text-xs font-semibold text-white shadow-[0_10px_22px_-12px_rgba(22,163,74,.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm lg:px-6 lg:py-3.5"
        >
          <ShoppingCart size={16} />
          Add To Cart
        </button>
      </div>
    </div>
  );
}