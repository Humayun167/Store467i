import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  Sparkles,
  Sliders,
  X,
  ShoppingBag,
  Image as ImageIcon,
  HelpCircle,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { type Product, formatPrice } from "@/lib/marketplace-data";
import { usePurchases } from "@/hooks/use-purchases";
import { useAuth } from "@/hooks/use-auth";
import { PaymentCheckoutModal } from "./PaymentCheckoutModal";

interface PromptUnlockModalProps {
  product: Product | null;
  onClose: () => void;
}

export function PromptUnlockModal({ product, onClose }: PromptUnlockModalProps) {
  const { isPurchased } = usePurchases();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [customVars, setCustomVars] = useState<Record<string, string>>({});

  if (!product) return null;

  const prompt = product.promptData;
  const unlocked = isPurchased(product.id);

  // Build the live customized prompt if unlocked
  let customizedPrompt = prompt?.rawPrompt || "";
  if (prompt?.variables) {
    prompt.variables.forEach((v) => {
      const val = customVars[v.name]?.trim() || `[${v.name}]`;
      customizedPrompt = customizedPrompt.replace(`[${v.name}]`, val);
    });
  }

  const handleCopy = (text: string, label = "Prompt copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(label, { description: "Paste it into Midjourney, FLUX or your AI tool." });
    setTimeout(() => setCopied(false), 2500);
  };

  const sampleImages = prompt?.sampleImages || [product.image];

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-[oklch(0_0_0/80%)] p-4 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-[var(--shadow-glow)] my-auto"
          >
            {/* Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/90 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold sm:text-lg">{product.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {prompt?.model || product.category} · {prompt?.style || "Digital Asset"}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid gap-8 p-6 lg:grid-cols-12">
              {/* Left Column: Sample Images Showcase */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
                  <img
                    src={sampleImages[selectedImgIndex] || product.image}
                    alt={`${product.name} sample output`}
                    className="size-full object-cover transition-all duration-500"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium backdrop-blur-md border border-border">
                    ✨ Sample AI Output #{selectedImgIndex + 1}
                  </span>
                </div>

                {/* Thumbnail selector */}
                {sampleImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {sampleImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImgIndex(i)}
                        className={`relative size-16 shrink-0 overflow-hidden rounded-xl border transition-all ${
                          selectedImgIndex === i
                            ? "border-primary ring-2 ring-primary/40 scale-105"
                            : "border-border opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="size-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Product Info Summary */}
                <div className="rounded-2xl border border-border p-4 text-xs text-muted-foreground space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Rating</span>
                    <span className="font-semibold text-foreground">★ {product.rating.toFixed(1)} / 5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Sales</span>
                    <span className="font-semibold text-foreground">{product.sales.toLocaleString()} users</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Compatibility</span>
                    <span className="font-semibold text-secondary">{prompt?.model || "Standard Web"}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Prompt Details & Locked/Unlocked Experience */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">
                        {product.category}
                      </span>
                      {unlocked ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                          <Unlock className="size-3.5" /> Unlocked & Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30">
                          <Lock className="size-3.5" /> Prompt Locked
                        </span>
                      )}
                    </div>
                    <span className="font-display text-2xl font-bold text-gradient">${formatPrice(product.price)}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>
                </div>

                {/* Locked / Unlocked Content Box */}
                {unlocked ? (
                  /* ─── UNLOCKED VIEW ─── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-5"
                  >
                    {/* Prompt Code Container */}
                    <div className="relative rounded-2xl border border-primary/40 bg-surface/90 p-4 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                          <Sparkles className="size-3.5" /> Full AI Prompt
                        </span>
                        <button
                          onClick={() => handleCopy(customizedPrompt)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-primary/80"
                        >
                          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                          {copied ? "Copied!" : "Copy Prompt"}
                        </button>
                      </div>
                      <pre className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap select-all bg-background/50 rounded-xl p-3.5 border border-border">
                        {customizedPrompt}
                      </pre>
                    </div>

                    {/* Negative Prompt (if available) */}
                    {prompt?.negativePrompt && (
                      <div className="rounded-2xl border border-border bg-surface/60 p-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-muted-foreground">Negative Prompt</span>
                          <button
                            onClick={() => handleCopy(prompt.negativePrompt!, "Negative prompt copied!")}
                            className="text-xs text-secondary hover:underline flex items-center gap-1"
                          >
                            <Copy className="size-3" /> Copy
                          </button>
                        </div>
                        <p className="font-mono text-xs text-muted-foreground bg-background/40 p-2.5 rounded-lg">
                          {prompt.negativePrompt}
                        </p>
                      </div>
                    )}

                    {/* Live Variable Customizer */}
                    {prompt?.variables && prompt.variables.length > 0 && (
                      <div className="rounded-2xl border border-border p-4 bg-surface/40 space-y-3">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                          <Sliders className="size-3.5 text-secondary" /> Customize Prompt Variables
                        </span>
                        <div className="space-y-2.5">
                          {prompt.variables.map((v) => (
                            <div key={v.name} className="space-y-1">
                              <label className="text-xs text-muted-foreground flex justify-between">
                                <span>[{v.name}]</span>
                                <span className="text-[10px] text-secondary">{v.description}</span>
                              </label>
                              <input
                                type="text"
                                placeholder={v.placeholder}
                                value={customVars[v.name] || ""}
                                onChange={(e) =>
                                  setCustomVars({ ...customVars, [v.name]: e.target.value })
                                }
                                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommended Parameters */}
                    {prompt?.parameters && (
                      <div className="rounded-2xl border border-border p-4">
                        <span className="text-xs font-bold text-foreground mb-2 block">
                          ⚙️ Recommended Generator Settings
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {prompt.parameters.map((p) => (
                            <div key={p.label} className="rounded-xl border border-border/80 bg-background/50 p-2.5">
                              <span className="text-muted-foreground block text-[10px]">{p.label}</span>
                              <span className="font-semibold text-foreground">{p.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step-by-step Instructions */}
                    {prompt?.editingInstructions && (
                      <div className="rounded-2xl border border-border p-4 text-xs text-muted-foreground space-y-1.5">
                        <span className="font-bold text-foreground flex items-center gap-1 text-xs">
                          <HelpCircle className="size-3.5 text-primary" /> How to use this prompt
                        </span>
                        <ul className="list-disc list-inside space-y-1 pl-1">
                          {prompt.editingInstructions.map((ins, i) => (
                            <li key={i}>{ins}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* ─── LOCKED VIEW ─── */
                  <div className="space-y-6">
                    {/* Blurred Locked Prompt Teaser */}
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 text-center">
                      <div
                        aria-hidden
                        className="pointer-events-none select-none blur-md opacity-30 font-mono text-sm leading-relaxed"
                      >
                        High-fashion editorial portrait of glowing cyberpunk subject, volumetric lighting, 85mm f/1.4 lens, cinematic raytracing --ar 16:9 --v 6.1 --stylize 450 --quality 2
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-background/70 backdrop-blur-xs">
                        <div className="grid size-12 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)] mb-3">
                          <Lock className="size-6" />
                        </div>
                        <h4 className="font-display text-base font-bold">Secret Prompt & Parameters Locked</h4>
                        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                          Unlock to copy the exact tested prompt, negative parameters, and variable editing formula.
                        </p>
                      </div>
                    </div>

                    {/* Included in unlock list */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 rounded-xl border border-border p-3">
                        <Zap className="size-4 text-secondary shrink-0" />
                        <span>Instant 1-Click Copy</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-border p-3">
                        <Sliders className="size-4 text-accent shrink-0" />
                        <span>Full Customizer Variables</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-border p-3">
                        <ImageIcon className="size-4 text-primary shrink-0" />
                        <span>High-Res Sample Previews</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-border p-3">
                        <Sparkles className="size-4 text-secondary shrink-0" />
                        <span>Lifetime Access & Updates</span>
                      </div>
                    </div>

                    {/* Unlock / Purchase CTA */}
                    <div className="rounded-2xl border border-primary/30 bg-[image:var(--gradient-glow)] p-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold font-display">
                        <span className="text-muted-foreground text-sm font-normal">One-time price:</span>
                        <span className="text-gradient">${formatPrice(product.price)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        Instant access · Commercial use allowed · Money-back guarantee
                      </p>
                      <button
                        id="unlock-prompt-btn"
                      onClick={() => {
                        if (!currentUser) {
                          toast.error("Login Required", {
                            description: "Please sign in to purchase products.",
                          });
                          onClose();
                          navigate({ to: "/login" });
                          return;
                        }
                        setIsPaymentOpen(true);
                      }}
                        className="glow-ring w-full flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <ShoppingBag className="size-4" /> Unlock Prompt Now (${formatPrice(product.price)})
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Payment Checkout Modal */}
      <PaymentCheckoutModal
        product={product}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={() => {
          setIsPaymentOpen(false);
        }}
      />
    </>
  );
}
