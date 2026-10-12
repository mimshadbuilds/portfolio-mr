import { usePortfolio } from "../context/PortfolioContext";

export default function Hero() {
  const { content } = usePortfolio();
  const expertise = content.skills.flatMap((group) => group.skills).slice(0, 8);

  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-200 shadow-lg shadow-sky-950/40 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              {content.profile.availability}
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {content.profile.name}
            </h1>

            <p className="mt-4 font-mono text-sm font-semibold tracking-wide text-sky-300">
              {content.profile.role}
            </p>

            <p className="mt-6 max-w-xl text-lg text-slate-300 sm:text-xl">
              {content.profile.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href={content.profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-sky-300/60 bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-sky-500"
              >
                GitHub
              </a>
              <a
                href={content.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-sky-400/50 bg-sky-500/10 px-6 py-3 text-sm font-semibold text-sky-100 transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20"
              >
                LinkedIn
              </a>
            </div>

          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-500/30 via-blue-500/20 to-indigo-500/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-sky-950/60 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    src={content.profile.image}
                    alt={content.profile.name}
                    className="h-[420px] w-full max-w-[440px] object-cover object-center"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-sky-300">
                      Current focus
                    </p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {content.profile.focus}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-lg text-white shadow-lg shadow-sky-500/40">
                    →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {expertise.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-200 shadow-sm shadow-slate-950/40"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}