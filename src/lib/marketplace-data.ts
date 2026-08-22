import dashboardImg from "@/assets/product-dashboard.jpg";
import promptsImg from "@/assets/product-prompts.jpg";
import flutterImg from "@/assets/product-flutter.jpg";
import codeImg from "@/assets/product-code.jpg";
import uikitImg from "@/assets/product-uikit.jpg";
import courseImg from "@/assets/product-course.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  sales: number;
  image: string;
  tags: ("trending" | "bestseller" | "new")[];
};

export const categories = [
  { name: "AI Prompts", count: 842, icon: "Sparkles" },
  { name: "Source Codes", count: 1236, icon: "Code2" },
  { name: "React Templates", count: 517, icon: "Atom" },
  { name: "Flutter Apps", count: 389, icon: "Smartphone" },
  { name: "Web Scripts", count: 612, icon: "Terminal" },
  { name: "UI Kits", count: 448, icon: "LayoutGrid" },
  { name: "E-books", count: 226, icon: "BookOpen" },
  { name: "Courses", count: 174, icon: "GraduationCap" },
] as const;

export const products: Product[] = [
  {
    id: "nebula-dashboard",
    name: "Nebula Analytics Dashboard",
    description:
      "A production-ready React + Tailwind analytics dashboard with 40 screens, charts, auth flows and dark mode baked in.",
    price: 79,
    category: "React Templates",
    rating: 4.9,
    sales: 2140,
    image: dashboardImg,
    tags: ["bestseller", "trending"],
  },
  {
    id: "prompt-vault",
    name: "Prompt Vault — 1200 AI Prompts",
    description:
      "Battle-tested prompt library for marketing, code generation, research and image models, organised by workflow.",
    price: 39,
    category: "AI Prompts",
    rating: 4.8,
    sales: 5320,
    image: promptsImg,
    tags: ["bestseller"],
  },
  {
    id: "flux-flutter-kit",
    name: "Flux Flutter Commerce App",
    description:
      "Full-source Flutter storefront with cart, payments, push notifications and a modular design system.",
    price: 129,
    category: "Flutter Apps",
    rating: 4.7,
    sales: 860,
    image: flutterImg,
    tags: ["new"],
  },
  {
    id: "orbit-saas-boilerplate",
    name: "Orbit SaaS Boilerplate",
    description:
      "Auth, billing, teams, roles and webhooks wired together. Ship your SaaS in a weekend instead of a quarter.",
    price: 149,
    category: "Source Codes",
    rating: 5.0,
    sales: 1490,
    image: codeImg,
    tags: ["trending", "bestseller"],
  },
  {
    id: "aurora-ui-kit",
    name: "Aurora Glass UI Kit",
    description:
      "260+ glassmorphic components, motion presets and tokens for Figma and Tailwind, perfectly synced.",
    price: 59,
    category: "UI Kits",
    rating: 4.8,
    sales: 3010,
    image: uikitImg,
    tags: ["trending"],
  },
  {
    id: "three-js-masterclass",
    name: "3D Web Masterclass",
    description:
      "12 hours of React Three Fiber training: shaders, physics, performance budgets and shipping real 3D products.",
    price: 99,
    category: "Courses",
    rating: 4.9,
    sales: 720,
    image: courseImg,
    tags: ["new", "trending"],
  },
  {
    id: "scraper-suite",
    name: "Scraper Suite Pro",
    description:
      "Rotating-proxy scraping scripts with queueing, retries and CSV/JSON export for any modern site.",
    price: 45,
    category: "Web Scripts",
    rating: 4.6,
    sales: 1180,
    image: codeImg,
    tags: ["bestseller"],
  },
  {
    id: "design-systems-ebook",
    name: "Design Systems in Practice",
    description:
      "A 220-page field guide to building, documenting and scaling a design system your team actually uses.",
    price: 29,
    category: "E-books",
    rating: 4.7,
    sales: 940,
    image: uikitImg,
    tags: ["new"],
  },
  {
    id: "midjourney-art-pack",
    name: "Midjourney Art Director Pack",
    description:
      "400 cinematic image prompts with camera, lens and lighting recipes — consistent style across every render.",
    price: 34,
    category: "AI Prompts",
    rating: 4.8,
    sales: 2680,
    image: promptsImg,
    tags: ["trending"],
  },
  {
    id: "quantum-landing-kit",
    name: "Quantum Landing Page Kit",
    description:
      "18 conversion-tested React landing pages with motion presets, forms and analytics hooks pre-wired.",
    price: 69,
    category: "React Templates",
    rating: 4.7,
    sales: 1620,
    image: dashboardImg,
    tags: ["bestseller"],
  },
  {
    id: "helio-delivery-app",
    name: "Helio Delivery Flutter App",
    description:
      "Rider, customer and admin apps in one Flutter codebase, with live tracking maps and Stripe checkout.",
    price: 139,
    category: "Flutter Apps",
    rating: 4.6,
    sales: 540,
    image: flutterImg,
    tags: ["new"],
  },
  {
    id: "invoice-api-starter",
    name: "Invoice & Billing API Starter",
    description:
      "Node + Postgres billing service with subscriptions, proration, PDF invoices and webhook replay built in.",
    price: 89,
    category: "Source Codes",
    rating: 4.8,
    sales: 1030,
    image: codeImg,
    tags: ["trending"],
  },
  {
    id: "seo-automation-scripts",
    name: "SEO Automation Script Bundle",
    description:
      "27 Python scripts for rank tracking, sitemap audits, broken-link sweeps and automated Search Console reports.",
    price: 49,
    category: "Web Scripts",
    rating: 4.5,
    sales: 780,
    image: codeImg,
    tags: ["new"],
  },
  {
    id: "neon-dashboard-ui",
    name: "Neon Dashboard UI Kit",
    description:
      "Dark-first dashboard components: data tables, charts, command palette and 60 crafted empty states.",
    price: 65,
    category: "UI Kits",
    rating: 4.9,
    sales: 2210,
    image: uikitImg,
    tags: ["bestseller", "trending"],
  },
  {
    id: "prompt-engineering-course",
    name: "Prompt Engineering for Engineers",
    description:
      "9 hours on evals, structured outputs, tool calling and cost control for production LLM features.",
    price: 119,
    category: "Courses",
    rating: 4.9,
    sales: 610,
    image: courseImg,
    tags: ["trending", "new"],
  },
  {
    id: "indie-launch-ebook",
    name: "The Indie Launch Playbook",
    description:
      "180 pages on pricing, positioning and launch sequencing, with teardown notes from 12 real product launches.",
    price: 25,
    category: "E-books",
    rating: 4.6,
    sales: 1340,
    image: courseImg,
    tags: ["bestseller"],
  },
];

