import { useState, useEffect, useMemo } from "react";
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

const setCartToLocalStorage = (cart) =>
  localStorage.setItem("cart", JSON.stringify(cart));

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage());

  const addToCart = (dish) =>
    setCart((prevCart) => {
      const dishInCart = prevCart.items.find((item) => item.id === dish.id);

      // If dish is not in cart, add it and set quantity to 1
      if (!dishInCart) {
        return { items: [...prevCart.items, { ...dish, quantity: 1 }] };
      }

      return prevCart;
    });

  const getTotalPrice = useMemo(
    () =>
      cart.items.reduce(
        (n, { price, quantity }) => n + Number(price) * quantity,
        0
      ),
    [cart]
  );

  const setItemQuantity = (dishId, quantity) =>
    setCart((prevCart) => {
      const newItems = prevCart.items
        .map((item) => {
          if (item.id === dishId) {
            return { ...item, quantity: Math.max(quantity, 0) }; // Quantity can't be negative
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      return { items: newItems };
    });

  const removeFromCart = (dishId) =>
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== dishId);
      return { items: newItems };
    });

  const emptyCart = () => {
    setCart({ items: [] });
    localStorage.removeItem("cart");
  };

  // Save cart to localStorage every time the cart state changes
  useEffect(() => setCartToLocalStorage(cart), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        emptyCart,
        addToCart,
        getTotalPrice,
        removeFromCart,
        setItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
