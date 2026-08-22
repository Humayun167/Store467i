import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "@/lib/marketplace-data";
import { useAuth } from "./use-auth";
import { initLemonSqueezy, openLemonCheckout } from "@/lib/lemon-squeezy";

interface PurchasesContextType {
  purchasedIds: string[];
  isPurchased: (id: string) => boolean;
  unlockProduct: (product: Product) => Promise<boolean>;
  buyWithLemonSqueezy: (product: Product, checkoutUrl?: string) => Promise<void>;
  unlockedProducts: Product[];
}

const PurchasesContext = createContext<PurchasesContextType | null>(null);

const STORAGE_KEY = "store467i_purchased_products";

export function PurchasesProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  // Initialize Lemon Squeezy event listener
  useEffect(() => {
    initLemonSqueezy((data) => {
      const customData = data?.order?.data?.attributes?.custom_data;
      const productId = customData?.product_id;
      if (productId) {
        const found = products.find((p) => p.id === productId);
        if (found) {
          unlockProduct(found);
        }
      } else {
        toast.success("Lemon Squeezy Order Completed! 🎉", {
          description: "Your digital prompt and files are now ready.",
        });
      }
    });
  }, [currentUser, purchasedIds]);

  // Load from localStorage on startup or user change
  useEffect(() => {
    try {
      const userKey = currentUser ? `${STORAGE_KEY}_${currentUser.uid}` : STORAGE_KEY;
      const stored = localStorage.getItem(userKey);
      if (stored) {
        setPurchasedIds(JSON.parse(stored));
      } else {
        setPurchasedIds([]);
      }
    } catch {
      setPurchasedIds([]);
    }
  }, [currentUser]);

  // Persist to storage
  const savePurchases = (ids: string[]) => {
    setPurchasedIds(ids);
    try {
      const userKey = currentUser ? `${STORAGE_KEY}_${currentUser.uid}` : STORAGE_KEY;
      localStorage.setItem(userKey, JSON.stringify(ids));
    } catch (e) {
      console.error("Failed to save purchase to localStorage", e);
    }
  };

  const isPurchased = (id: string) => purchasedIds.includes(id);

  const unlockProduct = async (product: Product): Promise<boolean> => {
    if (isPurchased(product.id)) {
      toast.info("Already Unlocked!", { description: `You already own ${product.name}.` });
      return true;
    }

    const nextIds = [...purchasedIds, product.id];
    savePurchases(nextIds);

    toast.success("Payment Successful! 🎉", {
      description: `${product.name} prompt has been unlocked. Full parameters and copy access granted!`,
    });
    return true;
  };

  const buyWithLemonSqueezy = async (product: Product, checkoutUrl?: string) => {
    if (isPurchased(product.id)) {
      toast.info("Already Owned", { description: "You have already unlocked this prompt." });
      return;
    }

    if (checkoutUrl) {
      // Append user info and product_id to custom data
      const url = new URL(checkoutUrl);
      if (currentUser?.email) {
        url.searchParams.set("checkout[email]", currentUser.email);
      }
      if (currentUser?.displayName) {
        url.searchParams.set("checkout[name]", currentUser.displayName);
      }
      url.searchParams.set("checkout[custom][product_id]", product.id);

      openLemonCheckout(url.toString());
    } else {
      // Direct instant simulated checkout if specific Lemon Squeezy variant is not yet attached
      await unlockProduct(product);
    }
  };

  const unlockedProducts = products.filter((p) => purchasedIds.includes(p.id));

  return (
    <PurchasesContext.Provider
      value={{
        purchasedIds,
        isPurchased,
        unlockProduct,
        buyWithLemonSqueezy,
        unlockedProducts,
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
}

export function usePurchases() {
  const ctx = useContext(PurchasesContext);
  if (!ctx) {
    throw new Error("usePurchases must be used within a PurchasesProvider");
  }
  return ctx;
}
