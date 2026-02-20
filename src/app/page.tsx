"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

/* ════════════════════════════════════════════
   ICONS
   ════════════════════════════════════════════ */

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function FilmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

function MegaphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function SpeakerMuteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" opacity={0.1}>
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

const services = [
  {
    icon: MegaphoneIcon,
    title: "Social Media Management",
    description: "We help brands grow by taking the guesswork out of social media. From content creation and posting to audience engagement and performance tracking, we manage every aspect of your online presence. Our team builds custom strategies tailored to your brand voice and goals.",
    features: ["Content Creation", "Posting", "Engagement", "Analytics"],
    image: "/social.webp",
  },
  {
    icon: FilmIcon,
    title: "Video Strategy",
    description: "We create a video roadmap aligned with your goals. Whether you're aiming to build awareness, educate your audience, or boost engagement, we craft a strategy that makes every second count.",
    features: ["Content Strategy", "Audience Growth", "Engagement", "Analytics"],
    image: "/video.avif",
  },
  {
    icon: PaletteIcon,
    title: "Podcasting",
    description: "We make launching and managing your podcast simple. From episode planning and recording support to editing, publishing, and promotion, we handle the details so you can focus on sharing your voice. Whether you're building a brand or growing a community, we'll help you create a show that sounds great and stands out.",
    features: ["Episode Planning", "Editing", "Publishing", "Promotion"],
    image: "/podcast.avif",
  },
  {
    icon: CameraIcon,
    title: "Drone Video/Photo",
    description: "In addition to being FAA Part 107 Certified, we have spent hundreds of hours perfecting flights to bring cinematic shots to your projects. Trusted by many major clients and by surrounding video production companies, we ensure every drone flight is risk-free, safe, and visually compelling.",
    features: ["FAA Certified", "Cinematic Shots", "Aerial Photo", "Aerial Video"],
    image: "/Drone.avif",
  },
  {
    icon: FilmIcon,
    title: "Commercial",
    description: "One of the most effective ways to communicate your vision or message starts with commercial videos. Video has the power to increase audience engagement and to strengthen brand presence. We have worked with many clients from storyboarding to post-production to create commercial videos such as online content, social media videos, and more.",
    features: ["Storyboarding", "Production", "Post-Production", "Online Content"],
    image: "/comercial.avif",
  },
  {
    icon: FilmIcon,
    title: "Post Production",
    description: "Post-Production is a crucial part of any video production. We give our clients full control over their projects to mold their vision to life. Our studio is equipped with the latest professional editing software, industry-standard sound monitors, and custom-built computer systems made for post-production.",
    features: ["Video Editing", "Color Grading", "Sound Design", "Final Delivery"],
    image: "/post.avif",
  },
];

const brandLogos = Array.from({ length: 10 }, (_, i) => `/${i + 1}.avif`);

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep dive into your brand, goals, audience, and competitive landscape to build a strategic foundation.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Custom plan with clear deliverables, timelines, creative direction, and measurable KPIs.",
  },
  {
    step: "03",
    title: "Production",
    description: "Premium content creation with meticulous attention to detail at every stage of the process.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "Strategic deployment, performance analysis, and continuous optimization for lasting results.",
  },
];

const testimonials = [
  {
    quote: "I can't say enough great things about Gaard Media! From the moment I walked in, I felt an incredible sense of comfort and professionalism. The team goes above and beyond to make both my clients and me feel at ease throughout the entire process. Their attention to detail and commitment to capturing the essence of each project is truly impressive. They really take the time to understand your vision and make it come to life in the most creative and authentic way possible. If you're looking for a media company that truly cares about making you feel comfortable and delivering top-notch quality, Gaard Media is the one! Highly recommend!",
    name: "Mildred Gandyt",
    role: "04-02-2025",
    rating: 5,
  },
  {
    quote: "Gaard Media is the real deal! Their team is professional, creative, and results-driven. From strategy to execution, they understand how to build a brand and create engaging content that actually converts. They're not just another marketing agency\u2014they genuinely care about delivering value and helping businesses grow. If you need high-quality content, social media management, or branding expertise, Gaard Media is the way to go! Highly recommend!",
    name: "Houston Luxury Rides",
    role: "02-18-2025",
    rating: 5,
  },
  {
    quote: "Gaard Media brings a spirit of excellence to every detail of their work\u2014from communication and proposals to the final delivery. They played a foundational role in building the social media presence for our social media presence, helping it grow from zero to over 1,000 followers through high-quality reels, shorts, YouTube uploads, and beautiful photography. Throughout, they served with integrity and dedication.",
    name: "Raul Bustillos",
    role: "2024-11-06",
    rating: 5,
  },
];

