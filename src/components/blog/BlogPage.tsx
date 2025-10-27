'use client';

import { useState, useMemo } from 'react';
import type { BlogPost } from '../../types/blog';
import { BlogPostList } from './BlogPostList';
import { BlogPostDetail } from './BlogPostDetail';
import { CategoryFilter } from './CategoryFilter';

interface BlogPageProps {
  initialPosts: BlogPost[];
  initialCategories: string[];
}

export function BlogPage({ initialPosts, initialCategories }: BlogPageProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories] = useState<string[]>(initialCategories);

  // Memoize filtered posts to avoid recalculating on every render
  const filteredPosts = useMemo(() => {
    if (selectedCategory === null) {
      return posts;
    }
    return posts.filter(post =>
      post.categories.includes(selectedCategory)
    );
  }, [selectedCategory, posts]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <BlogPostList
        posts={filteredPosts}
        loading={false}
        onPostClick={handlePostClick}
      />

      {selectedPost && (
        <BlogPostDetail post={selectedPost} onClose={handleCloseDetail} />
      )}
    </>
  );
}
