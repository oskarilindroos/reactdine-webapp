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
      const newCart = { ...prevCart };
      const dishInCart = newCart.items.find((item) => item.id === dish.id);

      // If dish is not in cart, add it and set quantity to 1
      if (!dishInCart) {
        newCart.items.push({ ...dish, quantity: 1 });
      }

      return newCart;
    });

  // Calculate the total price of all items in cart
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
      const newCart = { ...prevCart };
      const dishInCart = newCart.items.find((item) => item.id === dishId);

      // Update quantity of the item in cart
      if (dishInCart) {
        dishInCart.quantity = quantity;
      }

      // Remove item from cart if quantity is set to 0
      if (quantity < 1) {
        newCart.items = newCart.items.filter((item) => item.id !== dishId);
      }

      return newCart;
    });

  const removeFromCart = (dishId) =>
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const dishInCart = newCart.items.find((item) => item.id === dishId);

      // If dish is in cart, remove it
      if (dishInCart) {
        newCart.items = newCart.items.filter((item) => item.id !== dishId);
      }

      return newCart;
    });

  const emptyCart = () => {
    setCart({ items: [] });
    localStorage.removeItem("cart");
  };

  // Save cart to localStorage every time the state changes
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
