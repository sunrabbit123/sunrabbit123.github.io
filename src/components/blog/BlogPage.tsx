import { useState, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fonts, fontSizes, fontWeights } from '../../theme/typography.stylex';
import { spacing } from '../../theme/spacing.stylex';
import type { BlogPost } from '../../types/blog';
import { blogService } from '../../data/mockBlogService';
import { BlogPostList } from './BlogPostList';
import { BlogPostDetail } from './BlogPostDetail';
import { CategoryFilter } from './CategoryFilter';

const styles = stylex.create({
  hero: {
    backgroundColor: colors.backgroundSecondary,
    padding: `${spacing['3xl']} ${spacing.lg}`,
    textAlign: 'center',
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderMedium,
  },
  heroTitle: {
    fontFamily: fonts.heading,
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    color: colors.primaryDark,
    margin: `0 0 ${spacing.md} 0`,
  },
  heroSubtitle: {
    fontSize: fontSizes.xl,
    color: colors.textSecondary,
    maxWidth: '600px',
    margin: '0 auto',
  },
});

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.categories.includes(selectedCategory)
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await blogService.getAllPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    } catch (error) {
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
      <div {...stylex.props(styles.hero)}>
        <h1 {...stylex.props(styles.heroTitle)}>Welcome to DevBlog</h1>
        <p {...stylex.props(styles.heroSubtitle)}>
          Exploring modern web development, design patterns, and best practices
          for building exceptional digital experiences.
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

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
