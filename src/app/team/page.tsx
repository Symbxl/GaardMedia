"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import {
  FadeIn,
  FadeInLeft,
  FadeInRight,
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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
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

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

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

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

export default function TeamPage() {
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
        <div className="absolute top-[1000px] right-[-100px] w-[700px] h-[700px] rounded-full bg-red-200 opacity-20" style={{ filter: "blur(100px)" }} />
        <div className="absolute top-[1600px] left-[-200px] w-[800px] h-[800px] rounded-full bg-rose-100 opacity-25" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[2200px] right-[-200px] w-[750px] h-[750px] rounded-full bg-red-100 opacity-20" style={{ filter: "blur(100px)" }} />
        <div className="absolute top-[2800px] left-[0%] w-[700px] h-[700px] rounded-full bg-red-50 opacity-30" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[3400px] right-[-150px] w-[800px] h-[800px] rounded-full bg-rose-100 opacity-25" style={{ filter: "blur(120px)" }} />
        <div className="absolute top-[4000px] left-[-200px] w-[700px] h-[700px] rounded-full bg-red-100 opacity-20" style={{ filter: "blur(100px)" }} />
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
            <a href="/" className="relative z-10 inline-flex items-center justify-center rounded-lg bg-black px-3 py-1.5">
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
                    <button className="relative flex items-center gap-1 text-[13px] font-medium uppercase tracking-wider transition-colors duration-300 text-gray-900">
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
                              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                                item.href === "/team"
                                  ? "text-red-600 bg-red-50/50"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                              }`}
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
      <section className="pt-36 pb-16">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Meet the Team
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              The People Behind <br className="hidden sm:block" />
              <span className="text-red-600">Gaard Media</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
              A passionate team of creatives dedicated to telling your story through the power of video.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TEAM PHOTOS
          ═══════════════════════════════════════ */}
      <section className="pb-20">
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <FadeInLeft>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] group">
                <Image
                  src="/pfp.png"
                  alt="Noah Hedegaard - Founder & Director of Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">Founder / Director of Photography</p>
                  <h3 className="mt-2 font-display text-xl lg:text-2xl font-bold text-white">Noah Hedegaard</h3>
                </div>
              </div>
            </FadeInLeft>
            <FadeInRight>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] group">
                <Image
                  src="/intern.png"
                  alt="Nathan Kester - Gaard Media Intern"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">Intern</p>
                  <h3 className="mt-2 font-display text-xl lg:text-2xl font-bold text-white">Nathan Kester</h3>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT TEXT
          ═══════════════════════════════════════ */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                About Us
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight">
                Dynamic. Creative. <br className="hidden sm:block" />Passionate.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-500">
                We are a dynamic and creative video production company located in Katy, TX. We have a passion for telling compelling stories through video. Whether it&apos;s a promotional video, a corporate training series, or a feature-length documentary.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                With a focus on quality and attention to detail, we strive to exceed our clients&apos; expectations and deliver videos that engage, inform, and inspire audiences. From concept to final delivery, we are dedicated to creating videos that capture the essence of your brand and leave a lasting impression on viewers.
              </p>
            </FadeInLeft>

            <FadeInRight>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FilmIcon, label: "Cinematic Quality", desc: "Professional-grade production from start to finish" },
                  { icon: HeartIcon, label: "Passion-Driven", desc: "Every project is a story we care about telling" },
                  { icon: UsersIcon, label: "Collaborative", desc: "We work closely with you at every step" },
                  { icon: TargetIcon, label: "Results-Focused", desc: "Videos designed to drive real impact" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-red-200/60 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="mt-3 font-display text-sm font-bold text-gray-900">{item.label}</h3>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AT WORK PHOTOS
          ═══════════════════════════════════════ */}
      <section className="pb-20 lg:pb-28">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Behind the Scenes
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Us at Work
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/work1.avif", label: "On Set", title: "Production Day" },
              { src: "/work2.avif", label: "Behind the Camera", title: "Crafting the Shot" },
              { src: "/work3.avif", label: "In the Field", title: "On Location" },
              { src: "/work4.avif", label: "Studio Session", title: "Creative Process" },
              { src: "/work5.avif", label: "Client Work", title: "Bringing Visions to Life" },
              { src: "/work6.avif", label: "Post Production", title: "The Final Touch" },
            ].map((photo, i) => (
              <FadeIn key={photo.src} delay={i * 0.1}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] group">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300">{photo.label}</p>
                    <h3 className="mt-0.5 font-display text-sm font-bold text-white">{photo.title}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-20 sm:px-16 lg:px-24 text-center noise-bg">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-transparent to-rose-900/50" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  Ready to Work Together?
                </h2>
                <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
                  We&apos;d love to hear about your next project. Let&apos;s bring your vision to life.
                </p>
                <div className="mt-10">
                  <a
                    href="/#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get in Touch
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
              <a href="/" className="inline-flex items-center justify-center rounded-lg bg-black px-3 py-1.5">
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
                  { label: "Meet the Team", href: "/team" },
                  { label: "Projects", href: "/projects" },
                  { label: "Blog", href: "/blog" },
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
    </div>
  );
}
