import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Start Selling on Store467i" },
      {
        name: "description",
        content:
          "Create a free Store467i account to buy premium digital products or start selling your own source codes and AI prompts.",
      },
      { property: "og:title", content: "Register — Start Selling on Store467i" },
      {
        property: "og:description",
        content: "Create a free account to buy or sell premium digital products.",
      },
    ],
  }),
  component: RegisterPage,
});

/* ─── Google Icon SVG ──────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

/* ─── Page ─────────────────────────────────────────────── */

function RegisterPage() {
  const { signInWithGoogle, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      await signUpWithEmail(name, email, password);
      toast.success("Account created! Welcome to Store467i 🎉");
      navigate({ to: "/" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign-up failed";
      toast.error(friendlyError(msg));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleSignUp() {
    setGoogleBusy(true);
    try {
      await signInWithGoogle();
      toast.success("Signed up with Google! Welcome 🎉");
      navigate({ to: "/" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed";
      if (!msg.includes("popup-closed")) toast.error(friendlyError(msg));
    } finally {
      setGoogleBusy(false);
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center px-5 pb-12 pt-24 overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 aurora opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[120px] opacity-20"
        style={{ background: "var(--gradient-brand)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-[var(--shadow-glow)]">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)]">
              <UserPlus className="size-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold">Create your account</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Buy instantly, or list your first product in minutes.
            </p>
          </div>

          {/* Google */}
          <button
            id="register-google-btn"
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleBusy || busy}
            className="glow-ring relative flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium transition-all duration-200 hover:border-primary/50 hover:bg-muted disabled:opacity-60"
          >
            {googleBusy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or sign up with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email form */}
          <form id="register-form" onSubmit={handleSignUp} className="grid gap-4">
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="register-name"
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-border bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="register-email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-border bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="register-password"
                type="password"
                required
                minLength={6}
                placeholder="Password (min. 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-border bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={busy || googleBusy}
              className="flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── helpers ──────────────────────────────────────────── */

function friendlyError(msg: string): string {
  if (msg.includes("email-already-in-use"))
    return "An account with this email already exists.";
  if (msg.includes("weak-password")) return "Password is too weak. Use at least 6 characters.";
  if (msg.includes("invalid-email")) return "Please enter a valid email address.";
  if (msg.includes("network-request-failed")) return "Network error. Check your connection.";
  return msg;
}
