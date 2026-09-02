/* ============================================================
   Visitor tracking — talks to the PHP backend.

   What it records
     • a random visitor id kept in the browser (no personal data)
     • how they arrived: utm_source / utm_medium / utm_campaign,
       or worked out from the referring website
     • every page view and product view
     • every tap on "Order on WhatsApp", with a short REF CODE that
       is also written inside the WhatsApp message

   The ref code is the link between an ad and a real order: when the
   customer's message arrives, search that code in the admin panel.
   ============================================================ */

import { BACKEND_URL } from "../api/productsApi";

const VISITOR_KEY = "pc_visitor";
const TOUCH_KEY   = "pc_first_touch";

/* ---------- visitor id ---------- */
export const getVisitorKey = () => {
  try {
    let key = localStorage.getItem(VISITOR_KEY);
    if (!key) {
      key = "v_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, key);
    }
    return key;
  } catch {
    return "v_temp";                      // private mode — still works, just not remembered
  }
};

/* ---------- work out where they came from ---------- */
const sourceFromReferrer = (ref) => {
  if (!ref) return { source: "direct", medium: null };

  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (host.includes(window.location.hostname)) return null;      // same site, ignore

    if (/instagram|l\.instagram/.test(host))    return { source: "instagram", medium: "social" };
    if (/facebook|fb\.com|l\.facebook/.test(host)) return { source: "facebook", medium: "social" };
    if (/google/.test(host))                    return { source: "google",    medium: "organic" };
    if (/youtube/.test(host))                   return { source: "youtube",   medium: "social" };
    if (/whatsapp|wa\.me/.test(host))           return { source: "whatsapp",  medium: "chat" };
    if (/bing|duckduckgo|yahoo/.test(host))     return { source: host.split(".")[0], medium: "organic" };

    return { source: host, medium: "referral" };
  } catch {
    return { source: "direct", medium: null };
  }
};

/* first touch is stored once and never overwritten — that is the
   campaign that actually earned the customer */
export const getTouch = () => {
  const params = new URLSearchParams(window.location.search);

  const utm = {
    source:   params.get("utm_source"),
    medium:   params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
  };

  /* Meta ads add fbclid, Google adds gclid — treat them as paid traffic */
  if (!utm.source && params.get("fbclid")) { utm.source = "facebook"; utm.medium = "ads"; }
  if (!utm.source && params.get("gclid"))  { utm.source = "google";   utm.medium = "ads"; }

  let stored = null;
  try { stored = JSON.parse(localStorage.getItem(TOUCH_KEY) || "null"); } catch { /* ignore */ }

  if (utm.source) {
    const touch = {
      ...utm,
      referrer: document.referrer || null,
      landing:  window.location.pathname + window.location.search,
    };
    if (!stored) {
      try { localStorage.setItem(TOUCH_KEY, JSON.stringify(touch)); } catch { /* ignore */ }
    }
    return touch;
  }

  if (stored) return stored;

  const guessed = sourceFromReferrer(document.referrer) || { source: "direct", medium: null };
  const touch = {
    ...guessed,
    campaign: null,
    referrer: document.referrer || null,
    landing:  window.location.pathname + window.location.search,
  };

  try { localStorage.setItem(TOUCH_KEY, JSON.stringify(touch)); } catch { /* ignore */ }
  return touch;
};

const device = () => (window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");

/* fire-and-forget — tracking must never slow the site or break it */
const post = (endpoint, body) => {
  try {
    const url = `${BACKEND_URL}/api/${endpoint}`;
    const payload = JSON.stringify(body);

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
      return;
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch { /* ignore */ }
};

/* ---------- public helpers ---------- */

export const trackPageView = (page) => {
  const t = getTouch();
  post("track.php", {
    visitorKey: getVisitorKey(),
    type: "page_view",
    page: page || window.location.pathname,
    source: t.source, medium: t.medium, campaign: t.campaign,
    referrer: t.referrer, landing: t.landing,
    device: device(),
  });
};

export const trackProductView = (slug, page) => {
  const t = getTouch();
  post("track.php", {
    visitorKey: getVisitorKey(),
    type: "product_view",
    product: slug,
    page: page || window.location.pathname,
    source: t.source, medium: t.medium, campaign: t.campaign,
    referrer: t.referrer, landing: t.landing,
    device: device(),
  });
};

/* short, easy to read over WhatsApp: PC + 4 characters */
export const makeRefCode = () =>
  "PC" + Math.random().toString(36).slice(2, 6).toUpperCase();

/* call this the moment someone taps "Order on WhatsApp" */
export const trackWhatsAppClick = ({ product, productName, size, qty, price }) => {
  const refCode = makeRefCode();
  const t = getTouch();

  post("lead.php", {
    refCode,
    visitorKey: getVisitorKey(),
    product, productName, size, qty, price,
    page: window.location.pathname,
    source: t.source, medium: t.medium, campaign: t.campaign,
    referrer: t.referrer,
    device: device(),
  });

  return refCode;      // put this inside the WhatsApp message
};