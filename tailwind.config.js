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
        wobble: {
          "0%": { transform: "translateX(0%)" },
          "15%": { transform: "translateX(-25%) rotate(-5deg)" },
          "30%": { transform: "translateX(20%) rotate(3deg)" },
          "45%": { transform: "translateX(-15%) rotate(-3deg)" },
          "60%": { transform: "translateX(10%) rotate(2deg)" },
          "75%": { transform: "translateX(-5%) rotate(-1deg)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s cubic-bezier(0.4, 0, 0.6, 1)",
        slideInFromTop: "slideInFromTop 1s cubic-bezier(0.4, 0, 0.6, 1)",
        wobble: "wobble 0.5s cubic-bezier(0.4, 0, 0.6, 1)",
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
        transparentPaper: "var(---transparent-bg)",
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

        telegram: "var(---telegram-text)",
        instagram: "var(---instagram-text)",
        linkedin: "var(---telegram-text)",
        email: "var(---email-text)",
        github: "var(---github-text)",
        placeholder: "var(---placeholder)",
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
  plugins: [require("@tailwindcss/typography")],
};
