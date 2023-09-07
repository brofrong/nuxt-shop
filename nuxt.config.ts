import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-swiper", "nuxt-lodash", "@nuxtjs/robots"],
  vite: {
    plugins: [svgLoader()],
  },
  build: {
    transpile: ["trpc-nuxt"],
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
  app: {
    head: {
      title: "Nuxt Shop",
      meta: [
        {
          name: "description",
          content: "Fake shop site, created for technical task.",
        },
        { name: "ogTitle", content: "Nuxt Shop" },
        {
          name: "ogDescription",
          content: "Fake shop site, created for technical task.",
        },
        {
          name: "ogImage",
          content:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Nuxt_logo_%282021%29.svg/2560px-Nuxt_logo_%282021%29.svg.png",
        },
        { name: "twitterCard", content: "summary_large_image" },
        { name: "ogUrl", content: "https://nuxt-shop-brofrong.vercel.app/" },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
});
