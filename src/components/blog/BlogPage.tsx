'use client';

import { useState } from 'react';
import type { BlogPost } from '../../types/blog';
import { BlogPostList } from './BlogPostList';
import { BlogPostDetail } from './BlogPostDetail';

interface BlogPageProps {
  initialPosts: BlogPost[];
}

export function BlogPage({ initialPosts }: BlogPageProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <BlogPostList
        posts={posts}
        loading={false}
        onPostClick={handlePostClick}
      />

      {selectedPost && (
        <BlogPostDetail post={selectedPost} onClose={handleCloseDetail} />
      )}
    </>
  );
}
