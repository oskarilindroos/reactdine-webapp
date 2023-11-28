import { PropTypes } from "prop-types";
import { useContext } from "react";

import QuantityInput from "./QuantityInput";
import CartContext from "../contexts/CartContext";

const OrderSummary = ({ title, cart }) => {
  const { setItemQuantity, getTotalPrice } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-xl underline">{title}</h4>
      </div>
      {cart.items.length === 0 && <p>No items yet.</p>}
      <ul className="overflow-y-auto max-h-full">
        {cart.items.map((item) => (
          <div
            className="flex flex-row items-center py-2 border-sun-light border-b-2"
            key={item.id}
          >
            <li className="flex-grow">
              {item.name} - ${item.price}
            </li>
            <QuantityInput
              quantity={item.quantity}
              quantityButtonHandler={setItemQuantity}
              itemId={item.id}
            />
          </div>
        ))}
      </ul>
      <p>
        Order total:{" "}
        <span className="font-bold text-lg">${getTotalPrice.toFixed(2)}</span>
      </p>
    </div>
  );
};

OrderSummary.propTypes = {
  title: PropTypes.string.isRequired,
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ),
  }),
};

export default OrderSummary;
