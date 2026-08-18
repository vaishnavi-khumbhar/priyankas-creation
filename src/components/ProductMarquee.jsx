import { Link } from "react-router-dom";

/* Everything you make — edit this one array */
const items = [
  "Customized Exam Boards",
  "Name + Photo Boards",
  "Cartoon Theme Boards",
  "School & Coaching Class Sets",
  "Personalized Return Gifts",
  "Name Slips & Book Labels",
  "Customized Photo Frames",
  "Kitchen Frames",
  "Couple Frames",
  "Motivational Frames",
  "Birthday Gift Frames",
];

const Track = () => (
  <div className="pm-track flex items-center gap-3 px-2">
    {items.map((label) => (
      <span
        key={label}
        className="flex shrink-0 items-center gap-3"
      >
        <Link
          to="/shop"
          className="
            group relative flex items-center gap-2.5
            overflow-hidden
            rounded-full
            border border-[#F1B8D7]
            bg-gradient-to-r
            from-[#FFF0F8]
            via-white
            to-[#F4EDFF]
            px-5 py-2.5
            text-[13px]
            font-semibold
            tracking-wide
            text-[#30243A]
            shadow-[0_5px_18px_rgba(214,36,159,0.14)]
            transition-all duration-300
            hover:-translate-y-1
            hover:border-brand-pink
            hover:shadow-[0_12px_28px_rgba(214,36,159,0.25)]
            sm:px-6
            sm:text-[14px]
          "
        >
          {/* Front Dot Icon */}
          <span
            className="
              relative z-10
              flex h-2.5 w-2.5
              shrink-0
              rounded-full
              bg-gradient-to-r
              from-brand-pink
              to-brand-purple
              shadow-[0_0_8px_rgba(214,36,159,0.35)]
              transition-transform duration-300
              group-hover:scale-125
            "
          />

          {/* Text */}
          <span className="relative z-10 whitespace-nowrap">
            {label}
          </span>

          {/* Soft Inner Shine */}
          <span
            className="
              absolute inset-0
              bg-gradient-to-r
              from-brand-pink/10
              via-transparent
              to-brand-purple/10
              opacity-0
              transition-opacity duration-300
              group-hover:opacity-100
            "
          />
        </Link>

        {/* Separator Dot */}
        <span
          className="
            h-1 w-1
            shrink-0
            rounded-full
            bg-brand-purple/35
          "
        />
      </span>
    ))}
  </div>
);

export default function ProductMarquee() {
  return (
    <section
      className="
        bg-gradient-to-b
        from-[#FFF9FD]
        via-white
        to-[#FFF9FD]
        py-5
      "
    >
      <style>{`
        .pm-row {
          display: flex;
          overflow: hidden;
          width: 100%;
        }

        .pm-track {
          display: flex;
          flex-shrink: 0;
          min-width: max-content;
          will-change: transform;

          /* Slow smooth scrolling */
          animation: pm-scroll 55s linear infinite;
        }

        .pm-row:hover .pm-track {
          animation-play-state: paused;
        }

        @keyframes pm-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-100%);
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .pm-track {
            animation-duration: 40s;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .pm-track {
            animation: none;
          }

          .pm-row {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .pm-row::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      <div className="container-page">
        <div
          className="
            relative
            overflow-hidden
            rounded-[26px]
            border border-pink-100
            bg-white/70
            px-2 py-3
            shadow-[0_16px_40px_-24px_rgba(122,31,162,.28)]
            backdrop-blur-xl
          "
        >
          {/* Left Edge Fade */}
          <div
            className="
              pointer-events-none
              absolute inset-y-0 left-0
              z-10
              w-16
              bg-gradient-to-r
              from-white
              to-transparent
              sm:w-24
            "
          />

          {/* Right Edge Fade */}
          <div
            className="
              pointer-events-none
              absolute inset-y-0 right-0
              z-10
              w-16
              bg-gradient-to-l
              from-white
              to-transparent
              sm:w-24
            "
          />

          {/* Scrolling Row */}
          <div className="pm-row">
            <Track />
            <Track />
          </div>
        </div>
      </div>
    </section>
  );
}