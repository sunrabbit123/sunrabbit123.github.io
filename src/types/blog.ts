/**
 * Core blog data types
 */

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedDate: Date;
  excerpt: string;
  content: string;
  serializedContent?: MDXRemoteSerializeResult; // Optional serialized MDX for rendering
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
