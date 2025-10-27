import { BlogPage } from "../components/blog/BlogPage";
import { blogService } from "../services/blogService";
import { serialize } from "next-mdx-remote/serialize";

export default async function Home() {
  // Fetch data on the server
  const posts = await blogService.getAllPosts();
  const categories = await blogService.getCategories();

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
      initialCategories={categories.map(cat => cat.name)}
    />
  );
}
