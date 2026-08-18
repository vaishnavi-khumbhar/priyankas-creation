import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, X, AlertCircle } from "lucide-react";
import logo from "../assets/logo_r.png";
import { useAuth } from "../context/AuthContext";

/*  <LoginModal open={x} onClose={...} onSuccess={...} />
    onSuccess runs right after a successful login/signup —
    use it to continue whatever the user was doing (e.g. pay).  */
export default function LoginModal({ open, onClose, onSuccess, title = "Welcome back" }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  useEffect(() => {
    if (!open) return;
    setError("");
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (form.name.trim().length < 2) return setError("Please enter your name.");
      if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) return setError("Enter a valid 10-digit mobile number.");
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Please enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    const res = mode === "login" ? login(form) : signup(form);
    if (!res.ok) return setError(res.error);

    onClose();
    onSuccess?.();
  };

  const field = "flex items-center gap-3 rounded-2xl bg-brand-soft/70 px-4 ring-1 ring-transparent transition-all focus-within:bg-white focus-within:ring-brand-pink/50";
  const inputCls = "h-12 w-full bg-transparent text-[15px] text-brand-ink outline-none placeholder:text-brand-muted/70";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-brand-ink/50 backdrop-blur-sm"
          />

          <div className="pointer-events-none fixed inset-0 z-[105] grid place-items-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="pointer-events-auto relative w-full max-w-[420px] overflow-hidden rounded-[26px] bg-white shadow-2xl"
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand-ink shadow hover:text-brand-magenta"
              >
                <X size={17} />
              </button>

              {/* header */}
              <div className="bg-gradient-to-b from-brand-soft to-white px-6 pb-5 pt-8 text-center">
                <img src={logo} alt="Priyanka's Creation" className="mx-auto h-16 w-16 rounded-full object-cover ring-2 ring-brand-gold/60" />
                <p className="mt-3 text-sm text-brand-muted">
                  {mode === "login" ? title : "Join us"}
                </p>
                <p className="bg-gradient-to-r from-brand-pink via-brand-magenta to-brand-purple bg-clip-text font-script text-[30px] leading-tight text-transparent">
                  Priyanka&apos;s Creation
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-gold">
                  Custom Designs &amp; Gifts
                </p>
              </div>

              {/* form */}
              <form onSubmit={submit} className="grid gap-3 px-6 pb-7">
                {mode === "signup" && (
                  <>
                    <div className={field}>
                      <User size={17} className="shrink-0 text-brand-magenta/70" />
                      <input className={inputCls} placeholder="Full name" value={form.name} onChange={set("name")} />
                    </div>
                    <div className={field}>
                      <Phone size={17} className="shrink-0 text-brand-magenta/70" />
                      <input className={inputCls} placeholder="Mobile number" inputMode="numeric" value={form.phone} onChange={set("phone")} />
                    </div>
                  </>
                )}

                <div className={field}>
                  <Mail size={17} className="shrink-0 text-brand-magenta/70" />
                  <input className={inputCls} type="email" placeholder="Email address" value={form.email} onChange={set("email")} autoComplete="email" />
                </div>

                <div className={field}>
                  <Lock size={17} className="shrink-0 text-brand-magenta/70" />
                  <input
                    className={inputCls}
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={set("password")}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                  <button type="button" onClick={() => setShow((v) => !v)} aria-label="Toggle password" className="shrink-0 text-brand-muted hover:text-brand-magenta">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {error && (
                  <p className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-600">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-1 h-12 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple text-[15px] font-bold text-white shadow-[0_14px_30px_-14px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5"
                >
                  {mode === "login" ? "Login" : "Create account"}
                </button>

                <div className="mt-1 border-t border-pink-100 pt-4 text-center text-[13px] text-brand-muted">
                  {mode === "login" ? "New here? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                    className="font-bold text-brand-magenta underline underline-offset-2"
                  >
                    {mode === "login" ? "Create an account" : "Login"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}