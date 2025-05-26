/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red_color: "#FF0000",    // pmg rød
        black_color: "#000000",  // pmg sort
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ['"Museo"', "sans-serif"],
        darker: ['"Darker Grotesque"', 'sans-serif'],
        paragraphs: ['"Roboto Condensed"', 'sans-serif']
      },
      fontSize: {
        step_h1: "clamp(2.5rem, 2.1522rem + 1.7391vw, 3.5rem)",
        step_h2: "clamp(2.25rem, 1.9891rem + 1.3043vw, 3rem)",
        step_h3: "clamp(2rem, 1.8261rem + 0.8696vw, 2.5rem)",
        step_h4: "clamp(1.5rem, 1.3261rem + 0.8696vw, 2rem)",
        step_h5: "clamp(1.25rem, 1.163rem + 0.4348vw, 1.5rem)",
        step_h6: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
        step_text_large: "clamp(1.25rem, 1.2065rem + 0.2174vw, 1.375rem)",
        step_p: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
        step_text_regular: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)",
        step_text_tiny: "clamp(0.75rem, 0.7065rem + 0.2174vw, 0.875rem)",
      },
      /* vi burde have gået mere i dybden med at have default, primary, secondary og accents, f.eks. på knapper og anden styling af elementer */
    },
  },
  plugins: [],
}
