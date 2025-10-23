import type { Author, BlogPost, Category } from '../types/blog';

/**
 * Mock authors
 */
export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    bio: 'Software engineer and tech writer passionate about web development and user experience.',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    bio: 'Full-stack developer with a love for clean code and modern architecture.',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    bio: 'Design-focused developer bridging the gap between aesthetics and functionality.',
  },
];

/**
 * Mock categories
 */
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Articles about modern web development practices and technologies',
  },
  {
    id: '2',
    name: 'Design Systems',
    slug: 'design-systems',
    description: 'Building and maintaining scalable design systems',
  },
  {
    id: '3',
    name: 'Performance',
    slug: 'performance',
    description: 'Optimizing web applications for speed and efficiency',
  },
  {
    id: '4',
    name: 'Developer Experience',
    slug: 'developer-experience',
    description: 'Improving workflows and tooling for developers',
  },
];

/**
 * Mock blog posts
 */
export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Design Systems with TypeScript and StyleX',
    slug: 'building-scalable-design-systems',
    author: mockAuthors[2],
    publishedDate: new Date('2025-09-15'),
    excerpt: 'Learn how to create a maintainable design system using TypeScript for type safety and StyleX for atomic CSS generation.',
    content: `# Building Scalable Design Systems with TypeScript and StyleX

Design systems are the backbone of modern web applications, providing consistency and efficiency across teams. In this article, we'll explore how combining TypeScript with StyleX creates a powerful foundation for scalable design systems.

## Why Design Systems Matter

A well-crafted design system ensures:
- **Consistency** across all user interfaces
- **Efficiency** in development through reusable components
- **Maintainability** with clear guidelines and documentation
- **Accessibility** built-in from the start

## TypeScript for Type Safety

TypeScript brings static typing to your design tokens and component APIs. This means catching errors at compile-time rather than runtime, and providing excellent autocomplete in your IDE.

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}
\`\`\`

## StyleX for Atomic CSS

StyleX generates optimized atomic CSS at build time, eliminating duplicate styles and creating a minimal CSS bundle. It works seamlessly with TypeScript, providing type-safe style definitions.

## Best Practices

1. **Define your tokens first** - colors, spacing, typography
2. **Create primitive components** - buttons, inputs, cards
3. **Build composed components** - forms, navigation, layouts
4. **Document everything** - use Storybook or similar tools
5. **Test accessibility** - automated and manual testing

## Conclusion

The combination of TypeScript and StyleX provides a robust foundation for design systems that scale with your team and product. Start small, iterate often, and always prioritize developer experience.`,
    featuredImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
    categories: ['Design Systems', 'Web Development'],
    tags: ['TypeScript', 'StyleX', 'CSS', 'Design'],
    readTime: 8,
  },
  {
    id: '2',
    title: 'Modern React Patterns: Container and Presentational Components',
    slug: 'modern-react-patterns',
    author: mockAuthors[0],
    publishedDate: new Date('2025-09-22'),
    excerpt: 'Discover how separating business logic from UI components leads to more maintainable and testable React applications.',
    content: `# Modern React Patterns: Container and Presentational Components

One of the most enduring patterns in React development is the separation between container and presentational components. Let's explore why this pattern remains relevant in modern React.

## The Pattern Explained

**Presentational Components:**
- Focus on how things look
- Receive data via props
- No side effects or data fetching
- Highly reusable and testable

**Container Components:**
- Focus on how things work
- Manage state and side effects
- Handle data fetching
- Compose presentational components

## Example: Blog Post Card

\`\`\`typescript
// Presentational Component
function BlogPostCard({ title, excerpt, image }: BlogPostCardProps) {
  return (
    <article>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{excerpt}</p>
    </article>
  );
}

// Container Component
function BlogPostCardContainer({ postId }: { postId: string }) {
  const { data, loading } = useBlogPost(postId);

  if (loading) return <Skeleton />;
  if (!data) return null;

  return <BlogPostCard {...data} />;
}
\`\`\`

## Benefits

1. **Separation of Concerns** - UI and logic are decoupled
2. **Reusability** - Presentational components work anywhere
3. **Testability** - Each layer can be tested independently
4. **Maintainability** - Changes are isolated to specific layers

## Modern Considerations

With hooks, some argue this pattern is less necessary. However, the principle of separating concerns remains valuable, even if the implementation has evolved.

## Conclusion

Whether you strictly follow the container/presentational pattern or adapt it with hooks, the core principle of separating UI from logic makes React applications more maintainable and scalable.`,
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    categories: ['Web Development'],
    tags: ['React', 'Architecture', 'Best Practices'],
    readTime: 6,
  },
  {
    id: '3',
    title: 'Optimizing Web Performance: Core Web Vitals Deep Dive',
    slug: 'optimizing-web-performance',
    author: mockAuthors[1],
    publishedDate: new Date('2025-09-28'),
    excerpt: 'A comprehensive guide to understanding and improving Core Web Vitals for better user experience and SEO.',
    content: `# Optimizing Web Performance: Core Web Vitals Deep Dive

Core Web Vitals are Google's metrics for measuring user experience on the web. Let's dive deep into each metric and learn how to optimize them.

## The Three Core Web Vitals

### 1. Largest Contentful Paint (LCP)

LCP measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds.

**Optimization strategies:**
- Optimize images with modern formats (WebP, AVIF)
- Implement lazy loading for below-fold content
- Use CDN for static assets
- Minimize render-blocking resources

### 2. First Input Delay (FID)

FID measures interactivity. Pages should have an FID of 100 milliseconds or less.

**Optimization strategies:**
- Break up long tasks
- Optimize JavaScript execution
- Use web workers for heavy computations
- Implement code splitting

### 3. Cumulative Layout Shift (CLS)

CLS measures visual stability. Pages should maintain a CLS of 0.1 or less.

**Optimization strategies:**
- Always include size attributes on images and videos
- Reserve space for ad slots
- Avoid inserting content above existing content
- Use CSS transforms for animations

## Measuring Performance

Use tools like:
- Chrome DevTools Lighthouse
- PageSpeed Insights
- Web Vitals JavaScript library
- Real User Monitoring (RUM)

## The Performance Budget

Set performance budgets for your team:
- Maximum JavaScript bundle size
- Maximum image sizes
- Target LCP, FID, and CLS values

## Conclusion

Optimizing Core Web Vitals isn't just about better search rankings—it's about providing a better experience for your users. Start measuring, set goals, and iterate continuously.`,
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    categories: ['Performance'],
    tags: ['Web Performance', 'SEO', 'Core Web Vitals'],
    readTime: 10,
  },
  {
    id: '4',
    title: 'The Art of Code Review: Building Better Teams',
    slug: 'art-of-code-review',
    author: mockAuthors[1],
    publishedDate: new Date('2025-10-02'),
    excerpt: 'Code reviews are more than catching bugs—they\'re opportunities to share knowledge, improve code quality, and build team culture.',
    content: `# The Art of Code Review: Building Better Teams

Code reviews are one of the most valuable practices in software development, yet they're often done poorly or inconsistently. Let's explore how to make code reviews effective and positive.

## Why Code Review Matters

- **Knowledge sharing** across the team
- **Catching bugs** before they reach production
- **Improving code quality** through collective ownership
- **Onboarding** new team members effectively
- **Building team culture** through collaboration

## Best Practices for Reviewers

### 1. Be Constructive, Not Critical

❌ "This code is terrible."
✅ "Consider extracting this into a separate function for better readability."

### 2. Ask Questions

Instead of making demands, ask questions that prompt discussion:
- "What happens if this value is null?"
- "Have you considered using a different approach here?"

### 3. Praise Good Code

Don't just point out problems—celebrate clever solutions and well-written code.

### 4. Focus on the Important

Not every style preference needs a comment. Focus on:
- Logic errors
- Security vulnerabilities
- Performance issues
- Maintainability concerns

## Best Practices for Authors

### 1. Keep PRs Small

Smaller PRs are:
- Easier to review thoroughly
- Faster to merge
- Lower risk if something goes wrong

### 2. Write Helpful Descriptions

Explain the context, your approach, and any tradeoffs you considered.

### 3. Respond Thoughtfully

Engage with feedback constructively. If you disagree, explain your reasoning calmly.

### 4. Use Checklists

Create a pre-submit checklist:
- [ ] Tests added
- [ ] Documentation updated
- [ ] No console.logs
- [ ] Accessibility considered

## Automation Helps

Automate what you can:
- Linting and formatting
- Unit tests
- Type checking
- Security scanning

This frees up reviewers to focus on architecture and logic.

## Conclusion

Great code reviews build great teams. Approach each review as a learning opportunity, treat your colleagues with respect, and focus on improving both the code and your team culture.`,
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    categories: ['Developer Experience'],
    tags: ['Code Review', 'Team Culture', 'Best Practices'],
    readTime: 7,
  },
  {
    id: '5',
    title: 'Mastering CSS Grid: Beyond the Basics',
    slug: 'mastering-css-grid',
    author: mockAuthors[2],
    publishedDate: new Date('2025-10-05'),
    excerpt: 'CSS Grid is powerful, but most developers only scratch the surface. Let\'s explore advanced techniques for complex layouts.',
    content: `# Mastering CSS Grid: Beyond the Basics

CSS Grid revolutionized web layouts, but many developers still rely on flexbox for everything. Let's explore advanced Grid techniques that make complex layouts simple.

## Grid Areas for Complex Layouts

Named grid areas make responsive layouts intuitive:

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
}

@media (max-width: 768px) {
  .layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}
\`\`\`

## Implicit Grid for Dynamic Content

The implicit grid automatically creates rows/columns for overflowing content:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 250px;
  gap: 1rem;
}
\`\`\`

## Subgrid for Alignment

Subgrid allows nested grids to align with parent grid tracks:

\`\`\`css
.card {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
\`\`\`

## Advanced Techniques

### 1. Overlap and Z-Index

Grid items can overlap, creating interesting layouts:

\`\`\`css
.hero-image {
  grid-area: 1 / 1 / 2 / 3;
  z-index: 1;
}

.hero-text {
  grid-area: 1 / 2 / 2 / 4;
  z-index: 2;
}
\`\`\`

### 2. Dense Packing

Fill gaps in your grid automatically:

\`\`\`css
.masonry {
  grid-auto-flow: dense;
}
\`\`\`

### 3. Aspect Ratio with Grid

Maintain aspect ratios without padding hacks:

\`\`\`css
.square {
  aspect-ratio: 1 / 1;
}
\`\`\`

## When to Use Grid vs Flexbox

- **Grid**: Two-dimensional layouts, complex alignments
- **Flexbox**: One-dimensional layouts, simple alignments

Often the best solution uses both!

## Conclusion

CSS Grid is incredibly powerful once you move beyond basic row/column layouts. Experiment with these advanced techniques to create sophisticated, responsive designs with less code.`,
    featuredImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
    categories: ['Web Development', 'Design Systems'],
    tags: ['CSS', 'Grid', 'Layout', 'Responsive Design'],
    readTime: 9,
  },
  {
    id: '6',
    title: 'Building Accessible Forms: A Complete Guide',
    slug: 'building-accessible-forms',
    author: mockAuthors[0],
    publishedDate: new Date('2025-10-08'),
    excerpt: 'Forms are critical to web applications, but they\'re often inaccessible. Learn how to build forms that work for everyone.',
    content: `# Building Accessible Forms: A Complete Guide

Forms are the primary way users interact with web applications, yet they're often the least accessible part of a website. Let's fix that.

## The Fundamentals

### 1. Proper Labels

Every input needs a label. Period.

\`\`\`html
<!-- Good -->
<label for="email">Email Address</label>
<input id="email" type="email" name="email" />

<!-- Also good -->
<label>
  Email Address
  <input type="email" name="email" />
</label>
\`\`\`

### 2. Fieldsets and Legends

Group related inputs:

\`\`\`html
<fieldset>
  <legend>Shipping Address</legend>
  <!-- address inputs -->
</fieldset>
\`\`\`

### 3. Required Fields

Mark required fields programmatically:

\`\`\`html
<input
  type="text"
  required
  aria-required="true"
  aria-label="First name (required)"
/>
\`\`\`

## Error Handling

### Inline Validation

Provide immediate, helpful feedback:

\`\`\`html
<div>
  <label for="password">Password</label>
  <input
    id="password"
    type="password"
    aria-invalid="true"
    aria-describedby="password-error"
  />
  <span id="password-error" role="alert">
    Password must be at least 8 characters
  </span>
</div>
\`\`\`

### Error Summary

Provide a summary of all errors:

\`\`\`html
<div role="alert" aria-live="polite">
  <h2>Please fix the following errors:</h2>
  <ul>
    <li><a href="#email">Email is required</a></li>
    <li><a href="#password">Password is too short</a></li>
  </ul>
</div>
\`\`\`

## Focus Management

### 1. Logical Tab Order

Ensure tab order follows visual order:

\`\`\`css
/* Avoid tabindex > 0 */
button { tabindex: 0; }
\`\`\`

### 2. Focus Styles

Always have visible focus indicators:

\`\`\`css
input:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
\`\`\`

### 3. Skip Links

Help keyboard users skip repetitive navigation:

\`\`\`html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
\`\`\`

## ARIA Attributes

Use ARIA to enhance native HTML:

- \`aria-label\`: Accessible name
- \`aria-describedby\`: Additional description
- \`aria-invalid\`: Validation state
- \`aria-required\`: Required field
- \`aria-live\`: Dynamic content updates

## Testing

1. **Keyboard only**: Can you complete the form without a mouse?
2. **Screen reader**: Test with NVDA, JAWS, or VoiceOver
3. **Automated tools**: Use axe, Lighthouse, WAVE
4. **Real users**: Nothing beats testing with actual users with disabilities

## Conclusion

Accessible forms aren't just good for users with disabilities—they're better for everyone. Clear labels, helpful errors, and logical flow improve the experience for all users.`,
    featuredImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
    categories: ['Web Development'],
    tags: ['Accessibility', 'Forms', 'HTML', 'ARIA'],
    readTime: 11,
  },
  {
    id: '7',
    title: 'Understanding React Server Components',
    slug: 'understanding-react-server-components',
    author: mockAuthors[0],
    publishedDate: new Date('2025-10-11'),
    excerpt: 'React Server Components represent a paradigm shift in how we build React applications. Let\'s demystify how they work.',
    content: `# Understanding React Server Components

React Server Components (RSC) are changing how we think about React applications. Let's break down what they are, how they work, and when to use them.

## What Are Server Components?

Server Components are React components that run exclusively on the server. They:
- Don't ship JavaScript to the client
- Can directly access server-side resources
- Support async/await natively
- Improve performance and reduce bundle size

## Server vs Client Components

### Server Components (default in Next.js 13+)

\`\`\`tsx
// This runs on the server
async function BlogPost({ id }: { id: string }) {
  const post = await db.posts.findById(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

### Client Components

\`\`\`tsx
'use client';

import { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      Likes: {likes}
    </button>
  );
}
\`\`\`

## When to Use Each

**Server Components:**
- Fetching data
- Accessing backend resources
- Keeping sensitive data on server
- Reducing bundle size

**Client Components:**
- User interactions (onClick, onChange)
- Browser APIs (localStorage, geolocation)
- State and effects (useState, useEffect)
- Custom hooks

## Composition Patterns

You can nest components in flexible ways:

\`\`\`tsx
// Server Component
async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post.id} post={post}>
          {/* Client Component nested inside */}
          <LikeButton postId={post.id} />
        </BlogCard>
      ))}
    </div>
  );
}
\`\`\`

## Data Fetching

Server Components make data fetching simple:

\`\`\`tsx
async function UserProfile({ userId }: { userId: string }) {
  // Multiple requests in parallel
  const [user, posts] = await Promise.all([
    fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),
  ]);

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}
\`\`\`

## Benefits

1. **Performance**: Less JavaScript shipped to client
2. **Direct backend access**: No API layer needed
3. **Automatic code splitting**: Each Server Component is a split point
4. **SEO**: Full HTML rendered on server

## Challenges

1. **Learning curve**: New mental model
2. **Ecosystem maturity**: Not all libraries support RSC yet
3. **Debugging**: Server errors can be harder to trace

## Conclusion

React Server Components represent the future of React development. While there's a learning curve, the benefits in performance and developer experience are significant. Start experimenting today!`,
    featuredImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    categories: ['Web Development'],
    tags: ['React', 'Server Components', 'Next.js', 'Performance'],
    readTime: 12,
  },
  {
    id: '8',
    title: 'TypeScript Utility Types You Should Know',
    slug: 'typescript-utility-types',
    author: mockAuthors[1],
    publishedDate: new Date('2025-10-13'),
    excerpt: 'TypeScript includes powerful utility types that can make your code more type-safe and maintainable. Let\'s explore the most useful ones.',
    content: `# TypeScript Utility Types You Should Know

TypeScript's built-in utility types are incredibly powerful but often underutilized. Let's explore the most useful ones with practical examples.

## Partial<Type>

Makes all properties optional:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function updateUser(id: string, updates: Partial<User>) {
  // updates can have any combination of User properties
}

updateUser('123', { name: 'John' }); // ✅
\`\`\`

## Required<Type>

Makes all properties required:

\`\`\`typescript
interface Config {
  apiUrl?: string;
  timeout?: number;
}

const defaultConfig: Required<Config> = {
  apiUrl: 'https://api.example.com',
  timeout: 3000,
};
\`\`\`

## Pick<Type, Keys>

Select specific properties:

\`\`\`typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
}

type BlogPostPreview = Pick<BlogPost, 'id' | 'title' | 'author'>;
\`\`\`

## Omit<Type, Keys>

Exclude specific properties:

\`\`\`typescript
type BlogPostInput = Omit<BlogPost, 'id' | 'publishedDate'>;

function createPost(post: BlogPostInput) {
  // id and publishedDate will be added by the system
}
\`\`\`

## Record<Keys, Type>

Create an object type with specific keys:

\`\`\`typescript
type UserRole = 'admin' | 'editor' | 'viewer';

const permissions: Record<UserRole, string[]> = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read'],
};
\`\`\`

## ReturnType<Type>

Extract the return type of a function:

\`\`\`typescript
function fetchUser() {
  return {
    id: '123',
    name: 'John',
    email: 'john@example.com',
  };
}

type User = ReturnType<typeof fetchUser>;
// { id: string; name: string; email: string; }
\`\`\`

## Parameters<Type>

Extract function parameter types:

\`\`\`typescript
function createUser(name: string, email: string, age: number) {
  // ...
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, string, number]
\`\`\`

## Exclude<Type, ExcludedUnion>

Exclude types from a union:

\`\`\`typescript
type Status = 'pending' | 'approved' | 'rejected' | 'draft';

type PublicStatus = Exclude<Status, 'draft'>;
// 'pending' | 'approved' | 'rejected'
\`\`\`

## Extract<Type, Union>

Extract types from a union:

\`\`\`typescript
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'rectangle'; width: number; height: number };

type RectangularShape = Extract<Shape, { kind: 'square' | 'rectangle' }>;
\`\`\`

## NonNullable<Type>

Remove null and undefined:

\`\`\`typescript
type NullableString = string | null | undefined;
type String = NonNullable<NullableString>; // string
\`\`\`

## Practical Example

Combining utility types:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

// User creation payload (no id)
type CreateUserPayload = Omit<User, 'id'>;

// User update payload (partial, no id)
type UpdateUserPayload = Partial<Omit<User, 'id'>>;

// API response types
type UsersResponse = ApiResponse<User[]>;
type UserResponse = ApiResponse<User>;

// Required configuration
type AppConfig = Required<{
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}>;
\`\`\`

## Conclusion

TypeScript's utility types help you write more type-safe code with less duplication. Master these utilities and your TypeScript code will be more maintainable and expressive.`,
    featuredImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    categories: ['Web Development'],
    tags: ['TypeScript', 'Type Safety', 'Best Practices'],
    readTime: 10,
  },
  {
    id: '9',
    title: 'Modern CSS: Container Queries Revolution',
    slug: 'modern-css-container-queries',
    author: mockAuthors[2],
    publishedDate: new Date('2025-10-14'),
    excerpt: 'Container queries are finally here, enabling true component-based responsive design. Learn how to use them effectively.',
    content: `# Modern CSS: Container Queries Revolution

Container queries represent a fundamental shift in responsive design. Instead of responding to viewport size, components can respond to their container's size. Let's explore this game-changing feature.

## The Problem with Media Queries

Traditional media queries check viewport dimensions:

\`\`\`css
/* This works, but it's not component-aware */
@media (max-width: 768px) {
  .card {
    flex-direction: column;
  }
}
\`\`\`

The problem? The same component might need different layouts depending on where it's placed, not just the viewport size.

## Enter Container Queries

Container queries let components respond to their container's size:

\`\`\`css
.sidebar,
.main {
  container-type: inline-size;
}

.card {
  display: flex;
}

@container (max-width: 400px) {
  .card {
    flex-direction: column;
  }
}
\`\`\`

Now the card adapts based on its container, not the viewport!

## Container Types

Three container types are available:

\`\`\`css
/* Size containers (most common) */
.container {
  container-type: inline-size; /* width */
  container-type: block-size;  /* height */
  container-type: size;        /* both */
}
\`\`\`

## Named Containers

Name containers for specific queries:

\`\`\`css
.sidebar {
  container-name: sidebar;
  container-type: inline-size;
}

.main {
  container-name: main;
  container-type: inline-size;
}

/* Target specific containers */
@container sidebar (max-width: 300px) {
  .widget { /* ... */ }
}

@container main (max-width: 600px) {
  .article { /* ... */ }
}
\`\`\`

## Container Query Units

New units based on container size:

- \`cqw\`: 1% of container width
- \`cqh\`: 1% of container height
- \`cqi\`: 1% of container inline size
- \`cqb\`: 1% of container block size
- \`cqmin\`: Smaller of cqi or cqb
- \`cqmax\`: Larger of cqi or cqb

\`\`\`css
.card {
  padding: 2cqi; /* Scales with container */
  font-size: clamp(1rem, 3cqi, 2rem);
}
\`\`\`

## Practical Example: Responsive Card

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

/* Small container: stack vertically */
@container card (max-width: 400px) {
  .card {
    grid-template-columns: 1fr;
  }

  .card__image {
    width: 100%;
  }
}

/* Medium container: side-by-side */
@container card (min-width: 401px) and (max-width: 600px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}

/* Large container: complex layout */
@container card (min-width: 601px) {
  .card {
    grid-template-columns: 300px 1fr 200px;
  }
}
\`\`\`

## Browser Support

Container queries are supported in all modern browsers (2023+):
- Chrome 105+
- Safari 16+
- Firefox 110+

For older browsers, use a progressive enhancement approach.

## Best Practices

1. **Use inline-size by default**: Most components care about width, not height
2. **Name your containers**: Makes queries more maintainable
3. **Combine with media queries**: Use both for complete control
4. **Test thoroughly**: Container queries can be complex
5. **Progressive enhancement**: Ensure graceful degradation

## Real-World Use Cases

### 1. Reusable Card Components

Cards that work in sidebars, grids, or full-width layouts.

### 2. Dashboard Widgets

Widgets that adapt to different dashboard layouts.

### 3. Form Layouts

Forms that stack or arrange horizontally based on space.

### 4. Navigation Menus

Menus that switch between horizontal and vertical.

## Conclusion

Container queries enable truly modular, component-based responsive design. They're the missing piece that makes component libraries truly flexible and reusable across different contexts.`,
    featuredImage: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&h=400&fit=crop',
    categories: ['Web Development', 'Design Systems'],
    tags: ['CSS', 'Container Queries', 'Responsive Design'],
    readTime: 9,
  },
  {
    id: '10',
    title: 'Building a Developer Portfolio That Stands Out',
    slug: 'building-developer-portfolio',
    author: mockAuthors[0],
    publishedDate: new Date('2025-10-15'),
    excerpt: 'Your portfolio is often your first impression. Learn how to create a portfolio that showcases your skills and lands you opportunities.',
    content: `# Building a Developer Portfolio That Stands Out

A great portfolio can be the difference between getting an interview and being overlooked. Let's build something that truly represents your skills.

## What Makes a Great Portfolio?

1. **Clear value proposition** - What do you do?
2. **Strong projects** - Quality over quantity
3. **Easy navigation** - Don't make visitors hunt
4. **Fast performance** - Practice what you preach
5. **Personal touch** - Show your personality

## Essential Sections

### 1. Hero Section

Make a strong first impression:

\`\`\`
- Your name and title
- Brief tagline (one sentence)
- Call-to-action (Contact, Resume, GitHub)
- Professional photo (optional)
\`\`\`

### 2. About Section

Tell your story:

\`\`\`
- Who you are
- What you do
- What you're passionate about
- Your background and journey
- Keep it conversational and authentic
\`\`\`

### 3. Projects Section

This is the heart of your portfolio:

**For each project include:**
- Clear title and description
- Technologies used
- Your role and contributions
- Link to live demo
- Link to source code (if public)
- Screenshots or video demo
- Key challenges and solutions

**Quality over quantity:**
3-5 excellent projects > 20 mediocre ones

### 4. Skills Section

Be honest about your skills:

\`\`\`
- Core technologies (Expert level)
- Comfortable with (Intermediate)
- Learning (Beginner)
\`\`\`

Avoid rating yourself with stars or percentages—they're meaningless.

### 5. Contact Section

Make it easy to reach you:

\`\`\`
- Email
- GitHub
- LinkedIn
- Twitter (if active)
- Resume download
\`\`\`

## Design Tips

### Keep It Simple

- Clean, minimal design
- Plenty of whitespace
- Consistent typography
- Limited color palette
- Clear hierarchy

### Make It Fast

- Optimize images
- Minimize JavaScript
- Use system fonts or web fonts carefully
- Lazy load below-fold content
- Achieve good Lighthouse scores

### Make It Accessible

- Semantic HTML
- Keyboard navigation
- Screen reader friendly
- Good contrast ratios
- Responsive design

## Technical Choices

### Static Site Generators

Perfect for portfolios:
- Next.js (React)
- Astro (multi-framework)
- Hugo (Go-based, very fast)
- Eleventy (JavaScript)

### Hosting

Free and easy options:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Common Mistakes to Avoid

❌ **Auto-playing music/video** - Just don't
❌ **Too many animations** - Distracting and slow
❌ **Wall of text** - Use visuals and whitespace
❌ **Broken links** - Test everything
❌ **Mobile unfriendly** - Mobile-first design
❌ **Slow loading** - Performance matters
❌ **No real projects** - Tutorial clones aren't enough

## Project Ideas

If you need portfolio projects:

1. **Solve a real problem** you or others have
2. **Rebuild a popular app** with your twist
3. **Contribute to open source** and showcase it
4. **Build developer tools** (VSCode extension, CLI, etc.)
5. **Create visualizations** of interesting data

## Stand Out Elements

### 1. Write About Your Projects

Blog posts showing your thought process demonstrate:
- Problem-solving skills
- Communication ability
- Technical depth
- Continuous learning

### 2. Show Your Process

Include:
- Wireframes or mockups
- Architecture decisions
- Performance optimizations
- Challenges overcome

### 3. Make It Interactive

Add interesting interactions:
- Smooth animations
- Code playgrounds
- Interactive demos
- Easter eggs (subtle ones)

## Continuous Improvement

Your portfolio is never "done":

1. **Update regularly** - Keep it current
2. **Gather feedback** - Ask peers to review
3. **Monitor analytics** - See what people view
4. **A/B test** - Try different approaches
5. **Refine projects** - Quality improves with iteration

## Final Thoughts

Your portfolio represents you when you can't be there in person. Make it:
- Professional but personal
- Polished but not pretentious
- Impressive but accessible

Focus on quality, clarity, and authenticity. Show your work, share your story, and make it easy for opportunities to find you.

Good luck building!`,
    featuredImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
    categories: ['Developer Experience'],
    tags: ['Career', 'Portfolio', 'Personal Branding'],
    readTime: 13,
  },
];
