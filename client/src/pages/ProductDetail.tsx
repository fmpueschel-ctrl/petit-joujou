/* ============================================================
   petit joujou — Product Detail Page (/shop/:handle)
   ============================================================ */

import { trpc } from "@/lib/trpc";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/contexts/CartContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";

const C = {
  bg: "#f2f7f4",
  bgSage: "#2a4a3e",
  ink: "#1a2a24",
  inkMid: "#4a5a54",
  inkLight: "#7a8a84",
  sage: "#3a6a5a",
  rose: "#d4688a",
  border: "#d0e0d8",
};

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [, setLocation] = useLocation();
  const { data: products = [], isLoading } = trpc.commerce.products.list.useQuery();
  const { addItem, loading: cartLoading } = useCart();
  const [adding, setAdding] = useState(false);

  // Find product by its Shopify handle
  const product = products.find((p) => p.handle === handle);

  usePageMeta({
    title: product ? `${product.title} — petit joujou Shop` : "Produkt — petit joujou Shop",
    description: product?.description?.slice(0, 155) || "Kuratiertes Produkt aus dem petit joujou Shop | The One.",
    canonical: `https://www.petit-joujou.de/shop/${handle}`,
  });

  if (isLoading) {
    return (
      <div style={{ backgroundColor: C.bg, minHeight: "100vh", paddingTop: "8rem", textAlign: "center" }}>
        <p className="font-body" style={{ color: C.inkLight }}>Laden...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: C.bg, minHeight: "100vh", paddingTop: "8rem", textAlign: "center" }}>
        <p className="font-body" style={{ color: C.inkMid, marginBottom: "2rem" }}>Produkt nicht gefunden.</p>
        <Link href="/shop" className="font-body" style={{ color: C.sage }}>← Zurück zum Shop</Link>
      </div>
    );
  }

  const variant = product.variants[0];
  const image = product.images[0];
  const isEventTicket = product.productType === "Event-Ticket";

  const handleAdd = async () => {
    if (!variant || !variant.availableForSale) return;
    setAdding(true);
    await addItem(variant.id, 1);
    setAdding(false);
  };

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(42,74,62,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span className="font-script" style={{ fontSize: "1.7rem", color: "#ffffff" }}>petit joujou</span>
          </Link>
          <Link href="/shop" className="font-body" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            ← Shop
          </Link>
        </div>
      </nav>

      {/* Product Content */}
      <section style={{ paddingTop: "100px", paddingBottom: "4rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            {/* Image */}
            <div style={{ backgroundColor: "#fff", border: `1px solid ${C.border}`, padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1" }}>
              {image ? (
                <img src={image.url} alt={image.altText || product.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              ) : (
                <div style={{ width: "120px", height: "120px", backgroundColor: C.border, borderRadius: "50%" }} />
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="font-display" style={{ fontSize: "1.8rem", color: C.ink, marginBottom: "1rem", lineHeight: 1.3 }}>
                {product.title}
              </h1>

              <div style={{ marginBottom: "1.5rem" }}>
                <span className="font-display" style={{ fontSize: "2rem", color: C.ink }}>
                  {parseFloat(product.priceRange.min.amount) === 0 ? "Kostenlos" : formatMoney(product.priceRange.min)}
                </span>
                {!isEventTicket && (
                  <>
                    <span className="font-body" style={{ display: "block", fontSize: "0.75rem", color: C.inkLight, marginTop: "0.25rem" }}>
                      inkl. MwSt. · Grundpreis {(parseFloat(product.priceRange.min.amount) / 6).toFixed(2).replace(".", ",")} €/L
                    </span>
                    <span className="font-body" style={{ display: "block", fontSize: "0.7rem", color: C.inkLight, marginTop: "0.15rem" }}>
                      zzgl. <Link href="/versand" style={{ color: C.sage, textDecoration: "underline" }}>Versandkosten</Link> · Lieferzeit 2–4 Werktage
                    </span>
                  </>
                )}
              </div>

              {product.descriptionHtml ? (
                <div className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              ) : product.description ? (
                <p className="font-body" style={{ fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  {product.description}
                </p>
              ) : null}

              <button
                onClick={handleAdd}
                disabled={!variant?.availableForSale || cartLoading || adding}
                className="font-body"
                style={{
                  padding: "1rem 2.5rem",
                  backgroundColor: variant?.availableForSale ? C.bgSage : C.border,
                  color: variant?.availableForSale ? "#fff" : C.inkLight,
                  border: "none",
                  cursor: variant?.availableForSale ? "pointer" : "not-allowed",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  opacity: adding ? 0.6 : 1,
                  transition: "opacity 0.15s",
                }}
              >
                {adding ? "..." : variant?.availableForSale ? "In den Warenkorb" : "Ausverkauft"}
              </button>

              {/* Ticket legal notice — Widerrufsrecht-Ausschluss */}
              {isEventTicket && (
                <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "rgba(42,74,62,0.04)", border: `1px solid ${C.border}` }}>
                  <p className="font-body" style={{ fontSize: "0.75rem", color: C.inkMid, margin: 0, lineHeight: 1.7 }}>
                    <strong style={{ color: C.ink }}>Hinweis:</strong> Das Widerrufsrecht erlischt bei Verträgen zur Erbringung von Dienstleistungen im Zusammenhang mit Freizeitbetätigungen, wenn der Vertrag für die Erbringung einen spezifischen Termin vorsieht (§ 312g Abs. 2 Nr. 9 BGB). Eine Rückerstattung ist nach Buchung nicht möglich.
                  </p>
                </div>
              )}

              {/* Wine details — only for non-ticket products */}
              {!isEventTicket && (
                <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "rgba(42,74,62,0.04)", border: `1px solid ${C.border}` }}>
                  <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkMid, margin: 0, lineHeight: 1.8 }}>
                    <strong style={{ color: C.ink }}>Alkoholgehalt:</strong> 10,5 % vol.<br />
                    <strong style={{ color: C.ink }}>Jahrgang:</strong> 2025<br />
                    <strong style={{ color: C.ink }}>Weingut:</strong> Egon Schmitt, Bad Dürkheim<br />
                    <strong style={{ color: C.ink }}>Inhalt:</strong> 6 × 1 Liter<br />
                    Enthält Sulfite.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "1.5rem 0 3rem", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <Link href="/impressum" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>Impressum</Link>
            <Link href="/datenschutz" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>Datenschutz</Link>
            <Link href="/agb" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>AGB</Link>
            <Link href="/widerruf" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>Widerruf</Link>
            <Link href="/versand" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>Versand</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
