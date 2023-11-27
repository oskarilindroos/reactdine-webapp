import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRef, useEffect } from "react";
import { getWeekDay } from "../helpers/dateHelper";
import { useLocation } from "react-router-dom";

import useApi from "../hooks/useApi";
import bannerVideo from "../assets/bannerVideo.mp4";
import bannerImage from "../assets/banner.png";

import LoadingIcon from "../components/LoadingIcon";
import DishCard from "../components/DishCard";
import ShoppingCartMenu from "../components/ShoppingCartMenu";

const MenuPage = () => {
  const menuRef = useRef(null);
  const { data, loading, error, getDishes } = useApi();

  const location = useLocation();

  const scrollToMenu = (behavior) => {
    menuRef.current.scrollIntoView({ behavior: behavior });
  };

  // Fetch dishes on page load
  useEffect(() => {
    getDishes();
  }, [getDishes]);

  // Scroll to menu instantly when coming back from the checkout page
  useEffect(() => {
    if (location.state?.from === "checkout" && !loading) {
      scrollToMenu("instant");
    }
  }, [location.state, loading]);

  return (
    <Fragment>
      <ShoppingCartMenu />
      <section className="relative flex items-center justify-center h-screen">
        <video
          autoPlay
          loop
          muted
          src={bannerVideo}
          poster={bannerImage}
          alt="Banner"
          className="absolute h-full w-full object-cover opacity-50 blur-sm"
        />
        <div className="flex flex-col items-start gap-2 z-10 p-4">
          <h1 className="text-5xl max-w-2xl">
            Welcome to{" "}
            <span className="underline">
              <span className="text-react-blue">React</span>
              <span className="text-fire-dark">Dine</span>
            </span>
          </h1>
          <blockquote className="italic">
            <span>Your Digital Gateway to React Diner’s Kitchen</span>
          </blockquote>
          <button
            onClick={() => scrollToMenu("smooth")}
            className="flex items-center justify-center gap-2 font-bold hover:text-fire-dark"
          >
            <ChevronDownIcon className="h-6 w-6 animate-bounce" />
            <span className="underline">Order Now</span>
          </button>
        </div>
      </section>
      <section
        ref={menuRef}
        className="flex flex-col gap-12 px-4  mx-auto my-8 justify-items-center max-w-6xl"
      >
        <h1 className="text-3xl text-center my-8">
          What would you like this {getWeekDay(new Date())}?
        </h1>
        {Boolean(loading) && <LoadingIcon />}
        {Boolean(error) && <p>{error.message ?? "An error occured."}</p>}
        <section className="grid px-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </section>
      </section>
    </Fragment>
  );
};

export default MenuPage;
