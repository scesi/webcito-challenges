import path from "path";

import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@ui": path.resolve(__dirname, "./src/ui"),
      "@utils": path.resolve(__dirname, "./src/core/utils"),
      "@constants": path.resolve(__dirname, "./src/core/constants"),
      "@models": path.resolve(__dirname, "./src/core/models"),
      "@interfaces": path.resolve(__dirname, "./src/core/interfaces"),
      "@enums": path.resolve(__dirname, "./src/core/enums"),
    },
  },
});
