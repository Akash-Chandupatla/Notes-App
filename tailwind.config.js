import { beige } from "color-name";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.html"],
  theme: {
    extend: {
      fontFamily: {
        mukta: ['"Mukta", "Arial"'],
      },
      colors: {
        beigeCustom: "#FEFAF6",
        beigeHeadCustom: "#A0937D",
        beigeTitleCustom: "#E8DFCA",
        forestGreen: "#1A4D2E",
        brownLightCustom: "#E4C59E",
        brownDarkCustom: "#543310",
      },
    },
  },
  plugins: [],
};
