import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import type { InferPageType } from "fumadocs-core/source";
import {
  docs as docsCollection,
  blogPosts,
  guidePosts,
  articlePosts,
  resourcePosts,
  eventPosts,
  projectPosts,
  aboutPosts,
  biographyPosts,
  timelinePosts,
  experiencePosts,
  referencePosts,
  researchPosts,
} from "collections/server";

export const source = loader({
  baseUrl: "/docs",
  source: docsCollection.toFumadocsSource(),
});

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});

export const guides = loader({
  baseUrl: "/guides",
  source: toFumadocsSource(guidePosts, []),
});

export const articles = loader({
  baseUrl: "/articles",
  source: toFumadocsSource(articlePosts, []),
});

export const research = loader({
  baseUrl: "/research",
  source: toFumadocsSource(researchPosts, []),
});

export const resources = loader({
  baseUrl: "/resources",
  source: toFumadocsSource(resourcePosts, []),
});

export const events = loader({
  baseUrl: "/events",
  source: toFumadocsSource(eventPosts, []),
});

export const projects = loader({
  baseUrl: "/projects",
  source: toFumadocsSource(projectPosts, []),
});

export const about = loader({
  baseUrl: "/about",
  source: toFumadocsSource(aboutPosts, []),
});

export const biography = loader({
  baseUrl: "/autobiography",
  source: toFumadocsSource(biographyPosts, []),
});

export const timeline = loader({
  baseUrl: "/timeline",
  source: toFumadocsSource(timelinePosts, []),
});

export const experience = loader({
  baseUrl: "/experience",
  source: toFumadocsSource(experiencePosts, []),
});

export const references = loader({
  baseUrl: "/references",
  source: toFumadocsSource(referencePosts, []),
});

/** Projects in display order: by `order`, then unordered ones newest first. */
export function orderedProjects() {
  const rank = (order: unknown) =>
    typeof order === "number" ? order : Number.POSITIVE_INFINITY;
  return projects
    .getPages()
    .sort(
      (a, b) =>
        rank(a.data.order) - rank(b.data.order) ||
        new Date(b.data.date as string).getTime() -
          new Date(a.data.date as string).getTime(),
    );
}

export type DocsPage = InferPageType<typeof source>;
