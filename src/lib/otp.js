/*  OTP adapter
    ────────────────────────────────────────────────────────────────
    Everything OTP-related lives behind these two functions, so the
    whole UI works today with a dev code and needs no changes when a
    real SMS provider is connected.

    DEV MODE (now): a 6-digit code is generated in the browser and
    shown on screen / in the console. No SMS is sent, nothing is paid.

    ⚠️  DEV MODE IS NOT SECURE. Anyone can read the code. Connect a
        real provider before taking live orders.

    ── To switch to Firebase Phone Auth ──────────────────────────
    1. npm i firebase
    2. Firebase console → Authentication → Sign-in method → Phone (enable)
       Blaze (pay-as-you-go) plan is required; SMS is billed per send.
    3. Add your web app config, then replace the two functions below:

    import { initializeApp } from "firebase/app";
    import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

    const app  = initializeApp({ apiKey: "…", authDomain: "…", projectId: "…", appId: "…" });
    const auth = getAuth(app);
    let confirmation = null;

    export async function sendOtp(phone) {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
      }
      confirmation = await signInWithPhoneNumber(auth, `+91${phone}`, window.recaptchaVerifier);
      return { ok: true };
    }

    export async function verifyOtp(phone, code) {
      try {
        await confirmation.confirm(code);
        return { ok: true };
      } catch {
        return { ok: false, error: "Incorrect OTP. Please try again." };
      }
    }

    (add <div id="recaptcha-container" /> once in index.html or App.jsx)
    ──────────────────────────────────────────────────────────── */

export const OTP_LENGTH = 6;
export const RESEND_SECONDS = 60;

/* dev-only store: { "9130059818": { code, expires } } */
const codes = new Map();
const CODE_TTL = 5 * 60 * 1000;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function sendOtp(phone) {
  await wait(700);                                   // feels like a network call
  const code = String(Math.floor(100000 + Math.random() * 900000));
  codes.set(phone, { code, expires: Date.now() + CODE_TTL });

  console.info(`%c[DEV OTP] ${phone} → ${code}`, "color:#D6249F;font-weight:bold");
  return { ok: true, devCode: code };                // devCode is shown on screen; remove with real SMS
}

export async function verifyOtp(phone, entered) {
  await wait(500);
  const record = codes.get(phone);

  if (!record) return { ok: false, error: "Please request a new OTP." };
  if (Date.now() > record.expires) {
    codes.delete(phone);
    return { ok: false, error: "This OTP has expired. Please resend." };
  }
  if (record.code !== entered) return { ok: false, error: "Incorrect OTP. Please try again." };

  codes.delete(phone);
  return { ok: true };
}