import { PropTypes } from "prop-types";
import { useContext, useState } from "react";

import CartContext from "../contexts/CartContext";
import Button from "./Button";
const placeholderImg = "../assets/react.svg";

const imgBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const DishCard = ({ dish }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setCart } = useContext(CartContext);

  const onImageLoad = () => {
    console.log("Image loaded");
    setImageLoaded(true);
  };

  const addToCart = () => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const dishInCart = newCart.items.find((item) => item.id === dish.id);

      // Add dish to cart if it's not already in cart and set quantity to 1
      if (!dishInCart) {
        newCart.items.push({ ...dish, quantity: 1 });
      }

      return newCart;
    });
    setAddedToCart(true);
  };

  return (
    <div>
      <div className="flex flex-col bg-ocean-light rounded-t-2xl shadow-md border-2 border-transparent hover:-translate-y-2 hover:border-react-blue hover:border-2 transition duration-300 ease-in-out">
        <img
          className="rounded-t-2xl border-b-2 border-react-blue"
          src={
            imageLoaded
              ? `${imgBaseUrl}/${dish.image}`
              : "https://res.cloudinary.com/practicaldev/image/fetch/s--NVPk20-f--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/2imjutnczd4f3jdhgbdx.png"
          }
          alt={dish.name}
          onLoad={onImageLoad}
        />
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">{dish.name}</h2>
            <p className="text-sm">{dish.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">{dish.price}$</p>
          </div>
          <Button onClickHandler={addToCart}>Add to Order</Button>
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
