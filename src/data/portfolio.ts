export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repository: string;
  liveSite: string;
  image: string;
  challenges: string[];
  improvements: string[];
}

export interface PortfolioSkill {
  name: string;
  level: number;
}

export interface PortfolioSkillGroup {
  category: string;
  skills: PortfolioSkill[];
}

export interface PortfolioContact {
  email: string;
  phone: string;
  whatsapp: string;
}

export interface PortfolioEducation {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface PortfolioBlog {
  id: string;
  title: string;
  description: string;
  image?: string;
  url: string;
  date: string;
  tags: string[];
}

export interface PortfolioContent {
  profile: {
    name: string;
    role: string;
    intro: string;
    focus: string;
    image: string;
    github: string;
    linkedin: string;
    availability: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    resumeUrl: string;
    journey: string;
    workStyle: string;
    hobbies: string[];
  };
  contact: PortfolioContact;
  education: PortfolioEducation[];
  projects: PortfolioProject[];
  skills: PortfolioSkillGroup[];
  blogs: PortfolioBlog[];
}

export const ADMIN_EMAIL = "mimshad.cse41@gmail.com";

export const DEFAULT_SKILL_LEVEL = 70;

export const DEFAULT_PORTFOLIO: PortfolioContent = {
  profile: {
    name: "Engr. Md. Mimshadur Rahman",
    role: "Frontend developer · React · Next.js",
    intro:
      "Frontend developer focused on reliable, accessible web experiences, built with React, Next.js, and TypeScript.",
    focus: "Metro Pass authentication",
    image: "/assets/images/Smiling_Man.png",
    github: "https://github.com/mimshadbuilds",
    linkedin: "https://www.linkedin.com/in/mimshad7",
    availability: "Frontend developer · React · Next.js",
  },
  about: {
    heading: "Reliable, accessible web experiences.",
    paragraphs: [
      "A growing full-stack developer passionate about building modern, responsive, and user-focused digital experiences.",
      "My work spans frontend and backend development, with a strong focus on JavaScript, TypeScript, React, Next.js, and cutting-edge technologies. I enjoy creating products that are not only technically strong but also intuitive, responsive, impactful for users, and provide engaging experiences.",
    ],
    resumeUrl: "/resume.pdf",
    journey:
      "I started programming by picking apart how my favorite websites worked, and that curiosity never left. What began as tinkering with HTML and JavaScript grew into a journey through React, Next.js, and TypeScript, driven by a love of turning ideas into products people actually use. Every project — from marketplaces to fitness trackers — has taught me something new about building for the web.",
    workStyle:
      "I enjoy work where the details matter: accessible interfaces, smooth interactions, and code that stays readable as it grows. I like owning a feature end to end, from the first component to the deployed URL, and I care as much about the person using the product as the technology behind it.",
    hobbies: ["Cricket", "Painting", "Reading", "Photography", "Exploring new tools"],
  },
  contact: {
    email: ADMIN_EMAIL,
    phone: "",
    whatsapp: "",
  },
  education: [
    {
      id: "edu-1",
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Add your university name",
      period: "2020 – 2024",
      description:
        "Relevant coursework, thesis, GPA, or achievements — edit this in the admin panel (Education tab).",
    },
  ],
  projects: [
    {
      id: "bazar-dor",
      title: "BazarDor",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Better Auth"],
      description:
        "A marketplace price-comparison app for browsing everyday products, comparing prices across markets, and tracking price changes and availability.",
      repository: "https://github.com/mimshadbuilds/bazar-dor",
      liveSite: "https://bazar-dor-mauve-zeta.vercel.app",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
      challenges: [
        "Normalizing product data from sources with different naming and units so comparisons stayed accurate.",
        "Keeping price history fast to query while the dataset kept growing.",
        "Designing an authentication flow that worked seamlessly across SSR and client rendering.",
      ],
      improvements: [
        "Add price-drop alerts via email or push notifications.",
        "Support more markets and localized currencies.",
        "Introduce a browser extension for comparing prices while shopping.",
      ],
    },
    {
      id: "fitlog",
      title: "FitLog",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      description:
        "A fitness companion with an exercise library, personal workout plans, saved routines, progress stats, and account management.",
      repository: "https://github.com/mimshadbuilds/fitlog-gym",
      liveSite: "https://fitlog-gym-beta.vercel.app",
      image:
        "https://images.unsplash.com/photo-1517836357466-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
      challenges: [
        "Modeling workout data so routines could be reordered, duplicated, and tracked over time without losing history.",
        "Rendering progress charts that stayed readable on small screens.",
        "Balancing a rich exercise library with fast, filtered search.",
      ],
      improvements: [
        "Add rest timers and set-by-set logging during workouts.",
        "Offer shareable routine templates and community plans.",
        "Build a lightweight offline mode for gyms with poor connectivity.",
      ],
    },
    {
      id: "mini-book-shelf",
      title: "Book Shelf",
      tech: ["Next.js", "React", "TypeScript", "Recharts"],
      description:
        "A book-discovery and reading-list app to explore titles, save books to read or wishlist lists, and visualize reading data.",
      repository: "https://github.com/mimshadbuilds/mini-book-shelf",
      liveSite: "https://mini-book-shelf.vercel.app",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
      challenges: [
        "Designing a reading-status model that covered reading, finished, and wishlist states without cluttering the UI.",
        "Visualizing reading data with Recharts in a way that stayed meaningful for small libraries.",
        "Handling inconsistent metadata from the book API.",
      ],
      improvements: [
        "Add yearly reading goals and streak tracking.",
        "Support notes and highlights per book.",
        "Recommend titles based on finished books and tags.",
      ],
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: [
        { name: "JavaScript", level: 88 },
        { name: "TypeScript", level: 85 },
        { name: "React.Js", level: 85 },
        { name: "Next.Js", level: 85 },
        { name: "Express.Js", level: 70 },
      ],
    },
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 88 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Redux", level: 70 },
      ],
    },
    {
      category: "Backend & databases",
      skills: [
        { name: "Node.js", level: 72 },
        { name: "Express.js", level: 70 },
        { name: "MongoDB", level: 68 },
        { name: "PostgreSQL", level: 60 },
      ],
    },
    {
      category: "Tools",
      skills: [
        { name: "Git", level: 80 },
        { name: "Docker", level: 60 },
        { name: "VS Code", level: 85 },
        { name: "Bash", level: 60 },
      ],
    },
  ],
  blogs: [],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStringValues(
  value: unknown,
  keys: string[],
): value is Record<string, string> {
  return (
    isRecord(value) &&
    keys.every((key) => typeof value[key] === "string")
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

// Matches a real line break, or the literal two-character sequence "\n"
// (backslash + n) left behind by the old separator="\n" JSX bug.
const LINE_SPLIT_PATTERN = /\r?\n|\\n/;

/**
 * For one-item-per-line lists (challenges, improvements, paragraphs): splits
 * each item on real line breaks AND on literal "\n" sequences so previously
 * corrupted entries heal back into separate items on load.
 */
function toLineArray(value: unknown, fallback: string[]): string[] {
  if (!isStringArray(value)) return [...fallback];
  return value
    .flatMap((item) => item.split(LINE_SPLIT_PATTERN))
    .map((item) => item.trim())
    .filter(Boolean);
}

function toStringArray(value: unknown, fallback: string[]): string[] {
  if (isStringArray(value)) {
    return value.filter((item) => item.trim() !== "");
  }
  return [...fallback];
}

function toOptionalString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

/**
 * Accepts saved education entries, dropping unusable ones and defaulting
 * missing strings so older documents (saved before this section existed)
 * keep loading.
 */
function toEducationArray(value: unknown): PortfolioEducation[] {
  if (!Array.isArray(value)) return [];
  const entries: PortfolioEducation[] = [];
  for (const [index, item] of value.entries()) {
    if (!isRecord(item)) continue;
    entries.push({
      id: toOptionalString(item.id, `edu-${index + 1}`),
      degree: toOptionalString(item.degree, ""),
      institution: toOptionalString(item.institution, ""),
      period: toOptionalString(item.period, ""),
      description: toOptionalString(item.description, ""),
    });
  }
  return entries;
}

function toSkillLevel(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return DEFAULT_SKILL_LEVEL;
  }
  return Math.min(100, Math.max(0, Math.round(value)));
}

/**
 * Accepts both the current skill shape ({ name, level }) and the legacy
 * shape (plain strings) so previously saved Firestore documents keep working.
 */
function toSkillArray(value: unknown): PortfolioSkill[] {
  if (!Array.isArray(value)) return [];
  const skills: PortfolioSkill[] = [];
  for (const item of value) {
    if (typeof item === "string") {
      if (item.trim()) {
        skills.push({ name: item.trim(), level: DEFAULT_SKILL_LEVEL });
      }
    } else if (isRecord(item) && typeof item.name === "string" && item.name.trim()) {
      skills.push({ name: item.name.trim(), level: toSkillLevel(item.level) });
    }
  }
  return skills;
}

/**
 * Validates the saved document's core shape, then normalizes it: new fields
 * fall back to defaults so documents saved before these fields existed still
 * load instead of tripping the error state.
 */
export function normalizePortfolioContent(
  value: unknown,
): PortfolioContent | null {
  if (!isRecord(value)) return null;

  const profileKeys = [
    "name",
    "role",
    "intro",
    "focus",
    "image",
    "github",
    "linkedin",
    "availability",
  ];
  const aboutKeys = ["heading", "resumeUrl"];

  const coreIsValid =
    hasStringValues(value.profile, profileKeys) &&
    isRecord(value.about) &&
    hasStringValues(value.about, aboutKeys) &&
    isStringArray(value.about.paragraphs) &&
    Array.isArray(value.projects) &&
    value.projects.every(
      (project) =>
        isRecord(project) &&
        hasStringValues(project, [
          "id",
          "title",
          "description",
          "repository",
          "liveSite",
          "image",
        ]) &&
        Array.isArray(project.tech),
    ) &&
    Array.isArray(value.skills) &&
    value.skills.every(
      (group) =>
        isRecord(group) &&
        typeof group.category === "string" &&
        Array.isArray(group.skills),
    ) &&
    Array.isArray(value.blogs) &&
    value.blogs.every(
      (blog) =>
        isRecord(blog) &&
        hasStringValues(blog, [
          "id",
          "title",
          "description",
          "url",
          "date",
        ]) &&
        (blog.image === undefined || typeof blog.image === "string") &&
        Array.isArray(blog.tags),
    );

  if (!coreIsValid) return null;

  const defaults = DEFAULT_PORTFOLIO;
  const rawAbout = value.about as Record<string, unknown>;
  const rawContact = isRecord(value.contact) ? value.contact : {};

  return {
    profile: { ...(value.profile as PortfolioContent["profile"]) },
    about: {
      heading: rawAbout.heading as string,
      resumeUrl: rawAbout.resumeUrl as string,
      paragraphs: toLineArray(rawAbout.paragraphs, defaults.about.paragraphs),
      journey: toOptionalString(rawAbout.journey, defaults.about.journey),
      workStyle: toOptionalString(rawAbout.workStyle, defaults.about.workStyle),
      hobbies: toStringArray(rawAbout.hobbies, defaults.about.hobbies),
    },
    contact: {
      email: toOptionalString(rawContact.email, defaults.contact.email),
      phone: toOptionalString(rawContact.phone, defaults.contact.phone),
      whatsapp: toOptionalString(rawContact.whatsapp, defaults.contact.whatsapp),
    },
    education: toEducationArray(value.education),
    projects: (value.projects as Record<string, unknown>[]).map((project) => ({
      id: project.id as string,
      title: project.title as string,
      description: project.description as string,
      tech: toStringArray(project.tech, []),
      repository: project.repository as string,
      liveSite: project.liveSite as string,
      image: project.image as string,
      challenges: toLineArray(project.challenges, []),
      improvements: toLineArray(project.improvements, []),
    })),
    skills: (value.skills as Record<string, unknown>[]).map((group) => ({
      category: group.category as string,
      skills: toSkillArray(group.skills),
    })),
    blogs: (value.blogs as Record<string, unknown>[]).map((blog) => ({
      id: blog.id as string,
      title: blog.title as string,
      description: blog.description as string,
      image: typeof blog.image === "string" ? blog.image : undefined,
      url: blog.url as string,
      date: blog.date as string,
      tags: toStringArray(blog.tags, []),
    })),
  };
}
