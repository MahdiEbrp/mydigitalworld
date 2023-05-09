/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: {
          100: "var(---primary100)",
          200: "var(---primary200)",
          300: "var(---primary300)",
          400: "var(---primary400)",
          500: "var(---primary500)",
          700: "var(---primary700)",
          800: "var(---primary800)",
          950: "var(---primary950)",
        },
      },
      borderColor: {
        primary: {
          100: "var(---primary100)",
          200: "var(---primary200)",
          300: "var(---primary300)",
          400: "var(---primary400)",
          500: "var(---primary500)",
          700: "var(---primary700)",
          800: "var(---primary800)",
          950: "var(---primary950)",
        },
        text: {
          800: "var(---primary-text800)",
          900: "var(---primary-text900)",
          950: "var(---primary-text950)",
        },
      },
      colors: {
        primaryBackground: {
          100: "var(---primary100)",
          200: "var(---primary200)",
          300: "var(---primary300)",
          400: "var(---primary400)",
          700: "var(---primary700)",
          800: "var(---primary800)",
        },
        paper: "var(---paper-text)",
        primary: {
          800: "var(---primary-text800)",
          900: "var(---primary-text900)",
          950: "var(---primary-text950)",
        },
        link: "var(---link-text)",
        particle: "var(---particle-color)",
      },
    },
  },
  plugins: [],
};
