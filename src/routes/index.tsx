import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { ProductExplorer, Recommendations } from "@/components/site/ProductExplorer";
import {
  CategoryGrid,
  FeatureGrid,
  PricingTable,
  ProductStrip,
  SectionHeading,
  Testimonials,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Store467i — Premium Source Codes & AI Prompts Marketplace" },
      {
        name: "description",
        content:
          "Buy high-quality AI prompts, source codes, templates and digital products instantly. Lifetime access, instant download, verified quality.",
      },
      { property: "og:title", content: "Store467i — Premium Source Codes & AI Prompts Marketplace" },
      {
        property: "og:description",
        content: "Buy high-quality AI prompts, source codes, templates and digital products instantly.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Browse"
          title="Categories built for builders"
          body="Eight curated verticals, each reviewed by working engineers before anything goes live."
        />
        <div className="mt-12">
          <CategoryGrid />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <SectionHeading
          eyebrow="Marketplace"
          title="Featured products"
          body="Search the catalogue, filter by category, preview before you buy."
        />
        <div className="mt-12">
          <ProductExplorer compact />
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="glass rounded-full px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary"
          >
            View all products
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-8">
        <ProductStrip tag="trending" title="Trending now" />
        <ProductStrip tag="bestseller" title="Best sellers" />
        <ProductStrip tag="new" title="Recently added" />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <SectionHeading
          eyebrow="For you"
          title="AI-powered recommendations"
          body="Picks tuned to the categories you save and the products other builders buy alongside them."
        />
        <div className="mt-10">
          <Recommendations />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="Why Store467i" title="Everything ships with guarantees" />
        <div className="mt-12">
          <FeatureGrid />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <SectionHeading eyebrow="Testimonials" title="Loved by teams that ship weekly" />
        <div className="mt-12">
          <Testimonials />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans, unlimited leverage"
          body="Start free, upgrade when your download habit outpaces your budget."
        />
        <div className="mt-12">
          <PricingTable />
        </div>
      </section>
    </>
  );
}
