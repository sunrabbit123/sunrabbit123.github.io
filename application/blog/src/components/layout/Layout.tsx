import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fonts } from '../../theme/typography.stylex';
import { Header } from './Header';
import { Footer } from './Footer';

const styles = stylex.create({
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.backgroundPrimary,
    color: colors.textPrimary,
    fontFamily: fonts.body,
  },
  main: {
    flex: 1,
    width: '100%',
  },
});

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div {...stylex.props(styles.layout)}>
      <Header />
      <main {...stylex.props(styles.main)}>{children}</main>
      <Footer />
    </div>
  );
}
