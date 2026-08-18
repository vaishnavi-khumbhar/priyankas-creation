import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Frame,
  Gift,
  Pencil,
  ArrowRight,
} from "lucide-react";


const collections = [
  {
    name: "Exam Boards",
    Icon: BookOpen,
    tag: "Most ordered",
    desc: "Waterproof boards personalised with your child's name, photo and favourite cartoon theme.",
    chips: ["Name + Photo", "School Bulk", "Cartoon Themes"],
    grad: "from-brand-pink to-brand-magenta",
    to: "/shop?category=exam-boards",
  },
  {
    name: "Photo Frames",
    Icon: Frame,
    desc: "Turn a favourite photo into a keepsake with a name, message and theme of your choice.",
    chips: ["Kitchen", "Couple", "Motivational"],
    grad: "from-brand-magenta to-brand-purple",
    to: "/shop?category=photo-frames",
  },
  {
    name: "Gift Creations",
    Icon: Gift,
    desc: "Personalised gifts for birthdays, admissions and milestones — including bulk return gifts.",
    chips: ["Return Gifts", "Birthday", "Milestones"],
    grad: "from-brand-purple to-brand-pink",
    to: "/shop?category=gifts",
  },
  {
    name: "School Essentials",
    Icon: Pencil,
    desc: "Everyday school items your child can spot instantly — no more lost or swapped books.",
    chips: ["Name Slips", "Book Labels", "Class Sets"],
    grad: "from-brand-gold to-brand-pink",
    to: "/shop?category=school",
  },
];

export default function Collections() {
  const reduce = useReducedMotion();

  const card = {
    hidden: {
      opacity: 0,
      y: 28,
    },

    show: (k) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: reduce ? 0 : k * 0.09,
        ease: "easeOut",
      },
    }),
  };

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
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Small Label */}
          <span
            className="
              inline-flex
              items-center
              gap-2
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
            Our Collections
          </span>

          {/* Script Heading */}
          <p
            className="
              mt-3
              font-script
              text-xl
              text-brand-pink
              sm:mt-4
              sm:text-3xl
            "
          >
            Shop by collection
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
            Made for Little Moments
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
  Every product is made to order — your child's name, their photo,
  their favourite theme. Thoughtfully designed pieces that turn
  everyday essentials into something truly personal.
</p>
        </motion.div>

        {/* ================= COLLECTION GRID ================= */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-4
            sm:mt-11
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-4
          "
        >
          {collections.map(
            ({ name, Icon, desc, chips, grad, tag, to }, k) => (
              <motion.div
                key={name}
                custom={k}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                whileHover={
                  reduce
                    ? {}
                    : {
                        y: -8,
                      }
                }
              >
                <Link
                  to={to}
                  className="
                    group
                    relative
                    flex
                    h-full
                    min-h-0
                    flex-col
                    overflow-hidden
                    rounded-[24px]
                    border-2
                    border-[#8F245F]
                    bg-gradient-to-br
                    from-white
                    via-[#FFF9FC]
                    to-brand-soft/50
                    p-5
                    shadow-[0_5px_18px_-8px_rgba(122,31,162,.20)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-brand-pink
                    hover:shadow-[0_20px_40px_-20px_rgba(143,36,95,.45)]
                    sm:rounded-[28px]
                    sm:p-6
                  "
                >
                  {/* ================= PINK CORNER GLOW ================= */}
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

                  {/* ================= HOVER SHEEN ================= */}
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

                  {/* ================= TAG ================= */}
                  {tag && (
                    <span
                      className="
                        absolute
                        right-4
                        top-4
                        rounded-full
                        border
                        border-brand-pink/25
                        bg-brand-pink/10
                        px-2
                        py-1
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-brand-magenta
                        sm:right-5
                        sm:top-5
                        sm:px-2.5
                        sm:text-[9px]
                      "
                    >
                      {tag}
                    </span>
                  )}

                  {/* ================= ICON ================= */}
                  <motion.span
                    whileHover={
                      reduce
                        ? {}
                        : {
                            rotate: -8,
                            scale: 1.08,
                          }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                    }}
                    className={`
                      relative
                      grid
                      h-12
                      w-12
                      shrink-0
                      place-items-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${grad}
                      text-white
                      shadow-[0_10px_22px_-12px_rgba(214,36,159,.9)]
                      sm:h-14
                      sm:w-14
                    `}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="sm:hidden"
                    />

                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className="hidden sm:block"
                    />

                    <span
                      className={`
                        absolute
                        inset-0
                        rounded-2xl
                        bg-gradient-to-br
                        ${grad}
                        opacity-0
                        blur-lg
                        transition-opacity
                        duration-500
                        group-hover:opacity-60
                      `}
                    />
                  </motion.span>

                  {/* ================= TITLE ================= */}
                  <h3
                    className="
                      mt-4
                      font-display
                      text-lg
                      font-semibold
                      text-brand-ink
                      sm:mt-5
                      sm:text-xl
                    "
                  >
                    {name}
                  </h3>

                  {/* ================= DESCRIPTION ================= */}
                  <p
                    className="
                      mt-2
                      text-[13px]
                      leading-5
                      text-brand-muted
                      sm:text-[15px]
                      sm:leading-6
                    "
                  >
                    {desc}
                  </p>

                  {/* ================= CHIPS ================= */}
                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      gap-1.5
                      sm:mt-4
                    "
                  >
                    {chips.map((c) => (
                      <span
                        key={c}
                        className="
                          rounded-full
                          border
                          border-pink-200
                          bg-pink-50
                          px-2
                          py-1
                          text-[10px]
                          font-medium
                          text-brand-purple
                          transition-all
                          duration-300
                          group-hover:border-brand-pink/50
                          group-hover:bg-pink-100/70
                          sm:px-2.5
                          sm:text-[13px]
                        "
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* ================= EXPLORE ================= */}
   {/* ================= EXPLORE ================= */}
<span className="mt-6 sm:mt-auto sm:pt-6">
  <Link
    to="/products"
    className="
      flex
      h-11
      w-full
      items-center
      justify-center
      gap-1.5
      rounded-full
      border
      border-brand-pink/40
      bg-white
      text-[13px]
      font-semibold
      text-brand-magenta
      shadow-[0_6px_16px_-10px_rgba(214,36,159,.6)]
      transition-all
      duration-300
      group-hover:border-brand-pink/30
      group-hover:bg-brand-pink/10
      group-hover:text-brand-pink
      group-hover:shadow-[0_8px_18px_-12px_rgba(214,36,159,.5)]
    "
  >
    Explore

    <ArrowRight
      size={14}
      className="transition-transform duration-300 group-hover:translate-x-1.5"
    />
  </Link>
</span>
                  {/* ================= BOTTOM PINK LINE ================= */}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-[3px]
                      w-0
                      bg-gradient-to-r
                      ${grad}
                      transition-all
                      duration-500
                      group-hover:w-full
                    `}
                  />
                </Link>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}