import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  ShieldCheck,
  X,
  Loader2,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { type Product, formatPrice } from "@/lib/marketplace-data";
import { useAuth } from "@/hooks/use-auth";
import { openGumroadCheckout } from "@/lib/gumroad";

interface PaymentCheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentCheckoutModal({
  product,
  isOpen,
  onClose,
}: PaymentCheckoutModalProps) {
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!product || !isOpen) return null;
  if (!currentUser) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.gumroadUrl) {
      toast.error("Checkout unavailable", {
        description: "Gumroad checkout link is not configured for this product.",
      });
      return;
    }

    setIsProcessing(true);
    // Store pending product for auto-unlock on Gumroad sale event
    sessionStorage.setItem("__gumroad_pending_product", product.id);
    openGumroadCheckout(product.gumroadUrl);
    setIsProcessing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] grid place-items-center bg-[oklch(0_0_0/85%)] p-4 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="glass relative w-full max-w-md overflow-hidden rounded-3xl bg-card border border-border shadow-[var(--shadow-glow)] my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface/80 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground">
                <Lock className="size-4" />
              </span>
              <div>
                <h3 className="font-display text-sm font-bold sm:text-base">Secure Checkout</h3>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="size-3 text-emerald-400" /> 256-Bit SSL Encrypted
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Product Order Summary */}
            <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface/50 p-3.5">
              <img
                src={product.image}
                alt={product.name}
                className="size-14 rounded-xl object-cover shrink-0 border border-border"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                <span className="text-xs text-muted-foreground">
                  {product.promptData?.model || product.category}
                </span>
              </div>
              <div className="text-right">
                <span className="font-display text-lg font-bold text-gradient">${formatPrice(product.price)}</span>
                <span className="text-[10px] text-muted-foreground block">One-time</span>
              </div>
            </div>

            {/* Gumroad Checkout Notice Box */}
            <div className="rounded-2xl border border-[oklch(0.7_0.18_15/40%)] bg-[oklch(0.7_0.18_15/8%)] p-4 text-center space-y-2">
              <div className="grid size-11 place-items-center rounded-2xl bg-[oklch(0.7_0.18_15/20%)] mx-auto mb-2 text-[oklch(0.7_0.18_15)]">
                <ShoppingBag className="size-5" />
              </div>
              <p className="text-sm font-semibold text-foreground">Gumroad Official Checkout</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complete your purchase securely via Gumroad. Supports Credit & Debit Cards, Apple Pay, Google Pay, and PayPal with instant automatic unlock.
              </p>
            </div>

            {/* Submit button */}
            <form onSubmit={handlePay}>
              <button
                type="submit"
                disabled={isProcessing}
                className="glow-ring flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Opening Checkout...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" /> Pay ${formatPrice(product.price)} via Gumroad <ExternalLink className="size-3.5 opacity-70" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground pt-1">
              <span>🛡️ Instant Delivery</span>
              <span>•</span>
              <span>🔒 100% Secure</span>
              <span>•</span>
              <span>✨ Money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
