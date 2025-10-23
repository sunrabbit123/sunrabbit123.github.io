import { memo, useMemo } from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../theme/typography.stylex';
import { spacing, borderRadius } from '../../theme/spacing.stylex';
import type { BlogPost } from '../../types/blog';

const styles = stylex.create({
  card: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    boxShadow: `0 2px 8px ${colors.shadowColor}`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 16px ${colors.shadowColor}`,
    },
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: colors.secondaryLight,
  },
  content: {
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    flex: 1,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.primaryDark,
    margin: 0,
    lineHeight: lineHeights.tight,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  date: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
  },
  excerpt: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.textSecondary,
    margin: 0,
    flex: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: 'auto',
  },
  categories: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  category: {
    fontSize: fontSizes.xs,
    padding: `${spacing.xs} ${spacing.sm}`,
    backgroundColor: colors.secondaryDark,
    color: colors.textPrimary,
    borderRadius: borderRadius.sm,
    fontWeight: fontWeights.medium,
  },
  tags: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: fontSizes.xs,
    color: colors.accent,
    fontWeight: fontWeights.medium,
  },
});

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: () => void;
}

export const BlogPostCard = memo(function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  const formattedDate = useMemo(() =>
    post.publishedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }), [post.publishedDate]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      {...stylex.props(styles.card)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${post.title}`}
    >
      <img
        src={post.featuredImage}
        alt={`Featured image for ${post.title}`}
        {...stylex.props(styles.image)}
      />
      <div {...stylex.props(styles.content)}>
        <h2 {...stylex.props(styles.title)}>{post.title}</h2>

        <div {...stylex.props(styles.meta)}>
          <span {...stylex.props(styles.date)}>{formattedDate}</span>
        </div>

        <p {...stylex.props(styles.excerpt)}>{post.excerpt}</p>

        <div {...stylex.props(styles.footer)}>
          <div {...stylex.props(styles.categories)}>
            {post.categories.slice(0, 2).map(category => (
              <span key={category} {...stylex.props(styles.category)}>
                {category}
              </span>
            ))}
          </div>
          <div {...stylex.props(styles.tags)}>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} {...stylex.props(styles.tag)}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
});
