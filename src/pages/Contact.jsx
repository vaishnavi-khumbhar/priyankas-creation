import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Send,
} from "lucide-react";
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
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 91300 59818",
  },
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "10 AM – 6 PM, daily",
  },
];

// Same hand-drawn swoosh motif used on the About page
const SectionAccent = ({ reduce, className = "" }) => (
  <motion.svg
    viewBox="0 0 90 20"
    className={`w-16 h-4 text-brand-magenta ${className}`}
    fill="none"
  >
    <motion.path
      d="M2 14C14 4 24 4 34 10C44 16 54 16 62 9C70 2 78 4 88 11"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{
        duration: reduce ? 0 : 0.9,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

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

  const update = (key) => (e) => {
    setForm((f) => ({
      ...f,
      [key]: e.target.value,
    }));
  };

  // Build WhatsApp enquiry
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

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`,
      "_blank"
    );
  };

  const fadeUp = {
    initial: {
      opacity: 0,
      y: 22,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.3,
    },
    transition: {
      duration: 0.6,
    },
  };

  return (
    <main className="bg-brand-cream">

      {/* ================= HERO ================= */}
      <section className="pt-20 pb-14 text-center">
        <div className="container-page max-w-2xl mx-auto">

          <p className="font-script text-5xl sm:text-6xl text-brand-pink">
            Let&apos;s create
          </p>

          <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2 text-brand-ink leading-tight">
            Let&apos;s Create a Special Exam Board for Your Child
          </h1>

          <p
            className="text-brand-muted mt-5 leading-7"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Have a theme or customization idea in mind? Share your requirements
            with us, and we&apos;ll help you create a personalized exam board
            your child will love.
          </p>

        </div>
      </section>

      {/* ================= INFO + FORM ================= */}
      <section className="pb-20">
        <div className="container-page grid lg:grid-cols-2 gap-8 items-start">

          {/* ================= LEFT ================= */}
          <motion.div
            {...fadeUp}
            className="space-y-6"
          >

            {/* CONTACT INFORMATION */}
            <div className="bg-white rounded-[28px] ring-1 ring-black/5 shadow-sm p-6 sm:p-8">

              <p className="font-script text-2xl text-brand-pink mb-1">
                Contact Information
              </p>

              <h2 className="font-display text-xl font-bold text-brand-ink mb-5">
                Priyanka&apos;s Creation
              </h2>

              <div className="space-y-4">
                {CONTACT_ROWS.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-pink-500 to-purple-600">
                      <Icon size={16} />
                    </span>

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-brand-muted">
                        {label}
                      </p>

                      <p className="font-semibold text-brand-ink text-sm">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-brand-gold/20">
                {SOCIALS.map(({ icon: Icon, label, href, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`
                      w-11
                      h-11
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white
                      shadow-sm
                      hover:scale-110
                      hover:shadow-md
                      transition-all
                      ${bg}
                    `}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

            </div>

            {/* ================= MAP ================= */}
            <div className="rounded-[28px] overflow-hidden ring-1 ring-black/5 shadow-sm h-64">
              <iframe
                title="Priyanka's Creation location — Pune, Maharashtra"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15106.201834452599!2d76.769837!3d18.818177!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e0!3m2!1sen!2sin!4v1787031346465!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </motion.div>

          {/* ================= RIGHT FORM ================= */}
          <motion.div
            {...fadeUp}
            transition={{
              ...fadeUp.transition,
              delay: 0.1,
            }}
            className="bg-white rounded-[30px] ring-1 ring-black/5 shadow-lg p-6 sm:p-8"
          >

            <p className="font-script text-2xl text-brand-pink mb-1">
              Send Your Requirements
            </p>

            <h2 className="font-display text-xl font-bold text-brand-ink mb-6">
              Tell Us What You Have In Mind
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid gap-4"
            >

              {/* PARENT + CONTACT */}
              <div className="grid sm:grid-cols-2 gap-4">

                <input
                  required
                  value={form.parentName}
                  onChange={update("parentName")}
                  className="p-3.5 rounded-2xl border border-black/10 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 outline-none text-sm"
                  placeholder="Parent's Name"
                />

                <input
                  required
                  type="tel"
                  value={form.contactNumber}
                  onChange={update("contactNumber")}
                  className="p-3.5 rounded-2xl border border-black/10 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 outline-none text-sm"
                  placeholder="Contact Number"
                />

              </div>

              {/* CHILD NAME */}
              <input
                required
                value={form.childName}
                onChange={update("childName")}
                className="p-3.5 rounded-2xl border border-black/10 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 outline-none text-sm"
                placeholder="Child's Name"
              />

              {/* THEME + QUANTITY */}
              <div className="grid sm:grid-cols-2 gap-4">

                <input
                  value={form.theme}
                  onChange={update("theme")}
                  className="p-3.5 rounded-2xl border border-black/10 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 outline-none text-sm"
                  placeholder="Preferred Theme / Colour"
                />

                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={update("quantity")}
                  className="p-3.5 rounded-2xl border border-black/10 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 outline-none text-sm"
                  placeholder="Quantity Required"
                />

              </div>

              {/* DELIVERY LOCATION */}
              <input
                value={form.deliveryLocation}
                onChange={update("deliveryLocation")}
                className="p-3.5 rounded-2xl border border-black/10 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 outline-none text-sm"
                placeholder="Delivery Location"
              />

              {/* INSTRUCTIONS */}
              <textarea
                value={form.instructions}
                onChange={update("instructions")}
                className="p-3.5 rounded-2xl border border-black/10 focus:border-brand-magenta focus:ring-4 focus:ring-brand-magenta/10 outline-none text-sm min-h-28"
                placeholder="Any additional customization instructions"
              />

              {/* SUBMIT */}
              <button
                type="submit"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  p-3.5
                  rounded-full
                  bg-gradient-to-r
                  from-pink-500
                  to-purple-600
                  text-white
                  font-semibold
                  shadow-md
                  hover:shadow-lg
                  transition-all
                "
              >
                <Send size={17} />
                Send Enquiry
              </button>

              {/* NOTE */}
              <p className="text-xs text-brand-muted text-center -mt-1 leading-5">
                This opens WhatsApp with your details filled in — please attach
                your child&apos;s photograph directly in the chat, since it
                can&apos;t travel through this form.
              </p>

            </form>
          </motion.div>

        </div>
      </section>
    </main>
  );
}