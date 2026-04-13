import type { ReactNode } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  User,
  Briefcase,
  BookOpen,
  FolderKanban,
  Video,
} from "lucide-react";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";

const iconProps = { size: 15, strokeWidth: 1.75 } as const;

const navTitle = (
  <span className="flex items-center gap-2.5">
    <Image
      src="/me.jpg"
      alt="Sean Filimon"
      width={28}
      height={28}
      className="border border-fd-border"
    />
    <span className="text-base font-bold tracking-tight">Sean Filimon</span>
  </span>
);

const navItems = [
  { text: "About", url: "/about", icon: <User {...iconProps} /> },
  { text: "Experience", url: "/experience", icon: <Briefcase {...iconProps} /> },
  { text: "Story", url: "/story", icon: <BookOpen {...iconProps} /> },
  { text: "Projects", url: "/projects", icon: <FolderKanban {...iconProps} /> },
  { text: "Videos", url: "/videos", icon: <Video {...iconProps} /> },
];

const stats = [
  { label: "Projects", value: "8+" },
  { label: "Years", value: "8+" },
  { label: "Articles", value: "50+" },
];

const socials = [
  { label: "GitHub", url: "https://github.com/seanfilimon", icon: <IoLogoGithub className="h-4 w-4" /> },
  { label: "YouTube", url: "https://youtube.com/@SeanFilimon", icon: <IoLogoYoutube className="h-4 w-4" /> },
  { label: "LinkedIn", url: "https://linkedin.com/in/seanfilimon", icon: <IoLogoLinkedin className="h-4 w-4" /> },
  { label: "X", url: "https://x.com/SeanFilimon", icon: <IoLogoTwitter className="h-4 w-4" /> },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col pt-14">
      <Navbar
        title={navTitle}
        navItems={navItems}
        stats={stats}
        socials={socials}
      />
      {children}
    </main>
  );
}
