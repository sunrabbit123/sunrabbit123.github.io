import { memo } from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../theme/colors.stylex';
import { fontSizes, fontWeights } from '../../theme/typography.stylex';
import { spacing, borderRadius } from '../../theme/spacing.stylex';

const styles = stylex.create({
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: spacing.lg,
  },
  filters: {
    display: 'flex',
    gap: spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  filterButton: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.backgroundSecondary,
    color: colors.textSecondary,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.borderMedium,
    borderRadius: borderRadius.full,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: colors.secondaryLight,
      borderColor: colors.accent,
      color: colors.textPrimary,
    },
  },
  filterButtonActive: {
    backgroundColor: colors.primaryDark,
    color: colors.textInverse,
    borderColor: colors.primaryDark,
    ':hover': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      color: colors.textInverse,
    },
  },
});

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter = memo(function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.filters)}>
        <button
          {...stylex.props(
            styles.filterButton,
            selectedCategory === null && styles.filterButtonActive
          )}
          onClick={() => onSelectCategory(null)}
        >
          All Posts
        </button>
        {categories.map(category => (
          <button
            key={category}
            {...stylex.props(
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive
            )}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
});
