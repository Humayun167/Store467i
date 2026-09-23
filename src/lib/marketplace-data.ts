import promptsImg from "@/assets/product-prompts.jpg";

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
    id: "cyberpunk-sci-fi-cityscape",
    name: "8K Cyberpunk Futuristic Sci-Fi Cityscape & Neon Lighting Prompt",
    description:
      "Ultra-detailed cinematic futuristic metropolis with volumetric neon fog, soaring holographic billboards, flying vehicle light trails, wet asphalt reflections, and dystopian architectural depth.",
    price: 5,
    category: "AI Prompts",
    rating: 4.9,
    sales: 2150,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    tags: ["trending", "new", "bestseller"],
    gumroadUrl: "https://store467i.gumroad.com/l/upfoqt",
    promptData: {
      model: "Midjourney v6.1",
      style: "Cyberpunk Cinematic Worldbuilding",
      sampleImages: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "Breathtaking 8K cinematic establishing shot of [location] in a neon-drenched cyberpunk metropolis at night, towering holographic megastructures, dense volumetric rain and steam, glowing cyan and magenta neon light trails from hover vehicles, hyper-detailed dystopian architecture, shot on Arri Alexa 65 with anamorphic lens, raytraced reflections on wet streets --ar 16:9 --v 6.1 --stylize 300 --quality 2",
      negativePrompt:
        "low resolution, blurry, oversaturated colors, flat lighting, daylight, amateur sketch, pixelated, noisy",
      parameters: [
        { label: "Price Deal", value: "$5.00 Instant Unlock" },
        { label: "Model", value: "Midjourney v6.1 / FLUX.1" },
        { label: "Aspect Ratio", value: "16:9 (Cinematic Widescreen)" },
        { label: "Stylize", value: "300 (Maximum Visual Drama)" },
        { label: "Quality", value: "2 (Ultra High Definition)" },
      ],
      variables: [
        {
          name: "location",
          placeholder: "a bustling high-tech street market under towering megatowers",
          description: "Define the specific environment, focal buildings, street activity, or vantage point.",
        },
      ],
      editingInstructions: [
        "Paste the unlocked prompt into Midjourney v6.1 Discord or web interface.",
        "Replace [location] with your scene concept, such as 'a skyscraper rooftop landing pad' or 'a rainy underground cyber-alley'.",
        "Tweak the color palette by changing 'cyan and magenta' to 'amber gold and emerald green' or 'monochrome noir with red highlights'.",
      ],
    },
  },
  {
    id: "flux-commercial-product-photography",
    name: "FLUX.1 Pro Ultra-Realistic Commercial Product & Branding Master Prompt",
    description:
      "Studio-grade luxury product photography prompt with softbox lighting, caustic glass reflections, matte textures, depth-of-field control, and 8K commercial advertising quality.",
    price: 10,
    category: "AI Prompts",
    rating: 5.0,
    sales: 1430,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    tags: ["trending", "new", "bestseller"],
    gumroadUrl: "https://store467i.gumroad.com/l/commercial-product",
    promptData: {
      model: "FLUX.1 Schnell",
      style: "Commercial Studio Product Photography",
      sampleImages: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "Commercial advertising studio shot of [product], hero angle, set on a minimalist textured stone podium, dual softbox studio illumination with subtle warm rim light, crisp water droplet condensation, micro surface textures, shot on Hasselblad H6D-100c, 100mm macro lens f/4, clean editorial background, 8K ultra-sharp focus",
      negativePrompt:
        "cartoon, 3d render, blurry, artifacts, low quality, oversaturated, amateur lighting, harsh shadows, messy background",
      parameters: [
        { label: "Price Deal", value: "$10.00 Master License" },
        { label: "Model", value: "FLUX.1 Schnell / Dev" },
        { label: "Aspect Ratio", value: "1:1 / 4:5 (Product Showcase)" },
        { label: "Lighting", value: "Dual Softbox + Rim Light" },
        { label: "Resolution", value: "8K Ultra-Sharp Macro" },
      ],
      variables: [
        {
          name: "product",
          placeholder: "a luxury matte black chronograph wristwatch with copper accents",
          description: "Specify the item, material finishes, brand styling, or packaging.",
        },
      ],
      editingInstructions: [
        "Paste the unlocked prompt into your FLUX.1 or Midjourney generator.",
        "Replace [product] with your target product (e.g., cosmetic perfume bottle, wireless earbuds, artisan coffee bag).",
        "Change the podium base from 'minimalist textured stone' to 'floating glass pedestal' or 'wet volcanic rock' for different brand aesthetics.",
      ],
    },
  },
  {
    id: "ultra-hdr-architectural-interior",
    name: "8K Ultra-HDR Luxury Architectural & Minimalist Interior Master Prompt",
    description:
      "Studio-grade architectural photography prompt with golden hour volumetric window rays, polished concrete, warm oak textures, Hasselblad 24mm tilt-shift perspective, and 8K Scandinavian editorial depth.",
    price: 10,
    category: "AI Prompts",
    rating: 5.0,
    sales: 1290,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    tags: ["trending", "new", "bestseller"],
    gumroadUrl: "https://store467i.gumroad.com/l/agqfqn",
    promptData: {
      model: "Midjourney v6.1",
      style: "Architectural Digest Editorial Photography",
      sampleImages: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      ],
      rawPrompt:
        "8K Architectural Digest interior photography of [space], bathed in soft golden morning sunlight streaming through floor-to-ceiling glass windows, warm oak woodwork, polished microcement floors, mid-century minimalist furniture, volumetric light dust rays, shot on Hasselblad H6D-100c, 24mm f/4 tilt-shift lens, hyper-realistic textures --ar 16:9 --v 6.1 --stylize 250 --quality 2",
      negativePrompt:
        "cluttered, cartoon, 3d render, plastic look, oversaturated, blurry, bad perspective, blown out highlights, low resolution",
      parameters: [
        { label: "Price Deal", value: "$10.00 Master License" },
        { label: "Model", value: "Midjourney v6.1 / FLUX.1" },
        { label: "Aspect Ratio", value: "16:9 (Architectural Widescreen)" },
        { label: "Lens", value: "24mm Tilt-Shift Perspective" },
        { label: "Quality", value: "2 (Maximum Architectural Detail)" },
      ],
      variables: [
        {
          name: "space",
          placeholder: "a double-height modern Scandinavian living room overlooking a misty pine forest",
          description: "Specify the room type, architectural style, key furniture, and outside view.",
        },
      ],
      editingInstructions: [
        "Copy and paste the prompt into Midjourney v6.1 Discord or web interface.",
        "Replace [space] with your desired room concept (e.g., 'a luxury minimalist bathroom with marble tub' or 'a modern penthouse study').",
        "Change 'golden morning sunlight' to 'moody blue hour dusk with warm interior recessed lighting' for evening ambience.",
      ],
    },
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
