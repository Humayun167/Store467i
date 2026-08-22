import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Star, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { categories, products, type Product } from "@/lib/marketplace-data";
import { ProductCard } from "./ProductCard";
import { useSitePrefs } from "@/hooks/use-site-prefs";

const filters = ["All", ...categories.map((c) => c.name)];

export function ProductExplorer({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [preview, setPreview] = useState<Product | null>(null);
  const { wishlist } = useSitePrefs();

  const list = useMemo(() => {
    const base = products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchesCat = active === "All" || p.category === active;
      const matchesWish = !onlyWishlist || wishlist.includes(p.id);
      return matchesQuery && matchesCat && matchesWish;
    });
    return compact ? base.slice(0, 6) : base;
  }, [query, active, onlyWishlist, wishlist, compact]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories, stacks…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search products"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                active === f
                  ? "border-transparent bg-[image:var(--gradient-brand)] text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={() => setOnlyWishlist((w) => !w)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
              onlyWishlist ? "border-accent text-accent" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onPreview={setPreview} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No products match that search yet — try a different keyword.
        </p>
      )}

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-[oklch(0_0_0/70%)] p-4 backdrop-blur-sm"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-2xl overflow-hidden rounded-3xl bg-card"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={preview.image}
                  alt={`${preview.name} large preview`}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <button
                  onClick={() => setPreview(null)}
                  aria-label="Close preview"
                  className="glass absolute right-3 top-3 grid size-9 place-items-center rounded-full"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border px-3 py-1">{preview.category}</span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5 fill-secondary text-secondary" /> {preview.rating.toFixed(1)}
                  </span>
                  <span>{preview.sales.toLocaleString()} sales</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold">{preview.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{preview.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-display text-3xl font-bold text-gradient">${preview.price}</span>
                  <button
                    onClick={() => toast.success("Added to cart", { description: preview.name })}
                    className="rounded-full bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Recommendations() {
  const { wishlist } = useSitePrefs();
  const picks = useMemo(() => {
    const wishedCats = products.filter((p) => wishlist.includes(p.id)).map((p) => p.category);
    const scored = [...products]
      .filter((p) => !wishlist.includes(p.id))
      .sort((a, b) => {
        const score = (p: Product) => (wishedCats.includes(p.category) ? 1000 : 0) + p.rating * 100 + p.sales / 100;
        return score(b) - score(a);
      });
    return scored.slice(0, 3);
  }, [wishlist]);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {picks.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass glow-ring rounded-2xl p-5"
        >
          <Sparkles className="size-4 text-secondary" />
          <h4 className="mt-3 font-display text-sm font-semibold">{p.name}</h4>
          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
          <p className="mt-3 text-sm font-semibold text-gradient">${p.price}</p>
        </motion.div>
      ))}
    </div>
  );
}
