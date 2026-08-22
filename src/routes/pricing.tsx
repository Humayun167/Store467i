import { createFileRoute } from "@tanstack/react-router";
import { PricingTable, SectionHeading, Testimonials } from "@/components/site/Sections";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Starter, Pro & Enterprise | Store467i" },
      {
        name: "description",
        content:
          "Transparent Store467i pricing: start free, go Pro for unlimited downloads and commercial licenses, or scale with Enterprise team seats.",
      },
      { property: "og:title", content: "Pricing — Starter, Pro & Enterprise" },
      {
        property: "og:description",
        content: "Start free, upgrade for unlimited downloads, commercial licenses and team seats.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Pay for leverage, not licences"
          body="Every plan includes instant download, lifetime access and free updates."
        />
        <div className="mt-12">
          <PricingTable />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading eyebrow="Proof" title="What subscribers say" />
        <div className="mt-12">
          <Testimonials />
        </div>
      </section>
    </>
  );
}
