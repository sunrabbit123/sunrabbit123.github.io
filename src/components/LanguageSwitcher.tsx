'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../theme/colors.stylex';
import { fontSizes, fontWeights } from '../theme/typography.stylex';
import { spacing, borderRadius } from '../theme/spacing.stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    gap: spacing.xs,
    alignItems: 'center',
  },
  button: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.backgroundSecondary,
    color: colors.textSecondary,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: borderRadius.md,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: colors.primaryLight,
      color: colors.textPrimary,
    },
  },
  activeButton: {
    backgroundColor: colors.primaryDark,
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
});

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Remove the current locale prefix and add the new one
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;

    router.push(newPath);
  };

  return (
    <div {...stylex.props(styles.container)}>
      <button
        {...stylex.props(styles.button, locale === 'ko' && styles.activeButton)}
        onClick={() => switchLocale('ko')}
        aria-label="Switch to Korean"
      >
        한국어
      </button>
      <button
        {...stylex.props(styles.button, locale === 'en' && styles.activeButton)}
        onClick={() => switchLocale('en')}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
}
