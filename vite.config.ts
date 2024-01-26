import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/RecipeGenerator",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Set your custom size limit in kilobytes
  },
});
