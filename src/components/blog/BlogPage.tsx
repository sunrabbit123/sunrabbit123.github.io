import { useState, useEffect, useMemo } from 'react';
import type { BlogPost } from '../../types/blog';
import { blogService } from '../../data/mockBlogService';
import { BlogPostList } from './BlogPostList';
import { BlogPostDetail } from './BlogPostDetail';
import { CategoryFilter } from './CategoryFilter';

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  // Memoize filtered posts to avoid recalculating on every render
  const filteredPosts = useMemo(() => {
    if (selectedCategory === null) {
      return posts;
    }
    return posts.filter(post =>
      post.categories.includes(selectedCategory)
    );
  }, [selectedCategory, posts]);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const allPosts = await blogService.getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load blog posts. Please try again later.';
      setError(errorMessage);
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const allCategories = await blogService.getCategories();
      setCategories(allCategories.map(cat => cat.name));
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Categories are non-critical, so we don't set a user-facing error
    }
  };

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

      {error && (
        <div style={{
          padding: '2rem',
          margin: '2rem auto',
          maxWidth: '600px',
          backgroundColor: '#fee',
          border: '2px solid #c33',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#c33', margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Error Loading Posts
          </p>
          <p style={{ color: '#333', margin: '0 0 1rem 0' }}>
            {error}
          </p>
          <button
            onClick={loadPosts}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6B3E2E',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Try Again
          </button>
        </div>
      )}

      <BlogPostList
        posts={filteredPosts}
        loading={loading}
        onPostClick={handlePostClick}
      />

      {selectedPost && (
        <BlogPostDetail post={selectedPost} onClose={handleCloseDetail} />
      )}
    </>
  );
}
