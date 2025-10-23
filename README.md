# DevBlog - React Blog Display Application

A beautiful, warm-themed blog display application built with React 19, TypeScript, and StyleX. Features a warm brown color palette and a clean, responsive design.

## Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, StyleX
- **Warm Brown Theme**: Cozy, inviting color palette with browns, beiges, and warm oranges
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Clean Architecture**: Well-separated data layer for easy content replacement
- **Blog Features**:
  - Grid view of blog posts with cards
  - Category filtering
  - Modal view for full post content
  - Author information and metadata
  - Tags and categories
  - Featured images

## Project Structure

```
src/
├── components/
│   ├── blog/           # Blog-specific components
│   │   ├── BlogPage.tsx          # Main blog page container
│   │   ├── BlogPostCard.tsx      # Individual post card
│   │   ├── BlogPostList.tsx      # Grid of post cards
│   │   ├── BlogPostDetail.tsx    # Modal for full post view
│   │   └── CategoryFilter.tsx    # Category filter buttons
│   └── layout/         # Layout components
│       └── Header.tsx            # Site header
├── data/
│   ├── mockData.ts              # Mock blog post data
│   └── mockBlogService.ts       # Mock service implementation
├── services/
│   └── blogService.ts           # Blog service interface
├── theme/
│   ├── colors.stylex.ts         # Color theme variables
│   ├── typography.stylex.ts     # Typography variables
│   └── spacing.stylex.ts        # Spacing and layout variables
├── types/
│   └── blog.ts                  # TypeScript interfaces
├── pages/
│   └── index.tsx                # Main app entry
└── index.tsx                    # React root
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Data Layer Architecture

The application uses a clean service layer pattern that makes it easy to swap data sources:

### BlogService Interface

```typescript
interface BlogService {
  getAllPosts(): Promise<BlogPost[]>;
  getPostById(id: string): Promise<BlogPost | null>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getPostsByCategory(category: string): Promise<BlogPost[]>;
  getPostsByTag(tag: string): Promise<BlogPost[]>;
  getCategories(): Promise<Category[]>;
  getTags(): Promise<string[]>;
}
```

### Replacing the Data Source

To connect to a real API or CMS:

1. Create a new service class that implements `BlogService`
2. Replace the import in components:
   ```typescript
   // Before
   import { blogService } from '../data/mockBlogService';

   // After
   import { blogService } from '../services/apiBlogService';
   ```

No component code needs to change!

## Theme Customization

The warm brown theme is defined in `src/theme/colors.stylex.ts`. Key colors:

- **Primary**: Saddle Brown (#6B3E2E) - headers, buttons
- **Secondary**: Tan (#D2B48C) - backgrounds, cards
- **Accent**: Burnt Orange (#CC5500) - links, highlights
- **Background**: Cream (#F5F5DC) - page background
- **Text**: Dark Brown (#3E2723) - body text

To customize, edit the color variables and the entire app will update automatically.

## StyleX Usage

This project uses StyleX for styling, which provides:

- **Type-safe styles**: Catch errors at compile time
- **Atomic CSS**: Minimal CSS bundle size
- **Zero runtime**: All CSS generated at build time
- **Scoped styles**: No naming collisions

Example:

```typescript
import * as stylex from '@stylexjs/stylex';
import { colors } from '../theme/colors.stylex';

const styles = stylex.create({
  card: {
    backgroundColor: colors.backgroundTertiary,
    padding: spacing.lg,
  }
});

function Card() {
  return <div {...stylex.props(styles.card)}>Content</div>;
}
```

## Build Output

The build process generates:

- `dist/index.html` - Entry HTML file
- `dist/stylex.css` - Optimized CSS (atomic classes)
- `dist/assets/` - JavaScript bundles

All assets use relative paths (`base: "./"`) for flexible hosting.

## Deployment

This is a static site and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any static hosting service

Simply upload the `dist/` folder after running `pnpm build`.

## Technologies

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 7.1.9** - Build tool and dev server
- **StyleX 0.16.1** - Styling solution
- **Client-side only** - No server required

## Future Enhancements

Potential additions (not currently implemented):

- [ ] Search functionality
- [ ] Pagination for large post lists
- [ ] Markdown rendering for post content
- [ ] Comment system integration
- [ ] Share buttons
- [ ] Reading progress indicator
- [ ] Dark mode toggle
- [ ] RSS feed generation

## License

This is a demo project for educational and portfolio purposes.

## Author

Built as a demonstration of modern React development practices with a focus on clean architecture and beautiful design.
