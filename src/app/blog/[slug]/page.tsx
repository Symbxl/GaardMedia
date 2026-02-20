import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import BlogPostClient from "./blog-post-client";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
