import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  
  Camera,
  Palette,
  Droplets,
  HeartHandshake,
  Smile,
  ArrowRight,
} from "lucide-react";
import { RectangleHorizontal } from "lucide-react";
import FAQ from "../components/FAQ";

const DIFFERENTIATORS = [
{ icon: RectangleHorizontal, label: "Customized designs for every child" },
  { icon: Camera, label: "Name and photograph personalisation" },
  { icon: Palette, label: "Colourful cartoon themes" },
  { icon: Droplets, label: "Waterproof and durable finish" },
  { icon: HeartHandshake, label: "Careful attention to every order" },
  { icon: Smile, label: "Friendly and convenient ordering experience" },
];

// NEW: a tiny animated flourish placed above each section heading — three
// dots that pop in one after another like a hand-drawn flourish. Kept
// small and consistent everywhere it's used, so it reads as one running
// motif across the page rather than a different decoration per section.
const SectionAccent = ({ reduce }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.4 }}
    className="flex justify-center gap-1.5 mb-3"
  >
    {["bg-brand-pink", "bg-brand-gold", "bg-brand-magenta"].map((c, i) => (
      <motion.span
        key={c}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.12 }}
        className={`w-2 h-2 rounded-full ${c}`}
      />
    ))}
  </motion.div>
);

// The signature element: a small mocked-up exam board — a washi-tape strip,
// a photo circle, a name, and a cartoon-theme swatch — tilted like it was
// just placed on a desk. This is the one thing on the page that shows,
// rather than tells, what "personalised" actually means here.
const SampleBoard = ({ reduce }) => (
  <motion.div
    initial={{ opacity: 0, rotate: -8, y: 30 }}
    whileInView={{ opacity: 1, rotate: -4, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    animate={reduce ? {} : { y: [0, -8, 0] }}
    {...(!reduce && {
      transition: { y: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
    })}
    className="relative mx-auto w-64 sm:w-72"
  >
    <div className="relative rounded-[28px] bg-white shadow-[0_25px_50px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5 p-5 pt-8">
      {/* washi tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 h-6 w-24 bg-brand-gold/70 rounded-sm shadow-sm" />

      {/* photo circle */}
      <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-brand-pink/30 to-brand-gold/30 ring-4 ring-white shadow-inner flex items-center justify-center">
        <Smile size={30} className="text-brand-magenta" />
      </div>

      <p className="font-script text-3xl text-brand-magenta text-center mt-3">Aarav</p>
      <p className="text-center text-[11px] tracking-[0.2em] uppercase text-brand-muted mt-0.5">
        Exam Board
      </p>

      {/* theme swatches */}
      <div className="flex justify-center gap-2 mt-4">
        {["bg-brand-pink", "bg-brand-gold", "bg-brand-magenta"].map((c) => (
          <span key={c} className={`w-5 h-5 rounded-full ${c}/70 ring-2 ring-white shadow-sm`} />
        ))}
      </div>

      <span className="absolute -bottom-3 -right-3 rounded-full bg-brand-magenta text-white text-[10px] font-bold tracking-wide px-3 py-1.5 shadow-md rotate-6">
        100% Waterproof
      </span>
    </div>

    {/* doodle stars */}
    <svg className="absolute -top-6 -left-8 w-8 h-8 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l2.4 8.2L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-3.8z" />
    </svg>
    <svg className="absolute bottom-6 -right-9 w-5 h-5 text-brand-pink" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l2.4 8.2L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-3.8z" />
    </svg>
  </motion.div>
);

export default function About() {
  const reduce = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.6 },
  };

  return (
    <main className="bg-brand-cream">
      {/* ---------- Hero ---------- */}
      <section className="py-20 lg:py-20">
        <div className="container-page grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fadeUp} className="text-center lg:text-left">
            <SectionAccent reduce={reduce} />
            <p className="font-script text-5xl sm:text-6xl text-brand-pink">Our story</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-brand-ink leading-tight">
              Creating Useful Products with a Personal Touch
            </h1>
            <p
              className="mt-6 text-brand-muted leading-8 max-w-xl mx-auto lg:mx-0"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Priyanka's Creation is a Pune-based creative business specialising in customised
              exam boards for kids. We believe everyday learning products don't have to look
              ordinary — a child's name, photograph and favourite theme can turn a simple exam
              board into something personal, colourful and meaningful.
            </p>
          </motion.div>

          <SampleBoard reduce={reduce} />
        </div>
      </section>

      {/* ---------- Narrative ---------- */}
      <section className="pb-20">
        <div className="container-page max-w-3xl mx-auto space-y-6">
          <SectionAccent reduce={reduce} />
          <motion.p
            {...fadeUp}
            className="text-brand-muted leading-8 text-center sm:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Every board is customised according to the details shared by the parent. From
            selecting the theme to placing the name and photograph, we carefully bring each
            design together to create a product that feels special to the child.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-brand-muted leading-8 text-center sm:text-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our exam boards are not only attractive but also practical — 100% waterproof,
            durable, and made for long-lasting use.
          </motion.p>
        </div>
      </section>

      {/* ---------- Purpose callout ---------- */}
      <section className="pb-20">
        <div className="container-page">
          <motion.div
            {...fadeUp}
            className="max-w-3xl mx-auto rounded-[32px] bg-white ring-1 ring-brand-gold/30 shadow-sm px-8 py-12 text-center"
          >
            <SectionAccent reduce={reduce} />
            <p className="font-script text-3xl text-brand-pink">Our purpose</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-brand-ink mt-3 leading-snug">
              Making study essentials more engaging for children through thoughtful
              personalisation and child-friendly design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- What makes us different ---------- */}
      <section className="pb-20">
        <div className="container-page">
          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionAccent reduce={reduce} />
            <p className="font-script text-4xl text-brand-pink">What makes us different</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink mt-2">
              Built around your child, not a catalogue
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {DIFFERENTIATORS.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.07 }}
                whileHover={reduce ? {} : { y: -5 }}
                className="bg-white rounded-2xl ring-1 ring-black/5 shadow-sm p-5 flex flex-col items-center text-center gap-3"
              >
                <span className="w-12 h-12 rounded-full bg-brand-pink/15 flex items-center justify-center text-brand-magenta">
                  <Icon size={20} />
                </span>
                <p className="text-sm font-semibold text-brand-ink leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="pb-20">
        <div className="container-page">
          <motion.div
            {...fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <SectionAccent reduce={reduce} />
            <p
              className="text-brand-ink text-lg sm:text-xl leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              At Priyanka's Creation, every order is more than just a product —{" "}
              <span className="font-semibold text-brand-magenta">
                it is something created especially for your little learner.
              </span>
            </p>

            <Link
              to="/products"
              className="group inline-flex items-center gap-2 mt-8 rounded-full bg-brand-magenta text-white font-semibold px-7 py-3.5 shadow-md hover:shadow-lg transition-all"
            >
              Explore Our Customised Exam Boards
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      {/* FIX: this was floating outside the return() statement entirely
          (a bare <FAQ / > after the component's closing brace), which
          isn't valid anywhere in a JS file and would fail to build. Also
          fixed the "/ >" typo — self-closing tags need "/>" together. */}
      <FAQ />
    </main>
  );
}