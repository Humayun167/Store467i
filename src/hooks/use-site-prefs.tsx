import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

type SitePrefs = {
  theme: Theme;
  toggleTheme: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
};

const SitePrefsContext = createContext<SitePrefs | null>(null);

export function SitePrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("nx-theme") as Theme | null;
    if (storedTheme) setTheme(storedTheme);
    const storedWishlist = window.localStorage.getItem("nx-wishlist");
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist) as string[]);
      } catch {
        /* ignore malformed storage */
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    window.localStorage.setItem("nx-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("nx-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const toggleWishlist = useCallback(
    (id: string) => setWishlist((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
    [],
  );
  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const value = useMemo(
    () => ({ theme, toggleTheme, wishlist, toggleWishlist, isWished }),
    [theme, toggleTheme, wishlist, toggleWishlist, isWished],
  );

  return <SitePrefsContext.Provider value={value}>{children}</SitePrefsContext.Provider>;
}

export function useSitePrefs() {
  const ctx = useContext(SitePrefsContext);
  if (!ctx) throw new Error("useSitePrefs must be used inside SitePrefsProvider");
  return ctx;
}
