import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  X,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/marketplace-data";
import { usePurchases } from "@/hooks/use-purchases";
import { useAuth } from "@/hooks/use-auth";
import { openGumroadCheckout, GUMROAD_PRODUCT_URL } from "@/lib/gumroad";

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
  onSuccess,
}: PaymentCheckoutModalProps) {
  const { unlockProduct } = usePurchases();
  const { currentUser } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "gumroad">("card");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("789");
  const [nameOnCard, setNameOnCard] = useState(currentUser?.displayName || "John Doe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product || !isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);


    if (paymentMethod === "gumroad") {
      // Store pending product for auto-unlock on sale event
      sessionStorage.setItem("__gumroad_pending_product", product.id);
      openGumroadCheckout(GUMROAD_PRODUCT_URL);
      setIsProcessing(false);
      return;
    }

    // Simulate real 2-step card processing
    await new Promise((r) => setTimeout(r, 1400));
    await unlockProduct(product);

    setIsProcessing(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onSuccess();
      onClose();
    }, 1200);
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
          className="glass relative w-full max-w-lg overflow-hidden rounded-3xl bg-card border border-border shadow-[var(--shadow-glow)] my-auto"
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

          {isSuccess ? (
            /* Success State */
            <div className="p-8 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="grid size-16 place-items-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto"
              >
                <CheckCircle2 className="size-8" />
              </motion.div>
              <h4 className="font-display text-xl font-bold">Payment Approved!</h4>
              <p className="text-sm text-muted-foreground">
                Prompt unlocked successfully. Unblurring secret prompt now...
              </p>
            </div>
          ) : (
            /* Checkout Form */
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
                  <span className="font-display text-lg font-bold text-gradient">${product.price}</span>
                  <span className="text-[10px] text-muted-foreground block">One-time</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold transition ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/15 text-primary-foreground shadow"
                      : "border-border text-muted-foreground hover:text-foreground bg-surface/30"
                  }`}
                >
                  <CreditCard className="size-4 text-secondary" /> Card / Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("gumroad")}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-semibold transition ${
                    paymentMethod === "gumroad"
                      ? "border-[oklch(0.7_0.18_15)] bg-[oklch(0.7_0.18_15/15%)] text-foreground shadow"
                      : "border-border text-muted-foreground hover:text-foreground bg-surface/30"
                  }`}
                >
                  <ShoppingBag className="size-4 text-[oklch(0.7_0.18_15)]" /> Gumroad
                </button>
              </div>

              {/* Card Details Form */}
              <form onSubmit={handlePay} className="space-y-3.5">
                {paymentMethod === "card" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Card Number</label>
                      <div className="relative">
                        <CreditCard className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm font-mono outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-mono outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground">CVC / CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm font-mono outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Name on Card</label>
                      <input
                        type="text"
                        required
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        placeholder="Full Name"
                        className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </>
                ) : paymentMethod === "gumroad" ? (
                  <div className="rounded-2xl border border-[oklch(0.7_0.18_15/40%)] bg-[oklch(0.7_0.18_15/5%)] p-4 text-center space-y-2">
                    <div className="grid size-10 place-items-center rounded-full bg-[oklch(0.7_0.18_15/15%)] mx-auto mb-2">
                      <ShoppingBag className="size-5 text-[oklch(0.7_0.18_15)]" />
                    </div>
                    <p className="text-xs font-semibold text-foreground">Gumroad Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">
                      Clicking below will open the Gumroad overlay checkout.
                      Your purchase will be processed securely by Gumroad.
                    </p>
                  </div>
                ) : null}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="glow-ring mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Authorizing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" /> Pay ${product.price} & Unlock
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
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
