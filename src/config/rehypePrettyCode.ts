import type { Options } from "rehype-pretty-code";
import type { Element } from "hast";

/**
 * Shared configuration for rehype-pretty-code syntax highlighting
 * Used in both:
 * - next.config.ts (for @next/mdx static files)
 * - src/app/blog/[slug]/page.tsx (for next-mdx-remote runtime rendering)
 *
 * Using One Dark Pro theme with dark background for maximum contrast
 * This theme provides vibrant, highly saturated colors that stand out
 * well against the dark background, addressing readability concerns.
 */
export const rehypePrettyCodeOptions: Options = {
  // Using one-dark-pro for vibrant, high-contrast syntax highlighting
  // This theme has strong, saturated colors perfect for code readability
  theme: "one-dark-pro",

  // Keep the theme's dark background for maximum contrast
  keepBackground: true,

  // Default language for code blocks without language specification
  defaultLang: "plaintext",

  /**
   * Prevent empty lines from collapsing in code blocks
   * This ensures proper spacing and line numbering
   */
  onVisitLine(node: Element) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },

  /**
   * Add custom class for highlighted lines
   * This enables custom styling for line highlighting feature
   */
  onVisitHighlightedLine(node: Element) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    if (Array.isArray(node.properties.className)) {
      node.properties.className.push("highlighted");
    }
  },
};
