'use client';

import React from 'react';
import Link from 'next/link';
import * as stylex from '@stylexjs/stylex';
import { MDXRemote } from 'next-mdx-remote';
import { getMDXComponents } from '../../lib/getMDXComponents';
import { colors } from '../../theme/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../theme/typography.stylex';
import { spacing, borderRadius } from '../../theme/spacing.stylex';
import type { BlogPost } from '../../types/blog';

const styles = stylex.create({
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.sm,
    color: colors.primaryDark,
    textDecoration: 'none',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    marginBottom: spacing.xl,
    transition: 'color 0.2s ease',
    ':hover': {
      color: colors.accent,
    },
  },
  backArrow: {
    fontSize: fontSizes.lg,
  },
  article: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    boxShadow: `0 2px 8px ${colors.shadowColor}`,
  },
  header: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'cover',
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: {
      default: fontSizes['3xl'],
      '@media (min-width: 768px)': fontSizes['4xl'],
    },
    fontWeight: fontWeights.bold,
    color: colors.primaryDark,
    margin: `0 0 ${spacing.lg} 0`,
    lineHeight: lineHeights.tight,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
    flexWrap: 'wrap',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderLight,
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: borderRadius.full,
    objectFit: 'cover',
  },
  authorDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  authorName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
  },
  readTime: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
    fontWeight: fontWeights.medium,
  },
  categories: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  category: {
    fontSize: fontSizes.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.secondaryDark,
    color: colors.textPrimary,
    borderRadius: borderRadius.md,
    fontWeight: fontWeights.medium,
  },
  body: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
  },
  mdxContent: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.textPrimary,
    fontFamily: fonts.body,
  },
  errorState: {
    fontSize: fontSizes.base,
    color: colors.error,
    backgroundColor: '#fee',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.error,
  },
  footer: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.borderLight,
  },
  tags: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: fontSizes.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.secondaryLight,
    color: colors.textPrimary,
    borderRadius: borderRadius.md,
    fontWeight: fontWeights.medium,
  },
});

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formattedDate = post.publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to a placeholder when image fails to load
    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='500' viewBox='0 0 900 500'%3E%3Crect fill='%23D2B48C' width='900' height='500'/%3E%3Ctext fill='%236B3E2E' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E`;
  };

  return (
    <div {...stylex.props(styles.container)}>
      <Link href="/" {...stylex.props(styles.backLink)}>
        <span {...stylex.props(styles.backArrow)}>←</span>
        Back to Blog
      </Link>

      <article {...stylex.props(styles.article)}>
        <div {...stylex.props(styles.header)}>
          <img
            src={post.featuredImage}
            alt={`Featured image for ${post.title}`}
            loading="eager"
            decoding="async"
            onError={handleImageError}
            {...stylex.props(styles.image)}
          />

          <h1 {...stylex.props(styles.title)}>{post.title}</h1>

          <div {...stylex.props(styles.meta)}>
            <div {...stylex.props(styles.authorInfo)}>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                {...stylex.props(styles.avatar)}
              />
              <div {...stylex.props(styles.authorDetails)}>
                <span {...stylex.props(styles.authorName)}>{post.author.name}</span>
                <span {...stylex.props(styles.date)}>{formattedDate}</span>
              </div>
            </div>
            <span {...stylex.props(styles.readTime)}>{post.readTime} min read</span>
            {post.categories.length > 0 && (
              <div {...stylex.props(styles.categories)}>
                {post.categories.map(category => (
                  <span key={category} {...stylex.props(styles.category)}>
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div {...stylex.props(styles.body)}>
          <div {...stylex.props(styles.mdxContent)}>
            {post.serializedContent ? (
              <MDXRemote {...post.serializedContent} components={getMDXComponents()} />
            ) : (
              <div {...stylex.props(styles.errorState)}>
                <strong>Error:</strong> Content could not be loaded
              </div>
            )}
          </div>
        </div>

        {post.tags.length > 0 && (
          <div {...stylex.props(styles.footer)}>
            <div {...stylex.props(styles.tags)}>
              {post.tags.map(tag => (
                <span key={tag} {...stylex.props(styles.tag)}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
