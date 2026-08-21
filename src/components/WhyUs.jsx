import { motion, useReducedMotion } from "framer-motion";
import {
  Droplets,
  RectangleHorizontal,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

const points = [
  {
    Icon: RectangleHorizontal,
    title: "Personalized designs",
    text: "Name, photo and theme chosen by you.",
  },
  {
    Icon: Droplets,
    title: "Waterproof finish",
    text: "Wipes clean, survives water bottles.",
  },
  {
    Icon: ShieldCheck,
    title: "Durable everyday use",
    text: "Holds its shape through the school year.",
  },
  {
    Icon: HeartHandshake,
    title: "Attention to detail",
    text: "Every order checked before it leaves.",
  },
];

const stats = [
  ["100%", "Waterproof"],
  ["Pune", "Made locally"],
  ["India", "Delivery across India"],
];

export default function WhyUs() {
  const reduce = useReducedMotion();

  return (
    <section className="py-10 lg:py-10 bg-brand-cream">
      <div className="container-page grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-script text-4xl text-brand-pink">
            Why Priyanka&apos;s Creation?
          </p>

          <h2 className="font-display text-3xl sm:text-5xl font-bold mt-2 leading-tight text-brand-ink">
            Ordinary products don&apos;t have to feel ordinary.
          </h2>

          <p
            className="mt-5 text-brand-muted text-base sm:text-lg leading-7 sm:leading-8 font-medium"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            A child&apos;s name, photograph and favourite theme can turn a
            simple study essential into something they feel proud to carry
            every day — and something they don&apos;t lose in a classroom of
            identical boards.
          </p>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-2 gap-3 mt-8">
            {points.map(({ Icon, title, text }, k) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : k * 0.08,
                }}
                className="group rounded-2xl bg-white border border-pink-100 p-4 hover:border-brand-pink/40 transition-colors"
              >
                {/* ICON */}
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple text-white group-hover:scale-105 transition-transform">
                  <Icon size={18} strokeWidth={1.8} />
                </span>

                {/* TITLE */}
                <b className="mt-3 block text-base font-semibold text-brand-ink sm:text-lg">
                  {title}
                </b>

                {/* TEXT */}
                <p className="mt-1 text-base leading-6 text-brand-muted sm:text-base">
  {text}
</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[38px] bg-gradient-to-br from-brand-soft to-purple-100 p-8 ring-1 ring-brand-gold/30"
        >
          <div className="text-center py-6">

            {/* HEART HANDSHAKE ICON */}
            <motion.span
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="grid place-items-center w-20 h-20 mx-auto rounded-full bg-white/85 shadow-sm"
            >
              <HeartHandshake
                size={30}
                strokeWidth={1.8}
                className="text-brand-magenta"
              />
            </motion.span>

            {/* HEADING */}
            <p className="font-script text-5xl mt-5 bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
              Created with care
            </p>

            {/* DESCRIPTION */}
           <p className="text-sm sm:text-base text-brand-muted mt-2 font-medium leading-6">
  From our hands to your little one&apos;s world.
</p>
</div>

{/* STATS */}
<div className="grid grid-cols-3 gap-3 mt-4">
  {stats.map(([big, small]) => (
    <div
      key={small}
      className="rounded-2xl bg-white/80 backdrop-blur p-3 text-center"
    >
      <p className="font-display text-lg sm:text-xl font-bold text-brand-magenta">
        {big}
      </p>

      <p className="text-xs sm:text-sm text-brand-muted leading-5 mt-0.5 font-medium">
        {small}
      </p>
    </div>
  ))}
</div>
        </motion.div>

      </div>
    </section>
  );
}