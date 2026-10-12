export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repository: string;
  liveSite: string;
  image: string;
}

export interface PortfolioSkillGroup {
  category: string;
  skills: string[];
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
  };
  projects: PortfolioProject[];
  skills: PortfolioSkillGroup[];
  blogs: PortfolioBlog[];
}

export const ADMIN_EMAIL = "mimshad.cse41@gmail.com";

export const DEFAULT_PORTFOLIO: PortfolioContent = {
  profile: {
    name: "Engr. Md. Mimshadur Rahman",
    role: "Frontend developer · React · Next.js",
    intro:
      "Frontend developer focused on reliable, accessible web experiences, built with React, Next.js, and TypeScript.",
    focus: "Metro Pass authentication",
    image: "/assets/images/IMG_1.jpeg",
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
  },
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
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
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
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "C/C++"],
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "Redux"],
    },
    {
      category: "Backend & databases",
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
    },
    {
      category: "Tools",
      skills: ["Git", "Docker", "VS Code", "Bash"],
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

export function isPortfolioContent(
  value: unknown,
): value is PortfolioContent {
  if (!isRecord(value)) return false;

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

  return (
    hasStringValues(value.profile, profileKeys) &&
    isRecord(value.about) &&
    hasStringValues(value.about, aboutKeys) &&
    isStringArray(value.about.paragraphs) &&
    Array.isArray(value.projects) &&
    value.projects.every(
      (project) =>
        hasStringValues(project, [
          "id",
          "title",
          "description",
          "repository",
          "liveSite",
          "image",
        ]) &&
        isStringArray(project.tech),
    ) &&
    Array.isArray(value.skills) &&
    value.skills.every(
      (group) =>
        hasStringValues(group, ["category"]) && isStringArray(group.skills),
    ) &&
    Array.isArray(value.blogs) &&
    value.blogs.every(
      (blog) =>
        hasStringValues(blog, [
          "id",
          "title",
          "description",
          "url",
          "date",
        ]) &&
        (blog.image === undefined || typeof blog.image === "string") &&
        isStringArray(blog.tags),
    )
  );
}
