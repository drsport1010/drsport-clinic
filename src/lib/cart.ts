"use client";

export type ShopOrder = {
  product: "scrubs" | "cup";
  productId?: string;
  name: string;
  price: number;
  shipping: number;
  color?: string;
  size?: string;
  qty: number;
  logoName?: string;
  logoDataUrl?: string;
};

const KEY = "drsport-order";

// The raw File survives client-side navigation here; sessionStorage (with a
// dataURL fallback for preview) covers a hard refresh on the checkout page.
let logoFile: File | null = null;

export function setLogoFile(file: File | null) {
  logoFile = file;
}

export function getLogoFile(): File | null {
  return logoFile;
}

export function saveOrder(order: ShopOrder) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ ...order, logoDataUrl: undefined }));
    } catch {
      /* private mode etc. — module state still carries the order in-session */
    }
  }
}

export function loadOrder(): ShopOrder | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ShopOrder) : null;
  } catch {
    return null;
  }
}

export function clearOrder() {
  logoFile = null;
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function dataUrlToFile(dataUrl: string, name: string): File | null {
  try {
    const [meta, b64] = dataUrl.split(",");
    const mime = meta.match(/data:(.*?);/)?.[1] || "image/png";
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new File([bytes], name, { type: mime });
  } catch {
    return null;
  }
}
