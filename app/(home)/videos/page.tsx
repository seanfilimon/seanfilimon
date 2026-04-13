import type { Metadata } from "next";
import Link from "next/link";
import { IoLogoYoutube, IoPlayOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch videos from Sean Filimon on YouTube covering developer tools, coding tutorials, and tech insights.",
  keywords: "Sean Filimon, Sean F, videos, YouTube, tutorials, coding, developer tools, tech, education",
};

const YOUTUBE_CHANNEL = "https://youtube.com/@SeanFilimon";

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

      <div className="rounded-lg border border-fd-border bg-fd-muted/20 p-12 text-center">
        <IoPlayOutline className="mx-auto h-16 w-16 text-fd-muted-foreground/50" />
        <h2 className="mt-4 text-lg font-semibold">Videos Coming Soon</h2>
        <p className="mt-2 text-sm text-fd-muted-foreground">
          Check back later for video content, or subscribe to my YouTube channel to get notified when new videos are posted.
        </p>
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          Visit YouTube Channel →
        </a>
      </div>
    </main>
  );
}
