import * as stylex from '@stylexjs/stylex';

/**
 * Typography system for the blog
 * Uses system fonts for performance and consistency
 */
export const fonts = stylex.defineVars({
  // Font families
  heading: 'Georgia, "Times New Roman", Times, serif',
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: '"Courier New", Courier, monospace',
});

export const fontSizes = stylex.defineVars({
  // Font sizes (responsive-friendly)
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
});

export const fontWeights = stylex.defineVars({
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
});

export const lineHeights = stylex.defineVars({
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.75',
});
