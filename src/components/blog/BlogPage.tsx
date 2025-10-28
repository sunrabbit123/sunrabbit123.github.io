'use client';

import { useState } from 'react';
import type { BlogPost } from '../../types/blog';
import { BlogPostList } from './BlogPostList';

interface BlogPageProps {
  initialPosts: BlogPost[];
}

export function BlogPage({ initialPosts }: BlogPageProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);

  return (
    <BlogPostList
      posts={posts}
      loading={false}
    />
  );
}
