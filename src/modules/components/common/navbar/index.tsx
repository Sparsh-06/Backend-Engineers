"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GitHubIcon, REPO_URL } from "@/modules/components/common/site-footer";

const links = [
  { name: "Topics", href: "/topics" },
  { name: "Build it", href: "/build" },
  { name: "Concepts", href: "/concepts" },
  { name: "Architecture", href: "/architecture" },
  { name: "Cloud", href: "/cloud" },
  { name: "Field notes", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smoothly close menu before navigating
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    
    // Match the 300ms CSS duration before changing routes
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <header
        className={`w-full max-w-6xl rounded-3xl transition-all duration-300 ease-in-out ${
          scrolled || open
            ? "border border-black/10 bg-[#EEE9E3]/90 shadow-sm backdrop-blur-xl"
            : "border border-transparent bg-[#EEE9E3]/40 backdrop-blur-md"
        }`}
      >
        {/* Top Bar */}
        <div className="flex h-14 items-center justify-between px-5">
          <Link
            href="/"
            className="group flex items-center gap-1.5 text-lg font-bold tracking-tight"
          >
            <span>Backend</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] transition group-hover:scale-125" />
            <span>Engineer</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold text-black/60 transition hover:text-black"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop right side: GitHub + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="text-black/45 transition hover:text-black"
            >
              <GitHubIcon />
            </a>
            <Link
              href="/topics"
              className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00]"
            >
              Explore topics <span>→</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="grid h-8 w-8 place-items-center rounded-full border border-black/10 md:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
        </div>

        {/* Animated Mobile Sheet Expansion */}
        <div
          className={`grid transition-all duration-300 ease-in-out md:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-1 border-t border-black/10 px-5 pt-3 pb-5">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-black/80 hover:bg-black/5 cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/topics"
                onClick={(e) => handleNavClick(e, "/topics")}
                className="mt-2 text-center rounded-xl bg-black py-2.5 text-xs font-semibold text-[#EEE9E3] cursor-pointer"
              >
                Explore topics →
              </Link>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-black/55 hover:bg-black/5"
              >
                <GitHubIcon />
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}