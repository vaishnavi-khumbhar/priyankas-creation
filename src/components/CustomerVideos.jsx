import { motion, useReducedMotion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

import video1 from "../assets/1.mp4";
import video2 from "../assets/2.mp4";
import video3 from "../assets/3.mp4";

const videos = [
  {
    id: 1,
    title: "Our Happy Customer ❤️",
    video: video1,
  },
  {
    id: 2,
    title: "Loved the Creation ✨",
    video: video2,
  },
  {
    id: 3,
    title: "Made With Love 💕",
    video: video3,
  },
];

export default function CustomerVideos() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-8 lg:py-10">
 
      {/* ================= SOFT BACKGROUND ================= */}
      <div
        className="
          pointer-events-none
          absolute
          -top-24
          left-1/2
          h-[280px]
          w-[650px]
          -translate-x-1/2
          rounded-full
          bg-brand-soft/70
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/2
          h-[260px]
          w-[520px]
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
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Label */}
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-brand-soft
              px-3.5
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-brand-gold
              ring-1
              ring-brand-gold/40
              sm:text-[11px]
            "
          >
            Real Customer Moments
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
            Loved by our customers
          </p>

          {/* Main Heading */}
          <h2
            className="
              mt-1
              font-display
              text-2xl
              font-bold
              text-brand-ink
              sm:text-3xl
              lg:text-4xl
            "
          >
            Real Moments, Real Happiness
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              px-3
              text-sm
              font-medium
              leading-6
              text-brand-muted
              sm:mt-4
              sm:text-base
              sm:leading-7
            "
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            See how our customers turned their special moments into
            beautiful memories with Priyanka's Creation.
          </p>
        </motion.div>

        {/* ================= VIDEOS ================= */}
        <div
          className="
            mx-auto
            mt-8
            grid
            max-w-6xl
            grid-cols-1
            gap-5
            sm:mt-10
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {videos.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 25,
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
                delay: reduce ? 0 : index * 0.08,
                ease: "easeOut",
              }}
              whileHover={
                reduce
                  ? {}
                  : {
                      y: -6,
                    }
              }
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#8F245F]/70
                bg-white
                shadow-[0_8px_25px_-12px_rgba(143,36,95,.28)]
                transition-all
                duration-300
                hover:border-brand-pink
                hover:shadow-[0_18px_38px_-18px_rgba(143,36,95,.42)]
                sm:rounded-[25px]
              "
            >

              {/* ================= VIDEO ================= */}
              <div
                className="
                  relative
                  aspect-[9/13]
                  overflow-hidden
                  bg-black
                "
              >
                <video
                  src={item.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.015]
                  "
                />

                {/* Top Gradient */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-20
                    bg-gradient-to-b
                    from-black/25
                    to-transparent
                  "
                />

                {/* Play Badge */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    text-brand-pink
                    shadow-md
                    backdrop-blur-sm
                    sm:left-4
                    sm:top-4
                    sm:h-10
                    sm:w-10
                  "
                >
                  <Play
                    size={16}
                    fill="currentColor"
                    className="ml-0.5"
                  />
                </div>

                {/* Small Number */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-black/45
                    px-2.5
                    py-1
                    text-[10px]
                    font-semibold
                    text-white
                    backdrop-blur-sm
                  "
                >
                  0{item.id}
                </span>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="relative px-4 py-4 sm:px-5 sm:py-5">

                <h3
                  className="
                    font-display
                    text-base
                    font-semibold
                    leading-6
                    text-brand-ink
                    sm:text-lg
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-[12px]
                    leading-5
                    text-brand-muted
                  "
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Priyanka's Creation
                </p>

              </div>

              {/* Bottom Accent */}
              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[3px]
                  w-full
                  origin-left
                  scale-x-0
                  bg-gradient-to-r
                  from-brand-pink
                  via-brand-magenta
                  to-brand-purple
                  transition-transform
                  duration-500
                  group-hover:scale-x-100
                "
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}