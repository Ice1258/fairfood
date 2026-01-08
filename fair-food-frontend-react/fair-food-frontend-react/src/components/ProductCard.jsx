import React from "react";

export default function ProductCard({ product }) {
  return (
    <article className="card">
      <div className="media">🍎</div>

      <div className="card-body">
        <div className="title">
          {product.name}{" "}
          {product.bio && <span className="badge">BIO</span>}
        </div>

        <div className="price">CHF {product.price.toFixed(2)}</div>

        <div className="muted">
          {product.brand} • {product.distance} km • {product.origin}
        </div>

        <div className="muted">
          Haltbarkeit: {product.expiryDays} Tage
        </div>
      </div>
    </article>
  );
}
