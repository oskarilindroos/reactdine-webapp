import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

import CartContext from "./CartContext";

const getCartFromLocalStorage = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  // If cart exists in localStorage, return it, otherwise return an empty cart
  if (cartFromLocalStorage) {
    return cartFromLocalStorage;
  } else {
    return { items: [] };
  }
};

const setCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage());

  // Save cart to localStorage on every cart state change
  useEffect(() => {
    setCartToLocalStorage(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
