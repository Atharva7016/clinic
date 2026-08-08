/**
 * PostCSS pipeline: Tailwind + Autoprefixer.
 * Required for Vite to process @tailwind directives in CSS.
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