export const features = [
  { title: "Instant Download", body: "Files unlock the second payment clears — no waiting, no emails.", icon: "Download" },
  { title: "Secure Payment", body: "PCI-compliant checkout with fraud screening on every transaction.", icon: "ShieldCheck" },
  { title: "Lifetime Access", body: "Buy once, re-download forever, including every future update.", icon: "Infinity" },
  { title: "Premium Quality", body: "Every listing is reviewed by senior engineers before it goes live.", icon: "Gem" },
  { title: "Verified Products", body: "Licenses, dependencies and security are checked and documented.", icon: "BadgeCheck" },
  { title: "Customer Support", body: "Real humans answering in under 4 hours, seven days a week.", icon: "Headphones" },
];

export const testimonials = [
  {
    name: "Amara Osei",
    role: "CTO",
    company: "Northwind Labs",
    review:
      "We shipped our client portal three weeks early with the Orbit boilerplate. The code quality is genuinely better than what most agencies write.",
    rating: 5,
    initials: "AO",
  },
  {
    name: "Daniel Reyes",
    role: "Indie Founder",
    company: "Shipfast.io",
    review:
      "The prompt vault paid for itself in a day. Structured, versioned and actually tested — nothing like the free lists floating around.",
    rating: 5,
    initials: "DR",
  },
  {
    name: "Mei Tanaka",
    role: "Lead Designer",
    company: "Studio Kanso",
    review:
      "Aurora UI Kit is the first Figma-to-Tailwind kit where the tokens truly match. Our handoff friction basically disappeared.",
    rating: 5,
    initials: "MT",
  },
  {
    name: "Lukas Brandt",
    role: "Engineering Manager",
    company: "Vertex Retail",
    review:
      "Support answered a licensing question at 11pm on a Sunday. That alone convinced us to buy team seats.",
    rating: 4,
    initials: "LB",
  },
];

export const plans = [
  {
    name: "Starter",
    price: 0,
    tagline: "For makers exploring the catalogue",
    features: ["Free product library", "Community access", "Standard license", "Email support"],
    highlight: false,
    cta: "Start free",
  },
  {
    name: "Pro",
    price: 29,
    tagline: "For working developers shipping weekly",
    features: [
      "Unlimited downloads",
      "Commercial license",
      "Early access drops",
      "AI recommendations",
      "Priority support",
    ],
    highlight: true,
    cta: "Go Pro",
  },
  {
    name: "Enterprise",
    price: 99,
    tagline: "For teams standardising their stack",
    features: [
      "Everything in Pro",
      "10 team seats",
      "Extended license",
      "Private onboarding",
      "Dedicated manager",
    ],
    highlight: false,
    cta: "Talk to sales",
  },
];

export const stats = [
  { value: 5000, suffix: "+", label: "Products" },
  { value: 1200, suffix: "+", label: "Customers" },
  { value: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
];
