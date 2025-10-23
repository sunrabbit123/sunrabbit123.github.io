import { useEffect, useRef } from 'react';
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
  date: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const formattedDate = post.publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to a placeholder when image fails to load
    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect fill='%23D2B48C' width='800' height='400'/%3E%3Ctext fill='%236B3E2E' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E`;
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Focus close button when modal opens
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => {
      modal.removeEventListener('keydown', handleTab);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div {...stylex.props(styles.modal)} onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div {...stylex.props(styles.content)} ref={modalRef}>
        <div {...stylex.props(styles.header)}>
          <button
            {...stylex.props(styles.closeButton)}
            onClick={onClose}
            aria-label="Close modal"
            ref={closeButtonRef}
          >
            ×
          </button>

          <img
            src={post.featuredImage}
            alt={`Featured image for ${post.title}`}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            {...stylex.props(styles.image)}
          />

          <h1 {...stylex.props(styles.title)} id="modal-title">{post.title}</h1>

          <div {...stylex.props(styles.meta)}>
            <span {...stylex.props(styles.date)}>{formattedDate}</span>
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
