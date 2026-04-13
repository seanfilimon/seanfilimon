import type { Metadata } from "next";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { experience } from "@/lib/source";
import {
  ExperiencePageClient,
  type ExperienceRole,
  type ExperienceProject,
  type ExperienceSkill,
  type ExperienceContract,
  type ExperienceCertification,
} from "./client";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Companies and projects Sean Filimon has founded, built, and contributed to.",
};

export default function ExperiencePage() {
  const pages = experience.getPages();

  const sorted = pages.sort((a, b) => {
    const orderA = (a.data as { order?: number }).order ?? 0;
    const orderB = (b.data as { order?: number }).order ?? 0;
    return orderA - orderB;
  });

  type ExperienceData = {
    title: string;
    section: "role" | "contract" | "project" | "skill" | "certification";
    order: number;
    company?: string;
    role?: string;
    period?: string;
    status?: string;
    featured?: boolean;
    url?: string;
    stack?: string[];
    highlights?: string[];
    icon?: string;
    items?: string[];
    body: React.FC<{ components?: Record<string, React.ComponentType<any>> }>;
  };

  let currentRole: ExperienceRole | null = null;
  const contracts: ExperienceContract[] = [];
  const projects: ExperienceProject[] = [];
  const skills: ExperienceSkill[] = [];
  const certifications: ExperienceCertification[] = [];

  for (const page of sorted) {
    const data = page.data as unknown as ExperienceData;
    const MDXContent = data.body;

    switch (data.section) {
      case "role": {
        if (data.featured || !currentRole) {
          currentRole = {
            company: data.company ?? data.title,
            role: data.role ?? "",
            period: data.period ?? "",
            description: data.title,
            highlights: data.highlights ?? [],
            status: data.status ?? "",
            content: <MDXContent components={defaultMdxComponents} />,
          };
        }
        break;
      }
      case "contract": {
        contracts.push({
          name: data.title,
          company: data.company,
          period: data.period,
          content: <MDXContent components={defaultMdxComponents} />,
        });
        break;
      }
      case "project": {
        projects.push({
          name: data.title,
          description: (page.data as { description?: string }).description ?? "",
          url: data.url,
          status: data.status ?? "",
          stack: data.stack ?? [],
        });
        break;
      }
      case "skill": {
        skills.push({
          category: data.title,
          items: data.items ?? [],
          icon: data.icon ?? "code",
        });
        break;
      }
      case "certification": {
        certifications.push({
          name: data.title,
          issuer: data.company ?? "",
        });
        break;
      }
    }
  }

  if (!currentRole) {
    throw new Error("No featured role found in experience content.");
  }

  const contractMeta = {
    role: "Software Engineer",
    period: "2020 — Present",
    status: "Ongoing",
  };

  return (
    <ExperiencePageClient
      currentRole={currentRole}
      contracts={contracts}
      contractMeta={contractMeta}
      projects={projects}
      skills={skills}
      certifications={certifications}
    />
  );
}
