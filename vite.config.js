import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  assetsInclude: ["**/*.glb", "**/*.gltf"], // Add this line
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
