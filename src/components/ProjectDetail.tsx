import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const { content } = usePortfolio();
  const project = content.projects.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-white">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-sky-300">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Project not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
          This project may have been removed, or the link is out of date.
        </p>
        <Link
          to="/#projects"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Back to projects <span aria-hidden="true">←</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-300/50 hover:text-sky-200"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>
          <Link
            to="/#contact"
            className="hidden rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-300/70 hover:bg-sky-500/20 sm:inline-flex"
          >
            Get in touch
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
          Case study
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          {project.title}
        </h1>

        {project.image && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-slate-700/80 bg-slate-900 px-3 py-1.5 font-mono text-xs text-sky-200"
            >
              {technology}
            </span>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveSite && (
            <a
              href={project.liveSite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300/50 hover:text-sky-200"
            >
              GitHub repository <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white">
              Challenges faced
            </h2>
            {project.challenges.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-1 font-mono text-xs text-sky-300">
                      0{index + 1}
                    </span>
                    <span className="text-sm leading-6 text-slate-300">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No challenges documented for this project yet.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white">
              Potential improvements &amp; future plans
            </h2>
            {project.improvements.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {project.improvements.map((improvement, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-1 font-mono text-xs text-emerald-300">
                      0{index + 1}
                    </span>
                    <span className="text-sm leading-6 text-slate-300">
                      {improvement}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No future plans documented for this project yet.
              </p>
            )}
          </section>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300/50 hover:text-sky-200"
          >
            <span aria-hidden="true">←</span> Back to all projects
          </Link>
        </div>
      </article>
    </main>
  );
}
