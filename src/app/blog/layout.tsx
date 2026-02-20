import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Video Production Insights & Resources",
  description:
    "Expert insights on video production, social media strategy, branding, and digital marketing from Gaard Media, a creative video agency in Katy, TX.",
  keywords: [
    "video production blog",
    "video marketing tips",
    "social media strategy",
    "branding insights",
    "content creation tips",
    "Gaard Media blog",
    "Katy TX video production",
    "Houston video marketing",
  ],
  alternates: {
    canonical: "https://gaardmedia.com/blog",
  },
  openGraph: {
    title: "Blog | Gaard Media",
    description:
      "Expert insights on video production, social media, branding, and digital marketing from Gaard Media in Katy, TX.",
    url: "https://gaardmedia.com/blog",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gaard Media Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Gaard Media",
    description:
      "Expert insights on video production, social media, branding, and digital marketing.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Gaard Media Blog",
            description:
              "Expert insights on video production, social media strategy, branding, and digital marketing.",
            url: "https://gaardmedia.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Gaard Media",
              url: "https://gaardmedia.com",
              logo: "https://gaardmedia.com/og-image.jpg",
            },
            isPartOf: {
              "@type": "WebSite",
              name: "Gaard Media",
              url: "https://gaardmedia.com",
            },
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
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
