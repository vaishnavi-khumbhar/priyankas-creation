import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag, Heart, UserRound, Search, Menu, X, Phone, Mail, Clock, ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { products } from "../data/products";

import logo from "../assets/logo_r.png";
const LOGO = logo;

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

const PHONE = "9130059818";
const WA = "919130059818";
const WA_MSG = encodeURIComponent(
  "Hi Priyanka's Creation! I want to order a customized exam board. My child's name is ___"
);
const WA_LINK = `https://wa.me/${WA}?text=${WA_MSG}`;
const EMAIL = "priyankas.creation230626@gmail.com";
const HOURS = "10 AM – 6 PM";

const nav = [
  ["Home", "/"],
  ["Products", "/products"],
  ["About Us", "/about"],
  ["Contact", "/contact"],
];

const groupByCategory = (list) =>
  Object.entries(
    list.reduce((acc, p) => {
      (acc[p.category] ||= []).push(p);
      return acc;
    }, {})
  );

const Badge = ({ count }) =>
  count > 0 ? (
    <span className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-brand-pink text-[9px] font-semibold text-white ring-2 ring-white">
      {count > 9 ? "9+" : count}
    </span>
  ) : null;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const { cartCount, wishlistCount } = useShop();
  const { user, isAuthed } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const closeTimer = useRef(null);
  const searchInput = useRef(null);

  const groups = groupByCategory(products);
  const initials = (user?.name || "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(term)).slice(0, 6);
  }, [q]);

  const submitSearch = (e) => {
    e?.preventDefault();
    if (!q.trim()) return;
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
    setOpen(false);
    setFocused(false);
    setQ("");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false); setDropdown(false); setSearchOpen(false); setFocused(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false); setDropdown(false); setMobileProducts(false); setSearchOpen(false); setQ("");
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInput.current?.focus(), 120);
  }, [searchOpen]);

  const openMenu = () => { clearTimeout(closeTimer.current); setDropdown(true); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setDropdown(false), 160); };

  const link = ({ isActive }) =>
    `relative py-2 transition-colors duration-200 ${
      isActive ? "text-brand-magenta font-semibold nav-trail-on" : "text-brand-ink hover:text-brand-purple nav-trail"
    }`;

  const ResultList = ({ onPick }) => (
    <ul className="max-h-[52vh] overflow-y-auto">
      {results.map((p) => (
        <li key={p.id}>
          <Link
            to={`/product/${p.id}`}
            onClick={onPick}
            className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-brand-soft/70"
          >
            <img src={p.image} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-brand-ink">{p.name}</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-brand-gold">{p.category}</span>
            </span>
            <span className="shrink-0 text-sm font-bold text-green-600">₹{p.price}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const SearchPanel = ({ onPick }) =>
    q.trim() ? (
      <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[320px] overflow-hidden rounded-[20px] border border-pink-100 bg-white shadow-[0_30px_70px_-30px_rgba(80,20,80,.45)]">
        {results.length ? (
          <>
            <ResultList onPick={onPick} />
            <button
              type="submit"
              className="w-full border-t border-pink-100 bg-brand-soft/50 py-3 text-xs font-semibold text-brand-magenta hover:bg-brand-soft"
            >
              See all results for “{q.trim()}” →
            </button>
          </>
        ) : (
          <p className="px-5 py-6 text-center text-sm text-brand-muted">
            Nothing matched “{q.trim()}”. Try “exam board” or “frame”.
          </p>
        )}
      </div>
    ) : null;

  return (
    <>
      {/* ── Contact strip ─────────────────────────────── */}
      <div className="bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink text-[11px] text-white sm:text-xs">
        <div className="container-page flex h-9 items-center justify-between gap-4">
          <a href={`tel:+91${PHONE}`} className="flex shrink-0 items-center gap-1.5 hover:opacity-80">
            <Phone size={13} className="opacity-90" />
            <span className="font-medium tracking-wide">+91 {PHONE}</span>
          </a>
          <p className="hidden uppercase tracking-[0.18em] text-white/90 md:block">
            Waterproof · Long Lasting · Customized Exam Boards
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden items-center gap-1.5 text-white/90 sm:flex">
              <Clock size={13} /> {HOURS}
            </span>
            <a href={`mailto:${EMAIL}`} className="hidden items-center gap-1.5 hover:opacity-80 lg:flex">
              <Mail size={13} /> {EMAIL}
            </a>
            <span className="text-white/90 sm:hidden">{HOURS}</span>
          </div>
        </div>
      </div>

      {/* ── Header ────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 bg-white/85 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_30px_-12px_rgba(122,31,162,0.25)]" : ""
        }`}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />

        <div className="container-page flex h-[76px] items-center gap-3 lg:h-[92px] lg:gap-5">
          {/* ── logo ──
              FIX: the script font has tall loops and a long descender on the "y".
              `leading-none` clipped them at the top. Everything here now uses
              relaxed line-height + a little vertical padding, and the wrapper
              never clips. */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="relative grid shrink-0 place-items-center">
              <span className="absolute inset-0 scale-90 rounded-full bg-brand-pink/25 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
              <img
                src={LOGO}
                alt="Priyanka's Creation — Custom Designs & Gifts"
                className={`relative rounded-full object-cover ring-1 ring-brand-gold/60 transition-all duration-300 ${
                  scrolled ? "h-11 w-11 lg:h-12 lg:w-12" : "h-12 w-12 lg:h-14 lg:w-14 2xl:h-16 2xl:w-16"
                }`}
              />
            </span>

            <span className="block overflow-visible">
              {/* mobile / tablet */}
              <span className="flex items-baseline gap-1 whitespace-nowrap font-script text-[24px] leading-[1.5] lg:hidden">
                <span className="bg-gradient-to-r from-brand-pink to-brand-magenta bg-clip-text font-script text-[28px] font-semibold leading-tight text-transparent sm:text-[30px] lg:text-[32px]">
  Priyanka&apos;s
</span>
<span className="bg-gradient-to-r from-brand-magenta to-brand-purple bg-clip-text font-script text-[28px] font-semibold leading-tight text-transparent sm:text-[30px] lg:text-[32px]">
  Creation
</span>
              </span>

              {/* desktop */}
             <span className="hidden whitespace-nowrap bg-gradient-to-r from-brand-pink via-brand-magenta to-brand-purple bg-clip-text py-0.5 font-script text-[34px] leading-[1.3] text-transparent lg:block 2xl:text-[38px]">
  Priyanka&apos;s Creation
</span>

<span className="hidden whitespace-nowrap text-[10px] font-medium uppercase leading-[1.5] tracking-[0.28em] text-brand-gold lg:block 2xl:text-[11px]">
  Custom Designs &amp; Gifts
</span>
            </span>
          </Link>

          {/* ── desktop nav ── */}
          <nav className="ml-auto hidden shrink-0 items-center gap-5 text-[14px] lg:flex xl:gap-7 xl:text-[15px] 2xl:gap-9">
            {nav.map(([label, path]) =>
              label !== "Products" ? (
                <NavLink key={path} to={path} className={link}>{label}</NavLink>
              ) : (
                /* FIX: the label and the chevron are now separate controls.
                   Clicking "Products" always navigates to /products;
                   the chevron only opens the menu. Hover still opens it. */
                <div
                  key={path}
                  className="relative flex items-center gap-1"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  <NavLink to={path} onClick={() => setDropdown(false)} className={link}>
                    Products
                  </NavLink>

                  <button
                    type="button"
                    aria-label="Show product categories"
                    aria-expanded={dropdown}
                    onClick={() => setDropdown((v) => !v)}
                    className="grid h-6 w-6 place-items-center rounded-full text-brand-ink transition-colors hover:text-brand-magenta"
                  >
                    <ChevronDown size={15} className={`transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`} />
                  </button>

                  <div
                    className={`absolute left-1/2 top-full z-50 w-[600px] -translate-x-1/2 pt-5 transition-all duration-200 ${
                      dropdown ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[24px] border border-pink-100 bg-white shadow-[0_30px_70px_-30px_rgba(80,20,80,.45)]">
                      <div className="h-1 w-full bg-gradient-to-r from-brand-pink via-brand-magenta to-brand-purple" />
                      <div className="grid gap-7 p-7 sm:grid-cols-2">
                        {groups.map(([category, items]) => (
                          <div key={category}>
                            <p className="border-b border-pink-100 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                              {category}
                            </p>
                            <ul className="mt-3 grid gap-1">
                              {items.map((p) => (
                                <li key={p.id}>
                                  <Link
                                    to={`/product/${p.id}`}
                                    onClick={() => setDropdown(false)}
                                    className="group flex items-center gap-2.5 rounded-xl px-2 py-2 text-[14px] text-brand-ink transition-colors hover:bg-brand-soft/70 hover:text-brand-magenta"
                                  >
                                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-gradient-to-br from-brand-pink to-brand-purple opacity-70 transition-opacity group-hover:opacity-100" />
                                    {p.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/products"
                        onClick={() => setDropdown(false)}
                        className="flex items-center justify-center gap-1.5 border-t border-pink-100 bg-brand-soft/50 py-3.5 text-xs font-semibold text-brand-magenta hover:bg-brand-soft"
                      >
                        View all products →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </nav>

          {/* ── inline search (desktop) ── */}
          <form onSubmit={submitSearch} className="relative hidden min-w-0 shrink lg:block lg:w-[170px] xl:w-[210px] 2xl:w-[240px]">
            <div className="flex items-center gap-2 rounded-full bg-brand-soft/70 px-3.5 ring-1 ring-transparent transition-all focus-within:bg-white focus-within:ring-brand-pink/50">
              <Search size={17} className="shrink-0 text-brand-magenta" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 180)}
                placeholder="Search…"
                className="h-10 w-full bg-transparent text-[13px] text-brand-ink outline-none placeholder:text-brand-muted/70"
              />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Clear" className="shrink-0 text-brand-muted hover:text-brand-magenta">
                  <X size={15} />
                </button>
              )}
            </div>
            {focused && <SearchPanel onPick={() => { setQ(""); setFocused(false); }} />}
          </form>

          {/* ── actions (right) ── */}
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5 lg:ml-0">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search products"
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors sm:h-10 sm:w-10 lg:hidden ${
                searchOpen ? "bg-brand-soft text-brand-magenta" : "text-brand-ink hover:bg-brand-soft hover:text-brand-magenta"
              }`}
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden h-10 w-10 place-items-center rounded-full text-brand-ink transition-colors hover:bg-brand-soft hover:text-brand-magenta sm:grid"
            >
              <Heart size={19} className={wishlistCount > 0 ? "fill-brand-magenta text-brand-magenta" : ""} />
              <Badge count={wishlistCount} />
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid h-9 w-9 place-items-center rounded-full text-brand-ink transition-colors hover:bg-brand-soft hover:text-brand-magenta sm:h-10 sm:w-10"
            >
              <ShoppingBag size={19} />
              <Badge count={cartCount} />
            </Link>

            <Link
              to={isAuthed ? "/profile" : "/login"}
              aria-label={isAuthed ? "My account" : "Login"}
              className="hidden h-10 w-10 place-items-center rounded-full text-brand-ink transition-colors hover:bg-brand-soft hover:text-brand-magenta sm:grid"
            >
              {isAuthed ? (
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-pink to-brand-purple text-[11px] font-bold text-white">
                  {initials}
                </span>
              ) : (
                <UserRound size={19} />
              )}
            </Link>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              title="Order on WhatsApp"
              className="ml-1 hidden h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-12px_rgba(37,211,102,.9)] transition-transform hover:-translate-y-0.5 lg:grid 2xl:hidden"
            >
              <WhatsAppIcon size={19} />
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hidden h-11 items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-pink to-brand-purple px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(214,36,159,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(122,31,162,0.9)] 2xl:inline-flex"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white">
                <WhatsAppIcon size={14} className="text-[#25D366]" />
              </span>
              Order on WhatsApp
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-brand-purple sm:h-10 sm:w-10 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* ── slide-down search (below lg) ── */}
        <div
          className={`relative z-40 border-t border-pink-100 bg-white/95 backdrop-blur transition-all duration-300 lg:hidden ${
            searchOpen ? "max-h-24 overflow-visible opacity-100" : "max-h-0 overflow-hidden border-transparent opacity-0"
          }`}
        >
          <form onSubmit={submitSearch} className="container-page relative py-3">
            <div className="flex items-center gap-3 rounded-full bg-brand-soft/70 px-5 ring-1 ring-transparent transition-all focus-within:bg-white focus-within:ring-brand-pink/50">
              <Search size={18} className="shrink-0 text-brand-magenta" />
              <input
                ref={searchInput}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search exam boards, frames, gifts…"
                className="h-12 w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted/70"
              />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Clear" className="shrink-0 text-brand-muted hover:text-brand-magenta">
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="absolute left-4 right-4 top-full sm:left-6 sm:right-6">
              <div className="relative">
                <SearchPanel onPick={() => { setSearchOpen(false); setQ(""); }} />
              </div>
            </div>
          </form>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-brand-ink/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-pink-100 px-5">
          <div className="flex items-center gap-2.5">
            <img src={LOGO} alt="Priyanka's Creation" className="h-10 w-10 rounded-full ring-1 ring-brand-gold/60" />
            <span className="whitespace-nowrap bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text font-script text-[21px] leading-[1.5] text-transparent">
              Priyanka&apos;s Creation
            </span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-brand-purple">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-5">
          <form onSubmit={submitSearch} className="relative">
            <div className="flex items-center gap-2.5 rounded-full bg-brand-soft/70 px-4">
              <Search size={17} className="shrink-0 text-brand-magenta" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="h-11 w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted/70"
              />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Clear" className="shrink-0 text-brand-muted">
                  <X size={15} />
                </button>
              )}
            </div>

            {q.trim() && (
              <div className="mt-2 overflow-hidden rounded-2xl border border-pink-100">
                {results.length ? (
                  <ResultList onPick={() => { setOpen(false); setQ(""); }} />
                ) : (
                  <p className="px-4 py-5 text-center text-xs text-brand-muted">No products matched “{q.trim()}”.</p>
                )}
              </div>
            )}
          </form>

          {isAuthed && (
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-purple p-3.5 text-white"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-sm font-bold">{initials}</span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{user.name}</span>
                <span className="block text-[11px] text-white/80">View my account</span>
              </span>
            </Link>
          )}

          <div className="mt-4">
            <NavLink to="/" className={({ isActive }) => `block border-b border-pink-50 py-3.5 text-lg ${isActive ? "font-semibold text-brand-magenta" : "text-brand-ink"}`}>
              Home
            </NavLink>

            {/* Products row: tapping the label opens the page, the chevron opens the list */}
            <div className="flex items-center justify-between border-b border-pink-50">
              <NavLink
                to="/products"
                onClick={() => setOpen(false)}
                className={({ isActive }) => `flex-1 py-3.5 text-lg ${isActive ? "font-semibold text-brand-magenta" : "text-brand-ink"}`}
              >
                Products
              </NavLink>
              <button
                onClick={() => setMobileProducts((v) => !v)}
                aria-label="Show product categories"
                aria-expanded={mobileProducts}
                className="grid h-10 w-10 place-items-center rounded-full text-brand-ink"
              >
                <ChevronDown size={18} className={`transition-transform duration-300 ${mobileProducts ? "rotate-180" : ""}`} />
              </button>
            </div>

            <div className={`grid transition-all duration-300 ${mobileProducts ? "grid-rows-[1fr] pb-3 pt-2" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                {groups.map(([category, items]) => (
                  <div key={category} className="mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">{category}</p>
                    <ul className="mt-1.5 grid">
                      {items.map((p) => (
                        <li key={p.id}>
                          <Link to={`/product/${p.id}`} onClick={() => setOpen(false)} className="flex items-center gap-2.5 py-2 text-[15px] text-brand-ink">
                            <span className="h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-gradient-to-br from-brand-pink to-brand-purple opacity-70" />
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link to="/products" onClick={() => setOpen(false)} className="block rounded-full bg-brand-soft py-2.5 text-center text-xs font-semibold text-brand-magenta">
                  View all products →
                </Link>
              </div>
            </div>

            {nav.slice(2).map(([label, path]) => (
              <NavLink key={path} to={path} className={({ isActive }) => `block border-b border-pink-50 py-3.5 text-lg ${isActive ? "font-semibold text-brand-magenta" : "text-brand-ink"}`}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link to="/wishlist" onClick={() => setOpen(false)} className="flex h-11 items-center justify-center gap-2 rounded-full bg-brand-soft text-sm font-medium text-brand-purple">
              <Heart size={16} className={wishlistCount > 0 ? "fill-brand-magenta text-brand-magenta" : ""} />
              Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="flex h-11 items-center justify-center gap-2 rounded-full bg-brand-soft text-sm font-medium text-brand-purple">
              <ShoppingBag size={16} /> Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </Link>
            {!isAuthed && (
              <Link to="/login" onClick={() => setOpen(false)} className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-full bg-brand-soft text-sm font-medium text-brand-purple">
                <UserRound size={16} /> Login / Sign Up
              </Link>
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-brand-blush p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold">Talk to us</p>
            <a href={`tel:+91${PHONE}`} className="mt-3 flex items-center gap-2.5 text-sm text-brand-ink">
              <Phone size={15} className="text-brand-magenta" /> +91 {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-2.5 flex items-center gap-2.5 break-all text-sm text-brand-ink">
              <Mail size={15} className="text-brand-magenta" /> {EMAIL}
            </a>
            <p className="mt-2.5 flex items-center gap-2.5 text-sm text-brand-ink">
              <Clock size={15} className="text-brand-magenta" /> Mon – Sun, {HOURS}
            </p>
          </div>
        </nav>

        <div className="shrink-0 border-t border-pink-100 p-5">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple font-semibold text-white shadow-[0_10px_24px_-10px_rgba(214,36,159,0.9)]">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white">
              <WhatsAppIcon size={16} className="text-[#25D366]" />
            </span>
            Order on WhatsApp
          </a>
        </div>
      </aside>

      {/* ── Floating WhatsApp button (mobile) ─────────── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,.75)] transition-transform hover:scale-105 md:hidden"
      >
        <WhatsAppIcon size={26} />
      </a>
    </>
  );
}