import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Heart, Menu, Moon, Sun, X, Boxes, LogOut, ChevronDown, User } from "lucide-react";
import { useSitePrefs } from "@/hooks/use-site-prefs";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme, wishlist } = useSitePrefs();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleSignOut() {
    try {
      await signOut();
      toast.success("Signed out. See you soon!");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to sign out.");
    } finally {
      setUserMenuOpen(false);
    }
  }

  // Avatar initials helper
  const initials = currentUser?.displayName
    ? currentUser.displayName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("")
    : currentUser?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[var(--shadow-soft)]" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)]">
            <Boxes className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Store<span className="text-gradient">467i</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="relative z-10">{l.label}</span>
                <motion.span
                  layoutId="nav-hover"
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <Link
            to="/products"
            aria-label="Wishlist"
            className="relative hidden size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground sm:grid"
          >
            <Heart className="size-4" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* ── Auth section ─────────────────────────── */}
          {currentUser ? (
            /* User avatar + dropdown */
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                id="nav-user-menu-btn"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-border pl-1 pr-3 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                {/* Avatar */}
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName ?? "User"}
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-7 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-[11px] font-bold text-white">
                    {initials}
                  </span>
                )}
                <span className="max-w-[100px] truncate">
                  {currentUser.displayName ?? currentUser.email}
                </span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="glass absolute right-0 top-full mt-2 min-w-[180px] rounded-2xl p-2 shadow-[var(--shadow-soft)]"
                  >
                    <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border mb-1 truncate">
                      {currentUser.email}
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <User className="size-4" />
                      My Profile
                    </Link>
                    <button
                      id="nav-signout-btn"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Not logged in */
            <>
              <Link
                to="/login"
                className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden rounded-full bg-[image:var(--gradient-brand)] px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 sm:block"
              >
                Register
              </Link>
            </>
          )}

          <button
            className="grid size-9 place-items-center rounded-full border border-border lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden glass lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {[
                ...links,
                ...(currentUser
                  ? []
                  : [
                      { to: "/login" as const, label: "Login" },
                      { to: "/register" as const, label: "Register" },
                    ]),
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {currentUser && (
                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
