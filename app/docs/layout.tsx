import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Sean Filimon",
  },
  githubUrl: "https://github.com/seanfilimon",
  links: [
    { text: "Blog", url: "/blog" },
    { text: "Guides", url: "/guides" },
    { text: "Home", url: "/" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
