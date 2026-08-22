declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Setup: (config: {
        eventHandler?: (event: { event: string; data?: any }) => void;
      }) => void;
      Url: {
        Open: (url: string) => void;
        Close: () => void;
      };
    };
  }
}

export const LEMON_STORE_ID = import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID || "457558";

/**
 * Initializes Lemon Squeezy overlay and event listener
 */
export function initLemonSqueezy(onPaymentSuccess?: (data: any) => void) {
  if (typeof window === "undefined") return;

  if (window.createLemonSqueezy) {
    window.createLemonSqueezy();
  }

  if (window.LemonSqueezy?.Setup) {
    window.LemonSqueezy.Setup({
      eventHandler: (event) => {
        if (event.event === "Checkout.Success") {
          if (onPaymentSuccess) {
            onPaymentSuccess(event.data);
          }
        }
      },
    });
  }
}

/**
 * Opens Lemon Squeezy overlay checkout modal
 */
export function openLemonCheckout(url: string) {
  if (typeof window === "undefined") return;

  // Make sure LemonSqueezy overlay is initialized
  initLemonSqueezy();

  if (window.LemonSqueezy?.Url?.Open) {
    window.LemonSqueezy.Url.Open(url);
  } else {
    // Fallback: popup/new tab if script hasn't loaded
    window.open(url, "_blank", "width=600,height=750");
  }
}
