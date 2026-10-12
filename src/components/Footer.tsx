import { usePortfolio } from "../context/PortfolioContext";

export default function Footer() {
  const { content } = usePortfolio();

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:text-sky-300"
        >
          <span className="font-mono text-sky-400">&lt;MR /&gt;</span>
          {content.profile.name}
        </a>

        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {content.profile.name}. Built with care.
        </p>

        <div className="flex items-center gap-2">
          <a
            href={content.profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-200"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={content.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-bold text-slate-300 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-200"
          >
            in
          </a>
        </div>
        <a
          href="/admin"
          className="text-xs text-slate-600 transition hover:text-sky-300"
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
