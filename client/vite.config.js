// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "gzip", // Use gzip compression
    }),
  ],
  build: {
    minify: "terser", // Minify JavaScript code with Terser
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
});
