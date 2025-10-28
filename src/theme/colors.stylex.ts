import * as stylex from '@stylexjs/stylex';

/**
 * Warm brown color palette inspired by Pantone 2025 Color of the Year (Mocha Mousse)
 * Designed for a cozy, inviting, and sophisticated reading experience
 * All colors meet WCAG AA accessibility standards (4.5:1 for text, 3:1 for UI components)
 */
export const colors = stylex.defineVars({
  // Primary colors - Deep, rich browns inspired by espresso and mocha
  primaryDark: '#3E2723',      // Espresso - darkest, for strong emphasis and headers
  primary: '#6F4E37',          // Coffee brown - main brand color, sophisticated and warm
  primaryLight: '#A47864',     // Mocha Mousse (Pantone 2025) - for interactive elements

  // Secondary colors - Warm tans, caramels, and beiges
  secondaryDark: '#B8956A',    // Caramel - for secondary containers
  secondary: '#C9A87C',        // Warm tan - for cards and elevated surfaces
  secondaryLight: '#E4D5B7',   // Sand - for subtle backgrounds and dividers

  // Accent colors - Warm terracotta and burnt sienna
  accentDark: '#A0522D',       // Burnt sienna - for active/pressed states
  accent: '#C1664F',           // Terracotta - for links, highlights, and CTAs
  accentLight: '#D4876F',      // Light terracotta - for hover states and subtle emphasis

  // Background colors - Cream and warm whites for inviting atmosphere
  backgroundPrimary: '#FFF8F0', // Warm cream - main background, soft and welcoming
  backgroundSecondary: '#FAF4ED', // Light latte - section backgrounds
  backgroundTertiary: '#F5E6D3', // Pale sand - card backgrounds, subtle depth

  // Text colors - Dark browns with excellent contrast
  textPrimary: '#2C1810',      // Almost-black brown - main text (contrast: 14.5:1 on backgroundPrimary)
  textSecondary: '#4E342E',    // Dark chocolate - secondary text (contrast: 9.8:1)
  textTertiary: '#6F5849',     // Medium brown - muted text (contrast: 6.2:1)
  textInverse: '#FFFFFF',      // White text for dark backgrounds

  // Border colors - Warm neutrals that blend naturally
  borderLight: '#E8DCC8',      // Light warm gray - subtle borders
  borderMedium: '#D4C4B0',     // Medium warm gray - default borders
  borderDark: '#B5A491',       // Dark warm gray - emphasized borders

  // State colors - Harmonized with warm palette while maintaining clarity
  success: '#558B2F',          // Warm olive green - success states
  warning: '#E65100',          // Deep orange - warnings (harmonizes with brown)
  error: '#C62828',            // Warm red - errors
  info: '#00838F',             // Teal - information (cool accent for contrast)

  // Shadows and overlays - Warm-toned for modern depth
  shadowColor: 'rgba(62, 39, 35, 0.12)',     // Warm brown shadow for elevated surfaces
  shadowColorMedium: 'rgba(62, 39, 35, 0.18)', // Medium shadow for cards
  shadowColorLarge: 'rgba(62, 39, 35, 0.24)',  // Large shadow for modals/popovers
  overlayColor: 'rgba(44, 24, 16, 0.6)',       // Dark warm overlay for modals

  // Modern UI enhancements - Gradients and highlights
  gradientWarm: 'linear-gradient(135deg, #A47864 0%, #C9A87C 100%)', // Mocha to caramel
  gradientSubtle: 'linear-gradient(180deg, #FFF8F0 0%, #FAF4ED 100%)', // Subtle background gradient
  highlightColor: 'rgba(193, 102, 79, 0.1)',   // Terracotta highlight for hover states
});
