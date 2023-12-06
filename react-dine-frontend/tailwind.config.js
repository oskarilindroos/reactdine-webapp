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
    },
  },
  plugins: [],
};
