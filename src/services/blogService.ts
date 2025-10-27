import type { BlogPost, Category } from '../types/blog';

/**
 * Blog service interface
 * This abstraction allows easy swapping between different data sources
 * (mock data, REST API, GraphQL, CMS, etc.)
 */
export interface BlogService {
  /**
   * Get all blog posts
   */
  getAllPosts(): Promise<BlogPost[]>;

  /**
   * Get a single post by ID
   */
  getPostById(id: string): Promise<BlogPost | null>;

  /**
   * Get a single post by slug
   */
  getPostBySlug(slug: string): Promise<BlogPost | null>;

  /**
   * Get posts by category
   */
  getPostsByCategory(category: string): Promise<BlogPost[]>;

  /**
   * Get posts by tag
   */
  getPostsByTag(tag: string): Promise<BlogPost[]>;

  /**
   * Get all categories
   */
  getCategories(): Promise<Category[]>;

  /**
   * Get all unique tags
   */
  getTags(): Promise<string[]>;
}

/**
 * Default blog service instance
 * Uses MDX-based implementation for static content
 */
export { mdxBlogService as blogService } from './mdxBlogService';
