import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api_v1": {
        target: "http://localhost:8080",
        // target: "https://springboot-postgresql-heroku.herokuapp.com",
        changeOrigin: true,
      },
      "^/specialities/": {
        target: "http://localhost:8080",
        // target: "https://springboot-postgresql-heroku.herokuapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/specialities/, ""),
      },
      "^/university/": {
        target: "http://localhost:8080",
        // target: "https://springboot-postgresql-heroku.herokuapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/university/, ""),
      },

      "/predict": {
        target: "http://MLProAccount.pythonanywhere.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