const marqueeWords = [
  "Video Production",
  "Social Media",
  "Branding",
  "Digital Strategy",
  "Content Creation",
  "Campaigns",
  "Storytelling",
  "Motion Graphics",
  "Photography",
  "Creative Direction",
];

type NavLink = { href: string; label: string; dropdown?: undefined } | { label: string; dropdown: { href: string; label: string }[]; href?: undefined };

const navLinks: NavLink[] = [
  { href: "#services", label: "Services" },
  { href: "/projects", label: "Projects" },
  {
    label: "Meet the Team",
    dropdown: [
      { href: "/team", label: "Meet the Team" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { href: "#contact", label: "Contact" },
];

/* ════════════════════════════════════════════
   TESTIMONIAL CARD
   ════════════════════════════════════════════ */

function TestimonialCard({ testimonial: t, index: i }: { testimonial: typeof testimonials[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, []);

  return (
    <FadeIn key={i}>
      <div className="relative h-full rounded-2xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Google badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            {[...Array(t.rating)].map((_, j) => (
              <StarIcon key={j} className="w-5 h-5 text-amber-400" />
            ))}
          </div>
          <GoogleIcon className="w-6 h-6" />
        </div>

        {/* Quote */}
        <div>
          <p
            ref={textRef}
            className={`text-gray-600 leading-relaxed text-[15px] transition-all duration-300 ${
              !expanded ? "line-clamp-6" : ""
            }`}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
          {isClamped && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              {expanded ? "Show less" : "...Read more"}
            </button>
          )}
        </div>

        {/* Author */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-sm font-bold text-red-600">
                {t.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [aboutWordIndex, setAboutWordIndex] = useState(0);
  const [videoMuted, setVideoMuted] = useState(true);
  const [impactMuted, setImpactMuted] = useState(false);
  const [impactPlaying, setImpactPlaying] = useState(false);
  const impactVideoRef = useRef<HTMLVideoElement>(null);
  const impactSectionRef = useRef<HTMLDivElement>(null);
  const aboutWords = ["Grow", "Connect", "Engage"];

  const portfolioVideos = [
    { src: "https://www.youtube.com/embed/UcIVwZA9AT8", title: "Highlight Reel", client: "Featured Work", type: "youtube" as const },
    { src: "https://www.youtube.com/embed/I00aY82Njuc", title: "Brand Showreel", client: "Gaard Media", type: "youtube" as const },
    { src: "https://www.youtube.com/embed/-B1ZyUDu8fM", title: "Client Campaign", client: "Featured Work", type: "youtube" as const },
    { src: "https://www.youtube.com/embed/BZmPLRlI4ls", title: "Commercial Spot", client: "Commercial", type: "youtube" as const },
    { src: "https://player.vimeo.com/video/749228649", title: "Creative Reel", client: "Vimeo Collection", type: "vimeo" as const },
    { src: "https://www.youtube.com/embed/fbup0aZCImc", title: "Video Production", client: "Featured Work", type: "youtube" as const },
    { src: "https://player.vimeo.com/video/790227572", title: "Documentary", client: "Vimeo Collection", type: "vimeo" as const },
    { src: "https://player.vimeo.com/video/711734105", title: "Brand Story", client: "Vimeo Collection", type: "vimeo" as const },
    { src: "https://player.vimeo.com/video/663808028", title: "Event Coverage", client: "Vimeo Collection", type: "vimeo" as const },
    { src: "https://player.vimeo.com/video/599210543", title: "Cinematic Work", client: "Vimeo Collection", type: "vimeo" as const },
    { src: "https://player.vimeo.com/video/753030853", title: "Aerial Footage", client: "Vimeo Collection", type: "vimeo" as const },
    { src: "https://player.vimeo.com/video/666566554", title: "Promo Video", client: "Vimeo Collection", type: "vimeo" as const },
    { src: "https://player.vimeo.com/video/690692375", title: "Social Content", client: "Vimeo Collection", type: "vimeo" as const },
  ];

  function getVideoSrc(video: typeof portfolioVideos[0], muted: boolean) {
    if (video.type === "youtube") {
      const id = video.src.split("/embed/")[1];
      return `${video.src}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&vq=hd1080&hd=1`;
    }
    // Vimeo: background=1 forces mute, so when unmuted we remove background mode and show controls
    if (muted) {
      return `${video.src}?autoplay=1&muted=1&loop=1&background=1&quality=1080p`;
    }
    return `${video.src}?autoplay=1&muted=0&loop=1&quality=1080p`;
  }
  const rotatingWords = ["Brands", "Non-Profits", "Businesses", "Creators"];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutWordIndex((prev) => (prev + 1) % aboutWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [aboutWords.length]);

  // Play/pause impact video based on scroll visibility
  useEffect(() => {
    const section = impactSectionRef.current;
    const video = impactVideoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = impactMuted;
          video.play().catch(() => {
            // Browser blocked unmuted autoplay , fall back to muted
            video.muted = true;
            setImpactMuted(true);
            video.play().catch(() => {});
          });
          setImpactPlaying(true);
        } else {
          video.pause();
          video.currentTime = 0;
          setImpactPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [impactMuted]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* ─── Flowing background blobs ─── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-200px] right-[-200px] w-[900px] h-[900px] rounded-full bg-red-100 opacity-30" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[400px] left-[-300px] w-[800px] h-[800px] rounded-full bg-rose-100 opacity-25" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[1100px] right-[-100px] w-[700px] h-[700px] rounded-full bg-red-200 opacity-20" style={{ filter: "blur(100px)" }} />
        <div className="absolute top-[1700px] left-[-200px] w-[800px] h-[800px] rounded-full bg-rose-100 opacity-25" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[2300px] right-[-200px] w-[750px] h-[750px] rounded-full bg-red-100 opacity-20" style={{ filter: "blur(100px)" }} />
        <div className="absolute top-[2900px] left-[0%] w-[700px] h-[700px] rounded-full bg-red-50 opacity-30" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[3500px] right-[-150px] w-[800px] h-[800px] rounded-full bg-rose-100 opacity-25" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[4100px] left-[-200px] w-[700px] h-[700px] rounded-full bg-red-100 opacity-20" style={{ filter: "blur(100px)" }} />
        <div className="absolute top-[4700px] right-[0%] w-[750px] h-[750px] rounded-full bg-red-50 opacity-25" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[5300px] left-[-100px] w-[700px] h-[700px] rounded-full bg-rose-100 opacity-20" style={{ filter: "blur(100px)" }} />
        <div className="absolute top-[5900px] right-[-200px] w-[800px] h-[800px] rounded-full bg-red-100 opacity-25" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[6500px] left-[10%] w-[600px] h-[600px] rounded-full bg-rose-50 opacity-20" style={{ filter: "blur(100px)" }} />
      </div>

      {/* ─── Progress Bar ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-red-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ═══════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between">
            <a href="#" className="relative z-10 inline-flex items-center justify-center rounded-lg bg-black px-3 py-1.5">
              <Image src="/logo.avif" alt="Gaard Media" width={140} height={40} className="h-9 w-auto" />
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setNavDropdownOpen(true)}
                    onMouseLeave={() => setNavDropdownOpen(false)}
                  >
                    <button className="relative flex items-center gap-1 text-[13px] font-medium uppercase tracking-wider transition-colors duration-300 text-gray-500 hover:text-gray-900">
                      {link.label}
                      <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${navDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {navDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-xl bg-white border border-gray-200 shadow-xl shadow-gray-900/10 overflow-hidden py-2"
                        >
                          {link.dropdown.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              {item.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative text-[13px] font-medium uppercase tracking-wider transition-colors duration-300 text-gray-500 hover:text-gray-900 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="#contact"
                className="ml-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 transition-colors text-gray-700"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="px-6 pb-8 pt-6 space-y-1">
                {navLinks.map((link, i) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="py-3 text-lg font-medium text-gray-400 border-b border-gray-50"
                      >
                        {link.label}
                      </motion.p>
                      {link.dropdown.map((item, j) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (i + j + 1) * 0.05 }}
                          className="block py-3 pl-4 text-base font-medium text-gray-700 hover:text-red-600 transition-colors border-b border-gray-50"
                        >
                          {item.label}
                        </motion.a>
                      ))}
                    </div>
                  ) : (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="block py-3 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors border-b border-gray-50"
                    >
                      {link.label}
                    </motion.a>
                  )
                )}
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white"
                >
                  Get Started
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
        </div>

        {/* Decorative red blobs */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute -top-[200px] -right-[150px] w-[800px] h-[800px] rounded-full bg-red-200 opacity-25" style={{ filter: "blur(120px)" }} />
          <div className="absolute top-[50%] -left-[200px] w-[700px] h-[700px] rounded-full bg-rose-200 opacity-20" style={{ filter: "blur(100px)" }} />
          <div className="absolute -bottom-[150px] right-[10%] w-[600px] h-[600px] rounded-full bg-red-100 opacity-25" style={{ filter: "blur(100px)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left , Text Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-medium text-red-700"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                Creative Video Production Agency
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="font-display text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl lg:leading-[1.05]"
              >
                Videos for{" "}
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="text-red-600 inline-block"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4 flex items-center gap-4 flex-wrap"
              >
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                  Gaard Media <span className="text-gray-300 mx-2">|</span> Katy, Texas
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-sm font-semibold text-gray-900">5.0</span>
                  <span className="text-sm text-gray-500 ml-1">from 25+ reviews</span>
                </div>
              </motion.div>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6 text-lg leading-relaxed text-gray-500 max-w-lg"
              >
                We create videos with clear, intentional goals , designed to inspire action,
                grow your audience, and strengthen community.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-10 flex flex-col sm:flex-row items-start gap-4"
              >
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Your Project
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#showreel"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:border-gray-300 hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                  Watch Showreel
                </a>
              </motion.div>

            </div>

            {/* Right , Video Player */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/15 border border-gray-200/60">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto aspect-[4/3] object-cover"
                >
                  <source src="/hero.mp4" type="video/mp4" />
                </video>
                {/* Subtle overlay gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-5 text-[11px] font-medium uppercase tracking-widest text-white/70">
                  Gaard Media , Showreel
                </div>
              </div>

              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <PlayIcon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">150+ Projects</p>
                    <p className="text-xs text-gray-500">Delivered successfully</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════
          SHOWREEL / VIDEO SECTION
          ═══════════════════════════════════════ */}
      <section id="showreel" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Content with Impact
            </h2>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              We create videos with clear, intentional goals,designed to inspire action, grow your audience, and strengthen community. Every frame is crafted to tell your story, connect with your audience, and drive results across digital platforms.
            </p>
          </FadeIn>
          <FadeIn>
            <div ref={impactSectionRef} className="relative overflow-hidden rounded-3xl bg-gray-900 aspect-video flex items-center justify-center group cursor-pointer">
              <video
                ref={impactVideoRef}
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/impact.mp4" type="video/mp4" />
              </video>

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />

              {/* Sound toggle button */}
              <button
                onClick={() => {
                  setImpactMuted((prev) => {
                    const next = !prev;
                    if (impactVideoRef.current) {
                      impactVideoRef.current.muted = next;
                    }
                    return next;
                  });
                }}
                className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 hover:scale-110 transition-all duration-200"
                title={impactMuted ? "Unmute" : "Mute"}
              >
                {impactMuted ? (
                  <SpeakerMuteIcon className="w-5 h-5" />
                ) : (
                  <SpeakerIcon className="w-5 h-5" />
                )}
              </button>

              {/* Corner labels */}
              <div className="absolute top-6 left-7 text-[11px] font-medium uppercase tracking-widest text-white/50 z-10">
                Gaard Media
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BRANDS MARQUEE
          ═══════════════════════════════════════ */}
      <section className="py-6 lg:py-8 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {[...brandLogos, ...brandLogos].map((src, i) => (
              <div key={`row1-${i}`} className="flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 px-6 py-3 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300">
                <Image
                  src={src}
                  alt={`Brand partner ${(i % 10) + 1}`}
                  width={100}
                  height={40}
                  className="h-6 lg:h-8 w-auto object-contain brightness-0 hover:brightness-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES
          ═══════════════════════════════════════ */}
      <section id="services" className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              What We Do
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Services Built to <br className="hidden sm:block" />Elevate Your Brand
            </h2>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              A full suite of creative services tailored for businesses, creators, and agencies.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="group relative h-full rounded-xl bg-white border border-gray-100 hover:border-red-200/60 shadow-sm hover:shadow-lg hover:shadow-red-600/5 transition-all duration-500 cursor-default overflow-hidden">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-50/0 to-rose-50/0 group-hover:from-red-50/50 group-hover:to-rose-50/30 transition-all duration-500" />

                  {/* Optional image */}
                  {"image" in service && service.image && (
                    <div className="relative w-full overflow-hidden p-2 pb-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={300}
                        height={200}
                        className="w-3/4 h-auto mx-auto rounded-md group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="relative z-10 p-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 text-gray-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-600/25">
                      <service.icon className="w-3.5 h-3.5" />
                    </div>

                    <h3 className="mt-2 font-display text-base font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {service.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-500 group-hover:bg-red-50 group-hover:text-red-700 transition-colors duration-300"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          ABOUT
          ═══════════════════════════════════════ */}
      <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* About text */}
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600 h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={aboutWords[aboutWordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    {aboutWords[aboutWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight">
                A Creative Agency That Puts Your Story First
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                Gaard Media is a creative content and media agency based in Katy, Texas.
                We help businesses, creators, nonprofits, and agencies connect with their
                audiences through impactful, purpose-driven content.
              </p>

              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                  Recent projects
                  <ArrowDownIcon className="w-4 h-4 animate-bounce" />
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Video carousel below */}
          <FadeIn className="mt-14">
              <div className="relative">
                {/* Video showcase card */}
                <div className="relative rounded-3xl overflow-hidden bg-gray-900 shadow-2xl">
                  {/* Video Embed */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${portfolioIndex}-${videoMuted}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="aspect-[4/3]"
                    >
                      <iframe
                        src={getVideoSrc(portfolioVideos[portfolioIndex], videoMuted)}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Overlay gradient at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                  {/* Sound toggle button */}
                  <button
                    onClick={() => setVideoMuted((prev) => !prev)}
                    className="absolute top-5 left-5 z-10 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 hover:scale-110 transition-all duration-200"
                    title={videoMuted ? "Unmute" : "Mute"}
                  >
                    {videoMuted ? (
                      <SpeakerMuteIcon className="w-5 h-5" />
                    ) : (
                      <SpeakerIcon className="w-5 h-5" />
                    )}
                  </button>

                  {/* Video info + navigation */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                          {portfolioVideos[portfolioIndex].client}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold text-white">
                          {portfolioVideos[portfolioIndex].title}
                        </h3>
                      </div>

                      {/* Nav arrows */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPortfolioIndex((prev) => (prev - 1 + portfolioVideos.length) % portfolioVideos.length)}
                          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 hover:scale-110 transition-all"
                        >
                          <ArrowRightIcon className="w-4 h-4 rotate-180" />
                        </button>
                        <button
                          onClick={() => setPortfolioIndex((prev) => (prev + 1) % portfolioVideos.length)}
                          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 hover:scale-110 transition-all"
                        >
                          <ArrowRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Progress dots */}
                    <div className="mt-4 flex gap-2">
                      {portfolioVideos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPortfolioIndex(i)}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === portfolioIndex
                              ? "w-8 bg-red-500"
                              : "w-4 bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Video count badge */}
                  <div className="absolute top-5 right-5 z-10 rounded-full bg-white shadow-lg px-5 py-2.5 text-base font-bold text-red-600">
                    {portfolioIndex + 1} / {portfolioVideos.length}
                  </div>
                </div>
              </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GOOGLE TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section id="testimonials" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-white border border-gray-200 px-5 py-2.5 shadow-sm mb-8">
                <GoogleIcon className="w-5 h-5" />
                <span className="text-sm font-semibold text-gray-700">Google Reviews</span>
                <div className="flex items-center gap-0.5 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-3.5 h-3.5 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">5.0</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Don&apos;t just take our word for it , hear from the businesses we&apos;ve helped grow through video.
              </p>
            </div>
          </FadeIn>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>

          {/* View on Google link */}
          <div className="mt-12 text-center">
            <a
              href="https://www.google.com/search?q=Gaard+Media+LLC+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <GoogleIcon className="w-4 h-4" />
              View all reviews on Google
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScaleIn>
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-20 sm:px-16 lg:px-24 text-center noise-bg">
              {/* Background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-transparent to-rose-900/50" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"
              />
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5"
              />

              <div className="relative z-10">
                <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  Ready to Bring Your
                  <br />Vision to Life?
                </h2>
                <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
                  Let&apos;s create something incredible together. Whether you need a single video
                  or a full content strategy , we&apos;re here to help.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get a Free Consultation
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="tel:4072554074"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    (407) 255-4074
                  </a>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT
          ═══════════════════════════════════════ */}
      <section id="contact" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Left , Info */}
            <FadeInLeft className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                Get in Touch
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Let&apos;s Start Your Next Project
              </h2>
              <p className="mt-5 text-base text-gray-500 leading-relaxed">
                Have a project in mind? Reach out and let&apos;s discuss how we can help
                you connect with your audience through powerful media.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  { icon: MailIcon, label: "Email", value: "Noah@gaardmedia.com", href: "mailto:Noah@gaardmedia.com" },
                  { icon: PhoneIcon, label: "Phone", value: "(407) 255-4074", href: "tel:4072554074" },
                  { icon: MapPinIcon, label: "Location", value: "Katy, Texas", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-0.5 text-base font-medium text-gray-900 hover:text-red-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-base font-medium text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: InstagramIcon, href: "https://www.instagram.com/gaardmedia", label: "Instagram" },
                    { icon: LinkedInIcon, href: "https://www.linkedin.com/company/gaard-media", label: "LinkedIn" },
                    { icon: TwitterXIcon, href: "https://twitter.com/gaardswanson", label: "X" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-600 hover:text-white transition-all duration-200"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </FadeInLeft>

            {/* Right , Form */}
            <FadeInRight className="lg:col-span-3">
              <div className="rounded-3xl bg-white p-8 lg:p-10 shadow-xl shadow-gray-900/5 border border-gray-100">
                <h3 className="font-display text-lg font-bold text-gray-900">Send us a message</h3>
                <p className="mt-1 text-sm text-gray-500">We&apos;ll get back to you within 24 hours.</p>

                <form
                  className="mt-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const name = fd.get("name");
                    const email = fd.get("email");
                    const message = fd.get("message");
                    window.location.href = `mailto:Noah@gaardmedia.com?subject=Project Inquiry from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`;
                  }}
                >
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="John Doe"
                          className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="video-production">Video Production</option>
                        <option value="social-media">Social Media Management</option>
                        <option value="branding">Branding & Identity</option>
                        <option value="digital-strategy">Digital Strategy</option>
                        <option value="content-creation">Content Creation</option>
                        <option value="campaign">Campaign Management</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell us about your project, goals, timeline, and budget..."
                        className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-sm font-semibold text-white hover:bg-red-700 shadow-lg shadow-red-600/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Send Message
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#" className="inline-flex items-center justify-center rounded-lg bg-black px-3 py-1.5">
                <Image src="/logo.avif" alt="Gaard Media" width={120} height={34} className="h-8 w-auto" />
              </a>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
                Creative video production and media agency helping brands tell their stories and drive real results.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { icon: InstagramIcon, href: "https://www.instagram.com/gaardmedia" },
                  { icon: LinkedInIcon, href: "https://www.linkedin.com/company/gaard-media" },
                  { icon: TwitterXIcon, href: "https://twitter.com/gaardswanson" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-all duration-200"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">Services</h4>
              <ul className="mt-4 space-y-3">
                {["Video Production", "Social Media", "Branding", "Digital Strategy", "Content Creation"].map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">Company</h4>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "About", href: "#about" },
                  { label: "Process", href: "#process" },
                  { label: "Testimonials", href: "#testimonials" },
                  { label: "Contact", href: "#contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">Contact</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="mailto:Noah@gaardmedia.com" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    Noah@gaardmedia.com
                  </a>
                </li>
                <li>
                  <a href="tel:4072554074" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    (407) 255-4074
                  </a>
                </li>
                <li className="text-sm text-gray-500">Katy, Texas</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Gaard Media. All rights reserved.
            </p>
            <p className="text-xs text-gray-300 tracking-wide">
              Built with purpose. Designed with intention.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
