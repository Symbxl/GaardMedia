"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import ChatWidget from "@/components/chat-widget";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

/* ════════════════════════════════════════════
   ICONS
   ════════════════════════════════════════════ */

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

type NavLink =
  | { href: string; label: string; dropdown?: undefined }
  | { label: string; dropdown: { href: string; label: string }[]; href?: undefined };

const navLinks: NavLink[] = [
  { href: "/#services", label: "Services" },
  { href: "/projects", label: "Projects" },
  {
    label: "Meet the Team",
    dropdown: [
      { href: "/team", label: "Meet the Team" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { href: "/#contact", label: "Contact" },
];

const platforms = [
  {
    key: "facebook",
    name: "Facebook",
    handle: "Laserweld Inc",
    icon: FacebookIcon,
    color: "#1877F2",
    tint: "bg-blue-50",
    textTint: "text-blue-600",
    followers: "11.94K",
    followersDelta: "+3,530%",
    impressions: "9.61M",
    impressionsDelta: "+270,648%",
    interactions: "95.69K",
    interactionsDelta: "+60,465%",
    posts: 202,
    postsDelta: "+573%",
  },
  {
    key: "instagram",
    name: "Instagram",
    handle: "@laserweldtx",
    icon: InstagramIcon,
    color: "#E1306C",
    tint: "bg-pink-50",
    textTint: "text-pink-600",
    followers: "2,070",
    followersDelta: "+3,185%",
    impressions: "1.37M",
    impressionsDelta: "+14,617%",
    interactions: "32.54K",
    interactionsDelta: "+8,287%",
    posts: 212,
    postsDelta: "+505%",
  },
  {
    key: "tiktok",
    name: "TikTok",
    handle: "Laserweld Texas",
    icon: TikTokIcon,
    color: "#111827",
    tint: "bg-gray-50",
    textTint: "text-gray-900",
    followers: "5,224",
    followersDelta: "+4,875%",
    impressions: "3.00M",
    impressionsDelta: "+45,957%",
    interactions: "113.22K",
    interactionsDelta: "+9,503%",
    posts: 161,
    postsDelta: "+847%",
  },
  {
    key: "youtube",
    name: "YouTube",
    handle: "LaserWeld Texas",
    icon: YoutubeIcon,
    color: "#DC2626",
    tint: "bg-red-50",
    textTint: "text-red-600",
    followers: "12.50K",
    followersDelta: "+21,086%",
    impressions: "5.31M",
    impressionsDelta: "+13,755%",
    interactions: "75.85K",
    interactionsDelta: "+12,114%",
    posts: 180,
    postsDelta: "+414%",
  },
];

const headlineStats = [
  { label: "Total Followers Gained", value: "31.74K", delta: "+5,608%", sub: "Across 4 platforms" },
  { label: "Total Impressions", value: "19.29M", delta: "+33,320%", sub: "Dec 2024 , Jan 2026" },
  { label: "Total Interactions", value: "317.31K", delta: "+13,425%", sub: "Likes, comments, shares" },
  { label: "Pieces of Content", value: "755", delta: "+545%", sub: "Published in 14 months" },
];

const topPosts = [
  {
    platform: "Facebook",
    icon: FacebookIcon,
    color: "#1877F2",
    date: "Nov 17, 2025",
    text: "This one thing has been a major key to helping us be competitive.",
    impressions: "1.62M",
    interactions: "25.93K",
  },
  {
    platform: "Facebook",
    icon: FacebookIcon,
    color: "#1877F2",
    date: "Dec 1, 2025",
    text: "This experiment cut our weld time in half!",
    impressions: "1.28M",
    interactions: "20.96K",
  },
  {
    platform: "Facebook",
    icon: FacebookIcon,
    color: "#1877F2",
    date: "Jan 19, 2026",
    text: "This has reduced our welding times in half!",
    impressions: "1.02M",
    interactions: "13.45K",
  },
  {
    platform: "YouTube",
    icon: YoutubeIcon,
    color: "#DC2626",
    date: "Jan 19, 2026",
    text: "This Weld Gun Uses Two Wires at Once",
    impressions: "723K",
    interactions: "7,929",
  },
  {
    platform: "Facebook",
    icon: FacebookIcon,
    color: "#1877F2",
    date: "Oct 30, 2025",
    text: "How we cut our weld times in half.",
    impressions: "589K",
    interactions: "12.19K",
  },
  {
    platform: "YouTube",
    icon: YoutubeIcon,
    color: "#DC2626",
    date: "Sep 18, 2025",
    text: "The Factory Where Employees Are Their Own Bosses",
    impressions: "570K",
    interactions: "18.47K",
  },
  {
    platform: "YouTube",
    icon: YoutubeIcon,
    color: "#DC2626",
    date: "Aug 8, 2025",
    text: "Texas Factory Taking on China #madeinusa",
    impressions: "518K",
    interactions: "4,302",
  },
  {
    platform: "TikTok",
    icon: TikTokIcon,
    color: "#111827",
    date: "May 28, 2025",
    text: "Production pay has been the key to paying our workers well...",
    impressions: "428K",
    interactions: "12.49K",
  },
];

const youtubeCountries = [
  { country: "United States", pct: "59.45%" },
  { country: "Canada", pct: "6.97%" },
  { country: "Australia", pct: "5.01%" },
  { country: "United Kingdom", pct: "4.01%" },
  { country: "Germany", pct: "2.99%" },
  { country: "Netherlands", pct: "2.05%" },
  { country: "South Africa", pct: "1.70%" },
  { country: "Sweden", pct: "1.50%" },
  { country: "New Zealand", pct: "1.22%" },
  { country: "Finland", pct: "1.01%" },
];

const youtubeTraffic = [
  { source: "Shorts", pct: "70.95%" },
  { source: "Browser features", pct: "18.49%" },
  { source: "Other YouTube features", pct: "4.40%" },
  { source: "Suggested videos", pct: "2.71%" },
  { source: "YouTube channels", pct: "1.39%" },
  { source: "YouTube search", pct: "1.28%" },
  { source: "Direct or unknown", pct: "0.40%" },
  { source: "External", pct: "0.23%" },
];

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

export default function CaseStudyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a href="/" className="relative z-10 inline-flex items-center justify-center">
              <Image src="/logo.avif" alt="Gaard Media" width={140} height={40} className="h-9 w-auto brightness-0" />
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
                href="/#contact"
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
                      <p className="py-3 text-lg font-medium text-gray-400 border-b border-gray-50">
                        {link.label}
                      </p>
                      {link.dropdown.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 pl-4 text-base font-medium text-gray-700 hover:text-red-600 transition-colors border-b border-gray-50"
                        >
                          {item.label}
                        </a>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="pt-36 pb-16 lg:pt-44 lg:pb-24 relative">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
                Client Case Study
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
              Laserweld Inc
            </h1>
            <p className="mt-4 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gray-500">
              From <span className="text-red-600">nothing</span> to <span className="text-gray-900">31.74K followers</span>
              <br className="hidden sm:block" />
              and <span className="text-red-600">19.29M impressions</span> in 14 months.
            </p>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              A Texas manufacturing company partnered with Gaard Media in December 2024.
              Here&apos;s what happened across Facebook, Instagram, TikTok, and YouTube.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/LW case study.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <DownloadIcon className="w-4 h-4" />
                Download Full Report
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 hover:border-gray-900 hover:scale-[1.02] transition-all"
              >
                Work With Us
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-gray-400">
              Reporting period: 01 Dec 2024 , 26 Jan 2026
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HEADLINE STATS
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28 relative">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
            {headlineStats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="group relative h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-red-600/5 hover:border-red-100 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                      {s.label}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                      <TrendingUpIcon className="w-3 h-3" />
                      {s.delta}
                    </span>
                  </div>
                  <p className="mt-6 font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
                    {s.value}
                  </p>
                  <p className="mt-3 text-sm text-gray-500">{s.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THE CHALLENGE / THE APPROACH
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28 relative">
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                The Challenge
              </p>
              <h2 className="mt-3 font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
                A Texas factory, mostly invisible online.
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">
                Laserweld Inc is a 70-acre manufacturing operation competing head-on with Chinese
                imports , the kind of American story people want to see but rarely do. In December
                2024, their combined social footprint was a rounding error. No Shorts strategy.
                No Reels. No consistent story.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                The Approach
              </p>
              <h2 className="mt-3 font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
                Short-form video, built around real stories.
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed">
                We built a content engine around the shop floor: process breakthroughs, production
                pay, the largest Trumpf laser in America, bringing jobs back from China. Four
                platforms, one cohesive narrative, consistent publishing cadence , 755 pieces of
                content in 14 months.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PLATFORM BREAKDOWN
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28 relative">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Platform Breakdown
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              Growth across every channel.
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Every platform grew from near-zero. YouTube led with 12.5K new subscribers and 5.31M
              views; Facebook drove the single highest-reach post , 1.62M impressions.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2" staggerDelay={0.08}>
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.key}>
                  <div className="group relative h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-red-600/5 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${p.tint}`}
                      >
                        <Icon className={`h-7 w-7 ${p.textTint}`} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-gray-900">
                          {p.name}
                        </h3>
                        <p className="text-sm text-gray-500">{p.handle}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                      <Metric label="Followers" value={p.followers} delta={p.followersDelta} />
                      <Metric label="Impressions" value={p.impressions} delta={p.impressionsDelta} />
                      <Metric label="Interactions" value={p.interactions} delta={p.interactionsDelta} />
                      <Metric label="Posts" value={String(p.posts)} delta={p.postsDelta} />
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TOP POSTS
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28 relative">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Top Performing Content
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              The posts that broke through.
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Process-driven storytelling won. The highest-reach post , 1.62M impressions , was
              a 30-second look at a competitive advantage on the factory floor.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
            {topPosts.map((post, i) => {
              const Icon = post.icon;
              return (
                <StaggerItem key={`${post.date}-${i}`}>
                  <div className="group relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-red-600/5 hover:border-red-100 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2 rounded-full px-3 py-1.5"
                        style={{ backgroundColor: `${post.color}14`, color: post.color }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-semibold">
                          {post.platform}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>

                    <p className="mt-5 text-[15px] font-medium text-gray-900 leading-snug min-h-[3em]">
                      &ldquo;{post.text}&rdquo;
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 pt-5 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Impressions
                        </p>
                        <p className="mt-1 font-display text-xl font-extrabold text-gray-900">
                          {post.impressions}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                          Interactions
                        </p>
                        <p className="mt-1 font-display text-xl font-extrabold text-gray-900">
                          {post.interactions}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          YOUTUBE DEEP DIVE
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28 relative">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              YouTube Deep Dive
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              12.5K subscribers. 5.31M views. 180 videos.
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              YouTube became the audience flywheel. Shorts drove 70.95% of discovery, and
              international reach grew organically , 40% of viewers now come from outside the US.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-gray-900">
                  Top 10 Viewer Countries
                </h3>
                <p className="mt-1 text-sm text-gray-500">LaserWeld Texas , YouTube</p>
                <div className="mt-6 space-y-3">
                  {youtubeCountries.map((c) => {
                    const pct = parseFloat(c.pct);
                    return (
                      <div key={c.country}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">{c.country}</span>
                          <span className="font-semibold text-gray-900">{c.pct}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min((pct / 60) * 100, 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-red-600"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-gray-900">
                  Traffic Sources
                </h3>
                <p className="mt-1 text-sm text-gray-500">How viewers found the channel</p>
                <div className="mt-6 space-y-3">
                  {youtubeTraffic.map((t) => {
                    const pct = parseFloat(t.pct);
                    return (
                      <div key={t.source}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">{t.source}</span>
                          <span className="font-semibold text-gray-900">{t.pct}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min((pct / 75) * 100, 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-gray-900"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AUDIENCE DEMOGRAPHICS
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28 relative">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Audience
            </p>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
              Reaching the right people.
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Decision-makers in manufacturing: predominantly male, 25&ndash;54, concentrated
              across the US with strong spillover into English-speaking and European markets.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <FadeIn>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  YouTube Gender
                </h3>
                <div className="mt-6 space-y-4">
                  <DemoBar label="Male" value={95.95} color="#DC2626" />
                  <DemoBar label="Female" value={3.24} color="#1877F2" />
                  <DemoBar label="Unknown" value={0.81} color="#9CA3AF" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Instagram Age Range
                </h3>
                <div className="mt-6 space-y-4">
                  <DemoBar label="25 , 34" value={37.5} color="#E1306C" />
                  <DemoBar label="35 , 44" value={31.5} color="#E1306C" />
                  <DemoBar label="45 , 54" value={13.0} color="#E1306C" />
                  <DemoBar label="18 , 24" value={8.0} color="#E1306C" />
                  <DemoBar label="55 , 64" value={6.5} color="#E1306C" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  TikTok Top Regions
                </h3>
                <div className="mt-6 space-y-4">
                  <DemoBar label="United States" value={65.26} color="#111827" />
                  <DemoBar label="United Kingdom" value={2.7} color="#111827" />
                  <DemoBar label="Canada" value={1.28} color="#111827" />
                  <DemoBar label="Ireland" value={1.09} color="#111827" />
                  <DemoBar label="Australia" value={0.69} color="#111827" />
                </div>
                <p className="mt-6 text-xs text-gray-400">
                  90% male audience , ideal for B2B manufacturing.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THE RESULT
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28 relative">
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              The Result
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              A manufacturing brand that <span className="text-red-600">actually competes</span> online.
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              Fourteen months. Four platforms. One partnership. Laserweld Inc went from invisible
              to a go-to voice in American manufacturing , with compounding growth that keeps
              accelerating.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-16 grid gap-4 sm:grid-cols-3 text-center">
              <BigStat label="Followers" value="31.74K" delta="+5,608%" />
              <BigStat label="Impressions" value="19.29M" delta="+33,320%" />
              <BigStat label="Interactions" value="317.31K" delta="+13,425%" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════ */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-20 sm:px-16 lg:px-24 text-center noise-bg">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-transparent to-rose-900/50" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  Want results like these?
                </h2>
                <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
                  We don&apos;t do vanity metrics. We build content engines that move the
                  business , one platform, one post, one story at a time.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="/#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Your Project
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="/LW case study.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download Full Report
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="/" className="inline-flex items-center justify-center">
                <Image src="/logo.avif" alt="Gaard Media" width={120} height={34} className="h-8 w-auto brightness-0" />
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

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">Services</h4>
              <ul className="mt-4 space-y-3">
                {["Video Production", "Social Media", "Branding", "Digital Strategy", "Content Creation"].map((s) => (
                  <li key={s}>
                    <a href="/#services" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">Company</h4>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "About", href: "/#about" },
                  { label: "Projects", href: "/projects" },
                  { label: "Case Study", href: "/case-study" },
                  { label: "Contact", href: "/#contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

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

      <ChatWidget />
    </div>
  );
}

/* ════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════ */

function Metric({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold text-gray-900">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] font-semibold text-green-600">{delta}</p>
    </div>
  );
}

function BigStat({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
        {label}
      </p>
      <p className="mt-4 font-display text-4xl lg:text-5xl font-extrabold text-gray-900">
        {value}
      </p>
      <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
        <TrendingUpIcon className="w-3 h-3" />
        {delta}
      </p>
    </div>
  );
}

function DemoBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(value, 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
