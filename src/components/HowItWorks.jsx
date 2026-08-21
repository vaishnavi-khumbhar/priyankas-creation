import { motion, useReducedMotion } from "framer-motion";
import { Palette, Send, CheckCircle2, PackageCheck, MessageCircle, Clock } from "lucide-react";

const WA_LINK = `https://wa.me/919130059818?text=${encodeURIComponent(
  "Hi Priyanka's Creation! I want to order a customized exam board. My child's name is ___"
)}`;

const steps = [
  { Icon: Palette,      title: "Choose a theme",    text: "Pick the cartoon, colour or style your child loves." },
  { Icon: Send,         title: "Share the details", text: "Send the name, a clear photo and your preferences on WhatsApp." },
  { Icon: CheckCircle2, title: "Approve the design",text: "We show you the final design before anything is made." },
  { Icon: PackageCheck, title: "Receive the board", text: "Delivered ready to use — waterproof and built to last." },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-10 lg:py-10 bg-white overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 -left-24 w-[360px] h-[360px] rounded-full bg-brand-soft blur-[100px]" />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft ring-1 ring-brand-gold/40 px-3.5 py-1.5 text-[11px] tracking-[0.22em] uppercase text-brand-gold font-semibold">
            Simple ordering
          </span>
          <p className="font-script text-3xl text-brand-pink mt-4">Easy from start to finish</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1 text-brand-ink">Four steps to a board that’s theirs</h2>
         <p
  className="text-brand-muted text-base mt-3 leading-7 font-medium"
  style={{ fontFamily: "'Poppins', sans-serif" }}
>
  No forms, no waiting in queues. Message us, approve the design, and it’s made.
</p>
        </motion.div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-11">
          {/* connecting line on desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-brand-pink/30 via-brand-purple/30 to-brand-gold/30" />

          {steps.map(({ Icon, title, text }, k) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : k * 0.1 }}
              whileHover={reduce ? {} : { y: -6 }}
              className="group relative rounded-[26px] border border-pink-100 bg-gradient-to-br from-white to-brand-soft/60 p-6 hover:border-brand-pink/40 hover:shadow-[0_24px_45px_-26px_rgba(122,31,162,.7)] transition-all duration-300"
            >
              <span className="relative z-10 grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-purple text-white shadow-[0_10px_22px_-12px_rgba(214,36,159,.9)] group-hover:scale-105 transition-transform duration-300">
                <Icon size={23} strokeWidth={1.8} />
              </span>
              <span className="absolute top-5 right-6 font-display text-4xl font-bold text-brand-pink/20">0{k + 1}</span>
              <h3 className="font-display text-lg font-semibold mt-5 text-brand-ink">{title}</h3>
<p className="text-[16px] text-brand-muted mt-2 leading-7">
  {text}
</p>            </motion.div>
          ))}
        </div>

        <div className="mt-11 text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold shadow-[0_14px_30px_-12px_rgba(214,36,159,.9)] hover:-translate-y-0.5 transition-all">
           Start customizing on WhatsApp
          </a>
<p className="mt-3 text-sm text-brand-muted font-medium leading-6">
  We reply within business hours · 10 AM – 6 PM
</p>
        </div>
      </div>
    </section>
  );
}