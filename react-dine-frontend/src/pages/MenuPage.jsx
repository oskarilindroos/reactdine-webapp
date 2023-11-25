import { Fragment } from "react";
import bannerImage from "../assets/banner.png";
import bannerVideo from "../assets/bannerVideo.mp4";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRef, useEffect } from "react";
import useApi from "../hooks/useApi";

import LoadingIcon from "../components/LoadingIcon";
import DishCard from "../components/DishCard";

const MenuPage = () => {
  const menuRef = useRef(null);
  const { data, loading, error, getDishes } = useApi();

  const scrollToMenu = () => {
    menuRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch dishes on page load
  useEffect(() => {
    getDishes();
  }, [getDishes]);

  return (
    <Fragment>
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
            <span className="underline-animated underline  decoration-react-blue">
              <span className="text-react-blue">React</span>
              Dine
            </span>
          </h1>
          <blockquote className="italic">
            <span>Your Digital Gateway to React Diner’s Kitchen</span>
          </blockquote>
          <button
            onClick={scrollToMenu}
            className="flex items-center justify-center gap-2 font-bold hover:text-react-blue"
          >
            <ChevronDownIcon className="h-6 w-6 animate-bounce" />
            <span className="underline">Order Now</span>
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-8 px-4  mx-auto my-8 justify-items-center max-w-6xl">
        <h1 ref={menuRef} className="text-3xl text-center">
          OUR MENU
        </h1>
        {loading && <LoadingIcon />}
        {error && <p>{error.message ?? "An error occured."}</p>}
        {data && (
          <section className="grid px-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </section>
        )}
      </section>
    </Fragment>
  );
};

export default MenuPage;
