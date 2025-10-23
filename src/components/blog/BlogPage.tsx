import { useState, useEffect, useMemo } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { BlogPost } from '../../types/blog';
import { blogService } from '../../data/mockBlogService';
import { BlogPostList } from './BlogPostList';
import { BlogPostDetail } from './BlogPostDetail';
import { CategoryFilter } from './CategoryFilter';
import { colors } from '../../theme/colors.stylex';
import { spacing } from '../../theme/spacing.stylex';

const styles = stylex.create({
  errorContainer: {
    padding: spacing.xl,
    margin: `${spacing.xl} auto`,
    maxWidth: '600px',
    backgroundColor: '#fee',
    border: `2px solid ${colors.error}`,
    borderRadius: '8px',
    textAlign: 'center',
  },
  errorTitle: {
    color: colors.error,
    margin: `0 0 ${spacing.md} 0`,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: colors.textPrimary,
    margin: `0 0 ${spacing.md} 0`,
  },
  retryButton: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.primaryDark,
    color: colors.textInverse,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    ':hover': {
      backgroundColor: colors.primary,
    },
    ':active': {
      backgroundColor: colors.primaryLight,
    },
  },
  categoryErrorNotification: {
    padding: spacing.sm,
    margin: `${spacing.md} auto`,
    maxWidth: '1200px',
    backgroundColor: colors.warning,
    color: colors.textInverse,
    borderRadius: '4px',
    fontSize: '0.9rem',
    textAlign: 'center',
    opacity: 0.9,
  },
});

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState(false);

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
      setCategoryError(false);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategoryError(true);
      // Categories are non-critical, so we still allow the app to function
      // but we show a subtle notification to the user
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

      {categoryError && (
        <div {...stylex.props(styles.categoryErrorNotification)}>
          Unable to load categories. Showing all posts.
        </div>
      )}

      {error && (
        <div {...stylex.props(styles.errorContainer)}>
          <p {...stylex.props(styles.errorTitle)}>
            Error Loading Posts
          </p>
          <p {...stylex.props(styles.errorMessage)}>
            {error}
          </p>
          <button
            onClick={loadPosts}
            {...stylex.props(styles.retryButton)}
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
