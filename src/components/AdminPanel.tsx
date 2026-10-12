import { useEffect, useState, type FormEvent } from "react";
import {
  getAuth,
  getIdToken,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  ADMIN_EMAIL,
  DEFAULT_PORTFOLIO,
  type PortfolioBlog,
  type PortfolioContent,
  type PortfolioProject,
} from "../data/portfolio";
import { usePortfolio } from "../context/PortfolioContext";

type AdminTab = "profile" | "projects" | "skills" | "blogs";

const tabs: { id: AdminTab; label: string }[] = [
  { id: "profile", label: "Profile & about" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "blogs", label: "Blogs" },
];

const controlClass =
  "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/15";
const buttonClass =
  "inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-sky-300/40 hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50";
const auth = getAuth();

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-300">
      {label}
      <input
        className={controlClass}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-medium text-slate-300">
      {label}
      <textarea
        className={`${controlClass} resize-y`}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

function isAllowedUrl(value: string, allowLocalPath = false) {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (allowLocalPath && trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }

  try {
    const protocol = new URL(trimmed).protocol;
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

export default function AdminPanel() {
  const { content, error: contentError, saveContent } = usePortfolio();
  const [user, setUser] = useState<User | null>(null);
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [tab, setTab] = useState<AdminTab>("profile");
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isRefreshingVerification, setIsRefreshingVerification] =
    useState(false);

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (nextUser) => setUser(nextUser),
      (authError) => setAuthMessage(authError.message),
    );
  }, []);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const authorized = user?.email?.toLowerCase() === ADMIN_EMAIL;

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setAuthMessage(`Only ${ADMIN_EMAIL} can access the admin panel.`);
      return;
    }

    setIsSigningIn(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      if (result.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        await signOut(auth);
        setAuthMessage("This account is not authorized to edit this portfolio.");
      } else if (!result.user.emailVerified) {
        await sendEmailVerification(result.user);
        setAuthMessage(
          `A verification email was sent to ${ADMIN_EMAIL}. Verify the address, then return here and refresh your verification status.`,
        );
      }
    } catch (signInError) {
      setAuthMessage(errorMessage(signInError));
    } finally {
      setIsSigningIn(false);
    }
  }

  async function handleRefreshVerification() {
    if (!user) return;
    setIsRefreshingVerification(true);
    setAuthMessage("");
    try {
      await reload(user);
      const refreshedUser = auth.currentUser;
      if (!refreshedUser?.emailVerified) {
        setAuthMessage("Email is not verified yet. Check your inbox and spam folder.");
      } else {
        await getIdToken(refreshedUser, true);
        setUser(refreshedUser);
        setAuthMessage("Verification refreshed. You can now manage your portfolio.");
      }
    } catch (verificationError) {
      setAuthMessage(errorMessage(verificationError));
    } finally {
      setIsRefreshingVerification(false);
    }
  }

  async function handleResendVerification() {
    if (!user) return;
    setAuthMessage("");
    try {
      await sendEmailVerification(user);
      setAuthMessage(`A new verification email was sent to ${ADMIN_EMAIL}.`);
    } catch (verificationError) {
      setAuthMessage(errorMessage(verificationError));
    }
  }

  async function handleSave() {
    setSaveMessage("");
    if (!draft.profile.name.trim()) {
      setSaveMessage("Could not save changes: display name is required.");
      return;
    }
    if (draft.projects.some((project) => !project.title.trim())) {
      setSaveMessage("Could not save changes: every project needs a title.");
      return;
    }
    if (draft.blogs.some((blog) => !blog.title.trim())) {
      setSaveMessage("Could not save changes: every blog post needs a title.");
      return;
    }

    const urls = [
      draft.profile.github,
      draft.profile.linkedin,
      draft.profile.image,
      draft.about.resumeUrl,
      ...draft.projects.flatMap((project) => [
        project.image,
        project.repository,
        project.liveSite,
      ]),
      ...draft.blogs.flatMap((blog) => [blog.url, blog.image ?? ""]),
    ];
    if (
      urls.some((url) => !isAllowedUrl(url, url === draft.about.resumeUrl || url.startsWith("/")))
    ) {
      setSaveMessage(
        "Could not save changes: links and image URLs must use http(s), or a local path beginning with /.",
      );
      return;
    }

    setIsSaving(true);
    try {
      const currentUser = auth.currentUser;
      if (
        !currentUser ||
        currentUser.email?.toLowerCase() !== ADMIN_EMAIL ||
        !currentUser.emailVerified
      ) {
        setSaveMessage(
          "Could not save changes: sign in with the verified admin account, then try again.",
        );
        return;
      }

      await getIdToken(currentUser, true);
      await saveContent(draft);
      setSaveMessage("Changes saved and published to your portfolio.");
    } catch (saveError) {
      setSaveMessage(`Could not save changes: ${errorMessage(saveError)}`);
    } finally {
      setIsSaving(false);
    }
  }

  function updateProfile<K extends keyof PortfolioContent["profile"]>(
    key: K,
    value: string,
  ) {
    setDraft((current) => ({
      ...current,
      profile: { ...current.profile, [key]: value },
    }));
  }

  function updateProject(
    id: string,
    key: keyof PortfolioProject,
    value: string | string[],
  ) {
    setDraft((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id ? { ...project, [key]: value } : project,
      ),
    }));
  }

  function updateBlog(id: string, key: keyof PortfolioBlog, value: string | string[]) {
    setDraft((current) => ({
      ...current,
      blogs: current.blogs.map((blog) =>
        blog.id === id ? { ...blog, [key]: value } : blog,
      ),
    }));
  }

  if (!authorized || !user?.emailVerified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-2xl shadow-slate-950/50 sm:p-9">
          <a href="/" className="font-mono text-sm font-semibold text-sky-300">
            &lt; Back to portfolio
          </a>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-sky-300">
            Portfolio CMS
          </p>
          <h1 className="mt-3 text-3xl font-bold">Admin sign in</h1>
          {!user && (
            <>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in with the authorized portfolio account to manage your
                profile, projects, skills, and writing.
              </p>
              <form className="mt-7 space-y-5" onSubmit={handleSignIn}>
                <Field
                  label="Admin email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder={ADMIN_EMAIL}
                />
                <label className="block text-sm font-medium text-slate-300">
                  Password
                  <input
                    className={controlClass}
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
                {authMessage && (
                  <p
                    role="alert"
                    className="rounded-xl border border-rose-400/20 bg-rose-950/50 p-3 text-sm text-rose-200"
                  >
                    {authMessage}
                  </p>
                )}
                <button
                  className="w-full rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400 disabled:opacity-50"
                  type="submit"
                  disabled={isSigningIn}
                >
                  {isSigningIn ? "Signing in…" : "Sign in securely"}
                </button>
              </form>
              <p className="mt-6 text-xs leading-5 text-slate-500">
                The admin account must first be created in Firebase
                Authentication. Public account registration is disabled.
              </p>
            </>
          )}
          {user && !authorized && (
            <div className="mt-6 space-y-4">
              <p
                role="alert"
                className="rounded-xl border border-rose-400/20 bg-rose-950/50 p-4 text-sm leading-6 text-rose-200"
              >
                The signed-in account ({user.email ?? "unknown email"}) is not
                authorized to edit this portfolio.
              </p>
              <button
                type="button"
                className={`${buttonClass} w-full`}
                onClick={() => void signOut(auth)}
              >
                Sign out and switch accounts
              </button>
            </div>
          )}
          {user && authorized && !user.emailVerified && (
            <div className="mt-6 space-y-4">
              <p className="rounded-xl border border-amber-400/20 bg-amber-950/40 p-4 text-sm leading-6 text-amber-100">
                Verify {ADMIN_EMAIL} before editing. Firestore rules reject
                writes from unverified accounts.
              </p>
              {authMessage && (
                <p role="status" className="text-sm text-slate-300">
                  {authMessage}
                </p>
              )}
              <button
                type="button"
                className={`${buttonClass} w-full`}
                onClick={handleResendVerification}
              >
                Resend verification email
              </button>
              <button
                type="button"
                className="w-full rounded-full bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400 disabled:opacity-50"
                onClick={handleRefreshVerification}
                disabled={isRefreshingVerification}
              >
                {isRefreshingVerification
                  ? "Checking…"
                  : "I've verified — continue"}
              </button>
              <button
                type="button"
                className="w-full py-2 text-sm text-slate-400 hover:text-white"
                onClick={() => void signOut(auth)}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="/" className="font-mono text-xs font-semibold text-sky-300">
              &lt; Back to portfolio
            </a>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Portfolio admin
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={buttonClass}
              onClick={() => {
                setDraft(DEFAULT_PORTFOLIO);
                setSaveMessage("Default content restored in this draft. Save to publish it.");
              }}
            >
              Restore defaults
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => void handleSave()}
              disabled={isSaving}
            >
              {isSaving ? "Saving…" : "Save & publish"}
            </button>
            <button
              type="button"
              className={buttonClass}
              onClick={() => void signOut(auth)}
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Projects", value: draft.projects.length },
            { label: "Skill groups", value: draft.skills.length },
            { label: "Blog posts", value: draft.blogs.length },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto border-b border-white/10 pb-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === item.id
                  ? "bg-sky-500 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {(contentError || saveMessage) && (
          <div
            className={`mt-5 rounded-xl border p-4 text-sm ${
              contentError || saveMessage.startsWith("Could not")
                ? "border-rose-400/20 bg-rose-950/40 text-rose-200"
                : "border-emerald-400/20 bg-emerald-950/40 text-emerald-200"
            }`}
            role={contentError || saveMessage.startsWith("Could not") ? "alert" : "status"}
          >
            {contentError || saveMessage}
          </div>
        )}
        {!contentError && saveMessage && (
          <div className="sr-only" aria-live="polite">
            {saveMessage}
          </div>
        )}

        <section className="mt-6 space-y-5">
          {tab === "profile" && (
            <>
              <PanelCard
                title="Hero profile"
                description="These fields populate the homepage hero and social buttons."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Display name"
                    value={draft.profile.name}
                    onChange={(value) => updateProfile("name", value)}
                  />
                  <Field
                    label="Role / specialty"
                    value={draft.profile.role}
                    onChange={(value) => updateProfile("role", value)}
                  />
                  <Field
                    label="Availability badge"
                    value={draft.profile.availability}
                    onChange={(value) => updateProfile("availability", value)}
                  />
                  <Field
                    label="Current focus"
                    value={draft.profile.focus}
                    onChange={(value) => updateProfile("focus", value)}
                  />
                  <Field
                    label="Profile image URL"
                    value={draft.profile.image}
                    onChange={(value) => updateProfile("image", value)}
                  />
                  <Field
                    label="GitHub profile URL"
                    value={draft.profile.github}
                    onChange={(value) => updateProfile("github", value)}
                  />
                  <Field
                    label="LinkedIn profile URL"
                    value={draft.profile.linkedin}
                    onChange={(value) => updateProfile("linkedin", value)}
                  />
                  <div className="md:col-span-2">
                    <TextArea
                      label="Hero introduction"
                      value={draft.profile.intro}
                      onChange={(value) => updateProfile("intro", value)}
                      rows={3}
                    />
                  </div>
                </div>
              </PanelCard>

              <PanelCard
                title="About section"
                description="One paragraph per line. Your resume URL appears on the download button."
              >
                <div className="space-y-5">
                  <Field
                    label="Section heading"
                    value={draft.about.heading}
                    onChange={(value) =>
                      setDraft((current) => ({
                        ...current,
                        about: { ...current.about, heading: value },
                      }))
                    }
                  />
                  <TextArea
                    label="About paragraphs"
                    value={draft.about.paragraphs.join("\n")}
                    onChange={(value) =>
                      setDraft((current) => ({
                        ...current,
                        about: {
                          ...current.about,
                          paragraphs: value.split("\n"),
                        },
                      }))
                    }
                    rows={6}
                    placeholder="Write one paragraph on each line"
                  />
                  <Field
                    label="Resume URL"
                    value={draft.about.resumeUrl}
                    onChange={(value) =>
                      setDraft((current) => ({
                        ...current,
                        about: { ...current.about, resumeUrl: value },
                      }))
                    }
                  />
                </div>
              </PanelCard>
            </>
          )}

          {tab === "projects" && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Projects</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Add, edit, or remove portfolio project cards.
                  </p>
                </div>
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      projects: [
                        ...current.projects,
                        {
                          id: newId(),
                          title: "",
                          description: "",
                          tech: [],
                          repository: "",
                          liveSite: "",
                          image: "",
                        },
                      ],
                    }))
                  }
                >
                  + Add project
                </button>
              </div>
              {draft.projects.map((project, index) => (
                <PanelCard
                  key={project.id}
                  title={project.title || `New project ${index + 1}`}
                  action={
                    <button
                      type="button"
                      className="text-sm font-semibold text-rose-300 hover:text-rose-200"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          projects: current.projects.filter(
                            (item) => item.id !== project.id,
                          ),
                        }))
                      }
                    >
                      Remove
                    </button>
                  }
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Project title"
                      value={project.title}
                      onChange={(value) => updateProject(project.id, "title", value)}
                    />
                    <Field
                      label="Image URL"
                      value={project.image}
                      onChange={(value) => updateProject(project.id, "image", value)}
                    />
                    <Field
                      label="Live site URL"
                      value={project.liveSite}
                      onChange={(value) => updateProject(project.id, "liveSite", value)}
                    />
                    <Field
                      label="Repository URL"
                      value={project.repository}
                      onChange={(value) =>
                        updateProject(project.id, "repository", value)
                      }
                    />
                    <Field
                      label="Tech stack (comma-separated)"
                      value={project.tech.join(", ")}
                      onChange={(value) =>
                        updateProject(
                          project.id,
                          "tech",
                          value.split(",").map((item) => item.trim()).filter(Boolean),
                        )
                      }
                    />
                    <div className="md:col-span-2">
                      <TextArea
                        label="Description"
                        value={project.description}
                        onChange={(value) =>
                          updateProject(project.id, "description", value)
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </PanelCard>
              ))}
              {draft.projects.length === 0 && (
                <EmptyPanel message="No projects yet. Add one to feature it on your portfolio." />
              )}
            </>
          )}

          {tab === "skills" && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Skills</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Organize skills into groups; changes update both the hero chips and toolkit.
                  </p>
                </div>
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      skills: [...current.skills, { category: "New group", skills: [] }],
                    }))
                  }
                >
                  + Add skill group
                </button>
              </div>
              {draft.skills.map((group, index) => (
                <PanelCard
                  key={index}
                  title={group.category || `Skill group ${index + 1}`}
                  action={
                    <button
                      type="button"
                      className="text-sm font-semibold text-rose-300 hover:text-rose-200"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          skills: current.skills.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                    >
                      Remove
                    </button>
                  }
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Group name"
                      value={group.category}
                      onChange={(value) =>
                        setDraft((current) => ({
                          ...current,
                          skills: current.skills.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, category: value } : item,
                          ),
                        }))
                      }
                    />
                    <Field
                      label="Skills (comma-separated)"
                      value={group.skills.join(", ")}
                      onChange={(value) =>
                        setDraft((current) => ({
                          ...current,
                          skills: current.skills.map((item, itemIndex) =>
                            itemIndex === index
                              ? {
                                  ...item,
                                  skills: value
                                    .split(",")
                                    .map((skill) => skill.trim())
                                    .filter(Boolean),
                                }
                              : item,
                          ),
                        }))
                      }
                    />
                  </div>
                </PanelCard>
              ))}
              {draft.skills.length === 0 && (
                <EmptyPanel message="No skill groups yet. Add a group to build your toolkit." />
              )}
            </>
          )}

          {tab === "blogs" && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Blog posts</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Add links to articles and writing; posts show in the Writing section.
                  </p>
                </div>
                <button
                  type="button"
                  className={buttonClass}
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      blogs: [
                        ...current.blogs,
                        {
                          id: newId(),
                          title: "",
                          description: "",
                          image: "",
                          url: "",
                          date: new Date().toISOString().slice(0, 10),
                          tags: [],
                        },
                      ],
                    }))
                  }
                >
                  + Add post
                </button>
              </div>
              {draft.blogs.map((blog, index) => (
                <PanelCard
                  key={blog.id}
                  title={blog.title || `New post ${index + 1}`}
                  action={
                    <button
                      type="button"
                      className="text-sm font-semibold text-rose-300 hover:text-rose-200"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          blogs: current.blogs.filter((item) => item.id !== blog.id),
                        }))
                      }
                    >
                      Remove
                    </button>
                  }
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Post title"
                      value={blog.title}
                      onChange={(value) => updateBlog(blog.id, "title", value)}
                    />
                    <Field
                      label="Cover image URL (optional)"
                      value={blog.image ?? ""}
                      onChange={(value) => updateBlog(blog.id, "image", value)}
                      placeholder="https://example.com/blog-cover.jpg"
                    />
                    <Field
                      label="Article URL"
                      value={blog.url}
                      onChange={(value) => updateBlog(blog.id, "url", value)}
                    />
                    <Field
                      label="Date"
                      type="date"
                      value={blog.date}
                      onChange={(value) => updateBlog(blog.id, "date", value)}
                    />
                    <Field
                      label="Tags (comma-separated)"
                      value={blog.tags.join(", ")}
                      onChange={(value) =>
                        updateBlog(
                          blog.id,
                          "tags",
                          value.split(",").map((item) => item.trim()).filter(Boolean),
                        )
                      }
                    />
                    <div className="md:col-span-2">
                      <TextArea
                        label="Summary"
                        value={blog.description}
                        onChange={(value) =>
                          updateBlog(blog.id, "description", value)
                        }
                        rows={3}
                      />
                    </div>
                    {blog.image && (
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-300">
                          Cover preview
                        </p>
                        <img
                          src={blog.image}
                          alt={`Preview for ${blog.title || "blog post"}`}
                          className="mt-2 h-40 w-full rounded-xl border border-white/10 object-cover sm:max-w-md"
                        />
                      </div>
                    )}
                  </div>
                </PanelCard>
              ))}
              {draft.blogs.length === 0 && (
                <EmptyPanel message="No blog posts yet. Add an article to create your Writing section." />
              )}
            </>
          )}
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          {saveMessage && !saveMessage.startsWith("Could not") ? (
            <p role="status" className="text-sm text-emerald-300">
              {saveMessage}
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              Remember to save your changes to publish them.
            </p>
          )}
          <button
            type="button"
            className="rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => void handleSave()}
            disabled={isSaving}
          >
            {isSaving ? "Saving…" : "Save & publish"}
          </button>
        </div>
      </div>
    </main>
  );
}

function PanelCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          {description && (
            <p className="mt-1 text-sm leading-5 text-slate-400">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function EmptyPanel({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 px-6 py-12 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}
