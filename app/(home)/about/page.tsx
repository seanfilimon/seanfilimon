import type { Metadata } from "next";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { about } from "@/lib/source";
import { notFound } from "next/navigation";
import { AboutClient } from "./client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sean Filimon is a 20-year-old product engineer and entrepreneur building developer tools, distributed systems, and AI-powered platforms.",
};

type AboutData = {
  title: string;
  description?: string;
  name: string;
  tagline: string;
  location?: string;
  avatar?: string;
  education?: { school: string; program: string; period: string };
  focus: string[];
  certifications: { name: string; issuer: string }[];
  links: { label: string; href: string }[];
  body: React.FC<{ components?: Record<string, React.ComponentType<any>> }>;
};

export default function AboutPage() {
  const pages = about.getPages();
  const page = pages[0];
  if (!page) notFound();

  const data = page.data as unknown as AboutData;
  const MDXContent = data.body;

  return (
    <AboutClient
      name={data.name}
      tagline={data.tagline}
      location={data.location}
      avatar={data.avatar}
      education={data.education}
      focus={data.focus}
      certifications={data.certifications}
      links={data.links}
      bio={<MDXContent components={defaultMdxComponents} />}
    />
  );
}
