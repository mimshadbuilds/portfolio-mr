import { usePortfolio } from "../context/PortfolioContext";

export default function About() {
  const { content } = usePortfolio();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -right-40 top-12 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            A little about me
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {content.about.heading}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-300">
            {content.about.paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
            ))}
          </div>

          <a
            href={content.about.resumeUrl}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-950/40 transition hover:-translate-y-0.5 hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            Download resume <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-sky-400/60 to-transparent" />
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
              Toolkit
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.skills.map((group, index) => (
              <div
                key={group.category}
                className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-sky-400/25 hover:bg-white/[0.05] ${
                  index === 1 ? "sm:row-span-2" : ""
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs text-sky-300">
                    0{index + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-white">
                    {group.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
