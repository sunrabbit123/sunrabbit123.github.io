import { BlogPage } from "../../components/blog/BlogPage";
import { blogService } from "../../services/blogService";
import { serialize } from "next-mdx-remote/serialize";
import { setRequestLocale } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch data on the server for the current locale
  const posts = await blogService.getAllPosts(locale);

  // Serialize MDX content on the server for each post
  const postsWithSerializedContent = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      serializedContent: await serialize(post.content),
    }))
  );

  return (
    <BlogPage
      initialPosts={postsWithSerializedContent}
    />
  );
}
