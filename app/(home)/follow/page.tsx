import type { Metadata } from "next";
import { 
  IoLogoGithub, 
  IoLogoLinkedin, 
  IoLogoTwitter, 
  IoLogoYoutube, 
  IoLogoTiktok,
  IoLogoInstagram,
  IoLogoFacebook
} from "react-icons/io5";

export const metadata: Metadata = {
  title: "Follow Me",
  description: "Connect with Sean Filimon on social media and stay updated on the latest projects and content.",
};

const SOCIALS = [
  {
    name: "GitHub",
    handle: "@seanfilimon",
    url: "https://github.com/seanfilimon",
    icon: IoLogoGithub,
    followers: "1.2K",
  },
  {
    name: "YouTube",
    handle: "@SeanFilimon",
    url: "https://youtube.com/@SeanFilimon",
    icon: IoLogoYoutube,
    followers: "New",
  },
  {
    name: "LinkedIn",
    handle: "seanfilimon",
    url: "https://linkedin.com/in/seanfilimon",
    icon: IoLogoLinkedin,
    followers: "500+",
  },
  {
    name: "X",
    handle: "@SeanFilimon",
    url: "https://x.com/SeanFilimon",
    icon: IoLogoTwitter,
    followers: "Growing",
  },
  {
    name: "TikTok",
    handle: "@seanfilimon",
    url: "https://tiktok.com/@seanfilimon",
    icon: IoLogoTiktok,
    followers: "New",
  },
  {
    name: "Instagram",
    handle: "@seanfilimon",
    url: "https://instagram.com/seanfilimon",
    icon: IoLogoInstagram,
    followers: "New",
  },
  {
    name: "Facebook",
    handle: "seanfilimon",
    url: "https://facebook.com/seanfilimon",
    icon: IoLogoFacebook,
    followers: "New",
  },
];

export default function FollowPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24 sm:py-32">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Let&apos;s Connect</h1>
        <p className="mx-auto mt-4 max-w-lg text-fd-muted-foreground">
          Follow my journey building the future of software engineering.
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-16 space-y-3">
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-accent/50"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-fd-border bg-fd-background text-fd-muted-foreground transition-colors group-hover:border-fd-muted-foreground group-hover:text-fd-foreground">
              <social.icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{social.name}</span>
                <span className="text-sm text-fd-muted-foreground">{social.handle}</span>
              </div>
            </div>
            <span className="shrink-0 text-xs text-fd-muted-foreground">{social.followers}</span>
            <svg 
              className="h-4 w-4 shrink-0 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-fd-foreground" 
              viewBox="0 0 16 16" 
              fill="none"
            >
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-12 text-center text-sm text-fd-muted-foreground">
        I share insights on AI, developer tools, and building software.
      </p>
    </main>
  );
}
