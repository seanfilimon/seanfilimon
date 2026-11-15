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
import { networkSummary, renderNetwork } from "@/lib/network";

export const revalidate = false;

interface PageLike {
  url: string;
  data: {
    title: string;
    description?: string;
    structuredData?: {
      headings: { id: string; content: string }[];
      contents: { heading: string | undefined; content: string }[];
    };
    [key: string]: unknown;
  };
}

function renderPage(page: PageLike): string {
  const parts: string[] = [`# ${page.data.title} (${siteUrl}${page.url})`];

  if (page.data.description) {
    parts.push("", page.data.description);
  }

  const sd = page.data.structuredData;
  if (sd && sd.contents.length > 0) {
    for (const block of sd.contents) {
      if (block.heading) {
        parts.push("", `## ${block.heading}`);
      }
      if (block.content) {
        parts.push("", block.content);
      }
    }
  }

  return parts.join("\n");
}

export function GET() {
  const collections: { label: string; pages: PageLike[] }[] = [
    { label: "Projects", pages: projects.getPages() as unknown as PageLike[] },
    { label: "Blog", pages: blog.getPages() as unknown as PageLike[] },
    { label: "Guides", pages: guides.getPages() as unknown as PageLike[] },
    { label: "Articles", pages: articles.getPages() as unknown as PageLike[] },
    { label: "Resources", pages: resources.getPages() as unknown as PageLike[] },
    { label: "Events", pages: events.getPages() as unknown as PageLike[] },
    { label: "Docs", pages: source.getPages() as unknown as PageLike[] },
  ];

  const sections = collections
    .filter((c) => c.pages.length > 0)
    .map(
      (c) =>
        `${"=".repeat(60)}\n${c.label.toUpperCase()}\n${"=".repeat(60)}\n\n${c.pages.map(renderPage).join("\n\n---\n\n")}`,
    );

  const header = [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    `Full content from ${collections.reduce((sum, c) => sum + c.pages.length, 0)} pages.`,
    "",
    `${networkSummary} The full list is in the NETWORK section at the end.`,
  ].join("\n");

  // Last, so the site's own pages are read before two thousand names.
  const networkSection = `${"=".repeat(60)}\nNETWORK\n${"=".repeat(60)}\n\n${renderNetwork()}`;

  const content = [header, "", ...sections, networkSection].join("\n\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
