import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import OtpAuthForm from "./OtpAuthForm";

/*  <LoginModal open onClose onSuccess />
    onSuccess runs after a verified OTP — use it to continue whatever
    the customer was doing (e.g. proceed to checkout).                */
export default function LoginModal({ open, onClose, onSuccess, title = "Login" }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

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
              className="pointer-events-auto relative w-full max-w-[440px] rounded-[26px] bg-white p-6 shadow-2xl sm:p-8"
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-brand-ink transition-colors hover:text-brand-magenta"
              >
                <X size={17} />
              </button>

              <OtpAuthForm
                title={title}
                onDone={() => { onClose(); onSuccess?.(); }}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}