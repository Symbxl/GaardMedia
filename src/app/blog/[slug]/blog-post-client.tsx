"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import ChatWidget from "@/components/chat-widget";
import { FadeIn } from "@/components/motion";
import type { BlogPost } from "@/data/blog-posts";

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

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
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

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════ */

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
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
                                item.href === "/blog"
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
          BREADCRUMB
          ═══════════════════════════════════════ */}
      <div className="pt-28 pb-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
              <a href="/" className="hover:text-gray-600 transition-colors">Home</a>
              <ChevronRightIcon className="w-3.5 h-3.5 text-gray-300" />
              <a href="/blog" className="hover:text-gray-600 transition-colors">Blog</a>
              <ChevronRightIcon className="w-3.5 h-3.5 text-gray-300" />
              <span className="text-gray-600 truncate max-w-[200px] sm:max-w-none">{post.title}</span>
            </nav>
          </FadeIn>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ARTICLE HEADER
          ═══════════════════════════════════════ */}
      <article>
        <header className="pb-10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <FadeIn>
              <span className="inline-flex rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-700">
                {post.category}
              </span>

              <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-tight">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-400">{post.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4" />
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Hero Image */}
            <FadeIn delay={0.1}>
              <div className="mt-10 relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </header>

        {/* ═══════════════════════════════════════
            ARTICLE BODY
            ═══════════════════════════════════════ */}
        <div className="pb-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            {post.content.map((section, i) => (
              <FadeIn key={i} delay={0.05}>
                {section.type === "heading" && (
                  <h2 className="mt-10 mb-4 font-display text-2xl font-bold text-gray-900">
                    {section.text}
                  </h2>
                )}
                {section.type === "subheading" && (
                  <h3 className="mt-8 mb-3 font-display text-xl font-semibold text-gray-900">
                    {section.text}
                  </h3>
                )}
                {section.type === "paragraph" && (
                  <p className="mb-5 text-base text-gray-600 leading-relaxed">
                    {section.text}
                  </p>
                )}
                {section.type === "list" && section.items && (
                  <ul className="mb-5 space-y-2 pl-1">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-base text-gray-600 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.type === "quote" && (
                  <blockquote className="my-8 border-l-4 border-red-500 pl-6 py-2">
                    <p className="text-lg font-medium italic text-gray-700 leading-relaxed">
                      {section.text}
                    </p>
                  </blockquote>
                )}
                {section.type === "callout" && (
                  <div className="my-8 rounded-2xl bg-red-50 border border-red-100 p-6">
                    <p className="text-base text-red-800 leading-relaxed font-medium">
                      {section.text}
                    </p>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            TAGS
            ═══════════════════════════════════════ */}
        <div className="pb-12">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <FadeIn>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            AUTHOR BIO
            ═══════════════════════════════════════ */}
        <div className="pb-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <FadeIn>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-600">Written by</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-gray-900">{post.author.name}</h3>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    Noah is the founder of Gaard Media, a creative video production company based in Katy, TX. With a passion for cinematic storytelling, he helps brands, businesses, and creators tell compelling stories through video.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </article>

      {/* ═══════════════════════════════════════
          RELATED POSTS
          ═══════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeIn className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                Keep Reading
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Related Articles
              </h2>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <FadeIn key={rp.slug} delay={i * 0.1}>
                  <a
                    href={`/blog/${rp.slug}`}
                    className="group block h-full rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200/60 hover:shadow-red-600/5 transition-all duration-500 overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-gray-700 shadow-sm">
                        {rp.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {formatDate(rp.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-3.5 h-3.5" />
                          {rp.readingTime} min read
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {rp.description}
                      </p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-10 text-center">
                <a
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  Back to all articles
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

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
                  Ready to Create Something Amazing?
                </h2>
                <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
                  Let&apos;s bring your vision to life with cinematic video production that drives real results.
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

      <ChatWidget />
    </div>
  );
}
