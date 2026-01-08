import React from "react";

export default function TopDeals({ products }) {
    const topDeals = [...products]
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 4);

    return (
        <section className="section">
            <h2 className="h2">Top Deals</h2>
            <div className="divider" />

            <div className="deals">
                {topDeals.map((p, index) => (
                    <div key={p.id} className="pair">
                        <div className="item">
                            {p.name}
                            <br />
                            <span className="muted">{p.brand}</span>
                        </div>
                        <div className="item" style={{ textAlign: "right" }}>
                            {Math.round(p.discount * 100)}%
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
