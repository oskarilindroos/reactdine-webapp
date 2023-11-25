import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
/*
  THIS COMPONENT IS NOT USED ATM
*/

const navItems = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Menu",
    path: "/",
  },
  {
    name: "Your Order",
    path: "/order",
  },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide navbar on scroll down, show on scroll up
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsVisible(currentScrollY > 0);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav
        className={
          "flex items-center justify-center gap-8 bg-ocean-dark text-sun-light h-16 uppercase transition-opacity duration-500"
        }
      >
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            className={({ isActive }) => (isActive ? "underline" : "")}
            to={item.path}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
