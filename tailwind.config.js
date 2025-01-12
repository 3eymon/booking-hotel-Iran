/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Peyda: ["Peyda"],
        PeydaLight: ["Peyda-light"],
        PeydaBlack: ["Peyda-black"],
        PeydaMed: ["Peyda-med"],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [tailwindcssAnimated],
};
