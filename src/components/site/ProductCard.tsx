import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import type { MouseEvent } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/marketplace-data";
import { useSitePrefs } from "@/hooks/use-site-prefs";

export function ProductCard({ product, onPreview }: { product: Product; onPreview: (p: Product) => void }) {
  const { isWished, toggleWishlist } = useSitePrefs();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const wished = isWished(product.id);

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glass glow-ring group relative flex flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} preview`}
          loading="lazy"
          width={800}
          height={600}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_55%)] opacity-80" />
        <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium">
          {product.category}
        </span>
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="glass absolute right-3 top-3 grid size-9 place-items-center rounded-full transition-colors hover:border-accent"
        >
          <Heart className={`size-4 ${wished ? "fill-accent text-accent" : "text-muted-foreground"}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold leading-snug">{product.name}</h3>
          <span className="shrink-0 font-display text-lg font-bold text-gradient">${product.price}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-secondary text-secondary" />
          <span className="text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {product.sales.toLocaleString()} sales</span>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => onPreview(product)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-secondary"
          >
            <Eye className="size-4" /> Preview
          </button>
          <button
            onClick={() => toast.success("Added to cart", { description: product.name })}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <ShoppingCart className="size-4" /> Buy now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
