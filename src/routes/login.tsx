import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Store467i Account Access" },
      {
        name: "description",
        content:
          "Sign in to your Store467i account to re-download purchases, manage licences and track your wishlist.",
      },
      { property: "og:title", content: "Login — Store467i Account Access" },
      {
        property: "og:description",
        content: "Sign in to manage purchases, licences and downloads.",
      },
    ],
  }),
  component: LoginPage,
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

function LoginPage() {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back! 🎉");
      navigate({ to: "/" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast.error(friendlyError(msg));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleBusy(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google! 🎉");
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
              <LogIn className="size-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold">Welcome back</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to access your downloads and licences.
            </p>
          </div>

          {/* Google */}
          <button
            id="login-google-btn"
            type="button"
            onClick={handleGoogleLogin}
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
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email form */}
          <form id="login-form" onSubmit={handleEmailLogin} className="grid gap-4">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="login-email"
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
                id="login-password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-border bg-transparent py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={busy || googleBusy}
              className="flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link to="/register" className="text-secondary font-medium hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── helpers ──────────────────────────────────────────── */

function friendlyError(msg: string): string {
  if (msg.includes("invalid-credential") || msg.includes("wrong-password"))
    return "Incorrect email or password.";
  if (msg.includes("user-not-found")) return "No account found with that email.";
  if (msg.includes("too-many-requests")) return "Too many attempts. Try again later.";
  if (msg.includes("network-request-failed")) return "Network error. Check your connection.";
  return msg;
}
