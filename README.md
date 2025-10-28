# DevBlog - Personal Blog

A personal blog built with Next.js 15, React 19, StyleX, and MDX.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Creating Blog Posts](#creating-blog-posts)
- [Modifying the Site](#modifying-the-site)
- [Build & Deployment](#build--deployment)
- [Available Scripts](#available-scripts)

## Tech Stack

- **Next.js** 15.3.2 with App Router
- **React** 19.2.0
- **TypeScript** 5.8.3
- **StyleX** 0.16.1
- **MDX** 3.1.1
- **Package Manager**: npm

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

Add a new `.mdx` file to `content/posts/`:

**Example: content/posts/my-new-post.mdx**

```mdx
---
title: "Your Post Title"
slug: "your-post-title"
publishedDate: "2025-10-28"
excerpt: "A brief description of your post"
featuredImage: "https://example.com/image.jpg"
categories: ["Development", "Tutorial"]
tags: ["nextjs", "react", "typescript"]
readTime: 5
author:
  name: "Your Name"
  avatar: "https://example.com/avatar.jpg"
  bio: "Your bio here"
---

Your content starts here. You can use **Markdown** formatting.

## Headings

- Lists
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks

```javascript
const example = "Hello World";
console.log(example);
```
```

**Required Frontmatter Fields:**
- `title`: Post title
- `slug`: URL-friendly identifier
- `publishedDate`: Publication date (YYYY-MM-DD)
- `excerpt`: Short description

**Optional Frontmatter Fields:**
- `featuredImage`: Header image URL
- `categories`: Array of category strings
- `tags`: Array of tag strings
- `readTime`: Estimated reading time in minutes
- `author`: Author object with name, avatar, bio

## Modifying the Site

### Key Files to Edit

**Blog Content:**
- `content/posts/*.mdx` - Blog post files

**Components:**
- `src/components/blog/` - Blog-related components
- `src/components/layout/Header.tsx` - Site header

**Styling:**
- `src/theme/colors.stylex.ts` - Color palette
- `src/theme/spacing.stylex.ts` - Spacing scale
- `src/theme/typography.stylex.ts` - Typography tokens

**Layout:**
- `src/app/layout.tsx` - Root layout and metadata
- `src/app/page.tsx` - Homepage

**Configuration:**
- `next.config.ts` - Next.js configuration
- `.babelrc.js` - Babel configuration for StyleX
- `postcss.config.js` - PostCSS configuration for StyleX
- `tsconfig.json` - TypeScript configuration

## Build & Deployment

### Building for Production

```bash
npm run build
```

This generates a static site in the `out/` directory.

### Deployment

Deploy the `out/` directory to any static hosting service:

**GitHub Pages / Vercel / Netlify / Cloudflare Pages:**
- Build command: `npm run build`
- Output directory: `out`

## Available Scripts

- **`npm run dev`**: Start development server at http://localhost:3000
- **`npm run build`**: Create production build
- **`npm start`**: Start production server (for testing the build locally)

## Author

[sunrabbit123](https://github.com/sunrabbit123)
