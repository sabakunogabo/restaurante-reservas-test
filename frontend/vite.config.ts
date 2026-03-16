import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@global_config": path.resolve(__dirname, "./src/global/config"),
      "@global_interfaces": path.resolve(__dirname, "./src/global/interfaces"),
      "@global_model": path.resolve(__dirname, "./src/global/model"),
    },
  },
});
