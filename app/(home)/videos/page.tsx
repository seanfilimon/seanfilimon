import type { Metadata } from "next";
import Link from "next/link";
import { IoLogoYoutube } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch videos from Sean Filimon on YouTube covering developer tools, coding tutorials, and tech insights.",
  keywords: "Sean Filimon, Sean F, videos, YouTube, tutorials, coding, developer tools, tech, education",
};

const YOUTUBE_CHANNEL = "https://youtube.com/@SeanFilimon";

const FEATURED = {
  id: "RqnZIJA4kbM",
  title: "LegionEdge advances custom AI models with AMD",
  description:
    "AMD's video on LegionEdge and the custom AI models we build, published on AMD's YouTube channel.",
};

export default function VideosPage() {
  return (
    <main className="mx-auto w-full max-w-[90rem] px-6 py-16">
      <div className="flex items-center gap-3">
        <IoLogoYoutube className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
      </div>
      <p className="mt-2 mb-10 max-w-2xl text-fd-muted-foreground">
        I create videos about developer tools, coding tutorials, building products, and sharing what I learn along the way.
      </p>

      <div className="mb-10">
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-red-500 bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-600"
        >
          <IoLogoYoutube className="h-5 w-5" />
          Subscribe on YouTube
        </a>
      </div>

      <section aria-labelledby="featured-video" className="max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
          Featured
        </p>
        <h2 id="featured-video" className="mt-2 text-xl font-semibold tracking-tight">
          {FEATURED.title}
        </h2>
        <p className="mt-2 text-fd-muted-foreground">{FEATURED.description}</p>
        <div className="relative mt-6 aspect-video overflow-hidden rounded-lg border border-fd-border bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${FEATURED.id}?rel=0`}
            title={FEATURED.title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${FEATURED.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Watch on YouTube →
        </a>
      </section>
    </main>
  );
}
