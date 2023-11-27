import { PropTypes } from "prop-types";

const QuantityInput = ({
  quantity,
  itemId,
  quantityButtonHandler,
  customClassName,
}) => {
  return (
    <div
      className={`flex gap-4 w-24 justify-center items-center bg-ocean-dark rounded-full p-2 shadow-inner shadow-lg ${customClassName}`}
    >
      <button
        className="text-react-blue font-bold"
        onClick={() => quantityButtonHandler(itemId, quantity - 1)}
      >
        -
      </button>
      <p className="select-none w-4 text-center">{quantity}</p>
      <button
        className="text-react-blue font-bold"
        onClick={() => quantityButtonHandler(itemId, quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

QuantityInput.propTypes = {
  quantity: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  quantityButtonHandler: PropTypes.func.isRequired,
  customClassName: PropTypes.string,
};

export default QuantityInput;
