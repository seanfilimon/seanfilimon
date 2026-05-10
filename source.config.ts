import {
  defineDocs,
  defineConfig,
  defineCollections,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    resource: z.string().optional(),
  }),
});

export const guidePosts = defineCollections({
  type: "doc",
  dir: "content/guides",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    difficulty: z
      .enum(["beginner", "intermediate", "advanced"])
      .default("intermediate"),
    tags: z.array(z.string()).default([]),
    resource: z.string().optional(),
  }),
});

export const articlePosts = defineCollections({
  type: "doc",
  dir: "content/articles",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const researchPosts = defineCollections({
  type: "doc",
  dir: "content/research",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const resourcePosts = defineCollections({
  type: "doc",
  dir: "content/resources",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    thumbnail: z.string().optional(),
    icon: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const eventPosts = defineCollections({
  type: "doc",
  dir: "content/events",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
    location: z.string(),
    eventDate: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const projectPosts = defineCollections({
  type: "doc",
  dir: "content/projects",
  schema: frontmatterSchema.extend({
    role: z.string(),
    status: z.enum(["Active", "Open Source", "Stealth"]),
    tagline: z.string(),
    date: z.string().date().or(z.date()),
    logo: z.string().optional(),
    banner: z.string().optional(),
    images: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    people: z.array(z.string()).default([]),
    blogs: z.array(z.string()).default([]),
    articles: z.array(z.string()).default([]),
    guides: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const aboutPosts = defineCollections({
  type: "doc",
  dir: "content/about",
  schema: frontmatterSchema.extend({
    name: z.string(),
    tagline: z.string(),
    location: z.string().optional(),
    avatar: z.string().optional(),
    education: z
      .object({
        school: z.string(),
        program: z.string(),
        period: z.string(),
      })
      .optional(),
    focus: z.array(z.string()).default([]),
    certifications: z
      .array(z.object({ name: z.string(), issuer: z.string() }))
      .default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
  }),
});

export const biographyPosts = defineCollections({
  type: "doc",
  dir: "content/biography",
  schema: frontmatterSchema.extend({
    name: z.string(),
  }),
});

export const timelinePosts = defineCollections({
  type: "doc",
  dir: "content/timeline",
  schema: frontmatterSchema.extend({
    year: z.string(),
    type: z.enum([
      "milestone",
      "learning",
      "founding",
      "launch",
      "achievement",
    ]),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const referencePosts = defineCollections({
  type: "doc",
  dir: "content/references",
  schema: frontmatterSchema.extend({
    url: z.string().url(),
    source: z.string().optional(),
    favicon: z.string().optional(),
    date: z.string().date().or(z.date()),
    tags: z.array(z.string()).default([]),
  }),
});

export const experiencePosts = defineCollections({
  type: "doc",
  dir: "content/experience",
  schema: frontmatterSchema.extend({
    section: z.enum(["role", "contract", "project", "skill", "certification"]),
    order: z.number().default(0),
    company: z.string().optional(),
    role: z.string().optional(),
    period: z.string().optional(),
    status: z.string().optional(),
    featured: z.boolean().default(false),
    url: z.string().optional(),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    icon: z.string().optional(),
    items: z.array(z.string()).default([]),
  }),
});

export default defineConfig();
