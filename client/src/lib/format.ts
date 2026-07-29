import type { Money, Image } from "@shared/commerce/types";

/**
 * Append Shopify CDN width parameter to an image URL for server-side resizing.
 * Shopify CDN URLs support `&width=N` (or `?width=N`) to deliver pre-scaled images.
 * Falls back to the original URL for non-Shopify sources.
 */
export function shopifyImageUrl(image: Image | null | undefined, width: number): string {
  if (!image?.url) return "";
  const url = image.url;
  // Only append width param to Shopify CDN URLs
  if (!url.includes("cdn.shopify.com")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}width=${width}`;
}

/**
 * Generate srcSet string for responsive images from Shopify CDN.
 * Returns empty string for non-Shopify URLs.
 */
export function shopifyImageSrcSet(image: Image | null | undefined, widths: number[]): string {
  if (!image?.url) return "";
  if (!image.url.includes("cdn.shopify.com")) return "";
  return widths
    .map(w => `${shopifyImageUrl(image, w)} ${w}w`)
    .join(", ");
}

/**
 * Format a Money or raw amount string into a localized currency string.
 * Uses German locale (de-DE) for EUR formatting.
 */
export function formatMoney(value: Money | string | number, currencyCode?: string): string {
  let amountNum: number;
  let code: string;

  if (typeof value === "object" && value !== null && "amount" in value) {
    amountNum = Number.parseFloat(value.amount);
    code = value.currencyCode;
  } else {
    amountNum = typeof value === "string" ? Number.parseFloat(value) : value;
    code = currencyCode ?? "EUR";
  }

  if (Number.isNaN(amountNum)) return "—";

  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amountNum);
  } catch {
    return `${amountNum.toFixed(2).replace(".", ",")} €`;
  }
}
