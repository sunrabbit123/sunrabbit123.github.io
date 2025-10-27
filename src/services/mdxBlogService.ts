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
   * @returns Promise<BlogPost[]> - All posts sorted by date (newest first)
   */
  async getAllPosts(): Promise<BlogPost[]> {
    return getAllBlogPosts();
  }

  /**
   * Get a single post by ID
   * @param id - The post ID (same as slug in MDX implementation)
   * @returns Promise<BlogPost | null> - The post or null if not found
   */
  async getPostById(id: string): Promise<BlogPost | null> {
    // In MDX implementation, ID is the same as slug
    return getBlogPostBySlug(id);
  }

  /**
   * Get a single post by slug
   * @param slug - The post slug
   * @returns Promise<BlogPost | null> - The post or null if not found
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return getBlogPostBySlug(slug);
  }

  /**
   * Get posts by category
   * @param category - The category name
   * @returns Promise<BlogPost[]> - Posts in the category
   */
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    return getMDXPostsByCategory(category);
  }

  /**
   * Get posts by tag
   * @param tag - The tag name
   * @returns Promise<BlogPost[]> - Posts with the tag
   */
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    return getMDXPostsByTag(tag);
  }

  /**
   * Get all categories
   * @returns Promise<Category[]> - All unique categories with metadata
   */
  async getCategories(): Promise<Category[]> {
    const categoryNames = getMDXCategories();

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
   * @returns Promise<string[]> - All unique tags
   */
  async getTags(): Promise<string[]> {
    return getMDXTags();
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
