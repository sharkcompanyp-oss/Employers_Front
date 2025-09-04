/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Noto Kufi Arabic"', "sans-serif"],
      },
      colors: {
        brand: "#8C52FF",
      },
    },
  },
  plugins: [],
};
