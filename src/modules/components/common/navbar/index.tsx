"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { name: "Topics", href: "/topics" },
  { name: "Concepts", href: "/concepts" },
  { name: "Architecture", href: "/architecture" },
  { name: "Cloud", href: "/cloud" },
  { name: "Field notes", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"><header className={`w-full max-w-6xl rounded-full transition-all duration-300 ${scrolled ? "border border-black/10 bg-[#EEE9E3]/80 px-5 py-2.5 shadow-sm backdrop-blur-xl" : "border border-transparent bg-[#EEE9E3]/40 px-5 py-3.5 backdrop-blur-md"}`}>
    <div className="flex items-center justify-between"><Link href="/" className="group flex items-center gap-1.5 text-lg font-bold tracking-tight"><span>Backend</span><span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00] transition group-hover:scale-125"/><span>Engineer</span></Link><nav className="hidden items-center gap-1 md:flex">{links.map(link => <Link key={link.name} href={link.href} className="px-3 py-1.5 text-xs font-semibold text-black/60 transition hover:text-black">{link.name}</Link>)}</nav><Link href="/topics" className="hidden rounded-full bg-black px-4 py-2 text-xs font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00] md:block">Explore topics <span>→</span></Link><button onClick={() => setOpen(!open)} className="grid h-8 w-8 place-items-center rounded-full border border-black/10 md:hidden" aria-expanded={open} aria-label="Toggle navigation"><span className="text-lg">{open ? "×" : "≡"}</span></button></div>
    {open && <nav className="mt-3 grid gap-1 rounded-2xl border border-black/10 bg-[#EEE9E3] p-3 shadow-xl md:hidden">{links.map(link => <Link onClick={() => setOpen(false)} key={link.name} href={link.href} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-black/70 hover:bg-black/5">{link.name}</Link>)}</nav>}
  </header></div>;
}
