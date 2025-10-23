import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fonts, fontSizes, fontWeights } from '../../theme/typography.stylex';
import { spacing } from '../../theme/spacing.stylex';

const styles = stylex.create({
  header: {
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderMedium,
    padding: `${spacing.lg} 0`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(8px)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing.lg}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    textDecoration: 'none',
    color: colors.textPrimary,
  },
  logoIcon: {
    fontSize: fontSizes['2xl'],
  },
  logoText: {
    fontFamily: fonts.heading,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.primaryDark,
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: spacing.lg,
    alignItems: 'center',
  },
  navLink: {
    color: colors.textSecondary,
    textDecoration: 'none',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    transition: 'color 0.2s ease',
    ':hover': {
      color: colors.accent,
    },
  },
});

export function Header() {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container)}>
        <a href="#" {...stylex.props(styles.logo)}>
          <span {...stylex.props(styles.logoIcon)}>=�</span>
          <h1 {...stylex.props(styles.logoText)}>DevBlog</h1>
        </a>
        <nav {...stylex.props(styles.nav)}>
          <a href="#" {...stylex.props(styles.navLink)}>
            Home
          </a>
          <a href="#about" {...stylex.props(styles.navLink)}>
            About
          </a>
          <a href="#contact" {...stylex.props(styles.navLink)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
