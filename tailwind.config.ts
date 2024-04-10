import type { Config } from "tailwindcss";
const { SIDEBAR_MIN_WIDTH, MAIN_PADDING, DASHBOARD_PADDING } = require("./app/_styles/styles");

const config: Config = {
  darkMode: "selector",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nexa", "sans-serif"],
      },
      colors: {
        darkGrayCustom: "#1a1b1d", // nav menu background
        darkGrayCustom2: "#1d2123", // main view background
        lightGrayCustom: "#2d2d2d", // hover 
        lightGrayCustom2: "#616b71", // logout button  
        textColor: "#fff", // main text 
        accentGreen: "#06c879",
        accentRed: "#ca3249",
        accentYellow: "#dab85f",
        accentBlue: "#144999",
      },
      spacing: {
        sidebar: SIDEBAR_MIN_WIDTH,
        padding: MAIN_PADDING,
        "dashboard-padding": DASHBOARD_PADDING,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
export default config;
