import path from "path";
import { fileURLToPath } from "url";
import stylexPlugin from "@stylexswc/nextjs-plugin";
import type { NextConfig } from "next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
};

export default stylexPlugin({
  rsOptions: {
    aliases: {
      "@/*": [path.join(__dirname, "src/*")],
    },
    unstable_moduleResolution: {
      type: "commonJS",
      rootDir: __dirname,
    },
  },
})(nextConfig);
