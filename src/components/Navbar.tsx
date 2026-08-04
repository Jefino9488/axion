"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [changelogOpen, setChangelogOpen] = useState(false);
  const [changelogText, setChangelogText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchChangelogData = async () => {
    setLoading(true);
    setError(false);
    try {
      const repoRes = await fetch("https://api.github.com/repos/AxionAOSP/axion_changelogs");
      if (!repoRes.ok) throw new Error("Failed to fetch repository details");
      const repoData = await repoRes.json();
      const defaultBranch = repoData.default_branch || "main";

      const rawRes = await fetch(`https://raw.githubusercontent.com/AxionAOSP/axion_changelogs/${defaultBranch}/README.md`);
      if (!rawRes.ok) throw new Error("Failed to fetch raw changelog content");
      const text = await rawRes.text();
      setChangelogText(text);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleChangelog = () => {
    if (!changelogOpen && !changelogText) {
      fetchChangelogData();
    }
    setChangelogOpen(!changelogOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/contributors" },
    { name: "Blog", href: "/blog" },
  ];

  const isHome = pathname === "/";

  let navContainerClasses = "fixed top-0 inset-x-0 z-50 transition-all duration-300 ";
  if (isHome) {
    if (scrolled) {
      navContainerClasses += "py-4 -translate-y-full opacity-0 pointer-events-none";
    } else {
      navContainerClasses += "py-6 translate-y-0 opacity-100";
    }
  } else {
    if (scrolled) {
      navContainerClasses += "py-4 translate-y-0 opacity-100";
    } else {
      navContainerClasses += "py-6 translate-y-0 opacity-100";
    }
  }

  return (
    <header className={navContainerClasses}>
      {/* Background layer to animate opacity instead of backdrop-filter to prevent browser rendering glitches */}
      {!isHome && (
        <div 
          className={`absolute inset-0 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-opacity duration-300 -z-10 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`} 
        />
      )}
      
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-white font-bold text-xl tracking-tight">Axion OS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleChangelog}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                changelogOpen ? "text-[var(--color-axion-accent)]" : "text-white/60 hover:text-white"
              }`}
            >
              Changelog
            </button>
          </nav>

          <Link
            href="/download"
            className="px-5 py-2 bg-[var(--color-axion-accent)] hover:bg-[var(--color-axion-accent-hover)] text-[#100B09] text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(255,100,0,0.2)] hover:shadow-[0_0_25px_rgba(255,100,0,0.4)] transition-all duration-300 hover:scale-[1.03]"
          >
            Download
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            setChangelogOpen(false);
          }}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {changelogOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-4xl mx-auto mt-4 bg-[#0a0706]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="p-6 md:p-10">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Source Changelog</h3>
                  <p className="text-xs text-white/40 mt-1">Direct from official source repository</p>
                </div>
                <button
                  onClick={() => setChangelogOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[450px] overflow-y-auto scrollbar-thin select-text pr-2" data-lenis-prevent>
                {loading && (
                  <div className="py-24 text-center">
                    <div className="w-6 h-6 border-2 border-[var(--color-axion-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-white/40 animate-pulse font-medium">Fetching latest source logs...</p>
                  </div>
                )}

                {error && (
                  <div className="py-24 text-center text-red-400 font-medium">
                    <p className="mb-2 text-base">Failed to fetch the changelog.</p>
                    <button 
                      onClick={fetchChangelogData}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {changelogText && (
                  <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-[var(--color-axion-accent)] hover:prose-a:text-[var(--color-axion-accent-hover)] hover:prose-a:underline prose-strong:text-white prose-p:text-zinc-200 prose-p:leading-relaxed prose-li:text-zinc-200 prose-li:leading-relaxed prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/5">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {changelogText}
                    </ReactMarkdown>
                  </article>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 flex flex-col md:hidden py-6 px-6 gap-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium py-1 transition-colors ${
                  pathname === link.href
                    ? "text-white"
                    : "text-white/60"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleChangelog();
              }}
              className="text-left text-lg font-medium py-1 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Changelog
            </button>

            <Link
              href="/download"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-3 text-center bg-[var(--color-axion-accent)] text-[#100B09] font-bold text-sm uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,100,0,0.15)] block"
            >
              Download
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
