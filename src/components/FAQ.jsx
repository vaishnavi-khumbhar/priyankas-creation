import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeartHandshake, Plus } from "lucide-react";

const FAQS = [
  {
    icon: HeartHandshake,
    q: "Can I personalize the exam board with my child's name and photo?",
    a: "Yes, you can customize it with your child's name, photograph, favourite colour and preferred cartoon theme.",
  },
  {
    icon: HeartHandshake,
    q: "Are the exam boards waterproof?",
    a: "Yes, our customized exam boards are 100% waterproof, durable and designed for long-lasting use.",
  },
  {
    icon: HeartHandshake,
    q: "How do I place an order?",
    a: "Select a theme and share your child's name, a clear photograph and your customization preferences with us.",
  },
  {
    icon: HeartHandshake,
    q: "Can I choose a cartoon theme?",
    a: "Yes, colourful cartoon themes are available. Contact us to explore the current design options.",
  },
  {
    icon: HeartHandshake,
    q: "Do you accept bulk orders?",
    a: "Yes, you can contact us for return gifts or other bulk requirements. Share the quantity and customization details to enquire.",
  },
];

const FaqItem = ({ item, isOpen, onToggle, reduce, index }) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.06 }}
      className={`rounded-3xl bg-white ring-1 transition-colors overflow-hidden ${
        isOpen ? "ring-brand-magenta/40 shadow-md" : "ring-black/5 shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 text-left px-5 sm:px-6 py-5"
      >
        <span
          className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-pink-500 to-purple-600 shadow-sm transition-transform ${
            isOpen ? "scale-110" : ""
          }`}
        >
          <Icon size={18} />
        </span>

        <span className="flex-1 font-display font-semibold text-brand-ink text-base sm:text-lg leading-snug">
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isOpen ? "bg-brand-gold/20 text-brand-magenta" : "bg-brand-cream text-brand-muted"
          }`}
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="text-brand-muted leading-7 px-5 sm:px-6 pb-6 pl-[4.25rem] sm:pl-[4.75rem]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0); // first question open by default

  return (
    <section className="py-15 lg:py-15 bg-brand-cream">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="font-script text-4xl sm:text-5xl text-brand-pink">Got questions?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink mt-2">
            Frequently Asked Questions
          </h2>
          <p
            className="text-brand-muted mt-3 leading-7"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Everything parents usually ask before ordering a personalised board.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              reduce={reduce}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center mt-10"
        >
          <p className="text-brand-muted" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Still curious about something?{" "}
            <Link to="/contact" className="font-semibold text-brand-magenta hover:underline">
              Get in touch
            </Link>{" "}
            and we'll help you plan the perfect board.
          </p>
        </motion.div>
      </div>
    </section>
  );
}