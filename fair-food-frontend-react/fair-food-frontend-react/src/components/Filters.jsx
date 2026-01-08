import React from "react";

export default function Filters({ filters, setFilters, sort, setSort }) {
    function toggleSort(key) {
        setSort((s) =>
            s.key !== key
                ? { key, dir: "asc" }
                : { key, dir: s.dir === "asc" ? "desc" : "asc" }
        );
    }

    function arrow(key) {
        if (sort.key !== key) return "";
        return sort.dir === "asc" ? " ↑" : " ↓";
    }

    return (
        <>
            <div className="filters">
                <button
                    className={`chip ${filters.bio ? "active" : ""}`}
                    onClick={() =>
                        setFilters({ ...filters, bio: !filters.bio })
                    }
                >
                    Bio
                </button>

                <button className="chip" onClick={() => toggleSort("price")}>
                    Preis{arrow("price")}
                </button>

                <button className="chip" onClick={() => toggleSort("distance")}>
                    Distanz{arrow("distance")}
                </button>

                <button
                    className="chip"
                    onClick={() => toggleSort("expiryDays")}
                >
                    Haltbarkeit{arrow("expiryDays")}
                </button>
            </div>

            <div className="pill">
                <strong>Herkunft:</strong>
                {["regional", "import", "all"].map((o) => (
                    <button
                        key={o}
                        className={`mini-btn ${filters.origin === o ? "active" : ""
                            }`}
                        onClick={() =>
                            setFilters({ ...filters, origin: o })
                        }
                    >
                        {o === "all" ? "Alle" : o}
                    </button>
                ))}
            </div>

x            <div className="pill">
                <strong>Marke:</strong>
                <input
                    placeholder="z. B. FairFood → Enter"
                    value={filters.brand}
                    onChange={(e) =>
                        setFilters({ ...filters, brand: e.target.value })
                    }
                />
                <button
                    className="mini-btn"
                    onClick={() =>
                        setFilters({ ...filters, brand: "" })
                    }
                >
                    ✕
                </button>
            </div>
        </>
    );
}
