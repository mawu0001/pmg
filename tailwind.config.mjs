/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red_color: "#FF0000",    // red
        black_color: "#000000",  // black
        white_color: "#FFFFFF",     // white
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        darker: ['"Darker Grotesque"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
