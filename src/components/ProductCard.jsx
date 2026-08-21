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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-pink-100 bg-white shadow-[0_2px_10px_-8px_rgba(122,31,162,.3)] transition-all duration-300 hover:border-brand-pink/40 hover:shadow-[0_24px_45px_-26px_rgba(122,31,162,.7)] sm:rounded-[26px]">
      {/* ── image ──
          mobile: 4:5 so the tall boards aren't cropped as harshly
          sm and up: square, as before */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-soft via-white to-purple-50 sm:aspect-square">
        <Link to={to} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </Link>

        {/* badges — much smaller on mobile so they don't cover the design */}
        <div className="pointer-events-none absolute left-1.5 top-1.5 flex flex-col gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
          {product.tag && (
            <span className="rounded-full bg-brand-magenta px-1.5 py-0.5 text-[7px] font-bold uppercase leading-tight tracking-wide text-white shadow sm:px-2.5 sm:py-1 sm:text-[9px]">
              {product.tag}
            </span>
          )}
          {off > 0 && (
            <span className="rounded-full bg-green-600 px-1.5 py-0.5 text-[7px] font-bold uppercase leading-tight tracking-wide text-white shadow sm:px-2.5 sm:py-1 sm:text-[9px]">
              {off}% OFF
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white/95 shadow transition-all duration-300 hover:scale-110 sm:right-3 sm:top-3 sm:h-8 sm:w-8 ${
            wished ? "text-brand-magenta" : "text-brand-ink hover:text-brand-magenta"
          }`}
        >
          <Heart size={12} className={`sm:hidden ${wished ? "fill-brand-magenta" : ""}`} />
          <Heart size={15} className={`hidden sm:block ${wished ? "fill-brand-magenta" : ""}`} />
        </button>

        {/* Quick View is hover-only — hidden on touch screens where hover doesn't exist */}
        <Link
          to={to}
          className="absolute inset-x-0 bottom-3 mx-auto hidden w-fit translate-y-4 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-[11px] font-semibold text-brand-ink opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:text-brand-magenta group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
        >
          <Eye size={13} /> Quick View
        </Link>
      </div>

      {/* ── body ── */}
      <div className="flex flex-1 flex-col p-2.5 text-center sm:p-4">
        <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand-gold sm:text-[9px] sm:tracking-[0.18em]">
          {product.category}
        </p>

        <Link to={to}>
          <h3 className="mt-1 line-clamp-2 font-display text-[13px] font-semibold leading-[1.25] text-brand-ink transition-colors hover:text-brand-magenta sm:mt-1.5 sm:text-[17px] sm:leading-[1.3] lg:text-[19px]">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="mt-1 flex items-center justify-center gap-0.5 sm:mt-1.5 sm:gap-1">
            {[...Array(5)].map((_, s) => (
              <Star
                key={s}
                size={9}
                className={`sm:hidden ${s < Math.round(product.rating) ? "fill-brand-gold text-brand-gold" : "text-pink-200"}`}
              />
            ))}
            {[...Array(5)].map((_, s) => (
              <Star
                key={`d${s}`}
                size={12}
                className={`hidden sm:block ${s < Math.round(product.rating) ? "fill-brand-gold text-brand-gold" : "text-pink-200"}`}
              />
            ))}
            {product.reviews ? (
              <span className="ml-0.5 text-[9px] text-brand-muted sm:ml-1 sm:text-[10px]">({product.reviews})</span>
            ) : null}
          </div>
        )}

        <div className="mb-2.5 mt-1.5 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0.5 sm:mb-4 sm:mt-2 sm:gap-2">
          <span className="font-display text-[15px] font-bold text-green-600 sm:text-xl lg:text-2xl">
            ₹{product.price}
          </span>
          {product.oldPrice > product.price && (
            <span className="text-[11px] text-brand-muted line-through sm:text-sm lg:text-base">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product, 1, product.sizes?.[0] ?? null)}
          className="mt-auto flex w-full items-center justify-center gap-1 rounded-full bg-green-600 px-2 py-2 text-[11px] font-semibold text-white shadow-[0_8px_18px_-12px_rgba(22,163,74,.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm lg:px-6 lg:py-3.5"
        >
          <ShoppingCart size={13} className="shrink-0 sm:hidden" />
          <ShoppingCart size={16} className="hidden shrink-0 sm:block" />
          Add To Cart
        </button>
      </div>
    </div>
  );
}