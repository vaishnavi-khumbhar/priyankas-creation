import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ── settings ── */
const WA_NUMBER = "919130059818";
const GREETING = "Hello, I am Interested in this Product. Please help\nThank You";
const BUSINESS = "Priyanka's Creation";
/* pages where the widget would sit on top of a form or a pay button */
const HIDE_ON = ["/cart", "/checkout", "/contact", "/login"];
/* ────────────── */

const WhatsAppIcon = ({ size = 26, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.944c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.454h.005c6.585 0 11.945-5.36 11.948-11.945a11.9 11.9 0 0 0-3.477-8.408" />
  </svg>
);

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const hidden = HIDE_ON.some((r) => pathname.startsWith(r));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (hidden) return null;

  const chatLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(GREETING)}`;

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* ── chat card ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[280px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,.3)] sm:w-[330px]"
          >
            {/* header */}
            <div className="flex items-center gap-3 bg-[#25D366] px-4 py-4 text-white sm:px-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                <WhatsAppIcon size={24} />
              </span>
              <span className="min-w-0">
                <span className="block text-[17px] font-bold leading-tight sm:text-[19px]">
                  Order Now On WhatsApp
                </span>
                <span className="block text-[12px] text-white/85 sm:text-[13px]">Available Online</span>
              </span>
            </div>

            {/* contact row */}
            <a
              href={chatLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="m-3 flex items-center gap-3 rounded-xl border-l-4 border-[#25D366] bg-[#F7F7F7] px-3 py-3 transition-colors hover:bg-[#EFEFEF] sm:m-4 sm:px-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white sm:h-12 sm:w-12">
                <WhatsAppIcon size={24} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-tight text-brand-ink sm:text-base">
                  Hello
                </span>
                <span className="block text-[12px] text-brand-muted sm:text-[13px]">
                  Order on WhatsApp
                </span>
              </span>

              <WhatsAppIcon size={22} className="shrink-0 text-[#25D366]" />
            </a>

            <p className="px-4 pb-3 text-center text-[11px] text-brand-muted sm:px-5">
              {BUSINESS} · replies 10 AM – 6 PM
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── trigger ── */}
      <div className="flex items-center gap-2">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(true)}
              className="hidden h-11 items-center rounded-lg bg-[#25D366] px-5 text-[15px] font-semibold text-white shadow-lg transition-colors hover:bg-[#1FBB59] sm:inline-flex"
            >
              Chat With Us
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
          aria-expanded={open}
          className={`grid h-14 w-14 place-items-center rounded-full shadow-[0_10px_28px_-8px_rgba(37,211,102,.8)] transition-all duration-300 hover:scale-105 ${
            open
              ? "border-2 border-[#25D366] bg-white text-[#25D366]"
              : "bg-[#25D366] text-white ring-4 ring-[#25D366]/25"
          }`}
        >
          {open ? <X size={24} /> : <WhatsAppIcon size={27} />}
        </button>
      </div>
    </div>
  );
}