import type { MetadataRoute } from "next";
import { source, blog, guides, articles, resources, events, projects } from "@/lib/source";
import { siteUrl } from "@/lib/metadata";

function mapPages(
  pages: { url: string; data: unknown }[],
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  return pages.map((page) => {
    const data = page.data as Record<string, unknown>;
    const date = data.date;
    return {
      url: `${siteUrl}${page.url}`,
      lastModified: date ? new Date(String(date)) : undefined,
      changeFrequency,
      priority,
    };
  });
}

function dedupe(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const normalized = entry.url.replace(/\/+$/, "");
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/story`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/autobiography`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/experience`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/projects`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/follow`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/videos`, changeFrequency: "daily", priority: 0.6 },
  ];

  const all: MetadataRoute.Sitemap = [
    ...staticPages,
    ...mapPages(source.getPages(), "daily", 0.7),
    ...mapPages(blog.getPages(), "daily", 0.8),
    ...mapPages(guides.getPages(), "daily", 0.8),
    ...mapPages(articles.getPages(), "daily", 0.8),
    ...mapPages(resources.getPages(), "weekly", 0.7),
    ...mapPages(events.getPages(), "weekly", 0.5),
    ...mapPages(projects.getPages(), "daily", 0.7),
  ];

  return dedupe(all);
}
