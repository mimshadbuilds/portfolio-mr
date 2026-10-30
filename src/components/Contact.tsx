import { usePortfolio } from "../context/PortfolioContext";

function ContactCard({
  label,
  value,
  href,
  action,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  action: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/10 text-sky-300 transition group-hover:border-sky-300/60 group-hover:bg-sky-500/20">
        {icon}
      </span>
      <span className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <span className="mt-1 break-all text-sm font-semibold text-white">
        {value}
      </span>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 transition group-hover:text-sky-200">
        {action} <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}

export default function Contact() {
  const { content } = usePortfolio();
  const { email, phone, whatsapp } = content.contact;

  const whatsappDigits = whatsapp.replace(/\D/g, "");

  const cards = [
    email && {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      action: "Send an email",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    phone && {
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
      action: "Give a call",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    whatsappDigits && {
      label: "WhatsApp",
      value: whatsapp,
      href: `https://wa.me/${whatsappDigits}`,
      action: "Chat on WhatsApp",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    action: string;
    icon: React.ReactNode;
  }[];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 bg-slate-900 px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Contact
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s get in touch
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Have a project in mind, a question, or just want to say hello?
            Reach out directly — I usually reply within a day.
          </p>
        </div>

        {cards.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <ContactCard key={card.label} {...card} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-700 px-6 py-10 text-center text-sm text-slate-500">
            Contact details will appear here once they are added in the admin
            panel.
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={content.profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300/50 hover:text-sky-200"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href={content.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300/50 hover:text-sky-200"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
