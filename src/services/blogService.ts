import type { BlogPost, Category } from '../types/blog';

/**
 * Blog service interface
 * This abstraction allows easy swapping between different data sources
 * (mock data, REST API, GraphQL, CMS, etc.)
 */
export interface BlogService {
  /**
   * Get all blog posts
   * @param locale - The locale to fetch posts for (default: 'ko')
   */
  getAllPosts(locale?: string): Promise<BlogPost[]>;

  /**
   * Get a single post by ID
   * @param id - The post ID
   * @param locale - The locale to fetch the post for (default: 'ko')
   */
  getPostById(id: string, locale?: string): Promise<BlogPost | null>;

  /**
   * Get a single post by slug
   * @param slug - The post slug
   * @param locale - The locale to fetch the post for (default: 'ko')
   */
  getPostBySlug(slug: string, locale?: string): Promise<BlogPost | null>;

  /**
   * Get posts by category
   * @param category - The category name
   * @param locale - The locale to fetch posts for (default: 'ko')
   */
  getPostsByCategory(category: string, locale?: string): Promise<BlogPost[]>;

  /**
   * Get posts by tag
   * @param tag - The tag name
   * @param locale - The locale to fetch posts for (default: 'ko')
   */
  getPostsByTag(tag: string, locale?: string): Promise<BlogPost[]>;

  /**
   * Get all categories
   * @param locale - The locale to fetch categories for (default: 'ko')
   */
  getCategories(locale?: string): Promise<Category[]>;

  /**
   * Get all unique tags
   * @param locale - The locale to fetch tags for (default: 'ko')
   */
  getTags(locale?: string): Promise<string[]>;
}

/**
 * Default blog service instance
 * Uses MDX-based implementation for static content
 */
export { mdxBlogService as blogService } from './mdxBlogService';
