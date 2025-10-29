import type { Options } from "rehype-pretty-code";
import type { Element } from "hast";

/**
 * Shared configuration for rehype-pretty-code syntax highlighting
 * Used in both:
 * - next.config.ts (for @next/mdx static files)
 * - src/app/blog/[slug]/page.tsx (for next-mdx-remote runtime rendering)
 *
 * Using GitHub Dark Dimmed theme for better contrast on cream background
 * This theme provides vibrant colors that stand out well against the site's
 * warm #FFF8F0 background, addressing readability concerns.
 */
export const rehypePrettyCodeOptions: Options = {
  // Using github-dark-dimmed for better contrast than github-dark
  // The slightly muted colors work better with our cream background
  theme: "github-dark-dimmed",

  // Use site's cream background (#FFF8F0) instead of theme background
  keepBackground: false,

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
