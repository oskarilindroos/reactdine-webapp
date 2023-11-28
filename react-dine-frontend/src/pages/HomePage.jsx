import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getWeekDay } from "../helpers/dateHelper";
import { useLocation, Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

import bannerVideo from "../assets/bannerVideo.mp4";
import bannerImage from "../assets/banner.png";

const HomePage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative flex items-center justify-center h-screen"
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
