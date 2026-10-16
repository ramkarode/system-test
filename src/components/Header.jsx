import React from "react";
import { Heart, ShoppingCart, UserCircle, Search, Store } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Header({ search, setSearch, onOpenCart, onOpenWishlist }) {
  const { cartCount, wishlist } = useStore();
  return (
    <header className="site-header">
      <a className="brand" href="#" aria-label="E-commerce home">
        <img className="brand-logo" src="/Image/logo.png" alt="E-commerce" />
      </a>
      <label className="search-box">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for Products, Brands and More" aria-label="Search products" />
        <Search size={18} />
      </label>
      <div className="header-actions">
        <button className="user-action" type="button"><UserCircle size={17} /><span>Tim</span><span className="tiny-chevron">⌄</span></button>
        <button type="button" onClick={onOpenWishlist} className="header-action"><span className="icon-wrap"><Heart size={18} /><b>{wishlist.length}</b></span><span>Wishlist</span></button>
        <button type="button" onClick={onOpenCart} className="header-action"><span className="icon-wrap"><ShoppingCart size={19} /><b>{cartCount}</b></span><span>Cart</span></button>
      </div>
    </header>
  );
}
