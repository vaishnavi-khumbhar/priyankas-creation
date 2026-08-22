import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

import video1 from "../assets/1.mp4";
import video2 from "../assets/2.mp4";

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
];

export default function CustomerVideos() {
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
              sm:text-4xl
            "
          >
            Real Moments, Real Happiness
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
            See how our customers turned their special moments into
            beautiful memories with Priyanka's Creation.
          </p>
        </motion.div>

        {/* ================= VIDEOS ================= */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-4
            sm:mt-11
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-2
            lg:max-w-4xl
            lg:mx-auto
          "
        >
          {videos.map((item, index) => (
            <motion.div
              key={item.id}
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
                amount: 0.25,
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
                rounded-[24px]
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
                sm:rounded-[28px]
              "
            >

              {/* Pink Corner Glow */}
              <span
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-36
                  w-36
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

              {/* Video */}
              <div className="relative aspect-[9/14] overflow-hidden bg-black">

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
                    group-hover:scale-[1.02]
                  "
                />

                {/* Play Decoration */}
                <div className="pointer-events-none absolute left-4 top-4">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-brand-pink
                      shadow-lg
                      backdrop-blur
                    "
                  >
                    <Play size={18} fill="currentColor" />
                  </div>
                </div>

              </div>

              {/* Content */}
              <div className="relative p-5 sm:p-6">

                <h3
                  className="
                    font-display
                    text-lg
                    font-semibold
                    text-brand-ink
                    sm:text-xl
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-[13px]
                    leading-6
                    text-brand-muted
                  "
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Priyanka's Creation
                </p>

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

      </div>
    </section>
  );
}