import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: "happy-dom",
    exclude: ["**/*.browser.test.{js,jsx}", "**/node_modules/**"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
  plugins: [TanStackRouterVite(), react()],
});