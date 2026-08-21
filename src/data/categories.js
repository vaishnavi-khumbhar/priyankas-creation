/*  One place that defines your catalogue structure.
    `products.js`, the filter tabs and the homepage sections all read this,
    so adding a category is a one-line change here.

    `sub` is only documentation for now — the products themselves carry the
    top-level `category`. When a category grows past ~8 products, we can turn
    `sub` into a second filter row.                                          */

export const CATEGORIES = [
  {
    name: "Writing & Exam Boards",
    sub: ["Personalized Kids Writing Board", "Customized Exam Board", "Photo & Name Writing Board"],
  },
  {
    name: "Customized Photo Frames",
    sub: [
      "Kids Photo Frame",
      "Family Photo Frame",
      "Couple Photo Frame",
      "Birthday Photo Frame",
      "Motivational Photo Frame",
      "Memorial Photo Frame",
    ],
  },
  {
    name: "Premium Customized Frames",
    sub: ["Resin Art Frame", "Acrylic Photo Frame", "Photo Collage Frame", "Customized Name Frame"],
  },
  {
    name: "Kitchen Collection",
    sub: [
      "Customized Kitchen Frame",
      "Kitchen Katta Frame",
      "Annapurna Kitchen Frame",
      "Personalized Swayampakghar Frame",
    ],
  },
  {
    name: "Wedding & Couple Collection",
    sub: ["Gathbandhan Frame", "Couple Name Frame", "Wedding Memory Frame"],
  },
  {
    name: "Festive & Home Décor",
    sub: ["Shubh-Labh Wall Hanging"],
  },
];

/* display order for the filter tabs and the homepage sections */
export const CATEGORY_ORDER = CATEGORIES.map((c) => c.name);

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");