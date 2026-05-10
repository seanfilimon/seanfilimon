import {
  blog,
  guides,
  articles,
  resources,
  events,
  projects,
  research,
  references as referencesSource,
} from "@/lib/source";
import { LandingPage } from "@/components/landing";
import type {
  ContentItem,
  ProjectItem,
  ResourceInfo,
  ReferenceItem,
} from "@/components/landing";

function getResourceMap(): Map<string, ResourceInfo> {
  const resourceMap = new Map<string, ResourceInfo>();
  resources.getPages().forEach((r) => {
    const slug = r.url.replace("/resources/", "");
    resourceMap.set(slug, {
      title: r.data.title as string,
      url: r.url,
      icon: r.data.icon as string | undefined,
    });
  });
  return resourceMap;
}

function serialize<
  T extends {
    url: string;
    data: {
      title: unknown;
      date: unknown;
      description?: unknown;
      thumbnail?: unknown;
      icon?: unknown;
      tags?: unknown;
      difficulty?: unknown;
      category?: unknown;
      location?: unknown;
      eventDate?: unknown;
      resource?: unknown;
    };
  },
>(
  pages: T[],
  type: string,
  resourceMap?: Map<string, ResourceInfo>,
): ContentItem[] {
  return pages
    .sort(
      (a, b) =>
        new Date(String(b.data.date)).getTime() -
        new Date(String(a.data.date)).getTime(),
    )
    .map((p) => {
      const resourceSlug = (p.data as Record<string, unknown>).resource as
        | string
        | undefined;
      const linkedResource =
        resourceSlug && resourceMap ? resourceMap.get(resourceSlug) : undefined;

      return {
        url: p.url,
        type,
        data: {
          title: p.data.title as string,
          description: p.data.description as string | undefined,
          date: String(p.data.date),
          thumbnail: p.data.thumbnail as string | undefined,
          icon: p.data.icon as string | undefined,
          tags: p.data.tags as string[] | undefined,
          difficulty: p.data.difficulty as string | undefined,
          category: p.data.category as string | undefined,
          location: p.data.location as string | undefined,
          eventDate: p.data.eventDate as string | undefined,
          linkedResource,
        },
      };
    });
}

export default function HomePage() {
  const resourceMap = getResourceMap();

  const blogItems = serialize(blog.getPages(), "blog", resourceMap);
  const guideItems = serialize(guides.getPages(), "guide", resourceMap);
  const articleItems = serialize(articles.getPages(), "article");
  const resourceItems = serialize(resources.getPages(), "resource");
  const eventItems = serialize(events.getPages(), "event");
  const researchItems = serialize(research.getPages(), "research");

  const allContent = [
    ...blogItems,
    ...guideItems,
    ...articleItems,
    ...resourceItems,
    ...eventItems,
    ...researchItems,
  ].sort(
    (a, b) =>
      new Date(b.data.date ?? 0).getTime() -
      new Date(a.data.date ?? 0).getTime(),
  );

  const projectItems: ProjectItem[] = projects
    .getPages()
    .sort(
      (a, b) =>
        new Date(b.data.date as string).getTime() -
        new Date(a.data.date as string).getTime(),
    )
    .map((p) => ({
      url: p.url,
      name: p.data.title as string,
      role: p.data.role as string,
      status: p.data.status as string,
      tagline: p.data.tagline as string,
      logo: (p.data.logo as string | undefined) ?? undefined,
    }));

  const referenceItems: ReferenceItem[] = referencesSource
    .getPages()
    .sort(
      (a, b) =>
        new Date(b.data.date as string).getTime() -
        new Date(a.data.date as string).getTime(),
    )
    .map((r) => {
      const url = r.data.url as string;
      const domain = new URL(url).hostname;
      return {
        title: r.data.title as string,
        url,
        description: r.data.description as string | undefined,
        source:
          (r.data.source as string | undefined) ?? domain.replace(/^www\./, ""),
        favicon:
          (r.data.favicon as string | undefined) ??
          `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      };
    });

  return (
    <LandingPage
      allContent={allContent}
      projects={projectItems}
      references={referenceItems}
    />
  );
}
