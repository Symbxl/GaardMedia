import type { Metadata } from "next";
import { getPostBySlug } from "@/data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `https://gaardmedia.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://gaardmedia.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostLayout({ params, children }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              url: `https://gaardmedia.com/blog/${post.slug}`,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt || post.publishedAt,
              author: {
                "@type": "Person",
                name: post.author.name,
                jobTitle: post.author.role,
                url: "https://gaardmedia.com/team",
              },
              publisher: {
                "@type": "Organization",
                name: "Gaard Media",
                url: "https://gaardmedia.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://gaardmedia.com/og-image.jpg",
                },
              },
              image: `https://gaardmedia.com${post.image}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://gaardmedia.com/blog/${post.slug}`,
              },
              articleSection: post.category,
              keywords: post.tags.join(", "),
              wordCount: post.content
                .map((s) => (s.text || "").split(" ").length + (s.items || []).join(" ").split(" ").length)
                .reduce((a, b) => a + b, 0),
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://gaardmedia.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: "https://gaardmedia.com/blog",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.title,
                    item: `https://gaardmedia.com/blog/${post.slug}`,
                  },
                ],
              },
            }),
          }}
        />
      )}
      {children}
    </>
  );
}
