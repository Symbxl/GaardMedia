import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gaard Media - Video Production & Creative Agency",
    short_name: "Gaard Media",
    description:
      "Premier video production and creative agency in Katy, TX. Cinematic video production, social media management, branding, and digital strategy.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
