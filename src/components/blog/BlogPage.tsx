import { useState, useEffect } from 'react';
import type { BlogPost } from '../../types/blog';
import { blogService } from '../../data/mockBlogService';
import { BlogPostList } from './BlogPostList';
import { BlogPostDetail } from './BlogPostDetail';
import { CategoryFilter } from './CategoryFilter';

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
