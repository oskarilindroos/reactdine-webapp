/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto Serif"', ...defaultTheme.fontFamily.sans], // Default font
      },
      colors: {
        "ocean-dark": "#001827",
        "ocean-light": "#002741",
        "fire-dark": "#FB4D03",
        "sun-light": "#FBFFCC",
        "react-blue": "#61DBFB",
      },
      keyframes: {
        "underline-animated": {
          "0%": { "text-decoration-color": "transparent" },
          "100%": { "text-decoration-color": "red" },
        },
      },
      animation: {
        underline: "underline-animated 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
