/* ──────────────────────────────────────────────────────────────
   IMAGES
   Put every file in  src/assets/productes/
   Keep the exact filenames below, or change the path here.
   ────────────────────────────────────────────────────────────── */

/* existing */
import examBoardName   from "../assets/productes/exam-board-name.jpg";
import examBoardPhoto  from "../assets/productes/exam-board-photo.jpg";
import cartoonBoard    from "../assets/productes/cartoon-board.jpg";
import kitchenFrame    from "../assets/productes/kitchen-frame.jpg";
import photoFrame      from "../assets/productes/photo-frame.jpg";

/* new — add these 8 files */
import writingBoard    from "../assets/productes/writing-board.jpg";
import birthdayFrame   from "../assets/productes/birthday-theme-frame.jpg";
import kidsPhotoFrame  from "../assets/productes/kids-photo-frame.jpg";
import kitchenFrame1   from "../assets/productes/kitchen-frame-1.jpg";
import kitchenFrame2   from "../assets/productes/kitchen-frame-2.jpg";
import kitchenFrame3   from "../assets/productes/kitchen-frame-3.jpg";
import weddingFrameLg  from "../assets/productes/wedding-gift.jpg";

/* ══════════════════════════════════════════════════════════════
   PRODUCTS
   price     = what the customer pays (after discount)
   oldPrice  = the listed price, shown struck through
   The % OFF badge is calculated from these two — don't set it manually.

   `rating` / `reviews` drive the star row. Remove both and stars
   simply don't render. ⚠️ Replace with real numbers before launch.
   ══════════════════════════════════════════════════════════════ */

