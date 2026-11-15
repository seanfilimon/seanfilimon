import {
  source,
  blog,
  guides,
  articles,
  resources,
  events,
  projects,
} from "@/lib/source";
import { siteUrl, siteName, siteDescription } from "@/lib/metadata";
import { renderNetworkHighlights } from "@/lib/network";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const revalidate = false;

const aboutContent = readFileSync(
  join(process.cwd(), "About_SeanFilimon.md"),
  "utf-8",
);
const guidelinesContent = readFileSync(
  join(process.cwd(), "Content_Guidelines.md"),
  "utf-8",
);

export function GET() {
  const sections: { label: string; pages: { title: string; url: string }[] }[] =
    [
      {
        label: "Projects",
        pages: projects.getPages().map((p) => ({
          title: p.data.title,
          url: `${siteUrl}${p.url}`,
        })),
      },
      {
        label: "Blog",
        pages: blog.getPages().map((p) => ({
          title: p.data.title,
          url: `${siteUrl}${p.url}`,
        })),
      },
      {
        label: "Guides",
        pages: guides.getPages().map((p) => ({
          title: p.data.title,
          url: `${siteUrl}${p.url}`,
        })),
      },
      {
        label: "Articles",
        pages: articles.getPages().map((p) => ({
          title: p.data.title,
          url: `${siteUrl}${p.url}`,
        })),
      },
      {
        label: "Resources",
        pages: resources.getPages().map((p) => ({
          title: p.data.title,
          url: `${siteUrl}${p.url}`,
        })),
      },
      {
        label: "Events",
        pages: events.getPages().map((p) => ({
          title: p.data.title,
          url: `${siteUrl}${p.url}`,
        })),
      },
      {
        label: "Docs",
        pages: source.getPages().map((p) => ({
          title: p.data.title,
          url: `${siteUrl}${p.url}`,
        })),
      },
    ];

  const lines = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    aboutContent,
    "",
    "---",
    "",
    renderNetworkHighlights(`${siteUrl}/llms-full.txt`),
    "",
    "---",
    "",
    guidelinesContent,
    "",
    "---",
    "",
    ...sections.flatMap((section) => {
      if (section.pages.length === 0) return [];
      return [
        `## ${section.label}`,
        "",
        ...section.pages.map((p) => `- [${p.title}](${p.url})`),
        "",
      ];
    }),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain" },
  });
}
