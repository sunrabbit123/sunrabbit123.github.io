import type { MDXComponents } from 'mdx/types';
import * as stylex from '@stylexjs/stylex';
import { colors } from './src/theme/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from './src/theme/typography.stylex';
import { spacing, borderRadius } from './src/theme/spacing.stylex';

const styles = stylex.create({
  h1: {
    fontFamily: fonts.heading,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginTop: spacing['2xl'],
    marginBottom: spacing.lg,
    lineHeight: lineHeights.tight,
  },
  h2: {
    fontFamily: fonts.heading,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    lineHeight: lineHeights.tight,
  },
  h3: {
    fontFamily: fonts.heading,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    lineHeight: lineHeights.normal,
  },
  h4: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    lineHeight: lineHeights.normal,
  },
  h5: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    lineHeight: lineHeights.normal,
  },
  h6: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    lineHeight: lineHeights.normal,
  },
  p: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  a: {
    color: colors.accent,
    textDecoration: 'none',
    fontWeight: fontWeights.medium,
    transition: 'color 0.2s ease',
    ':hover': {
      color: colors.accentDark,
      textDecoration: 'underline',
    },
  },
  blockquote: {
    backgroundColor: colors.backgroundSecondary,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: colors.accent,
    padding: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.md,
    fontStyle: 'italic',
    color: colors.textSecondary,
  },
  code: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.sm,
    backgroundColor: colors.backgroundSecondary,
    color: colors.primaryDark,
    padding: '0.2em 0.4em',
    borderRadius: borderRadius.sm,
    fontWeight: fontWeights.medium,
  },
  pre: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.sm,
    backgroundColor: colors.backgroundTertiary,
    color: colors.textPrimary,
    padding: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.md,
    overflowX: 'auto',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderLight,
  },
  preCode: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    fontSize: 'inherit',
    color: 'inherit',
  },
  ul: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingLeft: spacing.xl,
    listStyleType: 'disc',
  },
  ol: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingLeft: spacing.xl,
    listStyleType: 'decimal',
  },
  li: {
    marginBottom: spacing.sm,
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  hr: {
    borderWidth: '0',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: colors.borderLight,
    marginTop: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    fontSize: fontSizes.base,
  },
  th: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
    padding: spacing.sm,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderMedium,
    textAlign: 'left',
  },
  td: {
    padding: spacing.sm,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderLight,
  },
});

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 {...stylex.props(styles.h1)} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 {...stylex.props(styles.h2)} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...stylex.props(styles.h3)} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 {...stylex.props(styles.h4)} {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 {...stylex.props(styles.h5)} {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6 {...stylex.props(styles.h6)} {...props}>
        {children}
      </h6>
    ),
    p: ({ children, ...props }) => (
      <p {...stylex.props(styles.p)} {...props}>
        {children}
      </p>
    ),
    a: ({ children, ...props }) => (
      <a {...stylex.props(styles.a)} {...props}>
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote {...stylex.props(styles.blockquote)} {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code {...stylex.props(styles.code)} {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre {...stylex.props(styles.pre)} {...props}>
        {/* Override code styles when inside pre */}
        {typeof children === 'object' &&
         children !== null &&
         'type' in children &&
         children.type === 'code' ? (
          <code {...stylex.props(styles.preCode)}>
            {(children as any).props.children}
          </code>
        ) : (
          children
        )}
      </pre>
    ),
    ul: ({ children, ...props }) => (
      <ul {...stylex.props(styles.ul)} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...stylex.props(styles.ol)} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...stylex.props(styles.li)} {...props}>
        {children}
      </li>
    ),
    img: ({ alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...stylex.props(styles.img)} alt={alt || ''} {...props} />
    ),
    hr: (props) => <hr {...stylex.props(styles.hr)} {...props} />,
    table: ({ children, ...props }) => (
      <table {...stylex.props(styles.table)} {...props}>
        {children}
      </table>
    ),
    th: ({ children, ...props }) => (
      <th {...stylex.props(styles.th)} {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td {...stylex.props(styles.td)} {...props}>
        {children}
      </td>
    ),
    ...components,
  };
}
