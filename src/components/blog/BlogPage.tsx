'use client';

import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { BlogPost } from '../../types/blog';
import { BlogPostList } from './BlogPostList';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { spacing } from '../../theme/spacing.stylex';

interface BlogPageProps {
  initialPosts: BlogPost[];
}

const styles = stylex.create({
  container: {
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: spacing.lg,
    paddingBottom: 0,
  },
});

export function BlogPage({ initialPosts }: BlogPageProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>
        <LanguageSwitcher />
      </div>
      <BlogPostList
        posts={posts}
        loading={false}
      />
    </div>
  );
}
