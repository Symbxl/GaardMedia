"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import ChatWidget from "@/components/chat-widget";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

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

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
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

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

type NavLink = { href: string; label: string; dropdown?: undefined } | { label: string; dropdown: { href: string; label: string }[]; href?: undefined };

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

const projects = [
  { src: "https://www.youtube.com/embed/UcIVwZA9AT8", title: "Highlight Reel", client: "Featured Work", type: "youtube" as const, category: "Reel" },
  { src: "https://www.youtube.com/embed/I00aY82Njuc", title: "Brand Showreel", client: "Gaard Media", type: "youtube" as const, category: "Reel" },
  { src: "https://www.youtube.com/embed/-B1ZyUDu8fM", title: "Client Campaign", client: "Featured Work", type: "youtube" as const, category: "Campaign" },
  { src: "https://www.youtube.com/embed/BZmPLRlI4ls", title: "Commercial Spot", client: "Commercial", type: "youtube" as const, category: "Commercial" },
  { src: "https://player.vimeo.com/video/749228649", title: "Creative Reel", client: "Vimeo Collection", type: "vimeo" as const, category: "Reel" },
  { src: "https://www.youtube.com/embed/fbup0aZCImc", title: "Video Production", client: "Featured Work", type: "youtube" as const, category: "Production" },
  { src: "https://player.vimeo.com/video/790227572", title: "Documentary", client: "Vimeo Collection", type: "vimeo" as const, category: "Documentary" },
  { src: "https://player.vimeo.com/video/711734105", title: "Brand Story", client: "Vimeo Collection", type: "vimeo" as const, category: "Brand" },
  { src: "https://player.vimeo.com/video/663808028", title: "Event Coverage", client: "Vimeo Collection", type: "vimeo" as const, category: "Event" },
  { src: "https://player.vimeo.com/video/599210543", title: "Cinematic Work", client: "Vimeo Collection", type: "vimeo" as const, category: "Cinematic" },
  { src: "https://player.vimeo.com/video/753030853", title: "Aerial Footage", client: "Vimeo Collection", type: "vimeo" as const, category: "Drone" },
  { src: "https://player.vimeo.com/video/666566554", title: "Promo Video", client: "Vimeo Collection", type: "vimeo" as const, category: "Promo" },
  { src: "https://player.vimeo.com/video/690692375", title: "Social Content", client: "Vimeo Collection", type: "vimeo" as const, category: "Social" },
];


function getThumbnail(video: typeof projects[0]) {
  if (video.type === "youtube") {
    const id = video.src.split("/embed/")[1];
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
  // Vimeo , use vumbnail.com service for thumbnail
  const id = video.src.split("/video/")[1];
  return `https://vumbnail.com/${id}.jpg`;
}

function getVideoSrc(video: typeof projects[0], muted: boolean) {
  if (video.type === "youtube") {
    const id = video.src.split("/embed/")[1];
    return `${video.src}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&vq=hd1080&hd=1`;
  }
  if (muted) {
    return `${video.src}?autoplay=1&muted=1&loop=1&background=1&quality=1080p`;
  }
  return `${video.src}?autoplay=1&muted=0&loop=1&quality=1080p`;
}

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [videoMuted, setVideoMuted] = useState(true);
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
        <div className="absolute top-[4100px] left-[-200px] w-[700px] h-[700px] rounded-full bg-red-100 opacity-20" style={{ filter: "blur(100px)" }} />
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
                    className={`relative text-[13px] font-medium uppercase tracking-wider transition-colors duration-300 hover:text-gray-900 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all hover:after:w-full ${
                      link.href === "/projects" ? "text-gray-900 after:w-full" : "text-gray-500"
                    }`}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════════════════════════
          HERO HEADER
          ═══════════════════════════════════════ */}
      <section className="pt-36 pb-12 relative">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Our Work
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Recent Projects
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              Explore our latest work across video production, commercials, brand stories, and more.
              Each project is crafted with purpose and precision.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS GRID
          ═══════════════════════════════════════ */}
      <section className="pb-24 lg:pb-32 relative">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
            {projects.map((project, i) => (
              <StaggerItem key={`${project.title}-${i}`}>
                <motion.div
                  layoutId={`project-${project.title}`}
                  className="group relative rounded-2xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-500 cursor-pointer"
                  onClick={() => {
                    setSelectedProject(i);
                    setVideoMuted(true);
                  }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getThumbnail(project)}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:shadow-red-600/20">
                        <PlayIcon className="w-7 h-7 text-red-600 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300">
                      {project.client}
                    </span>
                    <h3 className="mt-0.5 font-display text-base font-bold text-white">
                      {project.title}
                    </h3>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-md">
                    {project.category}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LIGHTBOX / MODAL
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-gray-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video">
                <iframe
                  src={getVideoSrc(projects[selectedProject], videoMuted)}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-900 hover:scale-110 transition-all"
              >
                <XIcon className="w-5 h-5" />
              </button>

              {/* Sound toggle */}
              <button
                onClick={() => setVideoMuted((prev) => !prev)}
                className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 hover:scale-110 transition-all"
              >
                {videoMuted ? (
                  <SpeakerMuteIcon className="w-5 h-5" />
                ) : (
                  <SpeakerIcon className="w-5 h-5" />
                )}
              </button>

              {/* Project info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                  {projects[selectedProject].client}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">
                  {projects[selectedProject].title}
                </h3>
              </div>

              {/* Prev / Next */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject((prev) =>
                      prev !== null
                        ? (prev - 1 + projects.length) % projects.length
                        : null
                    );
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 hover:scale-110 transition-all"
                >
                  <ArrowRightIcon className="w-4 h-4 rotate-180" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject((prev) =>
                      prev !== null
                        ? (prev + 1) % projects.length
                        : null
                    );
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 hover:scale-110 transition-all"
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-white shadow-lg px-5 py-2 text-base font-bold text-red-600">
                {selectedProject + 1} / {projects.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  Like What You See?
                </h2>
                <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
                  Let&apos;s create something incredible together. Reach out to start your next project.
                </p>
                <div className="mt-10">
                  <a
                    href="/#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get a Free Consultation
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
