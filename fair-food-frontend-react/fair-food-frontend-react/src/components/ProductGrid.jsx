import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const API_URL = "http://localhost:8080/api/products";

const CHF = (n) => `CHF ${Number(n).toFixed(2)}`;

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productQuery, setProductQuery] = useState("");
  const [productQueryDraft, setProductQueryDraft] = useState("");
  const [bioOnly, setBioOnly] = useState(false);
  const [originChoice, setOriginChoice] = useState(null);
  const [brandQuery, setBrandQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDist, setMinDist] = useState("");
  const [maxDist, setMaxDist] = useState("");
  const [showOriginChooser, setShowOriginChooser] = useState(false);
  const [showBrandInput, setShowBrandInput] = useState(false);
  const [brandDraft, setBrandDraft] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Fetch products failed:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function toggleSort(nextKey) {
    if (sortKey !== nextKey) {
      setSortKey(nextKey);
      setSortDir(nextKey === "expiryDays" ? "desc" : "asc");
      return;
    }
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
  }

  const filtered = useMemo(() => {
    const minP = minPrice === "" ? null : Number(minPrice);
    const maxP = maxPrice === "" ? null : Number(maxPrice);
    const minD = minDist === "" ? null : Number(minDist);
    const maxD = maxDist === "" ? null : Number(maxDist);

    let list = [...products];

    if (productQuery.trim()) {
      const q = productQuery.trim().toLowerCase();
      list = list.filter((p) => (p.name || "").toLowerCase().includes(q));
    }

    if (bioOnly) {
      list = list.filter((p) => Boolean(p.bio));
    }

    if (originChoice) {
      list = list.filter((p) => (p.origin || "").toLowerCase() === originChoice);
    }

    if (brandQuery.trim()) {
      const bq = brandQuery.trim().toLowerCase();
      list = list.filter((p) => (p.brand || "").toLowerCase() === bq);
    }

    if (minP != null) list = list.filter((p) => Number(p.price) >= minP);
    if (maxP != null) list = list.filter((p) => Number(p.price) <= maxP);

    if (minD != null) list = list.filter((p) => Number(p.distance) >= minD);
    if (maxD != null) list = list.filter((p) => Number(p.distance) <= maxD);

    if (sortKey) {
      list.sort((a, b) => {
        const va = Number(a?.[sortKey] ?? 0);
        const vb = Number(b?.[sortKey] ?? 0);
        return va - vb;
      });
      if (sortDir === "desc") list.reverse();
    }

    return list;
  }, [products, productQuery, bioOnly, originChoice, brandQuery, minPrice, maxPrice, minDist, maxDist, sortKey, sortDir]);

  const sortAttr = (key) => (sortKey === key ? sortDir : undefined);

  return (
    <section className="section details" aria-labelledby="detail-heading">
      <h2 id="detail-heading">Detailsuche</h2>

      <div className="product-search" role="search" aria-label="Produkt suchen">
        <div className="bar">
          <input
            type="search"
            placeholder="Produkt suchen … z. B. Apfel"
            value={productQueryDraft}
            onChange={(e) => setProductQueryDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setProductQuery(productQueryDraft);
            }}
          />
        </div>
        <button type="button" onClick={() => setProductQuery(productQueryDraft)}>
          Suchen
        </button>
      </div>

      <div className="filters" role="group" aria-label="Filter">
        <button
          className={`chip ${bioOnly ? "active" : ""}`}
          type="button"
          onClick={() => setBioOnly((v) => !v)}
        >
          Bio
        </button>

        <button
          className="chip"
          type="button"
          data-sort={sortAttr("price")}
          title="Preis sortieren"
          onClick={() => toggleSort("price")}
        >
          Preis
        </button>

        <button
          className="chip"
          type="button"
          data-sort={sortAttr("distance")}
          title="Distanz sortieren"
          onClick={() => toggleSort("distance")}
        >
          Distanz
        </button>

        <button
          className={`chip ${showOriginChooser ? "active" : ""}`}
          type="button"
          title="Nur regional / import"
          onClick={() => {
            setShowOriginChooser((s) => !s);
            setShowBrandInput(false);
          }}
        >
          Herkunft
        </button>

        <button
          className={`chip ${showBrandInput ? "active" : ""}`}
          type="button"
          title="Marke eingeben & Enter"
          onClick={() => {
            setShowBrandInput((s) => !s);
            setShowOriginChooser(false);
          }}
        >
          Marke
        </button>

        <button
          className="chip"
          type="button"
          data-sort={sortAttr("expiryDays")}
          title="Haltbarkeit sortieren"
          onClick={() => toggleSort("expiryDays")}
        >
          Haltbarkeit
        </button>
      </div>

      <div className="inline-controls" id="inlineControls">
        {showOriginChooser && (
          <div className="pill" id="originChooser">
            <span style={{ fontWeight: 700 }}>Herkunft:</span>

            <button
              className={`mini-btn ${originChoice === "regional" ? "active" : ""}`}
              type="button"
              onClick={() => setOriginChoice("regional")}
            >
              regional
            </button>

            <button
              className={`mini-btn ${originChoice === "import" ? "active" : ""}`}
              type="button"
              onClick={() => setOriginChoice("import")}
            >
              import
            </button>

            <button
              className="mini-btn"
              type="button"
              onClick={() => setOriginChoice(null)}
            >
              Alle
            </button>
          </div>
        )}

        {showBrandInput && (
          <div className="pill" id="brandInputWrap">
            <span style={{ fontWeight: 700 }}>Marke:</span>

            <input
              id="brandInput"
              type="text"
              placeholder="z.B. FairFood → Enter"
              value={brandDraft}
              onChange={(e) => setBrandDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setBrandQuery(brandDraft.trim());
                if (e.key === "Escape") {
                  setBrandDraft("");
                  setBrandQuery("");
                }
              }}
              aria-label="Marke eingeben"
            />

            <button
              className="mini-btn"
              id="brandClear"
              title="Filter entfernen"
              type="button"
              onClick={() => {
                setBrandDraft("");
                setBrandQuery("");
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="price-range" id="priceRange">
        <div className="field">
          <strong>Min:</strong>
          <input
            type="number"
            step="0.05"
            min="0"
            placeholder="0.00"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>CHF</span>
        </div>

        <div className="field">
          <strong>Max:</strong>
          <input
            type="number"
            step="0.05"
            min="0"
            placeholder="999.00"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <span>CHF</span>
        </div>

        <small style={{ opacity: 0.75 }}>Filtert nach Läden-Preisspanne der Produkte</small>
      </div>

      <div className="dist-range" id="distRange">
        <div className="field">
          <strong>Min:</strong>
          <input
            type="number"
            step="1"
            min="0"
            placeholder="1"
            value={minDist}
            onChange={(e) => setMinDist(e.target.value)}
          />
          <span>Km</span>
        </div>

        <div className="field">
          <strong>Max:</strong>
          <input
            type="number"
            step="1"
            min="0"
            placeholder="20"
            value={maxDist}
            onChange={(e) => setMaxDist(e.target.value)}
          />
          <span>Km</span>
        </div>

        <small style={{ opacity: 0.75 }}>
          Zeigt Produkte, die in mind. einem Laden innerhalb dieser Distanz verfügbar sind
        </small>
      </div>

      {loading ? (
        <div style={{ padding: "18px 0", opacity: 0.7 }}>Lade Produkte…</div>
      ) : (
        <div id="grid" className="grid" aria-live="polite">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}