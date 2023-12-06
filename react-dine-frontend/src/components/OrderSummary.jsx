import { PropTypes } from "prop-types";
import { useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

import QuantityInput from "./QuantityInput";
import CartContext from "../contexts/CartContext";

const OrderSummary = ({ title, cart }) => {
  const { setItemQuantity, getTotalPrice } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h4 className="text-xl underline">{title}</h4>
      </div>
      {cart.items.length === 0 && <p>No items yet.</p>}
      <ul className="max-h-full overflow-y-auto">
        {cart.items.map((item) => (
          <div
            className="flex flex-row items-center gap-4 border-b-2 border-sun-light py-2"
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
            <button
              className="flex items-center justify-center"
              onClick={() => setItemQuantity(item.id, 0)}
            >
              <TrashIcon className="h-6 w-6 text-red-500" />
            </button>
          </div>
        ))}
      </ul>
      <p>
        Order total:{" "}
        <span className="text-lg font-bold">${getTotalPrice.toFixed(2)}</span>
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
