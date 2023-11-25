import { PropTypes } from "prop-types";

const Button = ({ children, onClickHandler }) => {
  return (
    <button
      className="bg-ocean-dark hover:border-2 border-2 border-transparent hover:border-react-blue rounded-md p-2 shadow-inner shadow-lg"
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClickHandler: PropTypes.func.isRequired,
};

export default Button;
