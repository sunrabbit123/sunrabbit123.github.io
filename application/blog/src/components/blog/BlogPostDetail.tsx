import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../theme/typography.stylex';
import { spacing, borderRadius } from '../../theme/spacing.stylex';
import type { BlogPost } from '../../types/blog';

const styles = stylex.create({
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlayColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    zIndex: 1000,
    overflowY: 'auto',
  },
  content: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: borderRadius.lg,
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    margin: `${spacing.xl} auto`,
  },
  closeButton: {
    position: 'sticky',
    top: spacing.md,
    right: spacing.md,
    float: 'right',
    backgroundColor: colors.primaryDark,
    color: colors.textInverse,
    borderWidth: 0,
    borderStyle: 'none',
    borderRadius: borderRadius.full,
    width: '40px',
    height: '40px',
    fontSize: fontSizes.xl,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    zIndex: 10,
    ':hover': {
      backgroundColor: colors.accent,
    },
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: fontSizes['4xl'],
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
  author: {
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
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  authorName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
  },
  readTime: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.sm,
  },
  body: {
    padding: `0 ${spacing.xl} ${spacing.xl} ${spacing.xl}`,
  },
  content_text: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
    color: colors.textSecondary,
    whiteSpace: 'pre-wrap',
    fontFamily: fonts.body,
  },
  tags: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.borderLight,
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

interface BlogPostDetailProps {
  post: BlogPost;
  onClose: () => void;
}

export function BlogPostDetail({ post, onClose }: BlogPostDetailProps) {
  const formattedDate = post.publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div {...stylex.props(styles.modal)} onClick={handleBackdropClick}>
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.header)}>
          <button
            {...stylex.props(styles.closeButton)}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          <img
            src={post.featuredImage}
            alt={post.title}
            {...stylex.props(styles.image)}
          />

          <h1 {...stylex.props(styles.title)}>{post.title}</h1>

          <div {...stylex.props(styles.meta)}>
            <div {...stylex.props(styles.author)}>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                {...stylex.props(styles.avatar)}
              />
              <div {...stylex.props(styles.authorInfo)}>
                <span {...stylex.props(styles.authorName)}>
                  {post.author.name}
                </span>
                <span {...stylex.props(styles.date)}>{formattedDate}</span>
              </div>
            </div>
            <span {...stylex.props(styles.readTime)}>
              {post.readTime} min read
            </span>
          </div>
        </div>

        <div {...stylex.props(styles.body)}>
          <div {...stylex.props(styles.content_text)}>
            {post.content}
          </div>

          <div {...stylex.props(styles.tags)}>
            {post.tags.map(tag => (
              <span key={tag} {...stylex.props(styles.tag)}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
