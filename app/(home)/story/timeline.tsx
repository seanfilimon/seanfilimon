"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import {
  IoCodeSlashOutline,
  IoGlobeOutline,
  IoServerOutline,
  IoGitNetworkOutline,
  IoBusinessOutline,
  IoRocketOutline,
  IoGitBranchOutline,
  IoBulbOutline,
  IoTrophyOutline,
  IoStarOutline,
} from "react-icons/io5";

export interface TimelineEntry {
  year: string;
  title: string;
  type: "milestone" | "learning" | "founding" | "launch" | "achievement";
  icon?: string;
  content: ReactNode;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  code: IoCodeSlashOutline,
  globe: IoGlobeOutline,
  server: IoServerOutline,
  network: IoGitNetworkOutline,
  building: IoBusinessOutline,
  rocket: IoRocketOutline,
  git: IoGitBranchOutline,
  brain: IoBulbOutline,
  trophy: IoTrophyOutline,
  star: IoStarOutline,
};

const TYPE_LABELS: Record<TimelineEntry["type"], string> = {
  milestone: "Milestone",
  learning: "Growth",
  founding: "Founded",
  launch: "Launch",
  achievement: "Achievement",
};

function entryId(_: TimelineEntry, i: number) {
  return `timeline-${i}`;
}

function groupByYear(timeline: TimelineEntry[]) {
  const groups: {
    year: string;
    entries: { entry: TimelineEntry; globalIndex: number }[];
  }[] = [];
  let currentYear = "";
  for (let i = 0; i < timeline.length; i++) {
    const entry = timeline[i];
    if (entry.year !== currentYear) {
      currentYear = entry.year;
      groups.push({ year: currentYear, entries: [] });
    }
    groups[groups.length - 1].entries.push({ entry, globalIndex: i });
  }
  return groups;
}

/* ─────────────────────────── Hero ─────────────────────────── */

function StoryHero() {
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

      <motion.div style={{ opacity, y }} className="relative mx-auto flex w-full max-w-[90rem] flex-col px-6 py-24 sm:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease }}
          className="gpu will-change-filter flex items-center gap-3"
        >
          <span className="h-px w-12 bg-fd-muted-foreground/30" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
            2018 &mdash; Present
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(16px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="gpu will-change-filter mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          My Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.16, ease }}
          className="gpu will-change-filter mt-5 max-w-xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg"
        >
          From writing my first lines of code at 13 to founding multiple
          developer tool companies by 20. No CS degree, no internships at big
          companies &mdash; just building things, shipping them, and learning
          from what broke.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.24, ease }}
          className="gpu will-change-filter mt-10 flex items-center gap-6 text-sm text-fd-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-fd-foreground" />
            <span className="tabular-nums">9 chapters</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-fd-foreground" />
            <span className="tabular-nums">8 years</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-fd-foreground" />
            <span>4 companies</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Timeline Item ─────────────────────── */

function TimelineItem({
  entry,
  isLast,
  id,
}: {
  entry: TimelineEntry;
  isLast: boolean;
  id: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });
  const IconComponent = entry.icon ? ICON_MAP[entry.icon] : IoStarOutline;

  return (
    <div
      ref={ref}
      id={id}
      className="group/item relative grid scroll-mt-24 grid-cols-[32px_1fr] gap-4 sm:grid-cols-[64px_32px_1fr] sm:gap-x-5"
    >
      {/* Year column — visible on sm+ */}
      <div className="hidden sm:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, ease }}
          className="sticky top-28 pt-1 text-right"
        >
          <span className="text-sm font-semibold tabular-nums text-fd-muted-foreground/50">
            {entry.year}
          </span>
        </motion.div>
      </div>

      {/* Spine column */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-fd-border bg-fd-background text-fd-muted-foreground transition-colors group-hover/item:border-fd-foreground/20 group-hover/item:text-fd-foreground"
        >
          {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : undefined}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="w-px flex-1 origin-top bg-fd-border"
          />
        )}
      </div>

      {/* Content column */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.12, ease }}
        className={isLast ? "pb-0" : "pb-16 sm:pb-20"}
      >
        <span className="mb-1 block text-xs font-medium tabular-nums text-fd-muted-foreground/50 sm:hidden">
          {entry.year}
        </span>

        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-semibold tracking-tight text-fd-foreground sm:text-xl">
            {entry.title}
          </h3>
          <span className="inline-block border border-fd-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">
            {TYPE_LABELS[entry.type]}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.25, ease }}
          className="mt-4 max-w-2xl prose prose-sm prose-invert prose-p:leading-[1.75] prose-p:text-fd-muted-foreground prose-strong:text-fd-foreground prose-code:text-fd-foreground prose-code:before:content-[''] prose-code:after:content-[''] prose-ul:mt-3 prose-ul:space-y-1 prose-li:text-fd-muted-foreground"
        >
          {entry.content}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ────────────────────── Closing Prose ──────────────────────── */

