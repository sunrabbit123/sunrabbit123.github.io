/**
 * Core blog data types
 */

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: Author;
  publishedDate: Date;
  excerpt: string;
  content: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  readTime: number; // in minutes
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}
