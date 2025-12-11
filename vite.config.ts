/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/marketing": path.resolve(__dirname, "./src/apps/marketing"),
      "@/platform": path.resolve(__dirname, "./src/apps/platform"),
    },
  },
}));
