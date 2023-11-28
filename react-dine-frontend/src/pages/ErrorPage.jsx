import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="text-6xl text-fire-dark">404</h1>
      <p>Page not found</p>
      <Link className="hover:text-fire-dark text-react-blue underline" to="/">
        Back to home
      </Link>
    </motion.div>
  );
};

export default ErrorPage;
