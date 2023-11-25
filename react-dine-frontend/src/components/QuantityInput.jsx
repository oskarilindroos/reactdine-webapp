import { PropTypes } from "prop-types";

const QuantityInput = ({
  quantity,
  itemId,
  quantityButtonHandler,
  customClassName,
}) => {
  return (
    <div
      className={`flex gap-4 items-center bg-ocean-dark rounded-md p-2 shadow-inner shadow-lg ${customClassName}`}
    >
      <button onClick={() => quantityButtonHandler(itemId, quantity - 1)}>
        -
      </button>
      <p>{quantity}</p>
      <button onClick={() => quantityButtonHandler(itemId, quantity + 1)}>
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
