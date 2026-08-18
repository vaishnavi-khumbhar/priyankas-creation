import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import OtpAuthForm from "../components/OtpAuthForm";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isAuthed } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthed) navigate(state?.from || "/profile", { replace: true });
  }, [isAuthed, navigate, state]);

  return (
    <section className="bg-gradient-to-b from-brand-soft/60 to-white py-10 lg:py-16">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto grid max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_-40px_rgba(80,20,80,.45)] lg:grid-cols-2"
        >
          {/* brand panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-purple via-brand-magenta to-brand-pink p-10 text-white lg:flex">
            <span className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />

            <p className="relative pb-1 font-script text-[30px] leading-[1.4]">Priyanka&apos;s Creation</p>

            <div className="relative">
              <h2 className="text-4xl font-bold leading-[1.15]">
                Just your<br />mobile number.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
                No passwords to remember. Enter your number, confirm the OTP, and your orders, addresses
                and saved designs are right there.
              </p>
            </div>

            <p className="relative flex items-center gap-2 text-xs text-white/75">
              <ShieldCheck size={15} /> We never share your number.
            </p>
          </div>

          {/* form */}
          <div className="p-6 sm:p-10">
            <OtpAuthForm
              title="Login"
              onDone={() => navigate(state?.from || "/profile", { replace: true })}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}