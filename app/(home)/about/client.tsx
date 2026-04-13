"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  IoArrowForwardOutline,
  IoLocationOutline,
  IoSchoolOutline,
  IoShieldCheckmarkOutline,
  IoOpenOutline,
} from "react-icons/io5";

const ease = [0.25, 0.1, 0.25, 1] as const;

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

interface AboutClientProps {
  name: string;
  tagline: string;
  location?: string;
  avatar?: string;
  education?: { school: string; program: string; period: string };
  focus: string[];
  certifications: { name: string; issuer: string }[];
  links: { label: string; href: string }[];
  bio: ReactNode;
}

export function AboutClient({
  name,
  tagline,
  location,
  avatar,
  education,
  focus,
  certifications,
  links,
  bio,
}: AboutClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <main className="flex flex-1 flex-col">
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden border-b border-fd-border">
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

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative mx-auto flex w-full max-w-[90rem] flex-col gap-12 px-6 py-20 sm:py-24 lg:flex-row lg:items-center lg:gap-16 lg:py-32"
        >
          {/* Text */}
          <div className="flex flex-1 flex-col">
            <motion.div
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease }}
              className="gpu will-change-filter flex items-center gap-3"
            >
              <span className="h-px w-12 bg-fd-muted-foreground/30" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
                About
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, filter: "blur(16px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="gpu will-change-filter mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="gpu will-change-filter mt-3 text-lg text-fd-muted-foreground"
            >
              {tagline}
            </motion.p>

            {location && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.22, ease }}
                className="gpu will-change-filter mt-5 flex items-center gap-2 text-sm text-fd-muted-foreground/70"
              >
                <IoLocationOutline className="h-4 w-4" />
                {location}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
              className="gpu will-change-filter mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/story"
                className="group flex items-center gap-2 border border-fd-foreground bg-fd-foreground px-5 py-2.5 text-sm font-medium text-fd-background transition-all hover:bg-transparent hover:text-fd-foreground"
              >
                My Story
                <IoArrowForwardOutline className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/experience"
                className="flex items-center gap-2 border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent/30 hover:text-fd-foreground"
              >
                Experience
              </Link>
            </motion.div>
          </div>

          {/* Photo */}
          {avatar && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(14px)", scale: 0.96 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="gpu will-change-filter relative mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-[280px]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-fd-border">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fd-background/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px] lg:gap-20">
          {/* Main column */}
          <div>
            {/* Bio prose */}
            <Reveal>
              <div className="prose prose-lg prose-invert max-w-2xl prose-p:leading-[1.8] prose-p:text-fd-muted-foreground prose-strong:text-fd-foreground">
                {bio}
              </div>
            </Reveal>

            {/* Education */}
            {education && (
              <Reveal delay={0.1}>
                <section className="mt-16">
                  <div className="flex items-center gap-2.5">
                    <IoSchoolOutline className="h-5 w-5 text-fd-muted-foreground" />
                    <h2 className="text-lg font-semibold tracking-tight">Education</h2>
                  </div>
                  <div className="mt-5 border border-fd-border bg-fd-card p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold">{education.school}</h3>
                      <span className="shrink-0 text-sm tabular-nums text-fd-muted-foreground">
                        {education.period}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-fd-muted-foreground">
                      {education.program}
                    </p>
                  </div>
                </section>
              </Reveal>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <Reveal delay={0.15}>
                <section className="mt-16">
                  <div className="flex items-center gap-2.5">
                    <IoShieldCheckmarkOutline className="h-5 w-5 text-fd-muted-foreground" />
                    <h2 className="text-lg font-semibold tracking-tight">Certifications</h2>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-fd-border bg-fd-border sm:grid-cols-2">
                    {certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className="flex flex-col gap-1 bg-fd-card p-5"
                      >
                        <span className="text-sm font-medium">{cert.name}</span>
                        <span className="text-xs text-fd-muted-foreground">
                          {cert.issuer}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-12 lg:sticky lg:top-28 lg:self-start">
            {/* Focus Areas */}
            {focus.length > 0 && (
              <Reveal delay={0.1}>
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
                    Focus Areas
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {focus.map((area) => (
                      <span
                        key={area}
                        className="border border-fd-border px-3 py-1.5 text-sm text-fd-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Links */}
            {links.length > 0 && (
              <Reveal delay={0.15}>
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
                    Elsewhere
                  </h2>
                  <div className="mt-4 flex flex-col gap-1">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-2.5 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        <span className="font-medium">{link.label}</span>
                        <IoOpenOutline className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
