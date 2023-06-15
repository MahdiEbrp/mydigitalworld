/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "success",
    "success_dark",
    "error",
    "error_dark",
    "info",
    "info_dark",
    "warning",
    "warning_dark",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        slideInFromTop: {
          from: {
            opacity: 0,
            top: "8rem",
          },
          to: {
            opacity: 1,
            top: "5rem",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s cubic-bezier(0.4, 0, 0.6, 1)",
        slideInFromTop: "slideInFromTop 1s cubic-bezier(0.4, 0, 0.6, 1)",
      },
      backgroundColor: {
        primary: {
          100: "var(---primary100)",
          200: "var(---primary200)",
          300: "var(---primary300)",
          400: "var(---primary400)",
          500: "var(---primary500)",
          700: "var(---primary700)",
          800: "var(---primary800)",
          900: "var(---primary900)",
          950: "var(---primary950)",
        },
        ruby: {
          100: "var(---ruby100)",
          200: "var(---ruby200)",
          300: "var(---ruby300)",
        },
        input: "var(---input-bg)",
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
        input: "var(---input-bg)",
      },
      colors: {
        primaryBackground: {
          100: "var(---primary100)",
          200: "var(---primary200)",
          300: "var(---primary300)",
          400: "var(---primary400)",
          500: "var(---primary500)",
          700: "var(---primary700)",
          800: "var(---primary800)",
        },
        paper: "var(---paper-text)",
        primary: {
          800: "var(---primary-text800)",
          900: "var(---primary-text900)",
          950: "var(---primary-text950)",
        },
        like: {
          800: "var(---like-text800)",
          900: "var(---like-text900)",
        },
        link: "var(---link-text)",
        buttonLight: "var(---button-light-text)",
        particle: "var(---particle-color)",
        input: "var(---input-color)",
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};
