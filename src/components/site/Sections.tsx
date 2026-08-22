import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { categories, features, plans, products, testimonials } from "@/lib/marketplace-data";

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Box;
  return <Cmp {...(className ? { className } : {})} />;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-muted-foreground">{body}</p>}
    </motion.div>
  );
}

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.05 }}
        >
          <Link
            to="/products"
            className="glass glow-ring group flex h-full flex-col justify-between rounded-3xl p-6 transition-transform hover:-translate-y-1"
          >
            <span className="grid size-11 place-items-center rounded-2xl bg-[image:var(--gradient-brand)]">
              <Icon name={c.icon} className="size-5 text-primary-foreground" />
            </span>
            <div className="mt-8">
              <h3 className="font-display text-base font-semibold">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.count} products</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function FeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.06 }}
          whileHover={{ y: -4 }}
          className="glass glow-ring rounded-3xl p-6"
        >
          <motion.span
            whileHover={{ rotate: 8, scale: 1.08 }}
            className="grid size-11 place-items-center rounded-2xl border border-border text-secondary"
          >
            <Icon name={f.icon} className="size-5" />
          </motion.span>
          <h3 className="mt-5 font-display text-base font-semibold">{f.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {testimonials.map((t, i) => (
        <motion.figure
          key={t.name}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          whileHover={{ y: -4 }}
          className="glass glow-ring rounded-3xl p-6"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, s) => (
              <Icons.Star
                key={s}
                className={`size-4 ${s < t.rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.review}"</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-semibold text-primary-foreground">
              {t.initials}
            </span>
            <span className="text-sm">
              <span className="block font-semibold">{t.name}</span>
              <span className="text-xs text-muted-foreground">
                {t.role}, {t.company}
              </span>
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

export function PricingTable() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ y: -6 }}
          className={`relative flex flex-col rounded-3xl p-7 ${
            p.highlight
              ? "border border-transparent bg-card shadow-[var(--shadow-glow)]"
              : "glass glow-ring"
          }`}
        >
          {p.highlight && (
            <span className="absolute -top-3 left-7 rounded-full bg-[image:var(--gradient-brand)] px-3 py-1 text-[11px] font-semibold text-primary-foreground">
              Most popular
            </span>
          )}
          <h3 className="font-display text-lg font-semibold">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
          <p className="mt-6 font-display text-4xl font-bold">
            ${p.price}
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </p>
          <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Icons.Check className="size-4 text-secondary" /> {f}
              </li>
            ))}
          </ul>
          <Link
            to="/register"
            className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
              p.highlight
                ? "bg-[image:var(--gradient-brand)] text-primary-foreground"
                : "border border-border"
            }`}
          >
            {p.cta}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function ProductStrip({ tag, title }: { tag: "trending" | "bestseller" | "new"; title: string }) {
  const list = products.filter((p) => p.tags.includes(tag)).slice(0, 4);
  return (
    <div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="glass glow-ring flex items-center gap-3 rounded-2xl p-3"
          >
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              width={800}
              height={600}
              className="size-14 shrink-0 rounded-xl object-cover"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{p.name}</span>
              <span className="text-xs text-muted-foreground">${p.price}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
