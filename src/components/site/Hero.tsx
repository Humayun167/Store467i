import { Link } from "@tanstack/react-router";
import { motion, useInView, animate } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { stats } from "@/lib/marketplace-data";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
      <div className="pointer-events-none absolute inset-0">
        {mounted && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-secondary" />
            New: 1200 tested AI prompts added this week
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Premium Source Codes &<br className="hidden sm:block" />
            <span className="text-gradient"> AI Prompts Marketplace</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Buy high-quality AI prompts, source codes, templates, and digital products instantly.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Explore Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/register"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
            >
              Start Selling
            </Link>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="glass rounded-2xl px-4 py-5"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </dd>
                <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
