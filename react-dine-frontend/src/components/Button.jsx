import { PropTypes } from "prop-types";

const Button = ({ children, type, disabled, onClickHandler }) => {
  return (
    <button
      className="bg-ocean-dark hover:border-2 border-2 border-transparent disabled:opacity-50 disabled:hover:border-ocean-dark disabled:hover:cursor-not-allowed hover:border-react-blue rounded-md p-2 shadow-inner shadow-lg"
      onClick={onClickHandler}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default Button;
