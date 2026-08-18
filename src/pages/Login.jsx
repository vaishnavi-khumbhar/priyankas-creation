import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import logo from "../assets/logo.jpg";
import { useAuth } from "../context/AuthContext";

const Field = ({ Icon, children }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-brand-soft/70 px-4 ring-1 ring-transparent transition-all focus-within:bg-white focus-within:ring-brand-pink/50">
    <Icon size={17} className="shrink-0 text-brand-magenta/70" />
    {children}
  </div>
);

const inputCls =
  "h-13 w-full bg-transparent py-3.5 text-sm text-brand-ink outline-none placeholder:text-brand-muted/70";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (form.name.trim().length < 2) return setError("Please enter your name.");
      if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) return setError("Please enter a valid 10-digit mobile number.");
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Please enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    const res = mode === "login" ? login(form) : signup(form);
    if (!res.ok) return setError(res.error);
    navigate(state?.from || "/profile", { replace: true });
  };

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-10 lg:py-16">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto grid max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_-40px_rgba(80,20,80,.45)] lg:grid-cols-2"
        >
          {/* ── brand panel ── */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-purple via-brand-magenta to-brand-pink p-10 text-white lg:flex">
            <span className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />

            <Link to="/" className="relative flex items-center gap-3">
              <img src={logo} alt="Priyanka's Creation" className="h-12 w-12 rounded-full object-cover ring-2 ring-white/60" />
              <span className="font-script text-[26px] leading-none">Priyanka&apos;s Creation</span>
            </Link>

            <div className="relative">
              <h2 className="font-display text-4xl font-bold leading-[1.15]">
                Personalized<br />with love.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
                {mode === "login"
                  ? "Sign in to track your orders, save addresses and revisit the designs your little one loved."
                  : "Create an account to save your favourite designs, reorder in seconds and keep your delivery details ready."}
              </p>
            </div>

            <p className="relative flex items-center gap-2 text-xs text-white/75">
              <ShieldCheck size={15} /> Your details are kept private and secure.
            </p>
          </div>

          {/* ── form panel ── */}
          <div className="p-6 sm:p-10">
            {/* mobile logo */}
            <Link to="/" className="mb-6 flex items-center gap-2.5 lg:hidden">
              <img src={logo} alt="" className="h-11 w-11 rounded-full object-cover ring-1 ring-brand-gold/60" />
              <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text font-script text-2xl text-transparent">
                Priyanka&apos;s Creation
              </span>
            </Link>

            {/* tabs */}
            <div className="grid grid-cols-2 gap-1 rounded-full bg-brand-soft p-1">
              {["login", "signup"].map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); }}
                  className={`h-11 rounded-full text-sm font-semibold transition-all ${
                    mode === m
                      ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow"
                      : "text-brand-ink hover:text-brand-magenta"
                  }`}
                >
                  {m === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>

            <h1 className="mt-7 font-display text-3xl font-bold text-brand-ink">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              {mode === "login" ? "Enter your details to continue." : "It takes less than a minute."}
            </p>

            <form onSubmit={submit} className="mt-6 grid gap-3">
              <AnimatePresence>
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid gap-3 overflow-hidden"
                  >
                    <Field Icon={User}>
                      <input className={inputCls} placeholder="Full name" value={form.name} onChange={set("name")} autoComplete="name" />
                    </Field>
                    <Field Icon={Phone}>
                      <input className={inputCls} placeholder="Mobile number" value={form.phone} onChange={set("phone")} inputMode="numeric" autoComplete="tel" />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              <Field Icon={Mail}>
                <input className={inputCls} type="email" placeholder="Email address" value={form.email} onChange={set("email")} autoComplete="email" />
              </Field>

              <Field Icon={Lock}>
                <input
                  className={inputCls}
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={set("password")}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password" className="shrink-0 text-brand-muted hover:text-brand-magenta">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </Field>

              {mode === "login" && (
                <button type="button" className="justify-self-end text-xs font-semibold text-brand-magenta hover:underline">
                  Forgot password?
                </button>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-600"
                  >
                    <AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="mt-2 h-12 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple font-semibold text-white shadow-[0_14px_30px_-14px_rgba(214,36,159,.9)] transition-transform hover:-translate-y-0.5"
              >
                {mode === "login" ? "Login" : "Create account"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-brand-muted">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                className="font-semibold text-brand-magenta hover:underline"
              >
                {mode === "login" ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}