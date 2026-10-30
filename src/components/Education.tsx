import { usePortfolio } from "../context/PortfolioContext";

export default function Education() {
  const { content } = usePortfolio();

  return (
    <section
      id="education"
      className="border-t border-white/5 bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Background
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Educational Qualification
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            My academic path and the foundation behind the work I do today.
          </p>
        </div>

        {content.education.length > 0 ? (
          <ol className="relative border-l border-white/10 pl-8 sm:pl-10">
            {content.education.map((entry, index) => (
              <li key={entry.id} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-sky-400/50 bg-slate-950 sm:-left-[49px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                </span>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-sky-400/25">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-sky-300">
                      0{index + 1}
                    </span>
                    {entry.period && (
                      <span className="rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-1 font-mono text-xs text-slate-300">
                        {entry.period}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {entry.degree}
                  </h3>
                  {entry.institution && (
                    <p className="mt-1 text-sm font-medium text-sky-200">
                      {entry.institution}
                    </p>
                  )}
                  {entry.description && (
                    (() => {
                      const lines = entry.description
                        .split(/\r?\n/)
                        .map((line) => line.trim())
                        .filter(Boolean);
                      return lines.length > 1 ? (
                        <ul className="mt-4 space-y-2">
                          {lines.map((line, lineIndex) => (
                            <li
                              key={`${entry.id}-line-${lineIndex}`}
                              className="flex gap-3 text-sm leading-7 text-slate-300"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sky-400"
                              />
                              {line}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                          {entry.description}
                        </p>
                      );
                    })()
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-700 px-6 py-10 text-center text-sm text-slate-500">
            Educational background will appear here once it is added in the
            admin panel.
          </p>
        )}
      </div>
    </section>
  );
}
