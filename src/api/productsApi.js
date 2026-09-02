/* ============================================================
   Backend connection

   Local:  http://localhost/Priyankas-Creation-backend
   Live:   set VITE_API_BASE in a .env file, e.g.
             VITE_API_BASE=https://yoursite.com/backend
   ============================================================ */

const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") ||
  "http://localhost/priyankas-backend";

export const BACKEND_URL   = API_BASE;
export const PRODUCTS_API  = `${API_BASE}/api/products.php`;
export const CATEGORIES_API = `${API_BASE}/api/categories.php`;

/* the API already returns full URLs, but this keeps working if it ever
   returns a plain file name or a server-relative path */
export const fixImageUrl = (image) => {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;

  const path = image.replace(/^\/+/, "");
  return `${API_BASE}/${path}`;
};

const toArray = (v) => (Array.isArray(v) ? v : []);
const toNumberOrNull = (v) =>
  v === null || v === undefined || v === "" ? null : Number(v);

export const normalizeProduct = (product) => ({
  ...product,

  id:       String(product.id ?? "").trim(),
  name:     product.name ?? "",
  category: product.category ?? "",

  price:    Number(product.price || 0),
  oldPrice: toNumberOrNull(product.oldPrice),
  rating:   toNumberOrNull(product.rating),
  reviews:  Number(product.reviews || 0),

  sizes:                     toArray(product.sizes),
  benefits:                  toArray(product.benefits),
  dimensions:                toArray(product.dimensions),
  customizationInstructions: toArray(product.customizationInstructions),
  features:                  toArray(product.features),
  perfectFor:                toArray(product.perfectFor),
  makingDelivery:            toArray(product.makingDelivery),

  image:            fixImageUrl(product.image),
  dimensionsImage:  fixImageUrl(product.dimensionsImage),
  instructionImage: fixImageUrl(product.instructionImage),
});

/* a hung server should not leave the site "loading" forever */
const fetchJson = async (url, timeoutMs = 12000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`API error ${res.status} — ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
};

export const fetchProducts = async () => {
  const data = await fetchJson(PRODUCTS_API);
  if (!Array.isArray(data)) throw new Error("Products API did not return an array");
  return data.map(normalizeProduct);
};

/* one product — handy for a direct page load */
export const fetchProduct = async (slug) => {
  const data = await fetchJson(`${PRODUCTS_API}?slug=${encodeURIComponent(slug)}`);
  return data && data.id ? normalizeProduct(data) : null;
};

export const fetchCategories = async () => {
  const data = await fetchJson(CATEGORIES_API);
  return Array.isArray(data) ? data : [];
};