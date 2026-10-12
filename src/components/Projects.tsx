import { usePortfolio } from "../context/PortfolioContext";

const accents = ["from-cyan-400/30", "from-violet-400/30", "from-emerald-400/30"];

export default function Projects() {
  const { content } = usePortfolio();

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.08),_transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
              Featured GitHub projects
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Selected work
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400 sm:text-right">
            A few recent builds focused on useful features, accessible
            interactions, and dependable web experiences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.projects.map((project, index) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-2xl hover:shadow-sky-950/30"
            >
              <div
                className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${accents[index % accents.length]} via-slate-950/15 to-slate-950/90`}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 font-mono text-xs text-white/90 backdrop-blur-md">
                  PROJECT_{String(index + 1).padStart(2, "0")}
                </span>
                {project.liveSite && (
                  <a
                    href={project.liveSite}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} live site`}
                    className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-lg text-white backdrop-blur-md transition hover:border-sky-300/50 hover:bg-sky-500/30"
                  >
                    ↗
                  </a>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-slate-700/80 bg-slate-900 px-3 py-1.5 font-mono text-xs text-sky-200"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3 border-t border-white/10 pt-5">
                  {project.liveSite && (
                    <a
                      href={project.liveSite}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-400"
                    >
                      Live site <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.repository && (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-sky-300/50 hover:text-sky-200"
                    >
                      GitHub repo <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/mimshadbuilds?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300/50 hover:bg-white/5 hover:text-sky-200"
          >
            Browse all repositories <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
