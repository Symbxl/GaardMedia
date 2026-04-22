import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LaserWeld Case Study , 31.74K Followers in 14 Months",
  description:
    "See how Gaard Media grew Laserweld Inc to 31.74K followers, 19.29M impressions, and 317K interactions across Facebook, Instagram, TikTok, and YouTube between December 2024 and January 2026.",
  keywords: [
    "laserweld case study",
    "social media case study",
    "video marketing results",
    "manufacturing content marketing",
    "Gaard Media case study",
    "YouTube growth",
    "Facebook Reels growth",
    "TikTok growth",
  ],
  alternates: {
    canonical: "https://gaardmedia.com/case-study",
  },
  openGraph: {
    title: "LaserWeld Case Study | Gaard Media",
    description:
      "From 0 to 31.74K followers and 19.29M impressions in 14 months. A complete social growth case study.",
    url: "https://gaardmedia.com/case-study",
    type: "article",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LaserWeld Social Media Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LaserWeld Case Study | Gaard Media",
    description:
      "How we grew a Texas manufacturer to 31.74K followers and 19.29M impressions in 14 months.",
  },
};

export default function CaseStudyLayout({
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
            "@type": "Article",
            headline:
              "LaserWeld Case Study: 31.74K Followers and 19.29M Impressions in 14 Months",
            description:
              "A social media growth case study showing how Gaard Media scaled Laserweld Inc across Facebook, Instagram, TikTok, and YouTube.",
            url: "https://gaardmedia.com/case-study",
            author: {
              "@type": "Organization",
              name: "Gaard Media",
            },
            publisher: {
              "@type": "Organization",
              name: "Gaard Media",
              logo: {
                "@type": "ImageObject",
                url: "https://gaardmedia.com/og-image.jpg",
              },
            },
            about: {
              "@type": "Organization",
              name: "Laserweld Inc",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
