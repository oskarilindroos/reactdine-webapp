import { useState, useContext, useRef, useEffect, Fragment } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import CartContext from "../contexts/CartContext";
import Button from "./Button";
import OrderSummary from "./OrderSummary";

const ShoppingCartMenu = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { cart } = useContext(CartContext);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/checkout", { preventScrollReset: true });
  };

  // Close menu when user clicks outside of it (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Prevent scrolling the page when menu is open
  useEffect(() => {
    if (isHovered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isHovered]);

  return (
    <Fragment>
      <div
        ref={menuRef}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={() => setIsHovered(true)}
        className={`fixed bottom-4 right-4 z-50 pl-4 ${
          cart.items.length > 0 && !isHovered && "animate-bounce"
        }`}
      >
        <div className="flex">
          <ShoppingBagIcon
            className={`h-10 w-10 text-fire-dark ${isHovered ? "hidden" : ""}`}
          />
          {cart.items.length > 0 && (
            <span
              className={`flex h-6 w-6 justify-center rounded-full bg-fire-dark text-sm text-black ${
                isHovered ? "hidden" : ""
              }`}
            >
              {cart.items.length}
            </span>
          )}
          {isHovered && (
            <div className="flex min-w-[300px] flex-col gap-4 rounded-lg border-2 border-ocean-dark bg-ocean-light p-4 shadow-lg">
              <div className="max-h-[480px] overflow-scroll p-2 lg:max-h-[800px]">
                <OrderSummary title="Your Order" cart={cart} />
              </div>
              <Button onClickHandler={checkoutHandler}>Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ShoppingCartMenu;
