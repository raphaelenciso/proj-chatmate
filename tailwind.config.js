/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-1": "#ddddf7",
        "blue-2": "#a7bcff",
        "blue-3": "#8da4f1",
        "blue-4": "#7b96ec",
        "blue-5": "#5d5b8d",
        "blue-6": "#3d3c61",
        "blue-7": "#2f2d52",

        "primary-main": "#0080ff",
        "primary-darker": "#0059B3",
        "primary-lighter": "#198CFF",
        "secondary-main": "#FFA000",
        "dark-text-primary": "#e4e6eb",
        "dark-text-secondary": "#b0b3b8",
        "dark-bg-main": "#18191A",
        "dark-bg-neutral": "#242526",
        "dark-bg-neutral-lighter": "#3a3b3c",
      },
    },
  },
  plugins: [],
};
