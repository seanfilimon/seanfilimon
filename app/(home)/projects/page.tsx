import type { Metadata } from "next";
import { orderedProjects, blog, articles, guides } from "@/lib/source";
import { ProjectsClient } from "./client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Companies and open source projects Sean Filimon has founded and built.",
  keywords: "Sean Filimon, Sean F, projects, LegionEdge, Nokuva, Foltrac, Tavoc, W0rktree, open source, developer tools, version control, design editor, deployment",
};

export interface ContentItem {
  url: string;
  title: string;
  description?: string;
  type: "blog" | "article" | "guide";
  date?: string;
  tags?: string[];
  projectSlug: string;
  projectName: string;
  projectLogo?: string;
}

export interface ProjectItem {
  url: string;
  slug: string;
  name: string;
  tagline: string;
  logo?: string;
  status: string;
  role: string;
  stack: string[];
}

export default function ProjectsIndex() {
  const allProjects: ProjectItem[] = [];
  const allContent: ContentItem[] = [];

  orderedProjects()
    .forEach((p) => {
      const projectSlug = p.slugs[0];
      const projectName = p.data.title;
      const projectLogo = p.data.logo;

      allProjects.push({
        url: p.url,
        slug: projectSlug,
        name: projectName,
        tagline: p.data.tagline as string,
        logo: projectLogo as string | undefined,
        status: p.data.status as string,
        role: p.data.role as string,
        stack: (p.data.stack as string[]) || [],
      });

      // Get linked blogs
      const blogSlugs = (p.data.blogs as string[]) || [];
      blogSlugs.forEach((slug) => {
        const post = blog.getPage([slug]);
        if (post) {
          allContent.push({
            url: post.url,
            title: post.data.title,
            description: post.data.description,
            type: "blog",
            date: post.data.date as string,
            tags: post.data.tags as string[] | undefined,
            projectSlug,
            projectName,
            projectLogo: projectLogo as string | undefined,
          });
        }
      });

      // Get linked articles
      const articleSlugs = (p.data.articles as string[]) || [];
      articleSlugs.forEach((slug) => {
        const post = articles.getPage([slug]);
        if (post) {
          allContent.push({
            url: post.url,
            title: post.data.title,
            description: post.data.description,
            type: "article",
            date: post.data.date as string,
            tags: post.data.tags as string[] | undefined,
            projectSlug,
            projectName,
            projectLogo: projectLogo as string | undefined,
          });
        }
      });

      // Get linked guides
      const guideSlugs = (p.data.guides as string[]) || [];
      guideSlugs.forEach((slug) => {
        const post = guides.getPage([slug]);
        if (post) {
          allContent.push({
            url: post.url,
            title: post.data.title,
            description: post.data.description,
            type: "guide",
            date: post.data.date as string,
            tags: post.data.tags as string[] | undefined,
            projectSlug,
            projectName,
            projectLogo: projectLogo as string | undefined,
          });
        }
      });
    });

  // Sort content by date
  allContent.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return <ProjectsClient projects={allProjects} content={allContent} />;
}
