declare global {
  interface Window {
    /**
     * Gumroad's overlay script attaches click handlers to elements
     * with class "gumroad-button" whose href points to a Gumroad product URL.
     * There is no formal JS API — we trigger the overlay by simulating
     * a click on a hidden anchor element.
     */
    __gumroadScriptLoaded?: boolean;
  }
}

export const GUMROAD_PRODUCT_URL =
  (import.meta.env["VITE_GUMROAD_PRODUCT_URL"] as string | undefined) ||
  "https://yourname.gumroad.com/l/your-product";

// ---------------------------------------------------------------------------
// Sale-detection via postMessage
// ---------------------------------------------------------------------------

type GumroadSaleCallback = (data: Record<string, unknown>) => void;

let saleCallback: GumroadSaleCallback | undefined;
let listenerAttached = false;

function handleGumroadMessage(event: MessageEvent) {
  if (!event.data) return;
  try {
    const parsed = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
    if (parsed?.post_message_name === "sale" || parsed?.sale_timestamp) {
      saleCallback?.(parsed);
    }
  } catch {
    // Ignore non-JSON messages from other sources
  }
}

/**
 * Initialises the Gumroad postMessage listener so we can detect when a
 * purchase completes inside the overlay iframe.
 */
export function initGumroad(onSale?: GumroadSaleCallback) {
  if (typeof window === "undefined") return;

  saleCallback = onSale;

  if (!listenerAttached) {
    window.addEventListener("message", handleGumroadMessage, false);
    listenerAttached = true;
  }
}

/**
 * Cleans up the message listener (call on unmount if needed).
 */
export function destroyGumroad() {
  if (typeof window === "undefined") return;
  window.removeEventListener("message", handleGumroadMessage, false);
  listenerAttached = false;
  saleCallback = undefined;
}

// ---------------------------------------------------------------------------
// Open overlay checkout
// ---------------------------------------------------------------------------

/** Unique ID for the hidden trigger anchor */
const TRIGGER_ID = "__gumroad_hidden_trigger";

/**
 * Opens the Gumroad overlay checkout for a given product URL.
 *
 * How it works:
 * 1. Ensure a hidden `<a class="gumroad-button" href="…">` exists in the DOM.
 * 2. Call `.click()` on it — Gumroad's script intercepts and opens the overlay.
 * 3. If the script hasn't loaded yet, fall back to opening a new tab.
 */
export function openGumroadCheckout(url: string) {
  if (typeof window === "undefined") return;

  // --- Try overlay first ---
  let trigger = document.getElementById(TRIGGER_ID) as HTMLAnchorElement | null;

  if (!trigger) {
    trigger = document.createElement("a");
    trigger.id = TRIGGER_ID;
    trigger.className = "gumroad-button";
    trigger.style.display = "none";
    document.body.appendChild(trigger);
  }

  trigger.href = url;

  // Give Gumroad's script a tick to bind its click handler
  requestAnimationFrame(() => {
    if (trigger) {
      trigger.click();
    }

    // If the overlay doesn't open within 800ms, fall back to a popup
    setTimeout(() => {
      const overlay = document.querySelector(".gumroad-overlay-iframe, .gumroad-loading-indicator");
      if (!overlay) {
        window.open(url, "_blank", "width=620,height=760");
      }
    }, 800);
  });
}
