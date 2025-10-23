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
  // Note: headers() doesn't work with static export (output: "export")
  // These headers should be configured at the web server level
  // (e.g., GitHub Pages, Netlify, Vercel, etc.)
  // Keeping them here as documentation of recommended security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://images.unsplash.com https://picsum.photos blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
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
