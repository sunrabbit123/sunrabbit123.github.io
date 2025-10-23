import type { BlogService } from '../services/blogService';
import type { BlogPost, Category } from '../types/blog';
import { mockPosts, mockCategories } from './mockData';

/**
 * Simulated network delay in milliseconds for mock API responses
 * This makes the mock service behave more like a real API
 */
const MOCK_API_DELAY_MS = 300;

/**
 * Mock implementation of the BlogService interface
 * This uses in-memory data but could easily be swapped for an API client
 */
export class MockBlogService implements BlogService {
  private posts: BlogPost[] = mockPosts;
  private categories: Category[] = mockCategories;

  /**
   * Simulate async behavior like a real API
   */
  private async delay<T>(data: T, ms: number = MOCK_API_DELAY_MS): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => resolve(data), ms);
    });
  }

  async getAllPosts(): Promise<BlogPost[]> {
    // Sort by date, newest first
    const sorted = [...this.posts].sort(
      (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
    );
    return this.delay(sorted);
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    const post = this.posts.find(p => p.id === id) || null;
    return this.delay(post);
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = this.posts.find(p => p.slug === slug) || null;
    return this.delay(post);
  }

  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const filtered = this.posts.filter(post =>
      post.categories.some(
        cat => cat.toLowerCase() === category.toLowerCase()
      )
    );
    const sorted = filtered.sort(
      (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
    );
    return this.delay(sorted);
  }

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    const filtered = this.posts.filter(post =>
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    const sorted = filtered.sort(
      (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
    );
    return this.delay(sorted);
  }

  async getCategories(): Promise<Category[]> {
    return this.delay(this.categories);
  }

  async getTags(): Promise<string[]> {
    const allTags = this.posts.flatMap(post => post.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();
    return this.delay(uniqueTags);
  }
}

/**
 * Export a singleton instance
 */
export const blogService = new MockBlogService();
