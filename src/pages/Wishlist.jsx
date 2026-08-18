import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Wishlist() {
  const { wishlistItems, toggleWishlist, moveToCart } = useShop();

  if (!wishlistItems.length) {
    return (
      <div className="container-page py-20 text-center lg:py-28">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-soft text-brand-magenta">
          <Heart size={30} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold text-brand-ink">Your wishlist is empty</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-brand-muted">
          Tap the heart on any design to save it here for later.
        </p>
        <Link
          to="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-8 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5"
        >
          Browse products <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-10 lg:py-14">
      <div className="container-page">
        <p className="font-script text-2xl text-brand-pink">Saved for later</p>
        <h1 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">Your Wishlist</h1>
        <p className="mt-1 text-sm text-brand-muted">
          {wishlistItems.length} {wishlistItems.length === 1 ? "design" : "designs"} saved
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {wishlistItems.map((p) => (
            <div key={p.id} className="flex flex-col overflow-hidden rounded-[24px] border border-pink-100 bg-white">
              <Link to={`/product/${p.id}`} className="relative block aspect-square overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </Link>

              <div className="flex flex-1 flex-col p-4 text-center">
                <Link to={`/product/${p.id}`}>
                  <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-brand-ink hover:text-brand-magenta sm:text-[17px]">
                    {p.name}
                  </h3>
                </Link>

                <div className="mt-2 flex items-baseline justify-center gap-2">
                  <span className="font-display text-lg font-bold text-green-600 sm:text-xl">₹{p.price}</span>
                  {p.oldPrice > p.price && <span className="text-xs text-brand-muted line-through sm:text-sm">₹{p.oldPrice}</span>}
                </div>

                <button
                  onClick={() => moveToCart(p)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-green-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-700 sm:text-sm"
                >
                  <ShoppingCart size={14} /> Move to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(p)}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-brand-muted hover:text-brand-magenta"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}  