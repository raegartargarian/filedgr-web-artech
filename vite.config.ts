import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Web3Auth v10's dependency graph relies on Node built-ins
    // (buffer/stream/crypto) and process/global. Without these polyfills Vite
    // produces a broken @web3auth/modal bundle (missing exports at runtime).
    nodePolyfills({
      include: ["buffer", "stream", "crypto"],
      globals: {
        Buffer: true,
        global: true,
      },
      overrides: {
        process: path.resolve(__dirname, "node_modules/process/browser.js"),
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      process: path.resolve(__dirname, "node_modules/process/browser.js"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
