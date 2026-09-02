/* ============================================================
   CATEGORIES
   ------------------------------------------------------------
   `name` = Frontend वर दिसणारे नाव
   `slug` = URL मध्ये वापरला जाणारा clean name
   ============================================================ */

export const CATEGORIES = [
  {
    name: "Writing & Exam Boards",
    sub: [
      "Personalized Kids Writing Board",
      "Customized Exam Board",
      "Photo & Name Writing Board",
    ],
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
    sub: [
      "Resin Art Frame",
      "Acrylic Photo Frame",
      "Photo Collage Frame",
      "Customized Name Frame",
    ],
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
    sub: [
      "Gathbandhan Frame",
      "Couple Name Frame",
      "Wedding Memory Frame",
    ],
  },

  {
    name: "Festive & Home Décor",
    sub: [
      "Shubh-Labh Wall Hanging",
    ],
  },
];

/* ============================================================
   CATEGORY ORDER
   ============================================================ */

export const CATEGORY_ORDER = CATEGORIES.map(
  (category) => category.name
);

/* ============================================================
   SLUGIFY
   ------------------------------------------------------------
   Examples:
   Writing & Exam Boards
   → writing-and-exam-boards

   Wedding & Couple Collection
   → wedding-and-couple-collection
   ============================================================ */

export const slugify = (value = "") => {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/* ============================================================
   FIND CATEGORY BY SLUG
   ============================================================ */

export const getCategoryBySlug = (slug = "") => {
  const cleanSlug = slugify(slug);

  return CATEGORIES.find(
    (category) => slugify(category.name) === cleanSlug
  );
};

/* ============================================================
   GET DISPLAY NAME FROM URL SLUG
   ============================================================ */

export const getCategoryNameFromSlug = (slug = "") => {
  const category = getCategoryBySlug(slug);

  return category ? category.name : "";
};