export const products = [
  /* ───────────── EXAM / WRITING BOARDS ───────────── */
  {
    id: "board-name",
    name: "Customized Name Exam Board",
    category: "Exam Boards",
    price: 349,
    oldPrice: 449,
    image: examBoardName,
    tag: "Bestseller",
    rating: 4.8,
    reviews: 42,
    sizes: ["A4", "A3"],
    description: "A colourful exam board personalized with your child's name.",
    benefits: [
      "Child's name printed in a clear, child-friendly font",
      "Choose any colour and background design",
      "100% waterproof, wipe-clean surface",
      "Design shared for your approval before making",
    ],
  },

  {
    id: "board-photo",
    name: "Name + Photo Exam Board",
    category: "Exam Boards",
    price: 449,
    oldPrice: 549,
    image: examBoardPhoto,
    tag: "Popular",
    rating: 4.9,
    reviews: 36,
    sizes: ["A4", "A3"],
    description: "Make exam time special with your child's photo and name.",
    benefits: [
      "Your child's photograph and name on the board",
      "Colourful backgrounds and cartoon themes",
      "100% waterproof and long lasting",
      "No more lost or swapped boards in class",
    ],
  },

  {
    id: "cartoon-board",
    name: "Cartoon Theme Exam Board",
    category: "Exam Boards",
    price: 399,
    oldPrice: 499,
    image: cartoonBoard,
    tag: "New",
    rating: 4.7,
    reviews: 21,
    sizes: ["A4", "A3"],
    description: "Fun cartoon-inspired designs made for little learners.",
    benefits: [
      "Choose a theme your child already loves",
      "Name added in a matching style",
      "Waterproof, wipe-clean finish",
      "Built for daily school use",
    ],
  },

  {
    /* 1 · Writing board — 14 × 9.8 in — ₹599, 5% off */
    id: "writing-board",
    name: "Customized Writing Board",
    category: "Exam Boards",
    price: 569,
    oldPrice: 599,
    image: writingBoard,
    sizes: ["14 × 9.8 in"],
    description:
      "A sturdy personalized writing board for everyday school work and exams.",
    benefits: [
      "Personalised with your child's name and theme",
      "14 × 9.8 inch — fits a standard school bag",
      "100% waterproof, wipe-clean surface",
      "Design shared for your approval before making",
    ],
  },

  /* ───────────── PHOTO FRAMES ───────────── */
  {
    id: "photo-frame",
    name: "Customized Photo Frame",
    category: "Photo Frames",
    price: 599,
    oldPrice: 799,
    image: photoFrame,
    tag: "Gift Pick",
    rating: 4.9,
    reviews: 28,
    sizes: ["8×10 in", "12×15 in"],
    description: "A personalized frame with photo, name and special message.",
    benefits: [
      "Photo, name, message and theme of your choice",
      "Perfect for birthdays and anniversaries",
      "Ready to gift on delivery",
      "Design approval before printing",
    ],
  },

  {
    /* 2 · Birthday theme frame — 13 × 13 in — ₹1800, 10% off */
    id: "birthday-theme-frame",
    name: "Birthday Theme Frame",
    category: "Photo Frames",
    price: 1620,
    oldPrice: 1800,
    image: birthdayFrame,
    tag: "Birthday",
    sizes: ["13 × 13 in"],
    description:
      "A birthday-themed frame built around your favourite photo, name and message.",
    benefits: [
      "Choose the birthday theme and colours",
      "Photo, name and age or message included",
      "13 × 13 inch — a strong table or wall piece",
      "Design approval before printing",
    ],
  },

  {
    /* 3 · Kids photo frame — 24 × 24 in — ₹4999, 10% off */
    id: "kids-photo-frame",
    name: "Customized Kids Photo Frame",
    category: "Photo Frames",
    price: 4499,
    oldPrice: 4999,
    image: kidsPhotoFrame,
    tag: "Premium",
    sizes: ["24 × 24 in"],
    description:
      "A large statement frame for your child's best photograph, made to order.",
    benefits: [
      "24 × 24 inch — a centrepiece for any wall",
      "Photo, name and theme of your choice",
      "Premium finish, built to last",
      "Design approval before printing",
    ],
  },

  /* ───────────── KITCHEN FRAMES ─────────────
     ⚠️ Three kitchen frames at different prices. Rename them to
     match the actual designs (e.g. by theme or material). */
  {
    id: "kitchen-frame",
    name: "Customized Kitchen Frame",
    category: "Photo Frames",
    price: 649,
    oldPrice: 849,
    image: kitchenFrame,
    tag: "Special",
    rating: 4.8,
    reviews: 17,
    sizes: ["8×10 in", "12×15 in"],
    description: "A thoughtful personalized gift for every beautiful kitchen.",
    benefits: [
      "Photo, name and a special message together",
      "A warm gift for mom, wife or sister",
      "Durable, easy-to-clean finish",
      "Design approval before printing",
    ],
  },

  {
    /* 4 · Kitchen frame — 15 × 12 in — ₹2299, 10% off */
    id: "kitchen-frame-classic",
    name: "Kitchen Frame — Classic",
    category: "Photo Frames",
    price: 2069,
    oldPrice: 2299,
    image: kitchenFrame1,
    sizes: ["15 × 12 in"],
    description:
      "A personalized kitchen frame with your photo, name and a warm message.",
    benefits: [
      "15 × 12 inch — fits neatly above a counter",
      "Photo, name and message of your choice",
      "Easy-to-clean finish for kitchen use",
      "Design approval before printing",
    ],
  },

  {
    /* 5 · Kitchen frame — 15 × 12 in — ₹2199, 5% off */
    id: "kitchen-frame-floral",
    name: "Kitchen Frame — Floral",
    category: "Photo Frames",
    price: 2089,
    oldPrice: 2199,
    image: kitchenFrame2,
    sizes: ["15 × 12 in"],
    description:
      "A floral-styled kitchen frame personalised with your photo and message.",
    benefits: [
      "15 × 12 inch — a bright kitchen wall piece",
      "Floral design with your photo and name",
      "Easy-to-clean finish",
      "Design approval before printing",
    ],
  },

  {
    /* 6 · Kitchen frame — 15 × 12 in — ₹2199, 5% off */
    id: "kitchen-frame-traditional",
    name: "Kitchen Frame — Traditional",
    category: "Photo Frames",
    price: 2089,
    oldPrice: 2199,
    image: kitchenFrame3,
    sizes: ["15 × 12 in"],
    description:
      "A traditional kitchen frame with your photo, name and a heartfelt line.",
    benefits: [
      "15 × 12 inch — warm traditional styling",
      "Photo, name and message included",
      "Easy-to-clean finish",
      "Design approval before printing",
    ],
  },

  /* ───────────── WEDDING GIFTS ───────────── */
  {
    /* 7 · Wedding gift — 24 × 24 in — ₹4999 incl. shipping, 10% off */
    id: "wedding-gift-large",
    name: "Wedding Gift Frame — 24 × 24 in",
    category: "Gift Creations",
    price: 4499,
    oldPrice: 4999,
    image: weddingFrameLg,
    tag: "Shipping included",
    sizes: ["24 × 24 in"],
    description:
      "A large personalized wedding frame for the couple — photo, names and date.",
    benefits: [
      "24 × 24 inch — a wedding centrepiece",
      "Couple's photo, names and wedding date",
      "Shipping included in the price",
      "Design approval before printing",
    ],
  },

  

];