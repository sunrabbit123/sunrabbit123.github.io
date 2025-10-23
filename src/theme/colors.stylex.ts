import * as stylex from '@stylexjs/stylex';

/**
 * Warm brown color palette for the blog
 * Designed for a cozy, inviting reading experience
 */
export const colors = stylex.defineVars({
  // Primary colors - Rich browns
  primaryDark: '#6B3E2E',      // Saddle brown - for headers, emphasis
  primary: '#8B4513',          // Cognac brown - main brand color
  primaryLight: '#A0522D',     // Sienna - lighter interactions

  // Secondary colors - Warm tans and beiges
  secondaryDark: '#C8A882',    // Tan
  secondary: '#D2B48C',        // Light tan - for cards, containers
  secondaryLight: '#DEB887',   // Burlywood - for hover states

  // Accent colors - Warm oranges
  accentDark: '#CC5500',       // Burnt orange - for active states
  accent: '#E67E22',           // Carrot orange - for links, highlights
  accentLight: '#F39C12',      // Orange - for subtle accents

  // Background colors
  backgroundPrimary: '#FAF8F5', // Warm white - main background
  backgroundSecondary: '#F5F5DC', // Cream - section backgrounds
  backgroundTertiary: '#FFF8E7', // Light cream - card backgrounds

  // Text colors
  textPrimary: '#3E2723',      // Dark brown - main text
  textSecondary: '#5D4037',    // Medium brown - secondary text
  textTertiary: '#8D6E63',     // Light brown - muted text
  textInverse: '#FFFFFF',      // White text for dark backgrounds

  // Border colors
  borderLight: '#E0D5C7',      // Light border
  borderMedium: '#C8B5A0',     // Medium border
  borderDark: '#A89885',       // Dark border

  // State colors
  success: '#2E7D32',          // Green for success states
  warning: '#F57C00',          // Orange for warnings
  error: '#C62828',            // Red for errors
  info: '#0277BD',             // Blue for info

  // Shadows and overlays
  shadowColor: 'rgba(107, 62, 46, 0.1)',
  overlayColor: 'rgba(62, 39, 35, 0.5)',
});
