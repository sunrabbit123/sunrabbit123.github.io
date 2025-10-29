import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, Author } from '@/types/blog';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

/**
 * Frontmatter schema expected in MDX files
 */
export interface MDXFrontmatter {
  title: string;
  slug: string;
  publishedDate: string; // ISO date string
  excerpt: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  readTime: number;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

/**
 * Result of parsing an MDX file
 */
export interface ParsedMDX {
  frontmatter: MDXFrontmatter;
  content: string;
}

/**
 * Ensures the posts directory exists
 * @returns true if directory exists, false otherwise
 */
export function ensurePostsDirectoryExists(): boolean {
  try {
    return fs.existsSync(POSTS_DIRECTORY);
  } catch {
    return false;
  }
}

/**
 * Get all MDX file paths from the content/posts directory
 * @param locale - The locale to fetch files for (default: 'ko')
 * @returns Array of absolute file paths
 */
export function getAllMDXFiles(locale: string = 'ko'): string[] {
  if (!ensurePostsDirectoryExists()) {
    return [];
  }

  try {
    const files = fs.readdirSync(POSTS_DIRECTORY);

    // For Korean (ko), use .mdx files
    // For English (en), use .en.mdx files
    const extension = locale === 'ko' ? '.mdx' : `.${locale}.mdx`;

    return files
      .filter((file) => {
        if (locale === 'ko') {
          // Korean: match .mdx files but exclude locale-specific ones (e.g., .en.mdx)
          return file.endsWith('.mdx') && !file.match(/\.[a-z]{2}\.mdx$/);
        } else {
          // Other locales: match locale-specific files (e.g., .en.mdx)
          return file.endsWith(extension);
        }
      })
      .map((file) => path.join(POSTS_DIRECTORY, file));
  } catch (error) {
    console.error('Error reading MDX files:', error);
    return [];
  }
}

/**
 * Parse an MDX file's frontmatter and content
 * @param filePath - Absolute path to the MDX file
 * @returns Parsed frontmatter and content
 */
export function parseMDXFrontmatter(filePath: string): ParsedMDX | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.slug || !data.publishedDate) {
      console.error(`Missing required frontmatter in ${filePath}`);
      return null;
    }

    return {
      frontmatter: data as MDXFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get an MDX file by its slug
 * @param slug - The post slug
 * @param locale - The locale to fetch the file for (default: 'ko')
 * @returns Parsed MDX data or null if not found
 */
export function getMDXBySlug(slug: string, locale: string = 'ko'): ParsedMDX | null {
  const files = getAllMDXFiles(locale);

  for (const filePath of files) {
    const parsed = parseMDXFrontmatter(filePath);
    if (parsed && parsed.frontmatter.slug === slug) {
      return parsed;
    }
  }

  return null;
}

/**
 * Convert MDX frontmatter to BlogPost type
 * @param frontmatter - The parsed frontmatter
 * @param content - The MDX content
 * @returns BlogPost object
 */
export function convertFrontmatterToBlogPost(
  frontmatter: MDXFrontmatter,
  content: string
): BlogPost {
  // Parse the date string to Date object
  const publishedDate = new Date(frontmatter.publishedDate);

  // Create Author object
  const author: Author = {
    id: frontmatter.author.name.toLowerCase().replace(/\s+/g, '-'),
    name: frontmatter.author.name,
    avatar: frontmatter.author.avatar,
    bio: frontmatter.author.bio,
  };

  // Create BlogPost object
  const blogPost: BlogPost = {
    id: frontmatter.slug,
    title: frontmatter.title,
    slug: frontmatter.slug,
    author,
    publishedDate,
    excerpt: frontmatter.excerpt,
    content,
    featuredImage: frontmatter.featuredImage,
    categories: frontmatter.categories || [],
    tags: frontmatter.tags || [],
    readTime: frontmatter.readTime || calculateReadTime(content),
  };

  return blogPost;
}

/**
 * Calculate estimated read time from content
 * @param content - The MDX content
 * @returns Estimated read time in minutes
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Get all blog posts from MDX files
 * @param locale - The locale to fetch posts for (default: 'ko')
 * @returns Array of BlogPost objects
 */
export function getAllBlogPosts(locale: string = 'ko'): BlogPost[] {
  const files = getAllMDXFiles(locale);
  const posts: BlogPost[] = [];

  for (const filePath of files) {
    const parsed = parseMDXFrontmatter(filePath);
    if (parsed) {
      const blogPost = convertFrontmatterToBlogPost(
        parsed.frontmatter,
        parsed.content
      );
      posts.push(blogPost);
    }
  }

  // Sort by published date (newest first)
  return posts.sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
}

/**
 * Get a single blog post by slug
 * @param slug - The post slug
 * @param locale - The locale to fetch the post for (default: 'ko')
 * @returns BlogPost object or null if not found
 */
export function getBlogPostBySlug(slug: string, locale: string = 'ko'): BlogPost | null {
  const parsed = getMDXBySlug(slug, locale);
  if (!parsed) {
    return null;
  }

  return convertFrontmatterToBlogPost(parsed.frontmatter, parsed.content);
}

/**
 * Get all unique categories from all posts
 * @param locale - The locale to fetch categories for (default: 'ko')
 * @returns Array of unique category names
 */
export function getAllCategories(locale: string = 'ko'): string[] {
  const posts = getAllBlogPosts(locale);
  const categories = new Set<string>();

  posts.forEach((post) => {
    post.categories.forEach((category) => categories.add(category));
  });

  return Array.from(categories).sort();
}

/**
 * Get all unique tags from all posts
 * @param locale - The locale to fetch tags for (default: 'ko')
 * @returns Array of unique tag names
 */
export function getAllTags(locale: string = 'ko'): string[] {
  const posts = getAllBlogPosts(locale);
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get posts filtered by category
 * @param category - The category name
 * @param locale - The locale to fetch posts for (default: 'ko')
 * @returns Array of BlogPost objects
 */
export function getPostsByCategory(category: string, locale: string = 'ko'): BlogPost[] {
  const posts = getAllBlogPosts(locale);
  return posts.filter((post) =>
    post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
  );
}

/**
 * Get posts filtered by tag
 * @param tag - The tag name
 * @param locale - The locale to fetch posts for (default: 'ko')
 * @returns Array of BlogPost objects
 */
export function getPostsByTag(tag: string, locale: string = 'ko'): BlogPost[] {
  const posts = getAllBlogPosts(locale);
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
