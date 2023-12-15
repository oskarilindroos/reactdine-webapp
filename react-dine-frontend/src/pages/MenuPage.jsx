import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import LoadingIcon from "../components/LoadingIcon";
import DishCard from "../components/DishCard";
import ShoppingCartMenu from "../components/ShoppingCartMenu";
import useApi from "../hooks/useApi";

const MenuPage = () => {
  const menuRef = useRef(null);
  const { data, loading, error, getDishes } = useApi();

  // Fetch dishes on page load
  useEffect(() => {
    getDishes();
  }, [getDishes]);

  return (
    <motion.div
      ref={menuRef}
      className="mx-auto my-8 flex max-w-6xl  flex-col justify-items-center gap-12 px-4"
      initial={{
        opacity: 0,
        y: 1000,
        transition: { duration: 2 },
      }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      exit={{ opacity: 0, x: -1000, transition: { duration: 0.5 } }}
    >
      <ShoppingCartMenu />
      <h1 className="my-8 text-center text-3xl">What would you like today?</h1>
      {Boolean(loading) && <LoadingIcon />}
      {Boolean(error) && <p>{error.message ?? "An error occured."}</p>}
      <section className="grid grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((dish) => (
          <motion.div
            key={dish.id}
            initial="hidden"
            whileInView="visible"
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0 },
            }}
          >
            <DishCard dish={dish} />
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
};

export default MenuPage;
