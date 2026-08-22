import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Happy Customer",
    location: "Latur",
    review:
      "The product was absolutely beautiful! The finishing, packaging and attention to detail were amazing. Loved it! ❤️",
    rating: 5,
  },
  {
    name: "Priya",
    location: "Maharashtra",
    review:
      "Exactly what I wanted. It looked even more beautiful in real life. Thank you so much! ✨",
    rating: 5,
  },
  {
    name: "Sneha",
    location: "Latur",
    review:
      "Beautiful work and very good quality. Everyone loved it. Definitely ordering again! 💕",
    rating: 5,
  },
  {
    name: "Neha",
    location: "Pune",
    review:
      "I absolutely loved my order! Everything was packed so beautifully and the quality was perfect. Highly recommended! 🥰",
    rating: 5,
  },
  {
    name: "Aarti",
    location: "Latur",
    review:
      "The finishing was so beautiful and elegant. It was exactly what I imagined. Thank you Priyanka's Creation! ❤️",
    rating: 5,
  },
  {
    name: "Riya",
    location: "Mumbai",
    review:
      "Such a beautiful creation! The details were perfect and the delivery was also smooth. Loved everything! ✨",
    rating: 5,
  },
  {
    name: "Pooja",
    location: "Solapur",
    review:
      "I ordered it for a special occasion and everyone loved it. Beautiful work and amazing quality! 💖",
    rating: 5,
  },
  {
    name: "Kavita",
    location: "Latur",
    review:
      "Very happy with my purchase. The product looked even more beautiful than the pictures. Definitely ordering again! 🌸",
    rating: 5,
  },
  {
    name: "Shreya",
    location: "Maharashtra",
    review:
      "The creativity and finishing are just amazing. You can really see the love and effort behind every product. 💕",
    rating: 5,
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic slider
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + reviews.length) % reviews.length
    );
  };

  // Get 3 cards for desktop-style slider
  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section
      className="py-20 bg-[#fffafc] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-sm font-semibold"
          >
            <Heart size={16} fill="currentColor" />
            Customer Love
          </motion.span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
            What Our Customers{" "}
            <span className="text-brand-gold">Say</span>
          </h2>

          <p className="mt-4 text-brand-muted max-w-xl mx-auto">
            Every order is created with love, and your feedback means
            everything to us.
          </p>
        </motion.div>

        {/* ================= REVIEW SLIDER ================= */}

        <div className="relative">

          {/* LEFT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevReview}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 rounded-full bg-white shadow-xl
              border border-pink-100 items-center justify-center
              text-brand-dark hover:text-pink-500 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </motion.button>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {visibleReviews.map((item, index) => (
              <AnimatePresence mode="wait" key={`${item.name}-${currentIndex}-${index}`}>
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 60,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -60,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.015,
                  }}
                  className="relative bg-white rounded-3xl p-7
                    shadow-lg hover:shadow-2xl
                    border border-pink-100
                    transition-shadow duration-300"
                >

                  {/* Decorative Quote */}
                  <Quote
                    size={46}
                    className="absolute top-6 right-6 text-pink-100"
                    fill="currentColor"
                  />

                  {/* Small Heart */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute top-7 right-20 text-pink-300"
                  >
                    <Heart
                      size={17}
                      fill="currentColor"
                    />
                  </motion.div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({
                      length: item.rating,
                    }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay: i * 0.08,
                        }}
                      >
                        <Star
                          size={17}
                          className="text-amber-400"
                          fill="currentColor"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-sm sm:text-base leading-7 text-brand-muted min-h-[140px]">
                    "{item.review}"
                  </p>

                  {/* Customer */}
                  <div className="mt-6 pt-5 border-t border-pink-50 flex items-center gap-4">

                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-full
                        bg-gradient-to-br from-pink-400 to-rose-500
                        flex items-center justify-center
                        text-white font-bold text-lg
                        shadow-md"
                    >
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-brand-dark">
                        {item.name}
                      </h3>

                      <p className="text-xs text-brand-muted mt-1">
                        {item.location}
                      </p>
                    </div>

                    {/* Verified */}
                    <div className="ml-auto">
                      <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
                        ✓ Verified
                      </span>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            ))}

          </div>

          {/* RIGHT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextReview}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 rounded-full bg-white shadow-xl
              border border-pink-100 items-center justify-center
              text-brand-dark hover:text-pink-500 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </motion.button>
        </div>

        {/* ================= DOTS ================= */}

        <div className="flex justify-center items-center gap-2 mt-9">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-7 bg-brand-gold"
                  : "w-2 bg-pink-200 hover:bg-pink-300"
              }`}
            />
          ))}
        </div>

        {/* ================= BOTTOM MESSAGE ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-brand-muted">
            Made with{" "}
            <Heart
              size={14}
              className="inline text-pink-500"
              fill="currentColor"
            />{" "}
            for every special moment
          </p>
        </motion.div>

      </div>
    </section>
  );
}