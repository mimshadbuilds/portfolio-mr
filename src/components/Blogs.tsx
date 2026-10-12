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
          <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 transition duration-200 hover:-translate-y-1 hover:border-sky-400/30"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={`${blog.title} cover`}
                    loading="lazy"
                    className="h-36 w-full object-cover sm:h-40"
                  />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs text-sky-300">{blog.date}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-6 text-white">
                    {blog.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                    {blog.description}
                  </p>
                  {blog.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  {blog.url && (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
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
