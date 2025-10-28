# DevBlog - Modern Next.js Blog Platform

A modern, static blog platform built with Next.js 15, React 19, StyleX, and MDX. Features a warm brown color palette, static site generation, and a clean service-layer architecture for managing MDX-based blog content.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Creating Blog Posts](#creating-blog-posts)
- [Configuration Files](#configuration-files)
- [Build & Deployment](#build--deployment)
- [Development](#development)
- [Available Scripts](#available-scripts)
- [Theme Customization](#theme-customization)
- [License](#license)

## Tech Stack

- **Next.js** 15.3.2 with App Router
- **React** 19.2.0
- **TypeScript** 5.8.3
- **StyleX** 0.16.1 - Meta's atomic CSS-in-JS styling system
- **MDX** 3.1.1 - Markdown with JSX for blog content
- **Package Manager**: npm
- **Output**: Static site generation (SSG)

## Key Features

- **Static Site Generation**: Pre-rendered pages for optimal performance
- **MDX-Based Content**: Write blog posts in Markdown with React components
- **StyleX Atomic CSS**: Type-safe, zero-runtime styling with minimal CSS output
- **Responsive Design**: Mobile-first, works seamlessly across all devices
- **Warm Brown Theme**: Cozy, inviting color palette with browns, beiges, and warm oranges
- **Service Layer Architecture**: Clean separation between data access and UI
- **Category & Tag System**: Organize and filter blog posts
- **Frontmatter Metadata**: Rich post metadata including author, dates, read time
- **Type-Safe**: Full TypeScript support throughout the application

## Prerequisites

- **Node.js** 18+ or 20+ (LTS recommended)
- **npm** (comes with Node.js)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sunrabbit123/sunrabbit123.github.io.git
cd sunrabbit123.github.io

# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000 in your browser

# Build for production
npm run build

# Start production server (for testing)
npm start
```

## Project Structure

```
.
├── .babelrc.js              # Babel config with StyleX plugin
├── .github/                 # GitHub workflows and actions
├── application/             # Application-specific logic
│   └── blog/
├── content/                 # MDX blog content
│   └── posts/               # Blog post MDX files
│       ├── building-design-systems.mdx
│       ├── developer-career-growth.mdx
│       ├── getting-started-with-mdx.mdx
│       ├── typescript-best-practices-2025.mdx
│       └── web-performance-optimization.mdx
├── next.config.ts           # Next.js configuration with MDX support
├── package.json             # npm dependencies and scripts
├── postcss.config.js        # PostCSS config for StyleX plugin
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Homepage
│   ├── components/
│   │   ├── blog/            # Blog-specific components
│   │   │   ├── BlogPage.tsx          # Main blog page container
│   │   │   ├── BlogPostCard.tsx      # Individual post card
│   │   │   ├── BlogPostDetail.tsx    # Modal for full post view
│   │   │   ├── BlogPostList.tsx      # Grid of post cards
│   │   │   └── CategoryFilter.tsx    # Category filter buttons
│   │   └── layout/          # Layout components
│   │       └── Header.tsx            # Site header
│   ├── lib/
│   │   └── mdx.ts           # MDX utility functions
│   ├── mdx-components.tsx   # MDX component overrides
│   ├── services/
│   │   ├── blogService.ts           # Blog service interface
│   │   └── mdxBlogService.ts        # MDX implementation
│   ├── theme/               # StyleX design tokens
│   │   ├── colors.stylex.ts         # Color palette
│   │   ├── spacing.stylex.ts        # Spacing scale
│   │   └── typography.stylex.ts     # Typography tokens
│   └── types/
│       └── blog.ts          # TypeScript type definitions
└── tsconfig.json            # TypeScript configuration
```

## Creating Blog Posts

To create a new blog post, add a `.mdx` file to `content/posts/`:

**Example: content/posts/my-new-post.mdx**

```mdx
---
title: "Your Post Title"
slug: "your-post-title"
publishedDate: "2025-10-28"
excerpt: "A brief description of your post that appears in the card view"
featuredImage: "https://example.com/image.jpg"
categories: ["Development", "Tutorial"]
tags: ["nextjs", "react", "typescript"]
readTime: 5
author:
  name: "Your Name"
  avatar: "https://example.com/avatar.jpg"
  bio: "Your bio here"
---

Your content starts here. You can use **Markdown** formatting, including:

## Headings

- Lists
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks
- And even React components!

```javascript
const example = "Hello World";
console.log(example);
```

MDX also lets you embed React components directly in your content.
```

**Frontmatter Fields:**
- `title` (required): Post title
- `slug` (required): URL-friendly identifier
- `publishedDate` (required): Publication date (YYYY-MM-DD)
- `excerpt` (required): Short description for card view
- `featuredImage` (optional): Header image URL
- `categories` (optional): Array of category strings
- `tags` (optional): Array of tag strings
- `readTime` (optional): Estimated reading time in minutes
- `author` (optional): Author object with name, avatar, bio

The `MDXBlogService` automatically discovers and processes new posts at build time.

## Configuration Files

### next.config.ts

Next.js configuration with MDX and static export settings:

```typescript
const nextConfig: NextConfig = {
  output: "export",              // Static site generation
  basePath: "",                  // Root path
  images: { unoptimized: true }, // No image optimization for static export
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};
```

### .babelrc.js

Babel configuration for StyleX plugin:

```javascript
module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['@stylexjs/babel-plugin', {
      dev: false,
      genConditionalClasses: true,
      unstable_moduleResolution: { type: 'commonJS' }
    }]
  ]
}
```

### postcss.config.js

PostCSS configuration for StyleX CSS generation:

```javascript
module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      cwd: __dirname,
      include: ['./**/*.{js,jsx,ts,tsx}'],
      useCSSLayers: true,
    }
  }
}
```

### tsconfig.json

TypeScript configuration with path aliases and Next.js settings.

## Build & Deployment

### Building for Production

```bash
# Clean previous builds and create production build
npm run build
```

This generates a static site in the `out/` directory with:
- Pre-rendered HTML pages
- Optimized JavaScript bundles
- Atomic CSS from StyleX
- All assets with relative paths

### Deployment Options

This static site can be deployed to any static hosting service:

**GitHub Pages:**
```bash
# The out/ directory can be deployed to gh-pages branch
npm run build
# Use gh-pages package or GitHub Actions to deploy out/ directory
```

**Vercel (Recommended for Next.js):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify:**
- Build command: `npm run build`
- Publish directory: `out`

**Cloudflare Pages:**
- Build command: `npm run build`
- Build output directory: `out`

**Other Static Hosts:**
Simply upload the `out/` folder to any static file hosting service.

## Development

### Adding New Components

1. Create component file in `src/components/`
2. Use StyleX for styling with design tokens from `src/theme/`
3. Import and use in pages or other components

Example:

```typescript
// src/components/MyComponent.tsx
import * as stylex from '@stylexjs/stylex';
import { colors } from '../theme/colors.stylex';

const styles = stylex.create({
  container: {
    backgroundColor: colors.backgroundPrimary,
    padding: '1rem',
  }
});

export function MyComponent() {
  return <div {...stylex.props(styles.container)}>Hello</div>;
}
```

### Modifying Theme Tokens

Theme tokens are defined in `src/theme/*.stylex.ts`:

- **colors.stylex.ts**: Color palette (primary, secondary, accent, backgrounds, text)
- **spacing.stylex.ts**: Spacing scale (xs, sm, md, lg, xl, etc.)
- **typography.stylex.ts**: Font sizes, weights, line heights

Edit these files to change the design system globally.

### Extending the Blog Service

To use a different data source (CMS, API, database):

1. Create a new service class implementing `BlogService` interface
2. Update the export in `src/services/blogService.ts`:
   ```typescript
   export { yourNewService as blogService } from './yourNewService';
   ```
3. All components automatically use the new service

No component code needs to change!

## Available Scripts

- **`npm run dev`**: Start development server at http://localhost:3000
- **`npm run build`**: Create production build in `out/` directory
- **`npm start`**: Start production server (for local testing of build)
- **`npm run predev`**: Clean `.next` and `out` directories before dev
- **`npm run prebuild`**: Clean `.next` and `out` directories before build

## Theme Customization

The warm brown theme is defined in `src/theme/colors.stylex.ts`:

**Color Palette:**
- **Primary**: Saddle Brown (#6B3E2E) - headers, buttons
- **Secondary**: Tan (#D2B48C) - secondary actions, borders
- **Accent**: Burnt Orange (#CC5500) - links, highlights, CTAs
- **Background Primary**: Cream (#F5F5DC) - page background
- **Background Secondary**: Light Beige - card backgrounds
- **Background Tertiary**: Off-white - elevated surfaces
- **Text Primary**: Dark Brown (#3E2723) - body text
- **Text Secondary**: Medium Brown - secondary text

To customize colors, edit `src/theme/colors.stylex.ts` and all components will automatically update.

## License

This is a personal blog/portfolio project.

## Author

Built with modern web technologies and best practices. Visit [sunrabbit123](https://github.com/sunrabbit123) for more projects.

---

**Built with:**
- [Next.js 15](https://nextjs.org/) - The React Framework
- [React 19](https://react.dev/) - UI Library
- [StyleX](https://stylexjs.com/) - Styling System
- [MDX](https://mdxjs.com/) - Markdown for Components
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
