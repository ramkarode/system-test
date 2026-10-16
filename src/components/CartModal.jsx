import React from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function CartModal({ open, onClose, mode = "cart" }) {
  const { cart, wishlist, removeFromCart, toggleWishlist, cartTotal, addToCart } = useStore();
  if (!open) return null;
  const isCart = mode === "cart";
  const items = isCart ? cart : wishlist;

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="cart-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <div><p className="modal-kicker">YOUR SELECTION</p><h2 id="modal-title">{isCart ? "Shopping Cart" : "Your Wishlist"}</h2></div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close modal"><X /></button>
        </div>
        {!items.length ? <div className="modal-empty"><ShoppingBag size={38} /><h3>{isCart ? "Your cart is empty" : "Your wishlist is empty"}</h3><p>Find something you love and it will appear here.</p><button className="primary-button" onClick={onClose}>Continue shopping</button></div> :
          <>
            <div className="cart-items">{items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-thumb"><img src={item.image} alt="" /></div>
                <div className="cart-item-copy"><h3>{item.title}</h3><p>${item.price.toFixed(2)} {isCart && <span>· Qty {item.quantity}</span>}</p>{!isCart && <button className="text-action" onClick={() => { addToCart(item); }}>Add to cart</button>}</div>
                <button className="remove-button" type="button" onClick={() => isCart ? removeFromCart(item.id) : toggleWishlist(item)} aria-label={`Remove ${item.title}`}><Trash2 size={17} /></button>
              </div>
            ))}</div>
            {isCart && <div className="cart-summary"><div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="primary-button" onClick={() => window.alert("Checkout demo: connect a payment provider to accept orders.")}>Proceed to checkout</button></div>}
          </>
        }
      </section>
    </div>
  );
}
