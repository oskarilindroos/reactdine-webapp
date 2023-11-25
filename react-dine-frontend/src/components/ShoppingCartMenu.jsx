import { useState, useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import CartContext from "../contexts/CartContext";
import Button from "./Button";
import QuantityInput from "./QuantityInput";

const ShoppingCartMenu = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const quantityButtonHandler = (dishId, quantity) => {
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
  };

  const checkoutHandler = () => {
    navigate("/order/checkout");
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${
        (cart.items.length > 0 && !isHovered) ?? "animate-bounce"
      }`}
      onClick={() => setIsHovered(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex">
        <ShoppingCartIcon className="h-10 w-10 text-react-blue" />
        {cart.items.length > 0 && (
          <span className="flex justify-center text-sm bg-react-blue rounded-full h-6 w-6">
            {cart.items.length}
          </span>
        )}
        {isHovered && (
          <div className="flex gap-4 flex-col bg-ocean-light p-4 rounded shadow-lg">
            <h4 className="text-xl">Your order</h4>
            {cart.items.length === 0 && (
              <p>You haven't added anything to your order yet........</p>
            )}
            <ul>
              {cart.items.map((item) => (
                <div className="flex flex-row gap-2" key={item.id}>
                  <li className="py-2">{item.name}</li>
                  <QuantityInput
                    customClassName=""
                    quantity={item.quantity}
                    quantityButtonHandler={quantityButtonHandler}
                    itemId={item.id}
                  />
                  <hr />
                </div>
              ))}
            </ul>
            <hr />
            <p>
              Order total:{" "}
              {cart.items
                .reduce(
                  (n, { price, quantity }) => n + Number(price) * quantity,
                  0
                )
                .toFixed(2)}
              $
            </p>
            <Button onClick={checkoutHandler}>Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartMenu;
