import { createFileRoute } from "@tanstack/react-router";
import { ProductExplorer } from "@/components/site/ProductExplorer";
import { SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Store467i Digital Marketplace" },
      {
        name: "description",
        content:
          "Browse every source code, AI prompt pack, template, UI kit and course on Store467i. Search, filter and preview instantly.",
      },
      { property: "og:title", content: "All Products — Store467i Digital Marketplace" },
      {
        property: "og:description",
        content: "Search, filter and preview premium developer products with instant download.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8">
      <SectionHeading
        eyebrow="Catalogue"
        title="Every product, one place"
        body="Filter by category, save favourites to your wishlist, and preview before you buy."
      />
      <div className="mt-12">
        <ProductExplorer />
      </div>
    </section>
  );
}
