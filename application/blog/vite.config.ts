import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [
    react(),
    {
      name: "no-attribute",
      transformIndexHtml(html) {
        return html.replace(`crossorigin`, "");
      },
    },
  ],
});