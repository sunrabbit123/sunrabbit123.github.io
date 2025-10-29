import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from "remark-frontmatter";
import * as stylex from '@stylexjs/stylex';
import { blogService } from '../../../services/blogService';
import { getMDXComponents } from '../../../lib/getMDXComponents';
import { colors } from '../../../theme/colors.stylex';
import { fonts, fontSizes, fontWeights, lineHeights } from '../../../theme/typography.stylex';
import { spacing, borderRadius } from '../../../theme/spacing.stylex';
import { rehypePrettyCodeOptions } from '../../../config/rehypePrettyCode';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const styles = stylex.create({
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.sm,
    color: colors.primaryDark,
    textDecoration: 'none',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    marginBottom: spacing.xl,
    transition: 'color 0.2s ease',
    ':hover': {
      color: colors.accent,
    },
  },
  backArrow: {
    fontSize: fontSizes.lg,
  },
  article: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    boxShadow: `0 2px 8px ${colors.shadowColor}`,
  },
  header: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'cover',
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: {
      default: fontSizes['3xl'],
      '@media (min-width: 768px)': fontSizes['4xl'],
    },
    fontWeight: fontWeights.bold,
    color: colors.primaryDark,
    margin: `0 0 ${spacing.lg} 0`,
    lineHeight: lineHeights.tight,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
    flexWrap: 'wrap',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderLight,
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: borderRadius.full,
    objectFit: 'cover',
  },
  authorDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  authorName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  date: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
  },
  readTime: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
    fontWeight: fontWeights.medium,
  },
  body: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
  },
  mdxContent: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.textPrimary,
    fontFamily: fonts.body,
  },
  footer: {
    padding: {
      default: spacing.lg,
      '@media (min-width: 768px)': spacing.xl,
    },
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.borderLight,
  },
});

/**
 * Generate static params for all blog posts at build time
 * This enables static site generation for all post pages
 */
export async function generateStaticParams() {
  const posts = await blogService.getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for SEO
 * Includes Open Graph tags for social media sharing
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogService.getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.featuredImage,
          alt: `Featured image for ${post.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

/**
 * Individual blog post page component
 * Server component that fetches and renders post data
 */
export default async function BlogPostPage({ params }: PageProps) {
  // Await params as required by Next.js 15
  const { slug } = await params;

  // Fetch post data
  const post = await blogService.getPostBySlug(slug);

  // Handle 404 case
  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div {...stylex.props(styles.container)}>
      <Link href="/" {...stylex.props(styles.backLink)}>
        <span {...stylex.props(styles.backArrow)}>←</span>
        Back to Blog
      </Link>

      <article {...stylex.props(styles.article)}>
        <div {...stylex.props(styles.header)}>
          <img
            src={post.featuredImage}
            alt={`Featured image for ${post.title}`}
            {...stylex.props(styles.image)}
          />

          <h1 {...stylex.props(styles.title)}>{post.title}</h1>

          <div {...stylex.props(styles.meta)}>
            <div {...stylex.props(styles.authorInfo)}>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                {...stylex.props(styles.avatar)}
              />
              <div {...stylex.props(styles.authorDetails)}>
                <span {...stylex.props(styles.authorName)}>{post.author.name}</span>
                <span {...stylex.props(styles.date)}>{formattedDate}</span>
              </div>
            </div>
            <span {...stylex.props(styles.readTime)}>{post.readTime} min read</span>
          </div>
        </div>

        <div {...stylex.props(styles.body)}>
          <div {...stylex.props(styles.mdxContent)}>
            <MDXRemote
              source={post.content}
              components={getMDXComponents()}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkFrontmatter],
                  rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
                },
              }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
