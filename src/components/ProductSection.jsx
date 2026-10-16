import React from "react";
import ProductCard from "./ProductCard";

export default function ProductSection({ title, products, subtitle = "Special Products For You" }) {
  return (
    <section className="products-section">
      <div className="section-heading"><h2>{title}</h2><span /></div>
      <p className="section-subtitle">{subtitle}</p>
      {products.length ? (
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : <div className="empty-state">No products match your search. Try another keyword or category.</div>}
    </section>
  );
}
