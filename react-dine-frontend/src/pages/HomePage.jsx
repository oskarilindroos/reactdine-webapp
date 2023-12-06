import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import bannerVideo from "../assets/bannerVideo.mp4";
import bannerImage from "../assets/banner.png";
import { useCallback, useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  const onScrollDown = useCallback(() => {
    navigate("/menu");
  }, [navigate]);

  useEffect(() => {
    const onWheel = (event) => {
      // If moving mouse wheel down
      if (event.deltaY > 0) {
        onScrollDown();
      }
    };

    // Wheel event is used instead of scroll because scroll event
    // would not be fired because of the height of the page
    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [onScrollDown]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative flex h-screen items-center justify-center"
    >
      <video
        autoPlay
        loop
        muted
        src={bannerVideo}
        poster={bannerImage}
        alt="Banner"
        className="absolute h-full w-full object-cover opacity-50 blur-sm"
      />
      <div className="z-10 flex flex-col items-start gap-2 p-4">
        <h1 className="max-w-2xl text-5xl">
          Welcome to{" "}
          <span className="underline">
            <span className="text-react-blue">React</span>
            <span className="text-fire-dark">Dine</span>
          </span>
        </h1>
        <blockquote className="italic">
          <span>Your Digital Gateway to React Diner’s Kitchen</span>
        </blockquote>
        <Link
          to="/menu"
          className="flex items-center justify-center gap-2 font-bold hover:text-fire-dark"
        >
          <ChevronDownIcon className="h-6 w-6 animate-bounce" />
          <span className="underline">Order Now</span>
        </Link>
      </div>
    </motion.section>
  );
};

export default HomePage;
