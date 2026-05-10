import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { research } from "@/lib/source";
import { siteUrl } from "@/lib/metadata";
import { ResearchGrid } from "./research-grid";

export const metadata: Metadata = {
  title: "Research — Sean Filimon",
  description: "AI research findings, discoveries, and explorations in multi-agent systems, language models, and design intelligence.",
  openGraph: {
    title: "Research — Sean Filimon",
    description: "AI research findings, discoveries, and explorations in multi-agent systems, language models, and design intelligence.",
    url: `${siteUrl}/research`,
  },
  alternates: {
    canonical: `${siteUrl}/research`,
  },
};

export default function ResearchPage() {
  const items = research
    .getPages()
    .sort(
      (a, b) =>
        new Date(String(b.data.date)).getTime() -
        new Date(String(a.data.date)).getTime()
    )
    .map((p) => ({
      url: p.url,
      title: p.data.title as string,
      description: p.data.description as string | undefined,
      date: String(p.data.date),
      thumbnail: p.data.thumbnail as string | undefined,
      tags: p.data.tags as string[] | undefined,
    }));

  return (
    <main className="mx-auto w-full max-w-[90rem] px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Research</h1>
        <p className="mt-2 text-fd-muted-foreground">
          AI findings, discoveries, and explorations.
        </p>
      </header>
      <ResearchGrid items={items} />
    </main>
  );
}
