import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fonts, fontSizes } from '../../theme/typography.stylex';
import { spacing } from '../../theme/spacing.stylex';

const styles = stylex.create({
  footer: {
    backgroundColor: colors.primaryDark,
    color: colors.textInverse,
    marginTop: spacing['4xl'],
    padding: `${spacing['2xl']} 0`,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing.lg}`,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      '@media (min-width: 768px)': 'repeat(3, 1fr)',
    },
    gap: spacing.xl,
    marginBottom: spacing.xl,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.lg,
    marginBottom: spacing.sm,
    color: colors.secondaryLight,
  },
  text: {
    fontSize: fontSizes.sm,
    lineHeight: 1.6,
    margin: 0,
    opacity: 0.9,
  },
  link: {
    color: colors.textInverse,
    textDecoration: 'none',
    fontSize: fontSizes.sm,
    opacity: 0.8,
    transition: 'opacity 0.2s ease',
    ':hover': {
      opacity: 1,
      color: colors.accentLight,
    },
  },
  divider: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.primaryLight,
    margin: `${spacing.lg} 0`,
    opacity: 0.3,
  },
  copyright: {
    textAlign: 'center',
    fontSize: fontSizes.sm,
    opacity: 0.7,
  },
});

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.content)}>
          <div {...stylex.props(styles.section)}>
            <h3 {...stylex.props(styles.sectionTitle)}>About DevBlog</h3>
            <p {...stylex.props(styles.text)}>
              A showcase of modern web development techniques, best practices,
              and thoughtful design. Built with React, TypeScript, and StyleX.
            </p>
          </div>

          <div {...stylex.props(styles.section)}>
            <h3 {...stylex.props(styles.sectionTitle)}>Categories</h3>
            <a href="#" {...stylex.props(styles.link)}>
              Web Development
            </a>
            <a href="#" {...stylex.props(styles.link)}>
              Design Systems
            </a>
            <a href="#" {...stylex.props(styles.link)}>
              Performance
            </a>
            <a href="#" {...stylex.props(styles.link)}>
              Developer Experience
            </a>
          </div>

          <div {...stylex.props(styles.section)}>
            <h3 {...stylex.props(styles.sectionTitle)}>Connect</h3>
            <a href="#" {...stylex.props(styles.link)}>
              GitHub
            </a>
            <a href="#" {...stylex.props(styles.link)}>
              Twitter
            </a>
            <a href="#" {...stylex.props(styles.link)}>
              LinkedIn
            </a>
            <a href="#" {...stylex.props(styles.link)}>
              RSS Feed
            </a>
          </div>
        </div>

        <div {...stylex.props(styles.divider)} />

        <p {...stylex.props(styles.copyright)}>
          {currentYear} DevBlog. Built with React and StyleX.
        </p>
      </div>
    </footer>
  );
}
