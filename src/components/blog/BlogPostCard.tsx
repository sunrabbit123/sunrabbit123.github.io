import { memo, useMemo } from 'react';
import Link from 'next/link';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../theme/typography.stylex';
import { spacing, borderRadius } from '../../theme/spacing.stylex';
import type { BlogPost } from '../../types/blog';

const styles = stylex.create({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    height: '100%',
  },
  card: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    boxShadow: `0 1px 4px ${colors.shadowColor}`,
    transition: 'all 0.2s ease-in-out',
    height: '100%',
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row',
    },
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 8px ${colors.shadowColor}`,
    },
  },
  imageWrapper: {
    flexShrink: 0,
    width: {
      default: '100%',
      '@media (min-width: 640px)': '150px',
    },
    height: {
      default: '120px',
      '@media (min-width: 640px)': '150px',
    },
    backgroundColor: colors.secondaryLight,
  },
  image: {
    width: '100%',
    height: '100%',
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
    color: colors.textSecondary,
    fontWeight: fontWeights.medium,
    borderRight: `1px solid ${colors.textTertiary}`,
    paddingRight: spacing.sm,
    marginRight: spacing.sm,
    ':last-child': {
      borderRight: 'none',
      paddingRight: 0,
      marginRight: 0,
    },
  },
  tags: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
    fontWeight: fontWeights.normal,
  },
});

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = memo(function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = useMemo(() =>
    post.publishedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }), [post.publishedDate]
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to a placeholder when image fails to load
    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23D2B48C' width='400' height='200'/%3E%3Ctext fill='%236B3E2E' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E`;
  };

  return (
    <Link href={`/blog/${post.slug}`} {...stylex.props(styles.link)}>
      <article
        {...stylex.props(styles.card)}
        aria-label={`Read article: ${post.title}`}
      >
      <div {...stylex.props(styles.imageWrapper)}>
        <img
          src={post.featuredImage}
          alt={`Featured image for ${post.title}`}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          {...stylex.props(styles.image)}
        />
      </div>
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
    </Link>
  );
});
