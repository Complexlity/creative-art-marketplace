/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d2f55e",
      },
      boxShadow: {
        "3xl": "0 30px 200px -5px rgba(0, 0, 0, 0.3)",
        round: "0 0 5px 3px rgb(0 0 0 / 0.25)",
      },
    },
    fontFamily: {
      ttramillas: ["ttramillas", "sans-serif"],
      roboto: ["roboto", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin"),
  require("daisyui"),
],
};