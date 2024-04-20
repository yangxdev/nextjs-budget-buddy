import type { Config } from "tailwindcss";
const { SIDEBAR_MIN_WIDTH, MAIN_PADDING, DASHBOARD_PADDING } = require("./app/_styles/styles");

const config: Config = {
    darkMode: "selector",
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
    theme: {
        extend: {
            animation: {
                'pulse-delay': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 2s infinite',
            },
            fontFamily: {
                sans: ["Nexa", "sans-serif"],
            },
            colors: {
                darkGrayCustom: "#1a1b1d", // nav menu background
                darkGrayCustom2: "#1d2123", // main view background
                lightGrayCustom: "#2d2d2d", // hover
                lightGrayCustom2: "#353a3d", // logout button
                lightGrayCustom3: "#26292e", // cards background
                lightGrayCustom4: "#434343", // background color of input boxes inside cards for dark theme
                textColor: "#fff", // main text
                accentGreenLighter: "#76E0B5",
                accentGreen: "#06c879",
                accentGreenDarker: "#08B36C",
                accentGreenDarkerer: "#0A9D5F",
                accentRedLighter: "#D55B6D",
                accentRed: "#ca3249",
                accentRedDarker: "#b02a3b",
                accentYellow: "#dab85f",
                accentBlue: "#144999",
                accentOrange: "#e67e22",
                accentOrangeDarkerer: "#d16f1f",
                accentGray: "#b3b3b3",

                // 20/04/2024 re-design
                // Custom light theme palette
                platinum: "#EBE9E9",
                mintCream: "#F3F8F2",
                azul: "#0C6FC0",
                newBlue: { 
                    200: "#D6E4F7",
                    500: "#1455fb",
                },
                sandyBrown: "FCB07E",
                alabaster: "DEE2D6",
                white: "#FFFFFF",
                whiteDarker: "#FDFDFD",
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
