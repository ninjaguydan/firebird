import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/insurance-portal",
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: "/src",
      assets: "src/assets",
    },
  },
});
