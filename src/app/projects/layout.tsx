import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects - Video Production Portfolio",
  description:
    "Explore Gaard Media's portfolio of 13+ video production projects including brand showreels, commercials, documentaries, and creative campaigns. See our cinematic work for brands, businesses, and creators.",
  keywords: [
    "video production portfolio",
    "commercial video examples",
    "brand video showreel",
    "documentary production",
    "creative video campaigns",
    "Gaard Media projects",
    "Katy TX video work",
    "Houston video portfolio",
  ],
  alternates: {
    canonical: "https://gaardmedia.com/projects",
  },
  openGraph: {
    title: "Our Projects | Gaard Media Video Portfolio",
    description:
      "Watch our latest video production projects , commercials, brand stories, documentaries, and creative campaigns crafted with cinematic quality.",
    url: "https://gaardmedia.com/projects",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gaard Media Video Production Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | Gaard Media Video Portfolio",
    description:
      "Watch our latest video production projects , commercials, brand stories, documentaries, and creative campaigns.",
  },
};

export default function ProjectsLayout({
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
            "@type": "CollectionPage",
            name: "Gaard Media Video Portfolio",
            description:
              "A collection of video production projects by Gaard Media including commercials, documentaries, brand stories, and creative campaigns.",
            url: "https://gaardmedia.com/projects",
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
                  name: "Projects",
                  item: "https://gaardmedia.com/projects",
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
