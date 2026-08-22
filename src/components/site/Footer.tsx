import { Link } from "@tanstack/react-router";
import { Boxes, Github, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)]">
              <Boxes className="size-5 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">
              Store<span className="text-gradient">467i</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A curated marketplace for source code, AI prompts and digital products built by senior makers.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/products", label: "All products" },
              { to: "/categories", label: "Categories" },
              { to: "/pricing", label: "Pricing" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-secondary" /> hello@store467i.dev
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-secondary" /> +1 (415) 555-0134
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-secondary" /> 940 Market St, San Francisco
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Newsletter</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            New drops, discounts and prompt packs — twice a month, no noise.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("You're subscribed", { description: `We'll write to ${email}.` });
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            <button className="rounded-full bg-[image:var(--gradient-brand)] px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Store467i. All rights reserved.</p>
          <p>Crafted for developers who ship.</p>
        </div>
      </div>
    </footer>
  );
}
