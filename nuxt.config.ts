// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxt/ui", "nuxt-disqus", "@nuxtjs/sitemap", "nuxt-gtag"],
  css: ["~/assets/css/main.css"],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-dark",
            dark: "github-dark",
            light: "github-light",
          },
          langs: [
            "bash",
            "php",
            "go",
            "sql",
            "json",
            "javascript",
            "typescript",
          ],
        },
      },
    },
  },

  disqus: {
    shortname: "allenplaynet1124",
  },

  gtag: {
    id: 'G-H8YVR9KZPX'
  },

  app: {
    head: {
      title: "艾玩不累格",
      meta: [
        { charset: "utf-8" },
        { name: "description", content: "艾玩不累格 - 吳佳霖的個人網站" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600;700;900&display=swap",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      title: "艾玩不累格",
    },
  },

  site: {
    url: "https://allenplay.net",
    name: "艾玩不累格",
  },

  sitemap: {},

  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
});