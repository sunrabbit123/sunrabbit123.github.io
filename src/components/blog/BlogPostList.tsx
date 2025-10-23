import { memo } from 'react';
import * as stylex from '@stylexjs/stylex';
import { spacing } from '../../theme/spacing.stylex';
import type { BlogPost } from '../../types/blog';
import { BlogPostCard } from './BlogPostCard';

const styles = stylex.create({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: spacing.lg,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 640px)': 'repeat(2, 1fr)',
      '@media (min-width: 1024px)': 'repeat(3, 1fr)',
    },
    gap: spacing.xl,
  },
  loading: {
    textAlign: 'center',
    padding: spacing['3xl'],
    fontSize: '1.5rem',
  },
  empty: {
    textAlign: 'center',
    padding: spacing['3xl'],
    fontSize: '1.2rem',
    opacity: 0.6,
  },
});

interface BlogPostListProps {
  posts: BlogPost[];
  loading?: boolean;
  onPostClick?: (post: BlogPost) => void;
}

export const BlogPostList = memo(function BlogPostList({ posts, loading, onPostClick }: BlogPostListProps) {
  if (loading) {
    return (
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.loading)}>Loading posts...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.empty)}>No posts found.</div>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.grid)}>
        {posts.map(post => (
          <BlogPostCard
            key={post.id}
            post={post}
            onClick={() => onPostClick?.(post)}
          />
        ))}
      </div>
    </div>
  );
});
