import React from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, cart } = useStore();
  const [added, setAdded] = useState(false);
  const wished = isWishlisted(product.id);
  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  };

  return (
    <article className="product-card">
      <button type="button" className={`wishlist-button ${wished ? "wished" : ""}`} onClick={() => toggleWishlist(product)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}>
        <Heart size={19} fill={wished ? "currentColor" : "none"} />
      </button>
      <div className="product-image-wrap"><img className="product-image" src={product.image} alt={product.title} loading="lazy" /></div>
      <div className="product-info">
        <h3 title={product.title}>{product.title}</h3>
        <p className="price-label">From <strong>${product.price.toFixed(2)}</strong></p>
        <button type="button" className={`add-button ${added ? "added" : ""}`} onClick={handleAdd}>
          {added ? <Check size={15} /> : <ShoppingCart size={15} />}
          {added ? "ADDED TO CART" : quantity ? `ADD MORE · ${quantity} IN CART` : "ADD TO CART"}
        </button>
        {quantity > 0 && <p className="cart-status"><span /> Added to Cart · {quantity}</p>}
      </div>
    </article>
  );
}
