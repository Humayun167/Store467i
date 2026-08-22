import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Camera,
  LogOut,
  Mail,
  User,
  ShoppingBag,
  Heart,
  Shield,
  Edit3,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/hooks/use-auth";
import { useSitePrefs } from "@/hooks/use-site-prefs";
import { auth } from "@/lib/firebase";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Store467i" },
      { name: "description", content: "Manage your Store467i account, profile details and wishlist." },
    ],
  }),
  component: ProfilePage,
});

/* ─── Stat card ─────────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  gradient: string;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div
        className="mb-3 grid size-10 place-items-center rounded-xl"
        style={{ background: gradient }}
      >
        <Icon className="size-5 text-white" />
      </div>
      <p className="text-2xl font-bold font-display">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────── */
function ProfilePage() {
  const { currentUser, signOut } = useAuth();
  const { wishlist } = useSitePrefs();
  const navigate = useNavigate();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [savingName, setSavingName] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Redirect if not logged in */
  useEffect(() => {
    if (currentUser === null) {
      navigate({ to: "/login" });
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  const initials = currentUser.displayName
    ? currentUser.displayName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("")
    : currentUser.email?.[0]?.toUpperCase() ?? "?";

  const joinedDate = currentUser.metadata.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "—";

  /* ── Save display name ─────────────────────────────── */
  async function saveName() {
    if (!nameInput.trim()) return;
    setSavingName(true);
    try {
      await updateProfile(auth.currentUser!, { displayName: nameInput.trim() });
      toast.success("Name updated!");
      setEditingName(false);
    } catch {
      toast.error("Failed to update name.");
    } finally {
      setSavingName(false);
    }
  }

  /* ── Sign out ──────────────────────────────────────── */
  async function handleSignOut() {
    try {
      await signOut();
      toast.success("Signed out. See you soon!");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to sign out.");
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 aurora opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[130px] opacity-15"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="relative mx-auto max-w-4xl">
        {/* ── Header card ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 shadow-[var(--shadow-glow)]"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName ?? "User"}
                  className="size-24 rounded-3xl object-cover ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                />
              ) : (
                <div className="grid size-24 place-items-center rounded-3xl bg-[image:var(--gradient-brand)] text-3xl font-bold text-white shadow-[var(--shadow-glow)]">
                  {initials}
                </div>
              )}
              {/* Photo upload hint (UI only — Firebase Storage not wired) */}
              <button
                id="profile-avatar-btn"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 grid size-8 place-items-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
                title="Change photo"
              >
                <Camera className="size-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={() =>
                  toast.info("Photo upload coming soon!", {
                    description: "Firebase Storage integration will be added shortly.",
                  })
                }
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* Display name */}
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    id="profile-name-input"
                    autoFocus
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveName();
                      if (e.key === "Escape") setEditingName(false);
                    }}
                    placeholder="Your name"
                    className="rounded-xl border border-primary bg-transparent px-3 py-1.5 text-lg font-bold outline-none"
                  />
                  <button
                    id="profile-name-save-btn"
                    onClick={saveName}
                    disabled={savingName}
                    className="grid size-8 place-items-center rounded-lg bg-primary text-white transition hover:bg-primary/80"
                  >
                    {savingName ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                  </button>
                  <button
                    onClick={() => setEditingName(false)}
                    className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="font-display text-2xl font-bold">
                    {currentUser.displayName ?? "Anonymous"}
                  </h1>
                  <button
                    id="profile-name-edit-btn"
                    onClick={() => {
                      setNameInput(currentUser.displayName ?? "");
                      setEditingName(true);
                    }}
                    className="grid size-7 place-items-center rounded-lg text-muted-foreground transition hover:text-foreground"
                    title="Edit name"
                  >
                    <Edit3 className="size-3.5" />
                  </button>
                </div>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5" />
                  {currentUser.email}
                </span>
                {currentUser.emailVerified && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                    <Shield className="size-3" />
                    Verified
                  </span>
                )}
              </div>

              <p className="mt-1.5 text-xs text-muted-foreground">
                Member since {joinedDate}
              </p>

              {/* Provider badge */}
              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                {currentUser.providerData.map((p) => (
                  <span
                    key={p.providerId}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground capitalize"
                  >
                    {p.providerId === "google.com" ? "🔵 Google" : p.providerId}
                  </span>
                ))}
              </div>
            </div>

            {/* Sign out */}
            <button
              id="profile-signout-btn"
              onClick={handleSignOut}
              className="flex shrink-0 items-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </motion.div>

        {/* ── Stats row ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          <StatCard
            icon={ShoppingBag}
            label="Purchases"
            value={0}
            gradient="linear-gradient(135deg, oklch(0.55 0.24 296), oklch(0.65 0.24 320))"
          />
          <StatCard
            icon={Heart}
            label="Wishlist items"
            value={wishlist.length}
            gradient="linear-gradient(135deg, oklch(0.69 0.21 3), oklch(0.75 0.18 30))"
          />
          <StatCard
            icon={User}
            label="Account type"
            value="Free"
            gradient="linear-gradient(135deg, oklch(0.83 0.14 200), oklch(0.75 0.16 220))"
          />
        </motion.div>

        {/* ── Account details card ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass mt-6 rounded-3xl p-8"
        >
          <h2 className="font-display text-lg font-semibold mb-5">Account Details</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Display name", value: currentUser.displayName ?? "—" },
              { label: "Email address", value: currentUser.email ?? "—" },
              { label: "User ID", value: currentUser.uid },
              { label: "Member since", value: joinedDate },
              {
                label: "Email verified",
                value: currentUser.emailVerified ? "Yes ✅" : "No ❌",
              },
              {
                label: "Last sign-in",
                value: currentUser.metadata.lastSignInTime
                  ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—",
              },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl border border-border px-4 py-3">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 truncate text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ── Quick links ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {[
            { to: "/products", label: "Browse Products", icon: ShoppingBag },
            { to: "/pricing", label: "Upgrade Plan", icon: Shield },
            { to: "/contact", label: "Get Support", icon: Mail },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="glow-ring glass flex items-center gap-3 rounded-2xl p-4 text-sm font-medium transition-colors hover:text-primary"
            >
              <Icon className="size-4 shrink-0 text-primary" />
              {label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
