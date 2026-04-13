import type { MetadataRoute } from "next";
import { source, blog, guides, articles, resources, events } from "@/lib/source";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/articles`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/resources`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/events`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const docsPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blog.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const resourcePages: MetadataRoute.Sitemap = resources.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const eventPages: MetadataRoute.Sitemap = events.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...docsPages,
    ...blogPages,
    ...guidePages,
    ...articlePages,
    ...resourcePages,
    ...eventPages,
  ];
}
