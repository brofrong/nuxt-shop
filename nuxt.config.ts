import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-swiper", "nuxt-lodash"],
  vite: {
    plugins: [svgLoader()],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
  },
});
