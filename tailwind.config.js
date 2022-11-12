/** @type {import('tailwindcss').Config} */

const withAnimations = require("animated-tailwindcss");

module.exports = withAnimations({
  darkMode: "class",
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // screens: {
      //   dark: { raw: "(prefers-color-scheme: dark)" },
      // },
      colors: {
        "primary-pink": "#e5a1aa",
        "primary-color": "var(--primary-color)",
        "primary-dark": "#333332",
      },
      boxShadow: {
        specialShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      },
      transitionProperty: {
        special: "all 0.2s ease-in-out",
      },
      screens: {
        xs: "320px",
      },
    },
    fontFamily: {
      Montserrat: ["Montserrat"],
      signature: ["Great Vibes"],
    },
  },
  plugins: [],
});