function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease }}
      className="mt-24 border-t border-fd-border pt-16"
    >
      <div className="max-w-2xl space-y-5 text-[15px] leading-[1.8] text-fd-muted-foreground">
        <p>
          I did not follow a traditional path. No CS degree, no internships at
          big companies. I learned by building things, shipping them, and fixing
          what broke.
        </p>
        <p>
          Every product I have launched started the same way &mdash; I hit a
          problem, got frustrated that no good solution existed, and decided to
          build one. That instinct has not changed since I was 13.
        </p>
        <p>
          I write about what I learn because the best way to understand something
          is to explain it. This site is where I do that.
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────── Scroll TOC ─────────────────────── */

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  const handleScroll = useCallback(() => {
    const threshold = window.innerHeight * 0.35;
    let current = ids[0] ?? "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) current = id;
    }
    setActive(current);
  }, [ids]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return active;
}

function TableOfContents({ timeline }: { timeline: TimelineEntry[] }) {
  const ids = timeline.map((e, i) => entryId(e, i));
  const active = useActiveSection(ids);
  const groups = groupByYear(timeline);

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-28 w-52">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-fd-muted-foreground/60">
          On this page
        </p>
        <div className="mt-4 space-y-5">
          {groups.map((group) => {
            const groupIds = group.entries.map((e) =>
              entryId(e.entry, e.globalIndex),
            );
            const isYearActive = groupIds.includes(active);
            return (
              <div key={group.year}>
                <p
                  className={`text-xs font-semibold tabular-nums transition-colors duration-200 ${
                    isYearActive
                      ? "text-fd-foreground"
                      : "text-fd-muted-foreground/40"
                  }`}
                >
                  {group.year}
                </p>
                <ul className="mt-1.5 space-y-0.5 border-l border-fd-border">
                  {group.entries.map(({ entry, globalIndex }) => {
                    const id = entryId(entry, globalIndex);
                    const isActive = active === id;
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById(id)
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`relative block py-1 pl-4 text-[13px] leading-snug transition-all duration-200 ${
                            isActive
                              ? "text-fd-foreground before:absolute before:-left-px before:top-0 before:h-full before:w-px before:bg-fd-foreground"
                              : "text-fd-muted-foreground/50 hover:text-fd-foreground"
                          }`}
                        >
                          <span className="truncate">{entry.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────── Main Export ─────────────────────── */

export function StoryTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <main>
      <StoryHero />

      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:py-24">
        <div className="relative grid grid-cols-1 gap-10 xl:grid-cols-[1fr_220px]">
          <section>
            {timeline.map((entry, i) => (
              <TimelineItem
                key={entry.year + entry.title}
                entry={entry}
                isLast={i === timeline.length - 1}
                id={entryId(entry, i)}
              />
            ))}
            <ClosingSection />
          </section>

          <TableOfContents timeline={timeline} />
        </div>
      </div>
    </main>
  );
}
