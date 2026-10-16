import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const StoreContext = createContext(null);
const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("shop-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("shop-wishlist", []));

  useEffect(() => localStorage.setItem("shop-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("shop-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const toggleWishlist = (product) => setWishlist((current) =>
    current.some((item) => item.id === product.id)
      ? current.filter((item) => item.id !== product.id)
      : [...current, product]
  );
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = useMemo(() => ({
    cart, wishlist, cartCount, cartTotal, addToCart, removeFromCart, toggleWishlist, isWishlisted
  }), [cart, wishlist, cartCount, cartTotal]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
