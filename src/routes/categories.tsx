import { createFileRoute } from "@tanstack/react-router";
import { CategoryGrid, FeatureGrid, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — AI Prompts, Source Codes & UI Kits | Store467i" },
      {
        name: "description",
        content:
          "Explore Store467i categories: AI prompts, source codes, React templates, Flutter apps, web scripts, UI kits, e-books and courses.",
      },
      { property: "og:title", content: "Categories — AI Prompts, Source Codes & UI Kits" },
      {
        property: "og:description",
        content: "Eight curated verticals of premium digital products for developers and designers.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8">
        <SectionHeading
          eyebrow="Explore"
          title="Categories"
          body="Each vertical is curated and version-checked, so what you download actually runs."
        />
        <div className="mt-12">
          <CategoryGrid />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading eyebrow="Standards" title="What every category guarantees" />
        <div className="mt-12">
          <FeatureGrid />
        </div>
      </section>
    </>
  );
}
