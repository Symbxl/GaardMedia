import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dc2626",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gaardmedia.com"),
  title: {
    default: "Gaard Media | Video Production & Creative Agency in Katy, TX",
    template: "%s | Gaard Media",
  },
  description:
    "Gaard Media is a premier video production and creative agency in Katy, TX. We specialize in cinematic video production, social media management, branding, and digital strategy for brands, businesses, non-profits, and creators.",
  keywords: [
    "video production Katy TX",
    "video production agency Texas",
    "creative agency Katy",
    "social media management",
    "branding agency",
    "digital strategy",
    "content creation",
    "corporate video production",
    "commercial video production",
    "promotional videos",
    "drone videography",
    "documentary production",
    "Gaard Media",
    "Noah Hedegaard",
    "Katy Texas videographer",
    "Houston video production",
  ],
  authors: [{ name: "Gaard Media", url: "https://gaardmedia.com" }],
  creator: "Gaard Media",
  publisher: "Gaard Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://gaardmedia.com",
  },
  openGraph: {
    title: "Gaard Media | Video Production & Creative Agency in Katy, TX",
    description:
      "We create cinematic videos with clear, intentional goals , designed to inspire action, grow your audience, and strengthen community. Based in Katy, TX.",
    url: "https://gaardmedia.com",
    siteName: "Gaard Media",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gaard Media - Creative Video Production Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaard Media | Video Production & Creative Agency",
    description:
      "Cinematic video production, social media management, and creative branding in Katy, TX.",
    site: "@gaardswanson",
    creator: "@gaardswanson",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoProductionCompany",
              name: "Gaard Media",
              url: "https://gaardmedia.com",
              logo: "https://gaardmedia.com/og-image.jpg",
              description:
                "Premier video production and creative agency in Katy, TX specializing in cinematic video production, social media management, branding, and digital strategy.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Katy",
                addressRegion: "TX",
                addressCountry: "US",
              },
              telephone: "+14072554074",
              email: "Noah@gaardmedia.com",
              founder: {
                "@type": "Person",
                name: "Noah Hedegaard",
                jobTitle: "Founder & Director of Photography",
              },
              sameAs: [
                "https://www.instagram.com/gaardmedia",
                "https://www.linkedin.com/company/gaard-media",
                "https://twitter.com/gaardswanson",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "25",
                bestRating: "5",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Katy",
                  containedInPlace: { "@type": "State", name: "Texas" },
                },
                {
                  "@type": "City",
                  name: "Houston",
                  containedInPlace: { "@type": "State", name: "Texas" },
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Video Production Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Video Production",
                      description:
                        "High-quality cinematic video production for commercials, documentaries, and brand stories.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Social Media Management",
                      description:
                        "Strategic social media content creation and management to grow your audience.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Branding",
                      description:
                        "Visual identity and brand strategy to strengthen your market presence.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Digital Strategy",
                      description:
                        "Data-driven digital strategy to drive real results across platforms.",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
