import React, { useEffect, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import TopDeals from "./components/TopDeals";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="banner">
        <div className="title">FAIR-FOOD</div>
      </div>

      <TopDeals products={products} />
      <ProductGrid products={products} />
    </>
  );
}

export default App;
