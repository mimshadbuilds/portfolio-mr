import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#blogs" },
  { label: "About", href: "#about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { content } = usePortfolio();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 text-white shadow-lg shadow-slate-950/10 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          onClick={() => setIsMenuOpen(false)}
          className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 font-mono text-sm font-bold text-sky-300 transition group-hover:border-sky-300/60 group-hover:bg-sky-400/20">
            MR
          </span>
          <span className="text-lg font-bold tracking-tight">Mimshad</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              {item.label}
            </a>
          ))}
          <a
            href={content.about.resumeUrl}
            className="ml-3 rounded-full border border-sky-400/40 bg-sky-500/10 px-5 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-300/70 hover:bg-sky-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-sky-400/40 hover:bg-sky-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-slate-950/95 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={content.about.resumeUrl}
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20"
            >
              Download resume <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
