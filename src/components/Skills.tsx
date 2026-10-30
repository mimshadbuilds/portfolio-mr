import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-slate-200">{name}</span>
        <span className="font-mono text-xs text-sky-300">{level}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500 transition-[width] duration-700 ease-out motion-reduce:transition-none"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { content } = usePortfolio();

  return (
    <section
      id="skills"
      className="bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Skills &amp; toolkit
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What I work with
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            A snapshot of the technologies I use day to day, grouped by area
            and rated by comfort level.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {content.skills.map((group, index) => (
            <div
              key={`${group.category}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-sky-400/25"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs text-sky-300">
                  0{index + 1}
                </span>
                <h3 className="text-base font-semibold text-white">
                  {group.category}
                </h3>
              </div>
              {group.skills.length > 0 ? (
                <div className="space-y-5">
                  {group.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No skills listed in this group yet.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
