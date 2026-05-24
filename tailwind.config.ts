import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#fff7dc",
        ink: "#223049",
        meadow: "#3aa76d",
        ember: "#f06d45",
        royal: "#5264d8",
        gold: "#f3b63f",
        night: "#171514",
        bone: "#f3ead7",
        blood: "#8f1d21",
        rust: "#d46a38"
      },
      boxShadow: {
        quest: "0 18px 50px rgba(34, 48, 73, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
