import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Store467i — Support & Sales" },
      {
        name: "description",
        content:
          "Questions about licensing, refunds or team plans? Reach the Store467i team by email, phone or the contact form — replies within 4 hours.",
      },
      { property: "og:title", content: "Contact Store467i — Support & Sales" },
      { property: "og:description", content: "Talk to a human about licensing, refunds or team plans." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-2">
      <div>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to a real human"
          body="Support, licensing and team plans — we answer in under four hours, seven days a week."
        />
        <ul className="mt-10 space-y-4 text-sm">
          {[
            { icon: Mail, label: "hello@store467i.dev" },
            { icon: Phone, label: "+1 (415) 555-0134" },
            { icon: MapPin, label: "940 Market St, San Francisco, CA" },
            { icon: MessageSquare, label: "Live chat, 9am–9pm PT" },
          ].map((c) => (
            <li key={c.label} className="glass flex items-center gap-3 rounded-2xl px-5 py-4">
              <c.icon className="size-4 text-secondary" />
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          toast.success("Message sent", { description: "We'll reply within 4 hours." });
        }}
        className="glass h-fit rounded-3xl p-7"
      >
        <div className="grid gap-4">
          <label className="text-sm">
            <span className="text-muted-foreground">Name</span>
            <input
              required
              className="mt-2 w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground">Email</span>
            <input
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground">How can we help?</span>
            <textarea
              rows={5}
              required
              className="mt-2 w-full resize-none rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <button className="rounded-full bg-[image:var(--gradient-brand)] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
            {sent ? "Sent — thank you" : "Send message"}
          </button>
        </div>
      </form>
    </section>
  );
}
