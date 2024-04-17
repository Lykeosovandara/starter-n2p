// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl:
        process.env.NODE_ENV === "production"
          ? "http://188.166.234.48:83"
          : "http://localhost:3001",
    },
  },
  devtools: { enabled: true },
  srcDir: "src",
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@pinia/nuxt",
    "dayjs-nuxt",
  ],
  pinia: {
    storesDirs: ["./src/stores/**"],
  },
  i18n: {
    vueI18n: "./src/config/i18n.config.ts",
  },
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/formatInTimeZone"]
          : [],
    },
  },
});
