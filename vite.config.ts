import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My GYM Track App",
        short_name: "GYM Tracker",
        description: "My GYM Track App",
        theme_color: "#ffffff",
      },
    }),
  ],
});
