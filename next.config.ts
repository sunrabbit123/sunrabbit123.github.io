import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

/**
 * Configuration for rehype-pretty-code syntax highlighting
 * Using One Dark Pro theme for better contrast and readability on the cream background
 * Changed from catppuccin-mocha due to colors being too pale/light
 */
const rehypePrettyCodeOptions = {
  theme: "one-dark-pro", // High contrast theme with vibrant colors for better readability
  keepBackground: false, // Use site's cream background (#FFF8F0) instead of theme background
  defaultLang: "plaintext",
  onVisitLine(node: any) {
    // Prevent empty lines from collapsing
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: any) {
    // Add class for highlighted lines
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("highlighted");
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});

export default withMDX(nextConfig);
