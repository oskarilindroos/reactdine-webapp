import { PropTypes } from "prop-types";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import CartContext from "../contexts/CartContext";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import placeholderImg from "../assets/dishPlaceholder.png";

const imgBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const DishCard = ({ dish }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // For showing placeholder image until dish image is loaded
  const onImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAddToCart = () => {
    addToCart(dish);
    setAddedToCart(true);
    toast.success(`${dish.name} added to your order`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(dish.id);
    setAddedToCart(false);
    toast.error(`${dish.name} removed from your order`);
  };

  // Check if dish is already in cart when component is mounted
  // and set addedToCart state accordingly
  useEffect(() => {
    const isDishInCart = cart.items.find((item) => item.id === dish.id);
    setAddedToCart(isDishInCart);
  }, [cart, dish.id]);

  const getIcon = () => {
    if (addedToCart) {
      return (
        <div>
          <CheckCircleIcon className="w-12 h-12 text-green-400 group-hover:hidden" />
          <XCircleIcon className="w-12 h-12 text-red-500 hover:text-red-600 cursor-pointer transition duration-300 ease-in-out hidden group-hover:block" />
        </div>
      );
    } else {
      return (
        <PlusCircleIcon className="w-12 h-12 text-react-blue hover:text-green-400 cursor-pointer transition duration-300 ease-in-out" />
      );
    }
  };

  const getCardHoverStyles = () => {
    if (addedToCart) {
      return "-translate-y-2 outline outline-2 outline-green-400 hover:outline-red-400";
    } else {
      return "hover:-translate-y-2";
    }
  };

  return (
    <div
      className="cursor-pointer group"
      onClick={!addedToCart ? handleAddToCart : handleRemoveFromCart}
    >
      <div
        className={`flex flex-col max-w-md bg-ocean-light rounded-t-2xl  shadow-ocean-dark shadow-inner drop-shadow-md border-transparent hover:outline hover:outline-2 hover:outline-react-blue transition duration-300 ease-in-out ${getCardHoverStyles()} `}
      >
        <img
          className={`rounded-t-2xl border-b-2 min-h-full border-dotted pointer-events-none border-fire-dark bg-black`}
          src={imageLoaded ? `${imgBaseUrl}/${dish.image}` : placeholderImg}
          alt={dish.name}
          onLoad={onImageLoad}
        />
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">{dish.name}</h2>
            <p className="text-sm">{dish.description}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-2">
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
