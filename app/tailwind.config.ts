import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme'); // <-- Added this vital import

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Montserrat', ...fontFamily.sans],
      },
      colors: {
        navy: '#1A2B48', // Primary Navy
        accentgreen: '#B2D290', // Accent Green
        mint: '#B8D8D0', // Secondary Mint
        backgroundwhite: '#FFFFFF', // Background White
        slateblue: '#5A6B9C', // For sub-headline
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(0,0,0,0.05)', // Card Shadow
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
      },
    },
  },
  plugins: [],
};

export default config;