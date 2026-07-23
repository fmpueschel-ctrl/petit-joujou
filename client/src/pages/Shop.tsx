/* ============================================================
   Petit Joujou | The One — Shop
   Kuratiert. Nachhaltig. Das Beste aus jeder Kategorie.
   ============================================================ */

import { trpc } from "@/lib/trpc";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/commerce/types";
import { useState } from "react";
import { Link } from "wouter";

// ── Palette (same as Home.tsx) ───────────────────────────────
const C = {
  bg: "#f2f7f4",
  bgSage: "#2a4a3e",
  ink: "#1a2a24",
  inkMid: "#4a5a54",
  inkLight: "#7a8a84",
  sage: "#3a6a5a",
  rose: "#d4688a",
  peach: "#f4a87a",
  border: "#d0e0d8",
};

// ── Nav (simplified for shop page) ───────────────────────────
function ShopNav() {
  return (
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
          <span className="font-script" style={{ fontSize: "1.7rem", color: "#ffffff", letterSpacing: "0.02em" }}>
            petit joujou
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="font-body" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Weinbar
          </Link>
          <span className="font-body" style={{ color: "#ffffff", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.6)", paddingBottom: "2px" }}>
            Shop
          </span>
        </div>
      </div>
    </nav>
  );
}

// ── Cart Drawer ──────────────────────────────────────────────
function CartDrawer() {
  const { cart, isOpen, closeCart, itemCount, updateQuantity, removeItem, proceedToCheckout, loading } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
        }}
      />
      {/* Drawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 101,
          width: "min(400px, 90vw)",
          backgroundColor: C.bg,
          boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "1.5rem", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className="font-display" style={{ fontSize: "1.4rem", color: C.ink, margin: 0 }}>
            Warenkorb ({itemCount})
          </h3>
          <button onClick={closeCart} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: C.inkMid }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {(!cart || cart.items.length === 0) ? (
            <p className="font-body" style={{ color: C.inkLight, textAlign: "center", marginTop: "3rem" }}>
              Dein Warenkorb ist leer.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {cart.items.map((item) => (
                <div key={item.lineId} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  {item.image && (
                    <img
                      src={item.image.url}
                      alt={item.productTitle}
                      style={{ width: "64px", height: "64px", objectFit: "contain", borderRadius: "4px", backgroundColor: "#fff" }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <p className="font-body" style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, color: C.ink }}>
                      {item.productTitle}
                    </p>
                    {item.variantTitle !== "Default Title" && (
                      <p className="font-body" style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: C.inkLight }}>
                        {item.variantTitle}
                      </p>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        disabled={loading}
                        style={{ width: "28px", height: "28px", border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        −
                      </button>
                      <span className="font-body" style={{ fontSize: "0.9rem", color: C.ink }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        disabled={loading}
                        style={{ width: "28px", height: "28px", border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        disabled={loading}
                        className="font-body"
                        style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: C.rose, textDecoration: "underline" }}
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                  <span className="font-body" style={{ fontSize: "0.9rem", fontWeight: 600, color: C.ink }}>
                    {formatMoney(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div style={{ padding: "1.5rem", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span className="font-body" style={{ fontSize: "1rem", fontWeight: 600, color: C.ink }}>Gesamt</span>
              <span className="font-body" style={{ fontSize: "1.1rem", fontWeight: 700, color: C.ink }}>
                {formatMoney(cart.total)}
              </span>
            </div>
            <button
              onClick={proceedToCheckout}
              disabled={loading}
              className="font-body"
              style={{
                width: "100%", padding: "1rem",
                backgroundColor: C.bgSage, color: "#fff",
                border: "none", cursor: "pointer",
                fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
              }}
            >
              Zur Kasse
            </button>
            <p className="font-body" style={{ fontSize: "0.7rem", color: C.inkLight, textAlign: "center", marginTop: "0.75rem" }}>
              Weiterleitung zum sicheren Shopify-Checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// ── Product Card ─────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const { addItem, loading } = useCart();
  const variant = product.variants[0];
  const image = product.images[0];
  const [adding, setAdding] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAdd = async () => {
    if (!variant || !variant.availableForSale) return;
    setAdding(true);
    await addItem(variant.id, 1);
    setAdding(false);
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      transition: "box-shadow 0.2s ease",
    }}>
      {/* Image */}
      <div style={{ aspectRatio: "1", backgroundColor: "#fafcfb", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <div style={{ width: "80px", height: "80px", backgroundColor: C.border, borderRadius: "50%" }} />
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
        <h3 className="font-display" style={{ fontSize: "1.3rem", color: C.ink, margin: 0, lineHeight: 1.3 }}>
          {product.title}
        </h3>
        {product.description && (
          <div>
            <p className="font-body" style={{
              fontSize: "0.85rem", color: C.inkMid, margin: 0, lineHeight: 1.6,
              ...(!expanded ? { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" } : {}),
            }}>
              {product.description}
            </p>
            {product.description.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="font-body"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "0.8rem", color: C.sage, padding: "0.3rem 0 0",
                  textDecoration: "underline", textUnderlineOffset: "2px",
                }}
              >
                {expanded ? "Weniger anzeigen" : "Mehr lesen"}
              </button>
            )}
          </div>
        )}
        <div style={{ marginTop: "auto", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span className="font-display" style={{ fontSize: "1.4rem", color: C.ink }}>
              {formatMoney(product.priceRange.min)}
            </span>
            <span className="font-body" style={{ display: "block", fontSize: "0.7rem", color: C.inkLight, marginTop: "0.15rem" }}>
              inkl. MwSt. · {(parseFloat(product.priceRange.min.amount) / 6).toFixed(2).replace(".", ",")} €/L
            </span>
          </div>
          <button
            onClick={handleAdd}
            disabled={!variant?.availableForSale || loading || adding}
            className="font-body"
            style={{
              padding: "0.7rem 1.5rem",
              backgroundColor: variant?.availableForSale ? C.bgSage : C.border,
              color: variant?.availableForSale ? "#fff" : C.inkLight,
              border: "none",
              cursor: variant?.availableForSale ? "pointer" : "not-allowed",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              transition: "opacity 0.15s",
              opacity: adding ? 0.6 : 1,
            }}
          >
            {adding ? "..." : variant?.availableForSale ? "In den Korb" : "Ausverkauft"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Shop Page ───────────────────────────────────────────
export default function Shop() {
  const { data: products = [], isLoading } = trpc.commerce.products.list.useQuery();
  const { itemCount, openCart } = useCart();

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      <ShopNav />
      <CartDrawer />

      {/* Cart FAB */}
      {itemCount > 0 && (
        <button
          onClick={openCart}
          style={{
            position: "fixed", bottom: "2rem", right: "2rem", zIndex: 90,
            width: "56px", height: "56px", borderRadius: "50%",
            backgroundColor: C.bgSage, color: "#fff",
            border: "none", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.2rem", fontWeight: 700,
          }}
          aria-label="Warenkorb öffnen"
        >
          {itemCount}
        </button>
      )}

      {/* Hero / Intro */}
      <section style={{ paddingTop: "120px", paddingBottom: "4rem", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <p className="font-script" style={{ fontSize: "1.1rem", color: C.sage, marginBottom: "0.5rem" }}>
            petit joujou
          </p>
          <h1 className="font-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: C.ink, margin: "0 0 1rem", lineHeight: 1.15, fontWeight: 600 }}>
            The One
          </h1>
          <p className="font-body" style={{ fontSize: "1.05rem", color: C.inkMid, lineHeight: 1.8, margin: "0 auto", maxWidth: "600px" }}>
            Dieser Shop enthält von jedem Artikel nur einen Einzigen — den für uns Besten! Wir haben für dich getestet, damit sparst du dir das Aussuchen und Vergleichen. Alle Artikel erfüllen die Joujou Nachhaltigkeitskriterien und wurden von einem internen Gremium gegenüber den jeweils anderen Kandidaten ausgewählt.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ width: "60px", height: "1px", backgroundColor: C.sage, margin: "0 auto 3rem", opacity: 0.4 }} />

      {/* Products Grid */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p className="font-body" style={{ color: C.inkLight }}>Laden...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p className="font-body" style={{ color: C.inkLight, fontSize: "1rem" }}>
                Bald verfügbar — wir kuratieren gerade.
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: products.length === 1 ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
              maxWidth: products.length === 1 ? "480px" : "100%",
              margin: products.length === 1 ? "0 auto" : undefined,
            }}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Shop Info Section */}
      <section style={{ padding: "2rem 0 0", borderTop: `1px solid ${C.border}` }}>
        <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
          {/* Shipping & Payment */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMid, margin: "0 0 0.3rem", fontWeight: 600 }}>
              Versand & Zahlung
            </p>
            <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkLight, margin: 0, lineHeight: 1.7 }}>
              Versand innerhalb Deutschlands: 5,90 € (frei ab 60 €) · Lieferzeit 2–4 Werktage<br />
              Zahlung via Kreditkarte, PayPal, Google Pay, Shop Pay
            </p>
          </div>

          {/* Alcohol Notice */}
          <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "rgba(42,74,62,0.04)", border: `1px solid ${C.border}` }}>
            <p className="font-body" style={{ fontSize: "0.75rem", color: C.inkMid, margin: 0, lineHeight: 1.7 }}>
              Kein Verkauf an Personen unter 18 Jahren. Altersverifikation bei Zustellung.<br />
              Enthält Sulfite. Alkoholgehalt und Füllmenge siehe Produktdetails.<br />
              Verantwortungsvoller Genuss — bitte trinke bewusst.
            </p>
          </div>

          {/* Price Notice */}
          <p className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, margin: "0 0 1.5rem", lineHeight: 1.6 }}>
            Alle Preise inkl. MwSt. · Grundpreis wird am Produkt ausgewiesen.
          </p>
        </div>
      </section>

      {/* Footer with Legal Links */}
      <footer style={{ padding: "1.5rem 0 3rem", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
            <Link href="/impressum" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>
              Impressum
            </Link>
            <Link href="/datenschutz" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>
              Datenschutz
            </Link>
            <Link href="/agb" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>
              AGB
            </Link>
            <Link href="/widerruf" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>
              Widerruf
            </Link>
          </div>
          <Link href="/" className="font-body" style={{ fontSize: "0.8rem", color: C.sage, display: "inline-block" }}>
            ← Zurück zur Weinbar
          </Link>
        </div>
      </footer>
    </div>
  );
}
