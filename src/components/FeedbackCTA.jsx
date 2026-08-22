import { motion } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const WA_NUMBER = "919130059818";

const feedbackLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi Priyanka's Creation! ❤️ I would like to share my feedback/review."
)}`;

export default function FeedbackCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-10 lg:py-12">

      {/* ================= SOFT BACKGROUND GLOW ================= */}
      <div
        className="
          pointer-events-none
          absolute
          -top-24
          left-1/2
          h-[300px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-brand-soft
          opacity-70
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/2
          h-[250px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-pink-100/40
          blur-[100px]
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="container-page relative"
      >

        {/* ================= CTA CARD ================= */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[24px]
            border-2
            border-[#8F245F]
            bg-gradient-to-br
            from-white
            via-[#FFF9FC]
            to-brand-soft/60
            px-6
            py-10
            text-center
            shadow-[0_10px_30px_-15px_rgba(122,31,162,.25)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-brand-pink
            hover:shadow-[0_20px_45px_-20px_rgba(143,36,95,.40)]
            sm:rounded-[28px]
            sm:px-12
            sm:py-12
          "
        >

          {/* ================= DECORATIVE GLOW ================= */}
          <span
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-brand-pink/10
              blur-3xl
              transition-all
              duration-500
              group-hover:bg-brand-pink/20
            "
          />

          <span
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-20
              h-48
              w-48
              rounded-full
              bg-brand-purple/10
              blur-3xl
            "
          />

          {/* Sparkles */}
          <Sparkles
            className="
              absolute
              left-6
              top-6
              h-7
              w-7
              text-brand-pink/25
              sm:left-10
              sm:top-8
            "
          />

          <Heart
            className="
              absolute
              bottom-6
              right-6
              h-8
              w-8
              text-brand-purple/20
              sm:bottom-8
              sm:right-10
            "
          />

          {/* ================= HEART ICON ================= */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              relative
              mx-auto
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-brand-pink
              via-brand-magenta
              to-brand-purple
              text-white
              shadow-[0_12px_25px_-10px_rgba(214,36,159,.8)]
              sm:h-16
              sm:w-16
            "
          >
            <Heart
              size={28}
              fill="currentColor"
              strokeWidth={1.8}
            />
          </motion.div>

          {/* ================= SCRIPT HEADING ================= */}
          <p
            className="
              font-script
              text-2xl
              text-brand-pink
              sm:text-3xl
            "
          >
            Your love means everything
          </p>

          {/* ================= MAIN HEADING ================= */}
          <h2
            className="
              mt-1
              font-display
              text-2xl
              font-bold
              text-brand-ink
              sm:text-4xl
            "
          >
            Share Your Experience 💕
          </h2>

          {/* ================= DESCRIPTION ================= */}
          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              px-2
              text-sm
              leading-6
              font-medium
              text-brand-muted
              sm:text-base
              sm:leading-7
            "
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Loved your order? Tell us about your experience.
            Your feedback helps us create even more beautiful memories.
          </p>

          {/* ================= WHATSAPP BUTTON ================= */}
          <motion.a
            href={feedbackLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              relative
              mt-7
              inline-flex
              items-center
              justify-center
              gap-2.5
              rounded-full
              bg-gradient-to-r
              from-brand-pink
              via-brand-magenta
              to-brand-purple
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-[0_12px_25px_-10px_rgba(214,36,159,.7)]
              transition-all
              duration-300
              hover:shadow-[0_18px_35px_-12px_rgba(214,36,159,.8)]
              sm:px-7
              sm:py-4
              sm:text-base
            "
          >

            Give Your Feedback

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>

          {/* ================= BOTTOM LINE ================= */}
          <span
            className="
              absolute
              bottom-0
              left-0
              h-[3px]
              w-0
              bg-gradient-to-r
              from-brand-pink
              via-brand-magenta
              to-brand-purple
              transition-all
              duration-500
              group-hover:w-full
            "
          />

        </div>
      </motion.div>
    </section>
  );
}