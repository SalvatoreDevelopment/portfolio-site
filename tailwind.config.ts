/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Assicura che Tailwind usi la variabile CSS
        foreground: "var(--foreground)",
      },
    },
  },
  safelist: [
    
  ],
  plugins: [],
};
