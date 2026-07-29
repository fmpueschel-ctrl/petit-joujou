/* ============================================================
   Petit Joujou | The One — Shop
   Kuratiert. Nachhaltig. Das Beste aus jeder Kategorie.
   ============================================================ */

import { trpc } from "@/lib/trpc";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/contexts/CartContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import type { Product } from "@shared/commerce/types";
import { useMemo, useState } from "react";
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
  const { cart, isOpen, closeCart, itemCount, updateQuantity, removeItem, proceedToCheckout, loading, ageConfirmed, setAgeConfirmed } = useCart();

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
            {/* Age confirmation checkbox */}
            <label
              className="font-body"
              style={{
                display: "flex", alignItems: "flex-start", gap: "0.5rem",
                marginBottom: "1rem", cursor: "pointer",
                fontSize: "0.78rem", color: C.inkMid, lineHeight: 1.5,
              }}
            >
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                style={{ marginTop: "2px", accentColor: C.bgSage }}
              />
              <span>
                Ich bestätige, dass ich mindestens 16 Jahre alt bin.
              </span>
            </label>

            <button
              onClick={proceedToCheckout}
              disabled={loading || !ageConfirmed}
              className="font-body"
              style={{
                width: "100%", padding: "1rem",
                backgroundColor: ageConfirmed ? C.bgSage : C.border, color: ageConfirmed ? "#fff" : C.inkLight,
                border: "none", cursor: ageConfirmed ? "pointer" : "not-allowed",
                fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                transition: "background-color 0.2s, color 0.2s",
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
function ProductCard({ product, onAdded }: { product: Product; onAdded?: () => void }) {
  const { addItem, loading } = useCart();
  const variant = product.variants[0];
  const image = product.images[0];
  const [adding, setAdding] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isEventTicket = product.productType === "Event-Ticket";
  const isWine = !isEventTicket && product.vendor !== "Spreadconnect" && !product.tags.includes("Spreadconnect");
  const isMerch = product.vendor === "Spreadconnect" || product.tags.includes("Spreadconnect");

  const handleAdd = async () => {
    if (!variant || !variant.availableForSale) return;
    setAdding(true);
    await addItem(variant.id, 1);
    setAdding(false);
    onAdded?.();
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
      <div style={{ aspectRatio: isEventTicket ? "4/5" : "1", backgroundColor: isEventTicket ? "#1a2a24" : "#fafcfb", display: "flex", alignItems: "center", justifyContent: "center", padding: isEventTicket ? "0" : "2rem" }}>
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            style={{ width: "100%", height: "100%", objectFit: isEventTicket ? "cover" : "contain" }}
          />
        ) : (
          <div style={{ width: "80px", height: "80px", backgroundColor: C.border, borderRadius: "50%" }} />
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
        <h3 className="font-display" style={{ fontSize: "1.3rem", color: C.ink, margin: 0, lineHeight: 1.3 }}>
          <Link href={`/shop/${product.handle}`} style={{ color: "inherit", textDecoration: "none" }}>
            {product.title}
          </Link>
        </h3>
        {product.description && (
          <div>
            <p className="font-body" style={{
              fontSize: "0.85rem", color: C.inkMid, margin: 0, lineHeight: 1.6,
              whiteSpace: "pre-line",
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
        {/* EU-Weinkennzeichnung — nur für Wein */}
        {isWine && (
          <p className="font-body" style={{ fontSize: "0.7rem", color: C.inkLight, margin: "0.5rem 0 0", lineHeight: 1.6 }}>
            Enthält Sulfite · {product.vendor && `${product.vendor}`}
          </p>
        )}
        <div style={{ marginTop: "auto", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span className="font-display" style={{ fontSize: "1.4rem", color: C.ink }}>
              {parseFloat(product.priceRange.min.amount) === 0 ? "Kostenlos" : formatMoney(product.priceRange.min)}
            </span>
            {isWine && (() => {
              const upm = product.variants[0]?.unitPriceMeasurement;
              const price = parseFloat(product.priceRange.min.amount);
              const grundpreis = upm && upm.quantityValue > 0
                ? (price / upm.quantityValue * upm.referenceValue).toFixed(2).replace(".", ",")
                : null;
              return (
                <>
                  <span className="font-body" style={{ display: "block", fontSize: "0.7rem", color: C.inkLight, marginTop: "0.15rem" }}>
                    inkl. MwSt.{grundpreis && <> · Grundpreis {grundpreis} €/{upm!.referenceUnit.toLowerCase()}</>}
                  </span>
                  <span className="font-body" style={{ display: "block", fontSize: "0.65rem", color: C.inkLight, marginTop: "0.15rem" }}>
                    zzgl. <Link href="/versand" style={{ color: C.sage, textDecoration: "underline", textUnderlineOffset: "2px" }}>Versandkosten</Link> · Lieferzeit 3–5 Werktage
                  </span>
                </>
              );
            })()}
            {isMerch && (
              <span className="font-body" style={{ display: "block", fontSize: "0.7rem", color: C.inkLight, marginTop: "0.15rem" }}>
                inkl. MwSt. · zzgl. <Link href="/versand" style={{ color: C.sage, textDecoration: "underline", textUnderlineOffset: "2px" }}>Versandkosten</Link>
              </span>
            )}
          </div>
          {/* Multi-variant products (merch) → link to detail page for selection */}
          {isMerch && product.variants.length > 1 ? (
            <Link
              href={`/shop/${product.handle}`}
              className="font-body"
              style={{
                padding: "0.7rem 1.5rem",
                backgroundColor: C.bgSage,
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Auswählen
            </Link>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

// ── Category Tabs ───────────────────────────────────────────
type Category = "Alle" | "Wein" | "Events" | "Joujou";

type SubCategory = "Wein" | "Events" | "Joujou";

function CategoryTabs({ active, onChange, counts }: { active: Category; onChange: (c: Category) => void; counts: Record<SubCategory, number> }) {
  const total = counts.Wein + counts.Events + counts.Joujou;
  const tabs: { key: Category; label: string; count: number }[] = [
    { key: "Alle", label: "Alle", count: total },
    { key: "Wein", label: "Wein", count: counts.Wein },
    { key: "Events", label: "Events", count: counts.Events },
    { key: "Joujou", label: "Joujou", count: counts.Joujou },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
      {tabs.filter(t => t.key === "Alle" || t.count > 0).map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className="font-body"
          style={{
            padding: "0.6rem 1.5rem",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            border: `1px solid ${active === t.key ? C.bgSage : C.border}`,
            backgroundColor: active === t.key ? C.bgSage : "transparent",
            color: active === t.key ? "#fff" : C.inkMid,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {t.label} ({t.count})
        </button>
      ))}
    </div>
  );
}

function categorizeProduct(product: Product): Category {
  if (product.productType === "Event-Ticket" || product.tags.includes("Event")) return "Events";
  if (product.vendor === "Spreadconnect" || product.tags.includes("Joujou")) return "Joujou";
  return "Wein";
}

// ── Main Shop Page ───────────────────────────────────────────
export default function Shop() {
  // Load all products (no collection filter) so Events + Joujou items appear too
  const { data: allProducts = [], isLoading: loadingAll } = trpc.commerce.products.list.useQuery({ first: 100 });
  // Load wine collection separately for correct sort order
  const { data: wineCollectionProducts = [], isLoading: loadingWines } = trpc.commerce.products.list.useQuery({ collectionHandle: "weine" });
  const isLoading = loadingAll || loadingWines;

  // Merge: use wine collection order for wines, append non-wine products at the end
  const products = useMemo(() => {
    const wineIds = new Set(wineCollectionProducts.map(p => p.id));
    const nonWineProducts = allProducts.filter(p => !wineIds.has(p.id));
    return [...wineCollectionProducts, ...nonWineProducts];
  }, [allProducts, wineCollectionProducts]);
  const { itemCount, openCart } = useCart();
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useState<ReturnType<typeof setTimeout> | null>(null);

  const showAddedToast = () => {
    setToastVisible(true);
    if (toastTimer[0]) clearTimeout(toastTimer[0]);
    toastTimer[0] = setTimeout(() => setToastVisible(false), 2500);
  };

  // Read ?tab= from URL to allow deep-linking from homepage
  const getInitialTab = (): Category => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "wein") return "Wein";
    if (tab === "events") return "Events";
    if (tab === "joujou") return "Joujou";
    return "Alle";
  };
  const [activeCategory, setActiveCategory] = useState<Category>(getInitialTab);

  const counts = useMemo(() => {
    const c = { Wein: 0, Events: 0, Joujou: 0 };
    products.forEach(p => {
      const cat = categorizeProduct(p);
      if (cat === "Wein") c.Wein++;
      else if (cat === "Events") c.Events++;
      else if (cat === "Joujou") c.Joujou++;
    });
    return c;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Alle") return products;
    return products.filter(p => categorizeProduct(p) === activeCategory);
  }, [products, activeCategory]);

  usePageMeta({
    title: "Shop | The One — petit joujou",
    description: "Kuratierter Shop: Das Beste aus jeder Kategorie, nachhaltig ausgewählt. 6 x Schorle-Riesling trocken (1L) vom Weingut Egon Schmitt, Bad Dürkheim.",
    canonical: "https://www.petit-joujou.de/shop",
    ogTitle: "Shop | The One — petit joujou",
    ogDescription: "Kuratierter Shop: Das Beste aus jeder Kategorie, nachhaltig ausgewählt vom petit joujou Gremium.",
  });

  // Product JSON-LD for SEO (C-6)
  const productJsonLd = products.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": products[0].title,
    "description": products[0].description,
    "image": products[0].images[0]?.url,
    "brand": { "@type": "Brand", "name": "petit joujou | The One" },
    "offers": {
      "@type": "Offer",
      "url": "https://www.petit-joujou.de/shop",
      "priceCurrency": "EUR",
      "price": products[0].priceRange.min.amount,
      "availability": products[0].variants[0]?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": { "@type": "Organization", "name": "Joujou GmbH" },
    },
  } : null;

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      {/* Product JSON-LD */}
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ShopNav />
      <CartDrawer />

      {/* Cart Button in header area — always visible */}
      <button
        onClick={openCart}
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 90,
          padding: "0.7rem 1.2rem",
          borderRadius: "2rem",
          backgroundColor: C.bgSage, color: "#fff",
          border: "none", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.8rem", fontWeight: 600,
          letterSpacing: "0.05em",
        }}
        aria-label="Warenkorb öffnen"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span>Warenkorb</span>
        {itemCount > 0 && (
          <span style={{
            backgroundColor: "#fff", color: C.bgSage,
            borderRadius: "50%", width: "20px", height: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.7rem", fontWeight: 700,
          }}>
            {itemCount}
          </span>
        )}
      </button>

      {/* Hero / Intro */}
      <section style={{ paddingTop: "120px", paddingBottom: "4rem", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <p className="font-script" style={{ fontSize: "1.1rem", color: C.sage, marginBottom: "0.5rem" }}>
            petit joujou
          </p>
          <h1 className="font-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", color: C.ink, margin: "0 0 1rem", lineHeight: 1.15, fontWeight: 600 }}>
            The One
          </h1>
          <div className="font-body" style={{ fontSize: "1.05rem", color: C.inkMid, lineHeight: 1.8, margin: "0 auto", maxWidth: "600px" }}>
            <p style={{ margin: "0 0 1rem" }}>
              Dieser Shop enthält von jedem Artikel nur einen Einzigen — the One — bei dem
              Preis und Genuss, Design oder Funktion am besten zusammenpassen.
            </p>
            <p style={{ margin: "0 0 1rem" }}>
              Wir haben zusammen mit Gästen und Freunden für dich getestet. Damit sparst du
              dir das Aussuchen und Vergleichen — und beim Verschenken das Grübeln.
            </p>
            <p style={{ margin: 0 }}>
              Alle Artikel erfüllen unsere Nachhaltigkeitskriterien — biozertifiziert, in
              Umstellung oder auf andere Weise nachhaltig. Was nicht bio ist, steht am Produkt.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ width: "60px", height: "1px", backgroundColor: C.sage, margin: "0 auto 3rem", opacity: 0.4 }} />

      {/* Category Tabs */}
      {!isLoading && products.length > 0 && (
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} counts={counts} />
      )}

      {/* Products Grid */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p className="font-body" style={{ color: C.inkLight }}>Laden...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p className="font-body" style={{ color: C.inkLight, fontSize: "1rem" }}>
                Bald verfügbar — wir kuratieren gerade.
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: filteredProducts.length === 1 ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
              maxWidth: filteredProducts.length === 1 ? "480px" : "100%",
              margin: filteredProducts.length === 1 ? "0 auto" : undefined,
            }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdded={showAddedToast} />
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
              Versand innerhalb Deutschlands: 5,99 € · Express: 9,99 € · Lieferzeit 3–5 Werktage
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "0.75rem", flexWrap: "wrap" }}>
              {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay", "Shop Pay"].map((m) => (
                <span key={m} className="font-body" style={{ fontSize: "0.65rem", color: C.inkMid, padding: "0.25rem 0.5rem", border: `1px solid ${C.border}`, backgroundColor: "#fff" }}>{m}</span>
              ))}
            </div>
          </div>

          {/* Alcohol Notice — only when wine products are visible */}
          {(activeCategory === "Alle" ? counts.Wein > 0 : activeCategory === "Wein") && (
            <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "rgba(42,74,62,0.04)", border: `1px solid ${C.border}` }}>
              <p className="font-body" style={{ fontSize: "0.75rem", color: C.inkMid, margin: 0, lineHeight: 1.7 }}>
                Kein Verkauf an Personen unter 16 Jahren. Altersverifikation bei Zustellung.<br />
                Enthält Sulfite. Alkoholgehalt und Füllmenge siehe Produktdetails.<br />
                Verantwortungsvoller Genuss — bitte trinke bewusst.
              </p>
            </div>
          )}

          {/* Contact */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p className="font-body" style={{ fontSize: "0.85rem", color: C.inkMid, margin: "0 0 0.3rem", fontWeight: 600 }}>
              Fragen?
            </p>
            <p className="font-body" style={{ fontSize: "0.8rem", color: C.inkLight, margin: 0, lineHeight: 1.7 }}>
              <a href="tel:+4963227906693" style={{ color: C.sage, textDecoration: "none" }}>+49 6322 7906693</a> · <a href="mailto:hallo@joujou-pfalz.de" style={{ color: C.sage, textDecoration: "none" }}>hallo@joujou-pfalz.de</a>
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
            <Link href="/versand" className="font-body" style={{ fontSize: "0.75rem", color: C.inkLight, textDecoration: "none" }}>
              Versand
            </Link>
          </div>
          <Link href="/" className="font-body" style={{ fontSize: "0.8rem", color: C.sage, display: "inline-block" }}>
            ← Zurück zur Weinbar
          </Link>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastVisible && (
        <div
          style={{
            position: "fixed", bottom: "5rem", right: "1.5rem", zIndex: 200,
            backgroundColor: C.bgSage, color: "#fff",
            padding: "0.8rem 1.2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            display: "flex", alignItems: "center", gap: "0.75rem",
            fontSize: "0.85rem",
            animation: "fadeInUp 0.2s ease-out",
          }}
        >
          <span className="font-body">Zum Warenkorb hinzugefügt</span>
          <button
            onClick={openCart}
            className="font-body"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: C.peach, textDecoration: "underline", fontSize: "0.85rem",
              textUnderlineOffset: "2px",
            }}
          >
            Warenkorb ansehen
          </button>
        </div>
      )}
    </div>
  );
}
