// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "艾玩不累格",
      meta: [
        { charset: "utf-8" },
        { name: "description", content: "艾玩不累格 - 吳佳霖的個人網站" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  runtimeConfig: {
    public: {
      title: "艾玩不累格",
    },
  },
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
});
