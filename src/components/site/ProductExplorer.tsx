import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, X, Sparkles, Filter } from "lucide-react";
import { categories, products, type Product, formatPrice } from "@/lib/marketplace-data";
import { ProductCard } from "./ProductCard";
import { useSitePrefs } from "@/hooks/use-site-prefs";
import { PromptUnlockModal } from "./PromptUnlockModal";

const filters = ["All", ...categories.map((c) => c.name)];

export function ProductExplorer({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [onlyPrompts, setOnlyPrompts] = useState(false);
  const [preview, setPreview] = useState<Product | null>(null);
  const { wishlist } = useSitePrefs();

  const list = useMemo(() => {
    const base = products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.promptData?.model && p.promptData.model.toLowerCase().includes(query.toLowerCase()));
      const matchesCat = active === "All" || p.category === active;
      const matchesWish = !onlyWishlist || wishlist.includes(p.id);
      const matchesPrompts = !onlyPrompts || !!p.promptData;
      return matchesQuery && matchesCat && matchesWish && matchesPrompts;
    });
    return compact ? base.slice(0, 6) : base;
  }, [query, active, onlyWishlist, onlyPrompts, wishlist, compact]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="glass flex items-center gap-3 rounded-full px-5 py-3 shadow-[var(--shadow-soft)]">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts, models (Midjourney, FLUX), templates, code…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search products"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search">
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActive(f);
                if (f === "AI Prompts") setOnlyPrompts(false);
              }}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                active === f
                  ? "border-transparent bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}

          <button
            onClick={() => setOnlyPrompts((p) => !p)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
              onlyPrompts
                ? "border-primary bg-primary/20 text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="size-3 text-secondary" /> AI Image Prompts Only
          </button>

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
          No products or prompts match that search yet — try a different keyword.
        </p>
      )}

      {/* Interactive Prompt & Product Modal */}
      <PromptUnlockModal product={preview} onClose={() => setPreview(null)} />
    </div>
  );
}

export function Recommendations() {
  const { wishlist } = useSitePrefs();
  const [preview, setPreview] = useState<Product | null>(null);

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
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {picks.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setPreview(p)}
            className="glass glow-ring rounded-2xl p-5 cursor-pointer hover:border-primary/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <Sparkles className="size-4 text-secondary" />
              {p.promptData && (
                <span className="text-[10px] bg-primary/20 text-primary-foreground px-2 py-0.5 rounded-full font-bold">
                  {p.promptData.model}
                </span>
              )}
            </div>
            <h4 className="mt-3 font-display text-sm font-semibold">{p.name}</h4>
            <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
            <p className="mt-3 text-sm font-semibold text-gradient">${formatPrice(p.price)}</p>
          </motion.div>
        ))}
      </div>

      <PromptUnlockModal product={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
