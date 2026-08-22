import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Heart } from "lucide-react";

import review1 from "../assets/reviews/review-1.jpg";
import review2 from "../assets/reviews/review-2.jpg";
import review3 from "../assets/reviews/review-3.jpg";
import review4 from "../assets/reviews/review-4.jpg";
import review5 from "../assets/reviews/review-5.jpg";
import review6 from "../assets/reviews/review-6.jpg";

const whatsappReviews = [
  review1,
  review2,
  review3,
  review4,
  review5,
  review6,
];

export default function WhatsAppReviews() {
  const reduce = useReducedMotion();

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

      <div className="container-page relative">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >

          {/* Small Label */}
          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-brand-soft
              px-3.5
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-brand-gold
              ring-1
              ring-brand-gold/40
              sm:text-[11px]
            "
          >
            Real WhatsApp Feedback
          </span>

          {/* Script Heading */}
          <p
            className="
              mt-3
              font-script
              text-2xl
              text-brand-pink
              sm:mt-4
              sm:text-3xl
            "
          >
            What our customers say
          </p>

          {/* Main Heading */}
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
            Straight From Our Customers
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              px-2
              text-sm
              leading-6
              text-brand-muted
              font-medium
              sm:text-base
              sm:leading-7
            "
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Real messages from customers who trusted Priyanka's Creation
            for their special moments.
          </p>

        </motion.div>

        {/* ================= REVIEW GRID ================= */}
        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-4
            sm:mt-11
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            xl:grid-cols-3
          "
        >
          {whatsappReviews.map((image, index) => (
            <motion.div
              key={image}
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : index * 0.09,
                ease: "easeOut",
              }}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -8,
                    }
              }
              className="
                group
                relative
                overflow-hidden
                rounded-[20px]
                border-2
                border-[#8F245F]
                bg-gradient-to-br
                from-white
                via-[#FFF9FC]
                to-brand-soft/50
                shadow-[0_5px_18px_-8px_rgba(122,31,162,.20)]
                transition-all
                duration-300
                hover:border-brand-pink
                hover:shadow-[0_20px_40px_-20px_rgba(143,36,95,.45)]
                sm:rounded-[24px]
              "
            >

              {/* Pink Corner Glow */}
              <span
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-28
                  w-28
                  rounded-full
                  bg-brand-pink/10
                  opacity-40
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:opacity-80
                "
              />

              {/* Hover Sheen */}
              <span
                className="
                  pointer-events-none
                  absolute
                  -inset-x-10
                  -top-24
                  h-40
                  rotate-12
                  bg-gradient-to-r
                  from-transparent
                  via-white/70
                  to-transparent
                  opacity-0
                  translate-x-[-60%]
                  transition-all
                  duration-700
                  group-hover:translate-x-[60%]
                  group-hover:opacity-100
                "
              />

              {/* Review Image */}
              <div className="relative overflow-hidden bg-white">

                <img
                  src={image}
                  alt={`Customer WhatsApp Review ${index + 1}`}
                  className="
                    block
                    w-full
                    h-auto
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />

                {/* Hover Overlay */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-brand-purple/10
                    via-transparent
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

              </div>

              {/* Bottom Pink Line */}
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

            </motion.div>
          ))}
        </div>

        {/* ================= TRUST ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-8 sm:mt-10"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-brand-pink/20
              bg-brand-soft
              px-4
              py-2.5
              text-xs
              font-medium
              text-brand-purple
              shadow-sm
              sm:px-5
              sm:py-3
              sm:text-sm
            "
          >
            <ShieldCheck size={17} />
            Genuine customer feedback
            <Heart
              size={15}
              fill="currentColor"
              className="text-brand-pink"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}