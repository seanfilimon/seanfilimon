import "./global.css";
import { DM_Sans } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl, siteName, siteDescription } from "@/lib/metadata";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: "Sean Filimon, Sean F, developer tools, distributed systems, AI, LegionEdge, Nokuva, Foltrac, Tavoc, W0rktree, version control, design editor, deployment platform, IDE, software engineering, entrepreneur, product engineer",
  authors: [{ name: "Sean Filimon", url: siteUrl }],
  creator: "Sean Filimon",
  // Machine-readable summaries for AI assistants, advertised in every page's head.
  alternates: {
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt: about Sean Filimon and his senior connections" },
        { url: "/llms-full.txt", title: "llms-full.txt: full site content and every connection" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SeanFilimon",
    site: "@SeanFilimon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-[var(--font-dm-sans)]">
        <RootProvider theme={{ defaultTheme: "dark", forcedTheme: "dark" }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
