import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { biography } from "@/lib/source";

export const metadata: Metadata = {
  title: "Autobiography",
  description:
    "The story of Sean Filimon — from writing his first line of JavaScript at 13 to founding multiple developer tool companies by 20.",
  keywords: "Sean Filimon, Sean F, autobiography, biography, founder, developer, coding journey, entrepreneurship, timeline",
};

export default function AutobiographyPage() {
  const page = biography.getPage([]);
  if (!page) notFound();

  const Mdx = page.data.body;

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-fd-border">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/upscale.png"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(0_0%_4%)_70%)]" />

        <div className="relative mx-auto flex w-full max-w-[90rem] flex-col items-center px-6 pb-14 pt-20 text-center">
          <Image
            src="/me.jpg"
            alt="Sean Filimon"
            width={96}
            height={96}
            className="border border-fd-border"
            priority
          />
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Sean Filimon
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-fd-muted-foreground">
            Entrepreneur, product engineer, and builder of developer tools.
            Writing code since 13, founding companies since 19.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["New Jersey", "Tennessee", "Florida", "Texas", "California"].map(
              (place) => (
                <span
                  key={place}
                  className="border border-fd-border px-3 py-1 text-xs font-medium text-fd-muted-foreground"
                >
                  {place}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[90rem] px-6 py-16">
        <article className="prose prose-invert max-w-none text-[16px] leading-[1.8] [&>h2]:mb-4 [&>h2]:mt-14 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:tracking-tight [&>p]:text-fd-muted-foreground">
          <Mdx components={defaultMdxComponents} />
        </article>
      </section>

      <section className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-[90rem] px-6 py-12">
          <div className="space-y-px overflow-hidden border border-fd-border bg-fd-border">
            {[
              { year: "2005", text: "Born in New Jersey" },
              { year: "2012", text: "Diagnosed with high-functioning autism at age 7" },
              { year: "2018", text: "Wrote first code at 13 after watching brother build apps" },
              { year: "2020", text: "First paid contract at 15 — websites for YouTubers" },
              { year: "2020–22", text: "Two years freelancing: websites, platforms, dashboards" },
              { year: "2025", text: "Founded LegionEdge — parent company of Nokuva, Foltrac, Tavoc, and W0rktree" },
              { year: "2026", text: "Running LegionEdge and all its products. Still 20. Still building." },
            ].map((entry) => (
              <div key={entry.year} className="flex gap-6 bg-fd-card p-5">
                <span className="w-16 shrink-0 text-right text-sm font-bold tabular-nums text-fd-muted-foreground">
                  {entry.year}
                </span>
                <p className="text-[15px] leading-relaxed">{entry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
