import examBoardName  from "../assets/productes/exam-board-name.jpg";
import examBoardPhoto from "../assets/productes/exam-board-photo.jpg";
import cartoonBoard   from "../assets/productes/cartoon-board.jpg";
import kitchenFrame   from "../assets/productes/kitchen-frame.jpg";
import photoFrame     from "../assets/productes/photo-frame.jpg";

// ==============================
// PRODUCTS
// `rating` (1–5) and `reviews` (count) drive the star row.
// Remove both fields from a product and its stars simply don't render.
// ⚠️ Replace these with your real numbers before going live.
// ==============================

export const products = [
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
    description:
      "A colourful exam board personalized with your child's name.",
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
    description:
      "Make exam time special with your child's photo and name.",
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
    description:
      "Fun cartoon-inspired designs made for little learners.",
    benefits: [
      "Choose a theme your child already loves",
      "Name added in a matching style",
      "Waterproof, wipe-clean finish",
      "Built for daily school use",
    ],
  },

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
    description:
      "A personalized frame with photo, name and special message.",
    benefits: [
      "Photo, name, message and theme of your choice",
      "Perfect for birthdays and anniversaries",
      "Ready to gift on delivery",
      "Design approval before printing",
    ],
  },

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
    description:
      "A thoughtful personalized gift for every beautiful kitchen.",
    benefits: [
      "Photo, name and a special message together",
      "A warm gift for mom, wife or sister",
      "Durable, easy-to-clean finish",
      "Design approval before printing",
    ],
  },
];