import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team - The People Behind Gaard Media",
  description:
    "Meet the passionate team behind Gaard Media. Founded by Noah Hedegaard, Director of Photography, our Katy TX-based crew brings cinematic quality, creativity, and passion to every video production project.",
  keywords: [
    "Gaard Media team",
    "Noah Hedegaard",
    "Nathan Kester",
    "video production team Katy TX",
    "Director of Photography",
    "creative video team",
    "about Gaard Media",
    "Houston videography team",
  ],
  alternates: {
    canonical: "https://gaardmedia.com/team",
  },
  openGraph: {
    title: "Meet the Team | Gaard Media",
    description:
      "Get to know the passionate creatives behind Gaard Media , a dynamic video production company in Katy, TX dedicated to telling compelling stories through video.",
    url: "https://gaardmedia.com/team",
    type: "profile",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Gaard Media Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Team | Gaard Media",
    description:
      "Get to know the passionate creatives behind Gaard Media , a dynamic video production company in Katy, TX.",
  },
};

export default function TeamLayout({
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
            "@type": "AboutPage",
            name: "Meet the Gaard Media Team",
            description:
              "The passionate team behind Gaard Media video production in Katy, TX.",
            url: "https://gaardmedia.com/team",
            isPartOf: {
              "@type": "WebSite",
              name: "Gaard Media",
              url: "https://gaardmedia.com",
            },
            mainEntity: {
              "@type": "Organization",
              name: "Gaard Media",
              member: [
                {
                  "@type": "Person",
                  name: "Noah Hedegaard",
                  jobTitle: "Founder & Director of Photography",
                  worksFor: {
                    "@type": "Organization",
                    name: "Gaard Media",
                  },
                },
                {
                  "@type": "Person",
                  name: "Nathan Kester",
                  jobTitle: "Intern",
                  worksFor: {
                    "@type": "Organization",
                    name: "Gaard Media",
                  },
                },
              ],
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
                  name: "Meet the Team",
                  item: "https://gaardmedia.com/team",
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
