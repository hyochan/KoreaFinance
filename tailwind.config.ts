import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: '#1E3A5F',
          light: '#2C5282',
          dark: '#153E75',
        },
        accent: {
          DEFAULT: '#C9A962',
          light: '#D4BC7A',
          dark: '#B8944D',
        },
      },
    },
  },
  plugins: [],
};
export default config;
