import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "@/lib/marketplace-data";
import { useAuth } from "./use-auth";

interface PurchasesContextType {
  purchasedIds: string[];
  isPurchased: (id: string) => boolean;
  unlockProduct: (product: Product) => Promise<boolean>;
  unlockedProducts: Product[];
}

const PurchasesContext = createContext<PurchasesContextType | null>(null);

const STORAGE_KEY = "store467i_purchased_products";

export function PurchasesProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

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

  const unlockedProducts = products.filter((p) => purchasedIds.includes(p.id));

  return (
    <PurchasesContext.Provider
      value={{
        purchasedIds,
        isPurchased,
        unlockProduct,
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
