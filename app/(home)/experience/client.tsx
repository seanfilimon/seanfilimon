"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import {
  IoRocketOutline,
  IoCodeSlashOutline,
  IoServerOutline,
  IoGlobeOutline,
  IoBriefcaseOutline,
  IoArrowForwardOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const ease = [0.25, 0.1, 0.25, 1] as const;

const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

const blurUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const smoothTransition = { duration: 0.6, ease };

function useReveal(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin });
  return { ref, isInView };
}

export interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  status: string;
  content: ReactNode;
}

export interface ExperienceProject {
  name: string;
  description: string;
  url?: string;
  status: string;
  stack: string[];
}

export interface ExperienceSkill {
  category: string;
  items: string[];
  icon: string;
}

export interface ExperienceContract {
  name: string;
  company?: string;
  period?: string;
  content: ReactNode;
}

export interface ExperienceCertification {
  name: string;
  issuer: string;
}

interface ExperiencePageProps {
  currentRole: ExperienceRole;
  contracts: ExperienceContract[];
  contractMeta: { role: string; period: string; status: string };
  projects: ExperienceProject[];
  skills: ExperienceSkill[];
  certifications: ExperienceCertification[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  code: IoCodeSlashOutline,
  server: IoServerOutline,
  globe: IoGlobeOutline,
  rocket: IoRocketOutline,
  shield: IoShieldCheckmarkOutline,
  briefcase: IoBriefcaseOutline,
};

function ExperienceHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-fd-border">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/nokuva/nokuva-bg.png"
          alt=""
          fill
          className="object-cover opacity-[0.25]"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(0_0%_4%)_70%)]" />

      <motion.div style={{ opacity, y }} className="relative mx-auto flex w-full max-w-[90rem] flex-col px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease }}
          className="gpu will-change-filter flex items-center gap-3"
        >
          <span className="h-px w-12 bg-fd-muted-foreground/30" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
            7+ Years Building Software
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="gpu will-change-filter mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.16, ease }}
          className="gpu will-change-filter mt-5 max-w-xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg"
        >
          Developer tools, cloud platforms, distributed systems, and production
          infrastructure. From writing code at 13 to founding multiple
          companies by 20.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.24, ease }}
          className="gpu will-change-filter mt-10 flex items-center gap-6 text-sm text-fd-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-fd-foreground" />
            <span className="tabular-nums">5 companies</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-fd-foreground" />
            <span className="tabular-nums">6+ contract projects</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-fd-foreground" />
            <span className="tabular-nums">4 certifications</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CurrentRoleSection({ role }: { role: ExperienceRole }) {
  const { ref, isInView } = useReveal();

  return (
    <section className="border-b border-fd-border">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:py-24">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter flex items-center gap-3">
            <span className="h-px w-8 bg-fd-muted-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              Current Role
            </span>
          </motion.div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
            <motion.div variants={blurUp} transition={smoothTransition} className="gpu will-change-filter">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{role.company}</h2>
                <span className="border border-fd-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                  {role.status}
                </span>
              </div>
              <p className="mt-2 text-lg text-fd-muted-foreground">{role.role}</p>
              <p className="mt-1 text-sm text-fd-muted-foreground/60">{role.period}</p>
              <div className="mt-6 max-w-lg prose prose-sm prose-invert prose-p:leading-relaxed prose-p:text-fd-muted-foreground prose-strong:text-fd-foreground">
                {role.content}
              </div>
            </motion.div>

            <motion.div variants={blurUp} transition={{ ...smoothTransition, delay: 0.1 }} className="gpu will-change-filter">
              <div className="space-y-px overflow-hidden border border-fd-border bg-fd-border">
                {role.highlights.map((highlight, i) => (
                  <div key={i} className="bg-fd-card px-5 py-4">
                    <div className="flex gap-3">
                      <span className="mt-1 text-sm font-semibold tabular-nums text-fd-muted-foreground/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14px] leading-relaxed text-fd-muted-foreground">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContractWorkSection({
  contracts,
  meta,
}: {
  contracts: ExperienceContract[];
  meta: { role: string; period: string; status: string };
}) {
  const { ref, isInView } = useReveal();

  return (
    <section className="border-b border-fd-border">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:py-24">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter flex items-center gap-3">
            <span className="h-px w-8 bg-fd-muted-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              Contract &amp; Freelance
            </span>
          </motion.div>

          <motion.div variants={blurUp} transition={smoothTransition} className="gpu will-change-filter mt-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{meta.role}</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-fd-muted-foreground/60">{meta.period}</span>
              <span className="border border-fd-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                {meta.status}
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            className="mt-8 grid gap-px overflow-hidden border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {contracts.map((contract) => (
              <motion.div
                key={contract.name}
                variants={blurUp}
                transition={smoothTransition}
                className="gpu will-change-filter flex flex-col bg-fd-card p-5"
              >
                <h3 className="text-sm font-semibold tracking-tight">{contract.name}</h3>
                {contract.company && (
                  <p className="mt-0.5 text-[11px] text-fd-muted-foreground/50">{contract.company}{contract.period ? ` · ${contract.period}` : ""}</p>
                )}
                <div className="mt-2 flex-1 prose prose-sm prose-invert prose-p:text-[13px] prose-p:leading-relaxed prose-p:text-fd-muted-foreground">
                  {contract.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: ExperienceProject;
  featured?: boolean;
}) {
  const Wrapper = project.url ? Link : "div";
  const wrapperProps = project.url ? { href: project.url } : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={`group flex h-full flex-col bg-fd-card transition-colors hover:bg-fd-accent/30 ${
        featured ? "p-6 sm:p-8" : "p-5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`font-bold tracking-tight transition-colors group-hover:text-fd-primary ${featured ? "text-xl sm:text-2xl" : "text-sm"}`}>
            {project.name}
          </span>
        </div>
        <span className="mt-0.5 shrink-0 border border-fd-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-fd-muted-foreground">
          {project.status}
        </span>
      </div>

      <p className={`mt-3 flex-1 leading-relaxed text-fd-muted-foreground ${featured ? "max-w-md text-[15px]" : "text-[13px] line-clamp-2"}`}>
        {project.description}
      </p>

      {project.stack.length > 0 && (
        <div className={`flex flex-wrap gap-1.5 ${featured ? "mt-6" : "mt-4"}`}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-fd-border px-2 py-0.5 text-[10px] text-fd-muted-foreground transition-colors group-hover:text-fd-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className={`flex items-center gap-1.5 text-fd-muted-foreground/40 transition-colors group-hover:text-fd-foreground ${featured ? "mt-6" : "mt-4"}`}>
        <span className="text-[11px] font-medium">View project</span>
        <IoArrowForwardOutline className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Wrapper>
  );
}

function ProjectsSection({ projects }: { projects: ExperienceProject[] }) {
  const { ref, isInView } = useReveal();
  const [featured, ...rest] = projects;

  return (
    <section className="border-b border-fd-border">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:py-24">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex items-end justify-between">
            <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter flex items-center gap-3">
              <span className="h-px w-8 bg-fd-muted-foreground/30" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
                Companies &amp; Projects
              </span>
            </motion.div>
            <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter">
              <Link
                href="/projects"
                className="group flex items-center gap-1.5 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
              >
                View all
                <IoArrowForwardOutline className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-fd-border bg-fd-border lg:grid-cols-[1fr_1fr]">
            <motion.div
              variants={blurUp}
              transition={smoothTransition}
              className="gpu will-change-filter row-span-2"
            >
              <ProjectCard project={featured} featured />
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-px bg-fd-border sm:grid-cols-2"
            >
              {rest.map((project) => (
                <motion.div
                  key={project.name}
                  variants={blurUp}
                  transition={smoothTransition}
                  className="gpu will-change-filter"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection({
  skills,
  certifications,
}: {
  skills: ExperienceSkill[];
  certifications: ExperienceCertification[];
}) {
  const { ref, isInView } = useReveal();
  const certRef = useRef<HTMLDivElement>(null);
  const certInView = useInView(certRef, { once: true, margin: "-80px" });

  const leftCol = skills.filter((_, i) => i % 2 === 0);
  const rightCol = skills.filter((_, i) => i % 2 === 1);

  return (
    <section>
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:py-24">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter flex items-center gap-3">
            <span className="h-px w-8 bg-fd-muted-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              Technical Skills
            </span>
          </motion.div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[leftCol, rightCol].map((col, colIdx) => (
              <motion.div
                key={colIdx}
                variants={stagger}
                className={`flex flex-col gap-6 ${colIdx === 1 ? "lg:mt-12" : ""}`}
              >
                {col.map((skill) => {
                  const Icon = ICON_MAP[skill.icon] || IoCodeSlashOutline;
                  return (
                    <motion.div
                      key={skill.category}
                      variants={blurUp}
                      transition={smoothTransition}
                      className="gpu will-change-filter group border border-fd-border bg-fd-card p-6 transition-colors hover:bg-fd-accent/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center border border-fd-border bg-fd-background text-fd-muted-foreground transition-colors group-hover:border-fd-foreground/20 group-hover:text-fd-foreground">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold tracking-tight">{skill.category}</h3>
                          <p className="text-[11px] text-fd-muted-foreground/50">
                            {skill.items.length} {skill.items.length === 1 ? "skill" : "skills"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span
                            key={item}
                            className="border border-fd-border bg-fd-background px-2.5 py-1 text-[12px] text-fd-muted-foreground transition-colors group-hover:text-fd-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={certRef}
          variants={stagger}
          initial="hidden"
          animate={certInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter flex items-center gap-3">
            <span className="h-px w-8 bg-fd-muted-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              Certifications
            </span>
          </motion.div>

          <motion.div
            variants={stagger}
            className="mt-6 grid gap-px overflow-hidden border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={blurUp}
                transition={smoothTransition}
                className="gpu will-change-filter flex items-center gap-3 bg-fd-card px-4 py-4"
              >
                <IoShieldCheckmarkOutline className="h-4 w-4 shrink-0 text-fd-muted-foreground/50" />
                <div>
                  <span className="text-[13px] leading-snug text-fd-muted-foreground">{cert.name}</span>
                  <span className="ml-1 text-[11px] text-fd-muted-foreground/40">({cert.issuer})</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-24 border-t border-fd-border pt-16"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <p className="text-[15px] leading-relaxed text-fd-muted-foreground">
                Interested in my full story? I did not follow a traditional
                path. No CS degree, no big-company internships. I learned by
                building, shipping, and fixing what broke.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/story"
                className="group flex items-center gap-2 border border-fd-foreground bg-fd-foreground px-5 py-2.5 text-sm font-medium text-fd-background transition-all hover:bg-transparent hover:text-fd-foreground"
              >
                My Story
                <IoArrowForwardOutline className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent/30 hover:text-fd-foreground"
              >
                About Me
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ExperiencePageClient({
  currentRole,
  contracts,
  contractMeta,
  projects,
  skills,
  certifications,
}: ExperiencePageProps) {
  return (
    <main className="flex flex-1 flex-col">
      <ExperienceHero />
      <CurrentRoleSection role={currentRole} />
      <ContractWorkSection contracts={contracts} meta={contractMeta} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} certifications={certifications} />
    </main>
  );
}
