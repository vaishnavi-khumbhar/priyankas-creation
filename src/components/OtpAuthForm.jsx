import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, AlertCircle, Check, Loader2 } from "lucide-react";
import logo from "../assets/logo_r.png";
import { useAuth } from "../context/AuthContext";
import { OTP_LENGTH, RESEND_SECONDS } from "../lib/otp";

/*  Two-step phone login used by both the modal and the /login page.
    Step 1 → mobile number · Step 2 → OTP boxes
    Only the brand name uses font-script; everything else is the body font. */
export default function OtpAuthForm({ onDone, title = "Login" }) {
  const { sendOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState("phone");          // phone | otp
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(true);
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");
  const [devCode, setDevCode] = useState("");         // remove once real SMS is live

  const boxes = useRef([]);
  const code = digits.join("");

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  useEffect(() => {
    if (step === "otp") setTimeout(() => boxes.current[0]?.focus(), 150);
  }, [step]);

  const requestOtp = async (e) => {
    e?.preventDefault();
    setError("");
    if (phone.length !== 10) return setError("Please enter a valid 10-digit mobile number.");
    if (!agree) return setError("Please accept the terms to continue.");

    setBusy(true);
    const res = await sendOtp(phone);
    setBusy(false);

    if (!res.ok) return setError(res.error);
    setStep("otp");
    setDigits(Array(OTP_LENGTH).fill(""));
    setSeconds(RESEND_SECONDS);
    setSent("OTP sent successfully");
    setDevCode(res.devCode || "");
    setTimeout(() => setSent(""), 2500);
  };

  const submitOtp = async (e) => {
    e?.preventDefault();
    setError("");
    if (code.length !== OTP_LENGTH) return setError(`Please enter the ${OTP_LENGTH}-digit OTP.`);

    setBusy(true);
    const res = await verifyOtp(phone, code);
    setBusy(false);

    if (!res.ok) {
      setDigits(Array(OTP_LENGTH).fill(""));
      boxes.current[0]?.focus();
      return setError(res.error);
    }
    onDone?.(res);
  };

  const setDigit = (i, v) => {
    const only = v.replace(/\D/g, "");
    if (!only) {
      setDigits((d) => d.map((x, k) => (k === i ? "" : x)));
      return;
    }
    if (only.length > 1) {                            // pasted whole code
      const arr = only.slice(0, OTP_LENGTH).split("");
      setDigits(Array.from({ length: OTP_LENGTH }, (_, k) => arr[k] ?? ""));
      boxes.current[Math.min(arr.length, OTP_LENGTH - 1)]?.focus();
      return;
    }
    setDigits((d) => d.map((x, k) => (k === i ? only : x)));
    if (i < OTP_LENGTH - 1) boxes.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) boxes.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) boxes.current[i + 1]?.focus();
  };

  const mm = String(Math.floor(seconds / 60));
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {step === "phone" ? (
          /* ══════════ STEP 1 — mobile number ══════════ */
          <motion.form
            key="phone"
            onSubmit={requestOtp}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
          >
            <img src={logo} alt="Priyanka's Creation" className="h-16 w-16 rounded-full object-cover ring-2 ring-brand-gold/60" />

            <p className="mt-4 text-[15px] text-brand-muted">Welcome to</p>
            <p className="bg-gradient-to-r from-brand-pink via-brand-magenta to-brand-purple bg-clip-text pb-0.5 font-script text-[30px] leading-[1.4] text-transparent">
              Priyanka&apos;s Creation
            </p>
            <h2 className="text-2xl font-bold text-brand-ink">{title}</h2>

            <label className="mt-6 block text-[13px] font-semibold text-brand-ink">Mobile Number</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-pink-200 bg-white px-4 transition-all focus-within:border-brand-pink/60 focus-within:ring-2 focus-within:ring-brand-pink/15">
              <span className="shrink-0 border-r border-pink-100 pr-3 text-[15px] font-semibold text-brand-ink">+91</span>
              <input
                autoFocus
                inputMode="numeric"
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
                placeholder="Enter your mobile number"
                className="h-12 w-full bg-transparent text-[15px] tracking-wide text-brand-ink outline-none placeholder:text-brand-muted/70"
              />
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12px] leading-5 text-brand-muted">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand-magenta"
              />
              <span>
                Yes, I accept the <span className="font-semibold text-brand-magenta underline">terms and conditions</span> and
                want to receive order updates on WhatsApp / SMS.
              </span>
            </label>

            {error && (
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-[13px] text-red-600">
                <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={phone.length !== 10 || busy}
              className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-bold text-white transition-all ${
                phone.length === 10 && !busy
                  ? "bg-gradient-to-r from-brand-pink to-brand-purple shadow-[0_14px_30px_-14px_rgba(214,36,159,.9)] hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-pink-200"
              }`}
            >
              {busy && <Loader2 size={17} className="animate-spin" />}
              {busy ? "Sending…" : "Get OTP"}
            </button>
          </motion.form>
        ) : (
          /* ══════════ STEP 2 — OTP ══════════ */
          <motion.form
            key="otp"
            onSubmit={submitOtp}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-[15px] text-brand-muted">OTP sent to</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              {/* plain body font — no font-display */}
              <p className="text-2xl font-bold tracking-wide text-brand-ink">+91 {phone}</p>
              <button
                type="button"
                onClick={() => { setStep("phone"); setError(""); setDevCode(""); }}
                className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-brand-magenta hover:underline"
              >
                <Pencil size={13} /> Edit number
              </button>
            </div>

            <label className="mt-6 block text-[13px] font-semibold text-brand-ink">Enter OTP</label>
            <div className="mt-2 flex gap-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (boxes.current[i] = el)}
                  value={d}
                  onChange={(e) => { setDigit(i, e.target.value); setError(""); }}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  inputMode="numeric"
                  maxLength={OTP_LENGTH}
                  aria-label={`OTP digit ${i + 1}`}
                  className="w-full min-w-0 rounded-xl border border-pink-200 bg-white py-3 text-center text-lg font-bold text-brand-ink outline-none transition-all focus:border-brand-pink/70 focus:ring-2 focus:ring-brand-pink/15"
                />
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              {devCode ? (
                <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-magenta">
                  Dev OTP: {devCode}
                </span>
              ) : <span />}

              {seconds > 0 ? (
                <span className="text-[13px] text-brand-muted">Resend in {mm}:{ss}</span>
              ) : (
                <button type="button" onClick={requestOtp} className="text-[13px] font-semibold text-brand-magenta hover:underline">
                  Resend OTP
                </button>
              )}
            </div>

            {error && (
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-[13px] text-red-600">
                <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={code.length !== OTP_LENGTH || busy}
              className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-bold text-white transition-all ${
                code.length === OTP_LENGTH && !busy
                  ? "bg-gradient-to-r from-brand-pink to-brand-purple shadow-[0_14px_30px_-14px_rgba(214,36,159,.9)] hover:-translate-y-0.5"
                  : "cursor-not-allowed bg-pink-200"
              }`}
            >
              {busy && <Loader2 size={17} className="animate-spin" />}
              {busy ? "Verifying…" : "Verify OTP"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* success toast */}
      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed inset-x-4 bottom-8 z-[140] mx-auto flex w-fit items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            <Check size={16} /> {sent}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}