import dashboardImg from "@/assets/product-dashboard.jpg";
import promptsImg from "@/assets/product-prompts.jpg";
import flutterImg from "@/assets/product-flutter.jpg";
import codeImg from "@/assets/product-code.jpg";
import uikitImg from "@/assets/product-uikit.jpg";
import courseImg from "@/assets/product-course.jpg";

export type PromptData = {
  model: "Midjourney v6.1" | "FLUX.1 Schnell" | "DALL-E 3" | "Stable Diffusion XL" | "ChatGPT-4o";
  style: string;
  sampleImages: string[];
  rawPrompt: string;
  negativePrompt?: string;
  parameters: { label: string; value: string }[];
  variables: { name: string; placeholder: string; description: string }[];
  editingInstructions: string[];
};

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
  promptData?: PromptData;
  gumroadUrl?: string;
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

export function formatPrice(price: number): string {
  return price % 1 === 0 ? price.toString() : price.toFixed(2);
}

export const products: Product[] = [
  {
    id: "ultra-hdr-cinematic-portrait",
    name: "8K Ultra-HDR Cinematic Portrait & Master Lighting Prompt",
    description:
      "Studio-grade photorealistic portrait prompt with dramatic Rembrandt lighting, Hasselblad 85mm lens depth, authentic skin pores, and 8K cinematic color grading.",
    price: 1,
    category: "AI Prompts",
    rating: 5.0,
    sales: 4120,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tags: ["bestseller", "trending", "new"],
    gumroadUrl: "https://store467i.gumroad.com/l/gjlsnf",
    promptData: {
      model: "Midjourney v6.1",
      style: "Cinematic Editorial Portrait",
      sampleImages: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "Cinematic studio portrait of [subject], dramatic chiaroscuro Rembrandt lighting, warm amber rim light, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, natural skin texture with visible pores, ultra-fine details, neutral editorial backdrop --ar 4:5 --v 6.1 --stylize 250 --quality 2",
      negativePrompt:
        "blurry, cartoon, illustration, 3d render, plastic smooth skin, oversaturated, deformed eyes, extra fingers",
      parameters: [
        { label: "Price Deal", value: "$1.00 Instant Unlock" },
        { label: "Model", value: "Midjourney v6.1 / FLUX.1" },
        { label: "Aspect Ratio", value: "4:5 (Portrait / Instagram)" },
        { label: "Stylize", value: "250 (High Realism)" },
        { label: "Quality", value: "2 (Maximum Texture Detail)" },
      ],
      variables: [
        {
          name: "subject",
          placeholder: "a stylish 25-year-old creative director wearing an oversized black wool coat",
          description: "Describe the person, emotion, clothing, and background styling.",
        },
      ],
      editingInstructions: [
        "Copy and paste the prompt into Midjourney v6.1 Discord or web interface.",
        "Replace [subject] with your character, celebrity lookalike, or wardrobe preference.",
        "Switch lighting from 'warm amber rim light' to 'cyberpunk cyan neon' or 'soft morning window glow' to alter the atmosphere.",
      ],
    },
  },
  {
    id: "photorealistic-studio-portrait",
    name: "8K Ultra-Realistic Studio Portrait Prompt",
    description:
      "Transform any subject into a Vogue-cover studio photograph. Professional lighting, Hasselblad 80mm lens depth, and authentic skin texture editing.",
    price: 2.1,
    category: "AI Prompts",
    rating: 5.0,
    sales: 3840,
    image: promptsImg,
    tags: ["bestseller", "trending"],
    gumroadUrl: "https://humayun66e.gumroad.com/l/gqorus",
    promptData: {
      model: "Midjourney v6.1",
      style: "High-End Editorial Photography",
      sampleImages: [
        promptsImg,
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "High-fashion editorial portrait of [subject], soft Rembrandt key lighting, rim light from top right, shot on Hasselblad H6D-100c, 80mm f/1.8 lens, natural pores, ultra-detailed eyes, muted pastel backdrop --ar 4:5 --v 6.1 --stylize 250 --quality 2",
      negativePrompt:
        "cartoon, illustration, 3d render, plastic skin, oversaturated, blurry, bad anatomy",
      parameters: [
        { label: "Aspect Ratio", value: "4:5 (Instagram / Portrait)" },
        { label: "Version", value: "Midjourney v6.1" },
        { label: "Stylize", value: "250 (Realistic)" },
        { label: "Quality", value: "2 (Max Texture)" },
      ],
      variables: [
        {
          name: "subject",
          placeholder: "a 28-year-old Scandinavian woman with subtle freckles wearing a linen trench coat",
          description: "Describe the person, clothing, and expression you want to feature.",
        },
      ],
      editingInstructions: [
        "Paste the unlocked prompt into Discord Midjourney or your image generator.",
        "Replace [subject] with your desired character description or uploaded reference face.",
        "To change mood, replace 'soft Rembrandt' with 'dramatic cyberpunk neon' or 'golden hour sunlight'.",
      ],
    },
  },
  {
    id: "cyberpunk-cinematic-scenes",
    name: "Cyberpunk Neon Night Concept Art Prompts",
    description:
      "Create glowing futuristic Tokyo/Neo-Seoul streetscapes with rain reflections, volumetric smog, and hologram lighting effects.",
    price: 24,
    category: "AI Prompts",
    rating: 4.9,
    sales: 2950,
    image: promptsImg,
    tags: ["trending"],
    promptData: {
      model: "FLUX.1 Schnell",
      style: "Cinematic Sci-Fi Concept Art",
      sampleImages: [
        promptsImg,
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "Cinematic wide angle shot of a futuristic [city_setting] at midnight during heavy rain, neon cyan and magenta reflections on wet asphalt, glowing holographic billboards advertising [brand_item], atmospheric steam rising, shot on Arri Alexa Mini, anamorphic lens flare --ar 16:9 --stylize 400",
      negativePrompt: "lowres, daytime, clear sky, sketch, low contrast, washed out colors",
      parameters: [
        { label: "Aspect Ratio", value: "16:9 (Cinematic Wallpaper)" },
        { label: "Model", value: "FLUX.1 / Midjourney v6" },
        { label: "Stylize", value: "400" },
      ],
      variables: [
        {
          name: "city_setting",
          placeholder: "narrow alleyway in Neo-Hong Kong with towering skyscrapers",
          description: "The environment or architectural scene.",
        },
        {
          name: "brand_item",
          placeholder: "flying cybernetic delivery drones",
          description: "Futuristic elements to scatter in the background.",
        },
      ],
      editingInstructions: [
        "Copy prompt and run directly in FLUX.1 or Midjourney.",
        "Adjust colors by swapping 'cyan and magenta' for 'gold and amber' or 'toxic emerald green'.",
      ],
    },
  },
  {
    id: "product-commercial-mockup-prompt",
    name: "Minimalist 3D Luxury Product Mockup Prompt",
    description:
      "Generate Apple-level luxury product renders for cosmetics, perfumes, tech gadgets, and beverage packaging.",
    price: 29,
    category: "AI Prompts",
    rating: 4.9,
    sales: 2190,
    image: promptsImg,
    tags: ["bestseller", "new"],
    promptData: {
      model: "Midjourney v6.1",
      style: "Minimalist Commercial Render",
      sampleImages: [
        promptsImg,
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "Commercial studio product shot of [product_type], standing on a curved matte travertine pedestal, frosted glass sphere floating in background, soft morning sunlight casting long organic shadows, neutral warm beige tone palette, Octane Render 8k, C4D aesthetic --ar 1:1 --v 6.1 --style raw",
      parameters: [
        { label: "Aspect Ratio", value: "1:1 (Square Product Post)" },
        { label: "Engine", value: "Octane / V-Ray Style Simulation" },
        { label: "Style Mode", value: "Raw (Minimal AI hallucination)" },
      ],
      variables: [
        {
          name: "product_type",
          placeholder: "a matte black glass cologne bottle with minimalist typography",
          description: "The object or packaging design to render.",
        },
      ],
      editingInstructions: [
        "Replace [product_type] with your item.",
        "Change background pedestal from 'matte travertine' to 'brushed titanium' or 'dark walnut wood'.",
      ],
    },
  },
  {
    id: "anime-makoto-shinkai-aesthetic",
    name: "Makoto Shinkai Anime Landscape & Clouds Prompt",
    description:
      "Vibrant anime skies, cumulonimbus cloud formations, golden hour nostalgia, and cinematic movie still aesthetic.",
    price: 15,
    category: "AI Prompts",
    rating: 4.8,
    sales: 1820,
    image: promptsImg,
    tags: ["new"],
    promptData: {
      model: "Midjourney v6.1",
      style: "Japanese Animation / Film Still",
      sampleImages: [
        promptsImg,
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "Aesthetic anime film still of [location], massive glowing cumulonimbus clouds in twilight purple sky, radiant sun rays piercing through clouds, cherry blossom petals drifting in wind, CoMix Wave Films style, art by Makoto Shinkai --ar 16:9 --niji 6 --stylize 300",
      parameters: [
        { label: "Model", value: "Niji Journey v6" },
        { label: "Aspect Ratio", value: "16:9" },
        { label: "Stylize", value: "300" },
      ],
      variables: [
        {
          name: "location",
          placeholder: "a peaceful railway crossing overlooking the coastal ocean",
          description: "The background environment.",
        },
      ],
      editingInstructions: [
        "Works best with Niji v6 model in Midjourney (`--niji 6`).",
        "Customize the time of day: 'golden twilight', 'starry galaxy night', or 'summer midday rain'.",
      ],
    },
  },
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
    promptData: {
      model: "ChatGPT-4o",
      style: "Full Multimodal & LLM Vault",
      sampleImages: [promptsImg],
      rawPrompt:
        "ACT AS A SENIOR AI SYSTEM DESIGNER. Analyze the user problem [problem_statement] and output: 1. Architecture diagram in Mermaid. 2. Edge-case checklist. 3. Zero-shot prompt chain with structured JSON outputs.",
      parameters: [
        { label: "Type", value: "Mega-Prompt Bundle" },
        { label: "Count", value: "1200+ Categorized Prompts" },
      ],
      variables: [
        {
          name: "problem_statement",
          placeholder: "Building a multi-tenant payment gateway with automatic retry logic",
          description: "Your business or technical task.",
        },
      ],
      editingInstructions: [
        "Copy and paste directly into ChatGPT Plus, Claude 3.5 Sonnet, or Gemini 1.5 Pro.",
      ],
    },
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
];

export const features = [
  { title: "Instant Download & Unlock", body: "Prompts and source files unlock the second payment clears — instant copy & download.", icon: "Download" },
  { title: "Secure Payment", body: "PCI-compliant checkout with fraud screening on every transaction.", icon: "ShieldCheck" },
  { title: "Lifetime Access", body: "Buy once, re-download forever, including every future update.", icon: "Infinity" },
  { title: "Tested Prompts", body: "Every prompt is tested with 50+ generation seeds to ensure consistent quality.", icon: "Sparkles" },
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
      "All AI prompts unlocked",
      "Commercial license",
      "Early access drops",
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
