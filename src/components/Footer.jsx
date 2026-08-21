import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, Clock, MapPin, Heart } from "lucide-react";
import logo from "../assets/logo.jpg";
import { products } from "../data/products";
import { CATEGORY_ORDER, slugify } from "../data/categories";

/* ── edit these ── */
const AGENCY_NAME = "Advertising Branding & Marketing";
const AGENCY_URL = "https://www.advertisingandbrandingmarketing.com/";
const INSTAGRAM = "https://instagram.com/priyankascreationn";
const FACEBOOK = "https://facebook.com/";   // ← real page, or delete this entry in `socials`

const PHONE = "9130059818";
const WA = "919130059818";
const EMAIL = "priyankas.creation230626@gmail.com";
const HOURS = "10 AM – 6 PM";
const WA_LINK = `https://wa.me/${WA}?text=${encodeURIComponent(
  "Hi Priyanka's Creation! I want to order a customized product."
)}`;

const nav = [
  ["Home", "/"],
  ["Products", "/products"],
  ["About Us", "/about"],
  ["Contact", "/contact"],
  ["Cart", "/cart"],
];

const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

const socials = [
  { href: INSTAGRAM, label: "Instagram", Icon: Instagram },
  { href: WA_LINK, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: FACEBOOK, label: "Facebook", Icon: Facebook },
  { href: `mailto:${EMAIL}`, label: "Email", Icon: Mail },
];

/* only categories that actually have products, in your defined order */
const footerCategories = CATEGORY_ORDER.filter((c) =>
  products.some((p) => p.category === c)
);

/* script headings need room — never leading-none with font-script */
const heading =
  "bg-gradient-to-r from-brand-pink via-brand-magenta to-brand-purple bg-clip-text pb-1 font-script text-[30px] leading-[1.45] text-transparent sm:text-[34px]";

const colLink =
  "group inline-flex items-start gap-1.5 text-brand-muted transition-colors hover:text-brand-magenta";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF5] via-[#FFFBEF] to-[#FFF7E6] text-brand-ink">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-brand-pink/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-[320px] w-[320px] rounded-full bg-brand-gold/15 blur-[100px]" />

      <div className="container-page relative pt-12 lg:pt-16">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:text-left">
          {/* ── brand ── */}
          <div className="flex flex-col items-center sm:col-span-2 lg:col-span-4 lg:items-start">
            <Link to="/" className="flex flex-col items-center gap-3 sm:flex-row lg:items-center">
              <img
                src={logo}
                alt="Priyanka's Creation"
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-brand-gold/60"
              />
              <span className="block">
                <span className="block bg-gradient-to-r from-brand-pink via-brand-magenta to-brand-purple bg-clip-text pb-0.5 font-script text-[32px] leading-[1.45] text-transparent sm:text-[36px]">
                  Priyanka&apos;s Creation
                </span>
                <span className="block text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.3em] text-brand-gold sm:text-[11px]">
                  Custom Designs &amp; Gifts
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-base font-medium leading-7 text-brand-muted">
              Beautiful personalized products created with care for little learners, families and every special
              occasion. Waterproof, long lasting and made to order in Pune.
            </p>

            <div className="mt-5 flex justify-center gap-2.5 lg:justify-start">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand-ink shadow-sm ring-1 ring-brand-gold/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-brand-pink hover:to-brand-purple hover:text-white hover:ring-transparent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* ── quick links ── */}
          <div className="lg:col-span-2">
            <h3 className={heading}>Quick Links</h3>
            <ul className="mt-4 grid gap-3.5 text-[17px] sm:text-[18px]">
              {nav.map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className={colLink}>
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-pink opacity-0 transition-opacity group-hover:opacity-100" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── categories (was individual products) ── */}
          <div className="lg:col-span-3">
            <h3 className={heading}>Our Products</h3>
            <ul className="mt-4 grid gap-3.5 text-[17px] sm:text-[18px]">
              {footerCategories.map((c) => (
                <li key={c}>
                  <Link to={`/products?category=${slugify(c)}`} className={colLink}>
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-pink opacity-0 transition-opacity group-hover:opacity-100" />
                    {c}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className={`${colLink} font-semibold text-brand-magenta`}>
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-pink opacity-0 transition-opacity group-hover:opacity-100" />
                  View all products
                </Link>
              </li>
            </ul>
          </div>

          {/* ── contact ── */}
          <div className="flex flex-col items-center lg:col-span-3 lg:items-start">
            <h3 className={heading}>Get In Touch</h3>
            <ul className="mt-4 grid gap-4 text-[17px] sm:text-[18px]">
              <li>
                <a href={`tel:+91${PHONE}`} className="flex items-start justify-center gap-3 text-brand-muted transition-colors hover:text-brand-magenta lg:justify-start">
                  <Phone size={18} className="mt-1 shrink-0 text-brand-pink" /> +91 {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-start justify-center gap-3 break-all text-[15px] text-brand-muted transition-colors hover:text-brand-magenta sm:text-[16px] lg:justify-start">
                  <Mail size={18} className="mt-1 shrink-0 text-brand-pink" /> {EMAIL}
                </a>
              </li>
              <li className="flex items-start justify-center gap-3 text-brand-muted lg:justify-start">
                <Clock size={18} className="mt-1 shrink-0 text-brand-pink" /> Mon – Sun, {HOURS}
              </li>
              <li className="flex items-start justify-center gap-3 text-brand-muted lg:justify-start">
                <MapPin size={18} className="mt-1 shrink-0 text-brand-pink" /> Pune, Maharashtra
              </li>
            </ul>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 text-[16px] font-semibold text-white shadow-[0_12px_26px_-14px_rgba(37,211,102,.9)] transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon size={18} /> Order on WhatsApp
            </a>
          </div>
        </div>

        {/* ── bottom bar ── */}
        <div className="mt-12 border-t border-brand-gold/25 py-6">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[15px] font-medium leading-6 text-brand-muted">
              © {new Date().getFullYear()} Priyanka&apos;s Creation. All rights reserved.
            </p>

            <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-[15px] font-medium leading-6 text-brand-muted">
              Designed &amp; Developed with
              <Heart size={14} className="fill-brand-pink text-brand-pink" />
              by
              <a
                href={AGENCY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text font-semibold text-transparent transition-opacity hover:opacity-80"
              >
                {AGENCY_NAME}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}