"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Devices", href: "/devices" },
    { name: "Contributors", href: "/contributors" },
    { name: "Blog", href: "/blog" },
  ];

  const isHome = pathname === "/";

  let navClasses = "fixed top-0 inset-x-0 z-50 transition-all duration-300 ";
  if (isHome) {
    if (scrolled) {
      navClasses += "py-4 -translate-y-full opacity-0 pointer-events-none";
    } else {
      navClasses += "bg-transparent py-6 translate-y-0 opacity-100";
    }
  } else {
    if (scrolled) {
      navClasses += "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4 translate-y-0 opacity-100";
    } else {
      navClasses += "bg-transparent py-6 translate-y-0 opacity-100";
    }
  }

  return (
    <header className={`${navClasses} px-6`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-white font-bold text-xl tracking-tight">Axion OS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 flex flex-col md:hidden py-4 px-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium py-2 transition-colors ${
                pathname === link.href
                  ? "text-white"
                  : "text-white/60"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
