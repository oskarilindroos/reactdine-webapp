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
      className="flex flex-col gap-12 px-4  mx-auto my-8 justify-items-center max-w-6xl"
      initial={{ opacity: 0, y: 1000, transition: { duration: 2 } }}
      animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
      exit={{ opacity: 0, x: -1000, transition: { duration: 0.5 } }}
    >
      <ShoppingCartMenu />
      <motion.h1
        //initial={{ y: 1000, transition: { duration: 3 } }}
        //animate={{ y: 0, transition: { duration: 3 } }}
        className="text-3xl text-center my-8"
      >
        What would you like today?
      </motion.h1>
      {Boolean(loading) && <LoadingIcon />}
      {Boolean(error) && <p>{error.message ?? "An error occured."}</p>}
      <section className="grid px-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((dish) => (
          <motion.div
            key={dish.id}
            initial="hidden"
            whileInView="visible"
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
