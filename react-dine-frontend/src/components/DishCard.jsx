import { PropTypes } from "prop-types";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import CartContext from "../contexts/CartContext";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const imgBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const DishCard = ({ dish }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(dish);
    setIsAddedToCart(true);
    toast.success(`${dish.name} added to your order`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(dish.id);
    setIsAddedToCart(false);
    toast.info(`${dish.name} removed from your order`);
  };

  // Check if dish is already in cart when component is mounted
  // and set isAddedToCart state accordingly
  useEffect(() => {
    const isDishInCart = cart.items.find((item) => item.id === dish.id);
    setIsAddedToCart(isDishInCart);
  }, [cart, dish.id]);

  const getIcon = () => {
    if (isAddedToCart) {
      return (
        <div>
          <CheckCircleIcon className="h-12 w-12 text-green-400 group-hover:hidden" />
          <XCircleIcon className="hidden h-12 w-12 cursor-pointer text-red-500 transition duration-300 ease-in-out hover:text-red-600 group-hover:block" />
        </div>
      );
    } else {
      return (
        <PlusCircleIcon className="h-12 w-12 cursor-pointer text-react-blue transition duration-300 ease-in-out hover:text-green-400" />
      );
    }
  };

  const getCardHoverStyles = () => {
    if (isAddedToCart) {
      return "-translate-y-2 outline outline-2 outline-green-400 hover:outline-red-400";
    } else {
      return "hover:-translate-y-2";
    }
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={isAddedToCart ? handleRemoveFromCart : handleAddToCart}
    >
      <div
        className={`flex max-w-md flex-col rounded-t-2xl border-transparent  bg-ocean-light shadow-inner shadow-ocean-dark drop-shadow-md transition duration-300 ease-in-out hover:outline hover:outline-2 hover:outline-react-blue ${getCardHoverStyles()} `}
      >
        <img
          className={`pointer-events-none min-h-full rounded-t-2xl border-b-2 border-dotted border-fire-dark bg-black`}
          src={`${imgBaseUrl}/${dish.image}`}
          alt={dish.name}
        />
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">{dish.name}</h2>
            <p className="text-sm">{dish.description}</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <p className="text-xl font-bold">${dish.price}</p>
            {getIcon()}
          </div>
        </div>
      </div>
    </div>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default DishCard;
