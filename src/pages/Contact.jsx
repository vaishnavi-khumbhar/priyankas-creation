import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919130059818";
const EMAIL = "priyankas.creation230626@gmail.com";
const INSTAGRAM_HANDLE = "priyankascreationn";

const SOCIALS = [
  {
    icon: Instagram,
    label: "Instagram",
    href: `https://instagram.com/${INSTAGRAM_HANDLE}`,
    bg: "bg-gradient-to-br from-pink-500 to-purple-600",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    bg: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${EMAIL}`,
    bg: "bg-gradient-to-br from-sky-500 to-blue-600",
  },
];

const CONTACT_ROWS = [
  { icon: MapPin, label: "Location", value: "Pune, Maharashtra", href: null },
  { icon: Phone, label: "Phone / WhatsApp", value: "+91 91300 59818", href: "tel:+919130059818" },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Clock, label: "Business Hours", value: "10 AM – 6 PM, daily", href: null },
];

/* one shared input style — bigger tap targets on mobile */
const inputCls =
  "w-full rounded-2xl border border-black/10 p-3.5 text-[15px] text-brand-ink outline-none transition-all placeholder:text-brand-muted/70 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 sm:text-base";

export default function Contact() {
  const reduce = useReducedMotion();

  const [form, setForm] = useState({
    parentName: "",
    contactNumber: "",
    childName: "",
    theme: "",
    quantity: "",
    deliveryLocation: "",
    instructions: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      "Hi! I'd like to enquire about a custom exam board.",
      "",
      `Parent's Name: ${form.parentName || "-"}`,
      `Contact Number: ${form.contactNumber || "-"}`,
      `Child's Name: ${form.childName || "-"}`,
      `Preferred Theme / Colour: ${form.theme || "-"}`,
      `Quantity Required: ${form.quantity || "-"}`,
      `Delivery Location: ${form.deliveryLocation || "-"}`,
      `Additional Instructions: ${form.instructions || "-"}`,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank", "noopener");
  };

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reduce ? 0 : 0.6 },
  };

  return (
    <main className="bg-brand-cream">
      {/* ================= HERO ================= */}
      <section className="px-1 pb-9 pt-10 text-center sm:pb-14 sm:pt-16 lg:pt-20">
        <div className="container-page mx-auto max-w-2xl">
          {/* script: needs room for loops + descenders */}
          <p className="pb-1 font-script text-[36px] leading-[1.35] text-brand-pink sm:text-6xl">
            Let&apos;s create
          </p>

          <h1 className="mt-1 font-display text-[26px] font-bold leading-[1.25] text-brand-ink sm:mt-2 sm:text-5xl sm:leading-tight">
            Let&apos;s Create a Special Exam Board for Your Child
          </h1>

          <p
  className="mx-auto mt-4 max-w-xl text-base leading-7 text-brand-muted font-medium sm:mt-5 sm:text-lg sm:leading-8"
  style={{ fontFamily: "'Poppins', sans-serif" }}
>
  Have a theme or customization idea in mind? Share your requirements with us,
  and we&apos;ll help you create a personalized exam board your child will love.
</p>
        </div>
      </section>

      {/* ================= INFO + FORM ================= */}
      {/* pb-28 on mobile keeps the last field clear of the floating WhatsApp button */}
      <section className="pb-28 sm:pb-20">
        {/* form first on mobile — that's the action; details follow */}
        <div className="container-page grid items-start gap-5 sm:gap-8 lg:grid-cols-2">
          {/* ── FORM (first on mobile, right on desktop) ── */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="order-1 rounded-[24px] bg-white p-5 shadow-lg ring-1 ring-black/5 sm:rounded-[30px] sm:p-8 lg:order-2"
          >
            <p className="pb-0.5 font-script text-[26px] leading-[1.4] text-brand-pink sm:text-3xl">
              Send Your Requirements
            </p>

            <h2 className="mb-5 font-display text-[20px] font-bold text-brand-ink sm:mb-6 sm:text-2xl">
              Tell Us What You Have In Mind
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-3.5 sm:gap-4">
              <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                <input
                  required
                  value={form.parentName}
                  onChange={update("parentName")}
                  className={inputCls}
                  placeholder="Parent's Name *"
                />
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  value={form.contactNumber}
                  onChange={update("contactNumber")}
                  className={inputCls}
                  placeholder="Contact Number *"
                />
              </div>

              <input
                required
                value={form.childName}
                onChange={update("childName")}
                className={inputCls}
                placeholder="Child's Name *"
              />

              <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                <input
                  value={form.theme}
                  onChange={update("theme")}
                  className={inputCls}
                  placeholder="Preferred Theme / Colour"
                />
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={form.quantity}
                  onChange={update("quantity")}
                  className={inputCls}
                  placeholder="Quantity Required"
                />
              </div>

              <input
                value={form.deliveryLocation}
                onChange={update("deliveryLocation")}
                className={inputCls}
                placeholder="Delivery Location"
              />

              <textarea
                value={form.instructions}
                onChange={update("instructions")}
                rows={4}
                className={`${inputCls} min-h-28 resize-y`}
                placeholder="Any additional customization instructions"
              />

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-[15px] font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:h-14 sm:text-base"
              >
                <Send size={17} />
                Send Enquiry
              </button>

              <p className="text-center text-[12px] leading-5 text-brand-muted sm:text-[13px]">
                Your details open directly in WhatsApp — we reply between 10 AM and 6 PM.
              </p>
            </form>
          </motion.div>

          {/* ── CONTACT INFO + MAP ── */}
          <motion.div {...fadeUp} className="order-2 space-y-5 sm:space-y-6 lg:order-1">
            <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-black/5 sm:rounded-[28px] sm:p-8">
              <p className="pb-0.5 font-script text-[26px] leading-[1.4] text-brand-pink sm:text-3xl">
                Contact Information
              </p>

              <h2 className="mb-5 font-display text-[20px] font-bold text-brand-ink sm:text-2xl">
                Priyanka&apos;s Creation
              </h2>

              <div className="space-y-4">
                {CONTACT_ROWS.map(({ icon: Icon, label, value, href }) => {
                  const Row = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                        <Icon size={18} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-wide text-brand-muted sm:text-[12px]">
                          {label}
                        </span>
                        <span className="mt-0.5 block break-words text-[15px] font-semibold leading-[1.5] text-brand-ink sm:text-base">
                          {value}
                        </span>
                      </span>
                    </>
                  );

                  return href ? (
                    <a key={label} href={href} className="flex items-start gap-3 transition-colors hover:text-brand-magenta">
                      {Row}
                    </a>
                  ) : (
                    <div key={label} className="flex items-start gap-3">{Row}</div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-center gap-3 border-t border-brand-gold/20 pt-6 sm:justify-start">
                {SOCIALS.map(({ icon: Icon, label, href, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-all hover:scale-110 hover:shadow-md ${bg}`}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="h-56 overflow-hidden rounded-[24px] shadow-sm ring-1 ring-black/5 sm:h-64 sm:rounded-[28px]">
              <iframe
                title="Priyanka's Creation location — Pune, Maharashtra"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15106.201834452599!2d76.769837!3d18.818177!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e0!3m2!1sen!2sin!4v1787031346465!5m2!1sen!2sin"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}