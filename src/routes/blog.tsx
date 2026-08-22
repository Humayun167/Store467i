import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Prompt Engineering & Shipping Notes | Store467i" },
      {
        name: "description",
        content:
          "Essays on prompt engineering, boilerplate architecture, licensing and selling digital products as an independent developer.",
      },
      { property: "og:title", content: "Blog — Prompt Engineering & Shipping Notes" },
      {
        property: "og:description",
        content: "Practical writing on prompts, boilerplates, licensing and selling digital products.",
      },
    ],
  }),
  component: BlogPage,
});

const posts = [
  {
    title: "Why most prompt libraries fail after two weeks",
    excerpt: "Prompts rot as models change. Here's the versioning discipline we use to keep a 1200-prompt vault alive.",
    date: "Aug 12, 2026",
    read: "7 min",
    tag: "AI Prompts",
  },
  {
    title: "Boilerplate architecture that survives its first pivot",
    excerpt: "Auth, billing and roles are easy. The hard part is drawing seams that don't tear when the product changes.",
    date: "Aug 4, 2026",
    read: "11 min",
    tag: "Engineering",
  },
  {
    title: "Licensing digital products without a lawyer on retainer",
    excerpt: "Standard vs extended licences explained in plain language, plus the clauses that actually matter.",
    date: "Jul 22, 2026",
    read: "6 min",
    tag: "Business",
  },
  {
    title: "Shipping 3D on the web without tanking your Lighthouse score",
    excerpt: "Budget your polygons, lazy-load your canvas and know when a gradient beats a GPU.",
    date: "Jul 9, 2026",
    read: "9 min",
    tag: "Performance",
  },
];

function BlogPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8">
      <SectionHeading
        eyebrow="Journal"
        title="Notes from the marketplace"
        body="What we learn reviewing thousands of products, written for people who ship."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass glow-ring rounded-3xl p-7"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border px-3 py-1 text-secondary">{p.tag}</span>
              <span>{p.date}</span>
              <span>· {p.read} read</span>
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">{p.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
