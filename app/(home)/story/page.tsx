import type { Metadata } from "next";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { timeline } from "@/lib/source";
import { StoryTimeline, type TimelineEntry } from "./timeline";

export const metadata: Metadata = {
  title: "My Story",
  description:
    "How Sean Filimon went from writing his first lines of code at 13 to founding multiple developer tool companies by 20.",
  keywords: "Sean Filimon, Sean F, story, journey, founder, developer, coding, entrepreneurship, timeline",
};

export default function StoryPage() {
  const pages = timeline.getPages();

  const entries: TimelineEntry[] = pages
    .sort((a, b) => {
      const orderA = (a.data as { order?: number }).order ?? 0;
      const orderB = (b.data as { order?: number }).order ?? 0;
      return orderA - orderB;
    })
    .map((page) => {
      const MDXContent = page.data.body;
      const data = page.data as {
        title: string;
        year: string;
        type: "milestone" | "learning" | "founding" | "launch" | "achievement";
        icon?: string;
      };

      return {
        year: data.year,
        title: data.title,
        type: data.type,
        icon: data.icon,
        content: <MDXContent components={defaultMdxComponents} />,
      };
    });

  return <StoryTimeline timeline={entries} />;
}
