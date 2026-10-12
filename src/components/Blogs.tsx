import { usePortfolio } from "../context/PortfolioContext";

export default function Blogs() {
  const { content } = usePortfolio();

  return (
    <section
      id="blogs"
      className="border-t border-white/5 bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Notes & ideas
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Writing
          </h2>
        </div>

        {content.blogs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.blogs.map((blog) => (
              <article
                key={blog.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 transition hover:border-sky-400/30"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt=""
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="font-mono text-xs text-sky-300">{blog.date}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {blog.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {blog.description}
                  </p>
                  {blog.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {blog.url && (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                    >
                      Read article <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-6 py-10 text-center">
            <p className="font-mono text-sm text-slate-500">
              // New writing will appear here
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
