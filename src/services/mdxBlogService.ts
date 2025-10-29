import type { BlogService } from './blogService';
import type { BlogPost, Category } from '../types/blog';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getAllCategories as getMDXCategories,
  getAllTags as getMDXTags,
  getPostsByCategory as getMDXPostsByCategory,
  getPostsByTag as getMDXPostsByTag,
} from '../lib/mdx';

/**
 * MDX-based implementation of the BlogService interface
 * Reads blog posts from MDX files in the content/posts/ directory
 */
export class MDXBlogService implements BlogService {
  /**
   * Get all blog posts
   * @param locale - The locale to fetch posts for (default: 'ko')
   * @returns Promise<BlogPost[]> - All posts sorted by date (newest first)
   */
  async getAllPosts(locale: string = 'ko'): Promise<BlogPost[]> {
    return getAllBlogPosts(locale);
  }

  /**
   * Get a single post by ID
   * @param id - The post ID (same as slug in MDX implementation)
   * @param locale - The locale to fetch the post for (default: 'ko')
   * @returns Promise<BlogPost | null> - The post or null if not found
   */
  async getPostById(id: string, locale: string = 'ko'): Promise<BlogPost | null> {
    // In MDX implementation, ID is the same as slug
    return getBlogPostBySlug(id, locale);
  }

  /**
   * Get a single post by slug
   * @param slug - The post slug
   * @param locale - The locale to fetch the post for (default: 'ko')
   * @returns Promise<BlogPost | null> - The post or null if not found
   */
  async getPostBySlug(slug: string, locale: string = 'ko'): Promise<BlogPost | null> {
    return getBlogPostBySlug(slug, locale);
  }

  /**
   * Get posts by category
   * @param category - The category name
   * @param locale - The locale to fetch posts for (default: 'ko')
   * @returns Promise<BlogPost[]> - Posts in the category
   */
  async getPostsByCategory(category: string, locale: string = 'ko'): Promise<BlogPost[]> {
    return getMDXPostsByCategory(category, locale);
  }

  /**
   * Get posts by tag
   * @param tag - The tag name
   * @param locale - The locale to fetch posts for (default: 'ko')
   * @returns Promise<BlogPost[]> - Posts with the tag
   */
  async getPostsByTag(tag: string, locale: string = 'ko'): Promise<BlogPost[]> {
    return getMDXPostsByTag(tag, locale);
  }

  /**
   * Get all categories
   * @param locale - The locale to fetch categories for (default: 'ko')
   * @returns Promise<Category[]> - All unique categories with metadata
   */
  async getCategories(locale: string = 'ko'): Promise<Category[]> {
    const categoryNames = getMDXCategories(locale);

    // Transform category names to Category objects
    return categoryNames.map((name) => {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      return {
        id: slug,
        name,
        slug,
        description: this.generateCategoryDescription(name),
      };
    });
  }

  /**
   * Get all unique tags
   * @param locale - The locale to fetch tags for (default: 'ko')
   * @returns Promise<string[]> - All unique tags
   */
  async getTags(locale: string = 'ko'): Promise<string[]> {
    return getMDXTags(locale);
  }

  /**
   * Generate a default description for a category
   * @param categoryName - The category name
   * @returns A description string
   */
  private generateCategoryDescription(categoryName: string): string {
    // Generate simple descriptions based on common category names
    const descriptions: Record<string, string> = {
      development: 'Software development tutorials and best practices',
      react: 'React framework guides and patterns',
      typescript: 'TypeScript tips, tricks, and advanced features',
      nextjs: 'Next.js tutorials and application development',
      javascript: 'JavaScript fundamentals and modern features',
      css: 'CSS styling techniques and best practices',
      tutorial: 'Step-by-step tutorials and guides',
      'web development': 'Web development articles and resources',
      design: 'Design principles and UI/UX best practices',
      performance: 'Web performance optimization techniques',
      testing: 'Testing strategies and tools',
      devops: 'DevOps practices and deployment strategies',
    };

    const key = categoryName.toLowerCase();
    return descriptions[key] || `Articles about ${categoryName}`;
  }
}

/**
 * Export a singleton instance
 */
export const mdxBlogService = new MDXBlogService();
