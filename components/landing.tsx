"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { AiChat } from "./ai-chat";
import { 
  IoGridOutline, 
  IoPencilOutline, 
  IoBookOutline, 
  IoDocumentTextOutline, 
  IoLinkOutline, 
  IoCalendarOutline,
  IoTrendingUpOutline,
  IoSearchOutline,
  IoGridSharp,
  IoListOutline,
  IoOptionsOutline,
  IoChevronDownOutline,
  IoCloseOutline,
  IoFolderOpenOutline,
  IoArrowForwardOutline,
  IoOpenOutline,
  IoGlobeOutline
} from "react-icons/io5";

export interface ProjectItem {
  url: string;
  name: string;
  role: string;
  status: string;
  tagline: string;
  logo?: string;
}

export interface ResourceInfo {
  title: string;
  url: string;
  icon?: string;
}

export interface ReferenceItem {
  title: string;
  url: string;
  description?: string;
  source?: string;
  favicon?: string;
}

export interface ContentItem {
  url: string;
  type: string;
  data: {
    title: string;
    description?: string;
    date?: string;
    thumbnail?: string;
    icon?: string;
    tags?: string[];
    difficulty?: string;
    category?: string;
    location?: string;
    eventDate?: string;
    linkedResource?: ResourceInfo;
  };
}

const TYPE_LABELS: Record<string, string> = {
  blog: "Blog",
  guide: "Guide",
  article: "Article",
  resource: "Resource",
  event: "Event",
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

const blurScale = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.97 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.04 } },
};

const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 };
const smoothTransition = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const };

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, isInView };
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function TypeIcon({ type }: { type: string }) {
  const cls = "h-3.5 w-3.5";
  switch (type) {
    case "blog":
      return <IoPencilOutline className={cls} />;
    case "guide":
      return <IoBookOutline className={cls} />;
    case "article":
      return <IoDocumentTextOutline className={cls} />;
    case "resource":
      return <IoLinkOutline className={cls} />;
    case "event":
      return <IoCalendarOutline className={cls} />;
    default:
      return null;
  }
}

function isTrending(date?: string): boolean {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
}

function FeaturedCard({ item }: { item: ContentItem }) {
  const trending = isTrending(item.data.date);

  return (
    <Link href={item.url} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-fd-accent/30">
      {item.data.thumbnail && (
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-fd-muted">
          <Image src={item.data.thumbnail} alt={item.data.title} fill className="object-cover transition-transform group-hover:scale-105" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-fd-muted-foreground">
          {item.type === "resource" && item.data.icon ? (
            <Image src={item.data.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
          ) : (
            <TypeIcon type={item.type} />
          )}
          <span className="text-xs font-semibold uppercase tracking-widest">{TYPE_LABELS[item.type] ?? item.type}</span>
          <MetaBadge item={item} />
        </div>
        {trending && <TrendingBadge />}
      </div>
      <h3 className="text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">{item.data.title}</h3>
      {item.data.description && (
        <p className="line-clamp-3 text-sm leading-relaxed text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">{item.data.description}</p>
      )}
      {item.data.linkedResource && (
        <span className="flex items-center gap-2 text-xs text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
          {item.data.linkedResource.icon ? (
            <Image src={item.data.linkedResource.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
          ) : (
            <IoLinkOutline className="h-3.5 w-3.5" />
          )}
          <span>{item.data.linkedResource.title}</span>
        </span>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        {item.data.tags && item.data.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {item.data.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="border border-fd-border px-2 py-0.5 text-xs text-fd-muted-foreground">{tag}</span>
            ))}
          </div>
        ) : (
          <span />
        )}
        <time className="shrink-0 text-xs tabular-nums text-fd-muted-foreground/60">
          {item.data.date ? new Date(item.data.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
        </time>
      </div>
    </Link>
  );
}

function ContentCard({ item }: { item: ContentItem }) {
  const trending = isTrending(item.data.date);

  return (
    <Link href={item.url} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-fd-accent/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-fd-muted-foreground">
          {item.type === "resource" && item.data.icon ? (
            <Image src={item.data.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
          ) : (
            <TypeIcon type={item.type} />
          )}
          <span className="text-xs font-semibold uppercase tracking-widest">{TYPE_LABELS[item.type] ?? item.type}</span>
          <MetaBadge item={item} />
        </div>
        {trending && <TrendingBadge />}
      </div>
      <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">{item.data.title}</h3>
      {item.data.description && (
        <p className="line-clamp-2 text-sm leading-relaxed text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">{item.data.description}</p>
      )}
      {item.data.linkedResource && (
        <span className="flex items-center gap-2 text-xs text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
          {item.data.linkedResource.icon ? (
            <Image src={item.data.linkedResource.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
          ) : (
            <IoLinkOutline className="h-3.5 w-3.5" />
          )}
          <span>{item.data.linkedResource.title}</span>
        </span>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        {item.data.tags && item.data.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {item.data.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="border border-fd-border px-2 py-0.5 text-xs text-fd-muted-foreground">{tag}</span>
            ))}
          </div>
        ) : (
          <span />
        )}
        <time className="shrink-0 text-xs tabular-nums text-fd-muted-foreground/60">
          {item.data.date ? new Date(item.data.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
        </time>
      </div>
    </Link>
  );
}

function MetaBadge({ item }: { item: ContentItem }) {
  const label = item.data.difficulty ?? item.data.category ?? item.data.location ?? item.data.eventDate;
  if (!label) return null;
  return <span className="text-xs text-fd-muted-foreground/60">{label}</span>;
}

function TrendingBadge() {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-fd-foreground">
      <IoTrendingUpOutline className="h-3.5 w-3.5" />
      Trending
    </span>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-fd-border">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/nokuva/nokuva-bg.png" alt="" fill className="object-cover opacity-[0.30]" priority />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(0_0%_4%)_70%)]" />

      <div className="relative mx-auto flex w-full max-w-[90rem] flex-col gap-12 px-6 py-16 sm:py-20 lg:flex-row lg:items-start lg:gap-16 lg:py-24">
        <div className="flex flex-1 flex-col">
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="gpu will-change-filter flex items-center gap-3"
          >
            <span className="h-px flex-1 max-w-12 bg-fd-muted-foreground/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              Engineer · Founder · Builder
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(16px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="gpu will-change-filter mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            I build things that
            <br />
            <span className="text-fd-muted-foreground">should already exist.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            className="gpu will-change-filter mt-5 max-w-xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg"
          >
            I&apos;m Sean Filimon. I run <span className="font-medium text-fd-foreground">LegionEdge</span>&mdash;parent
            company of <span className="font-medium text-fd-foreground">Nokuva</span>, <span className="font-medium text-fd-foreground">W0rktree</span>, <span className="font-medium text-fd-foreground">Foltrac</span>,
            and <span className="font-medium text-fd-foreground">Tavoc</span>. If a tool doesn&apos;t exist and it should, I build it.
            If a process is painful and it doesn&apos;t have to be, I fix it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="gpu will-change-filter mt-3 max-w-xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg"
          >
            I write about what I learn because the best way to understand something is to explain it.
            This site is where I do that&mdash;deployment, distributed systems, version control, and the craft of building software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="gpu will-change-filter mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/story"
              className="group flex items-center gap-2 border border-fd-foreground bg-fd-foreground px-5 py-2.5 text-sm font-medium text-fd-background transition-all hover:bg-transparent hover:text-fd-foreground"
            >
              Read My Story
              <IoArrowForwardOutline className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent/30 hover:text-fd-foreground"
            >
              View Projects
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(14px)", scale: 0.96 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="gpu will-change-filter relative mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:max-w-[340px]"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-fd-border">
            <Image
              src="/me.jpg"
              alt="Sean Filimon"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fd-background/80 via-fd-background/20 to-transparent" />
          </div>
          <div className="absolute -bottom-3 -right-3 border border-fd-border bg-fd-card px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fd-muted-foreground">
              Based in California
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ITEMS_PER_PAGE = 18;

function getGridClasses(itemCount: number): string {
  if (itemCount === 1) {
    return "grid grid-cols-1";
  }
  if (itemCount === 2) {
    return "grid grid-cols-1 sm:grid-cols-2";
  }
  return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

function FilterIcon({ type }: { type: string }) {
  const cls = "h-4 w-4";
  switch (type) {
    case "all":
      return <IoGridOutline className={cls} />;
    case "blog":
      return <IoPencilOutline className={cls} />;
    case "guide":
      return <IoBookOutline className={cls} />;
    case "article":
      return <IoDocumentTextOutline className={cls} />;
    case "resource":
      return <IoLinkOutline className={cls} />;
    case "event":
      return <IoCalendarOutline className={cls} />;
    default:
      return null;
  }
}

export function LandingPage({
  allContent,
  projects,
  references = [],
}: {
  allContent: ContentItem[];
  projects: ProjectItem[];
  references?: ReferenceItem[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  const types = Array.from(new Set(allContent.map((c) => c.type)));

  const filtered = useMemo(() => {
    let items = activeFilter === "all" ? allContent : allContent.filter((c) => c.type === activeFilter);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.data.title.toLowerCase().includes(query) ||
          item.data.description?.toLowerCase().includes(query) ||
          item.data.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (sortBy === "title") {
      items = [...items].sort((a, b) => a.data.title.localeCompare(b.data.title));
    }

    return items;
  }, [allContent, activeFilter, searchQuery, sortBy]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);
  
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Search and Filters Bar */}
      <section className="sticky top-14 z-40 border-b border-fd-border bg-fd-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[90rem] px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
              <IoSearchOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fd-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search projects, articles, guides..."
                className="h-12 w-full rounded-lg border border-fd-border bg-fd-muted/30 pl-12 pr-12 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-foreground focus:outline-none focus:ring-1 focus:ring-fd-foreground"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-fd-muted-foreground hover:text-fd-foreground"
                >
                  <IoCloseOutline className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    showFilters
                      ? "border-fd-foreground bg-fd-foreground text-fd-background"
                      : "border-fd-border text-fd-muted-foreground hover:border-fd-foreground hover:text-fd-foreground"
                  }`}
                >
                  <IoOptionsOutline className="h-4 w-4" />
                  Filters
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "date" | "title")}
                    className="h-9 appearance-none rounded-md border border-fd-border bg-transparent pl-3 pr-8 text-sm text-fd-muted-foreground hover:border-fd-foreground hover:text-fd-foreground focus:outline-none"
                  >
                    <option value="date">Newest</option>
                    <option value="title">A-Z</option>
                  </select>
                  <IoChevronDownOutline className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-fd-muted-foreground" />
                </div>

                {/* Active filter indicator */}
                {(activeFilter !== "all" || searchQuery) && (
                  <span className="text-xs text-fd-muted-foreground">
                    {filtered.length + filteredProjects.length} results
                  </span>
                )}
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center gap-1 rounded-md border border-fd-border p-1">
                <button
                  onClick={() => setLayout("grid")}
                  className={`rounded p-1.5 transition-colors ${
                    layout === "grid"
                      ? "bg-fd-muted text-fd-foreground"
                      : "text-fd-muted-foreground hover:text-fd-foreground"
                  }`}
                >
                  <IoGridSharp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`rounded p-1.5 transition-colors ${
                    layout === "list"
                      ? "bg-fd-muted text-fd-foreground"
                      : "text-fd-muted-foreground hover:text-fd-foreground"
                  }`}
                >
                  <IoListOutline className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-1 rounded-lg border border-fd-border bg-fd-muted/30 p-1">
                    {[
                      { key: "all", label: "All" },
                      ...types.map((t) => ({ key: t, label: TYPE_LABELS[t] ?? t })),
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => handleFilterChange(tab.key)}
                        className="relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                      >
                        {activeFilter === tab.key && (
                          <motion.div
                            layoutId="active-filter-bg"
                            className="absolute inset-0 rounded-md border border-fd-border bg-fd-background shadow-sm"
                            transition={springTransition}
                          />
                        )}
                        <span
                          className={
                            activeFilter === tab.key
                              ? "relative z-10 text-fd-foreground"
                              : "relative z-10 text-fd-muted-foreground"
                          }
                        >
                          <FilterIcon type={tab.key} />
                        </span>
                        <span
                          className={
                            activeFilter === tab.key
                              ? "relative z-10 text-fd-foreground"
                              : "relative z-10 text-fd-muted-foreground hover:text-fd-foreground"
                          }
                        >
                          {tab.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Projects */}
      {filteredProjects.length > 0 && (
        <ProjectsSection projects={filteredProjects} layout={layout} />
      )}

      {/* Content grid */}
      <ContentSection
        items={paginatedItems}
        layout={layout}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isEmpty={filtered.length === 0}
      />

      {/* References */}
      {references.length > 0 && (
        <ReferencesSection references={references} />
      )}

      <SiteFooter />
    </main>
  );
}

function ProjectsSection({ projects, layout }: { projects: ProjectItem[]; layout: "grid" | "list" }) {
  const { ref, isInView } = useReveal();
  return (
    <section className="border-t border-fd-border">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <IoFolderOpenOutline className="h-5 w-5 text-fd-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Projects</h2>
          <span className="text-sm text-fd-muted-foreground">({projects.length})</span>
        </div>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={layout === "list" 
            ? "flex flex-col gap-px overflow-hidden border border-fd-border bg-fd-border"
            : `${getGridClasses(projects.length)} gap-px overflow-hidden border border-fd-border bg-fd-border`
          }
        >
          {projects.map((project) => (
            <motion.div
              key={project.url}
              variants={blurScale}
              transition={smoothTransition}
              className="gpu will-change-filter"
            >
              {layout === "list" ? (
                <Link href={project.url} className="group flex items-center gap-6 bg-fd-card px-6 py-5 transition-colors hover:bg-fd-accent/30">
                  <div className="flex h-6 w-28 shrink-0 items-center">
                    {project.logo ? (
                      <Image
                        src={project.logo}
                        alt={project.name}
                        width={112}
                        height={24}
                        className="h-full w-auto max-w-full object-contain opacity-60 transition-opacity group-hover:opacity-100"
                      />
                    ) : (
                      <span className="text-sm font-semibold tracking-tight group-hover:text-fd-primary">{project.name}</span>
                    )}
                  </div>
                  <p className="flex-1 text-sm text-fd-muted-foreground line-clamp-1">{project.tagline}</p>
                  <span className="shrink-0 rounded-full border border-fd-border px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
                    {project.status}
                  </span>
                  <span className="shrink-0 text-xs text-fd-muted-foreground/60">{project.role}</span>
                </Link>
              ) : (
                <Link href={project.url} className="group relative flex h-full min-h-[180px] flex-col bg-fd-card p-6 transition-colors hover:bg-fd-accent/30">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className="flex h-8 min-w-0 flex-1 items-center">
                      {project.logo ? (
                        <Image
                          src={project.logo}
                          alt={project.name}
                          width={120}
                          height={32}
                          className="h-full w-auto max-w-full object-contain opacity-60 transition-opacity group-hover:opacity-100"
                        />
                      ) : (
                        <span className="text-base font-semibold tracking-tight group-hover:text-fd-primary">{project.name}</span>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full border border-fd-border px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest text-fd-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-fd-muted-foreground line-clamp-2">{project.tagline}</p>
                  <div className="mt-auto pt-5">
                    <span className="text-xs text-fd-muted-foreground/60">{project.role}</span>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContentSection({
  items,
  layout,
  totalPages,
  currentPage,
  setCurrentPage,
  isEmpty,
}: {
  items: ContentItem[];
  layout: "grid" | "list";
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isEmpty: boolean;
}) {
  return (
    <section className="border-t border-fd-border">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <IoDocumentTextOutline className="h-5 w-5 text-fd-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">Content</h2>
          <span className="text-sm text-fd-muted-foreground">({items.length})</span>
        </div>

        {isEmpty ? (
          <p className="py-8 text-center text-sm text-fd-muted-foreground">No content found.</p>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.3 }}
                className="gpu will-change-filter overflow-hidden border border-fd-border bg-fd-border"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className={layout === "list" 
                    ? "flex flex-col gap-px"
                    : `${getGridClasses(items.length)} gap-px`
                  }
                >
                  {items.map((item, i) => (
                    <motion.div
                      key={item.url}
                      variants={blurScale}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="gpu will-change-filter bg-fd-card"
                    >
                      {layout === "list" ? (
                        <ListCard item={item} />
                      ) : i === 0 && items.length > 3 ? (
                        <FeaturedCard item={item} />
                      ) : (
                        <ContentCard item={item} />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center border border-fd-border text-sm transition-colors hover:bg-fd-accent/30 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-9 min-w-9 items-center justify-center border px-2 text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "border-fd-foreground bg-fd-foreground text-fd-background"
                          : "border-fd-border text-fd-muted-foreground hover:bg-fd-accent/30 hover:text-fd-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-9 w-9 items-center justify-center border border-fd-border text-sm transition-colors hover:bg-fd-accent/30 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ReferencesSection({ references }: { references: ReferenceItem[] }) {
  const { ref, isInView } = useReveal();

  return (
    <section className="border-t border-fd-border">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <IoGlobeOutline className="h-5 w-5 text-fd-muted-foreground" />
          <h2 className="text-xl font-bold tracking-tight">References</h2>
          <span className="text-sm text-fd-muted-foreground">({references.length})</span>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-px overflow-hidden border border-fd-border bg-fd-border"
        >
          {references.map((ref) => (
            <motion.a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={blurScale}
              transition={smoothTransition}
              className="gpu will-change-filter group flex items-center gap-5 bg-fd-card px-6 py-5 transition-colors hover:bg-fd-accent/30"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-fd-border bg-fd-muted/30 transition-colors group-hover:border-fd-foreground/20">
                {ref.favicon ? (
                  <img src={ref.favicon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                ) : (
                  <IoLinkOutline className="h-4 w-4 text-fd-muted-foreground transition-colors group-hover:text-fd-foreground" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">
                    {ref.title}
                  </span>
                </div>
                {ref.description && (
                  <p className="mt-0.5 truncate text-sm leading-relaxed text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
                    {ref.description}
                  </p>
                )}
              </div>

              {ref.source && (
                <span className="hidden shrink-0 text-xs text-fd-muted-foreground/60 sm:block">
                  {ref.source}
                </span>
              )}

              <IoOpenOutline className="h-4 w-4 shrink-0 text-fd-muted-foreground/40 transition-colors group-hover:text-fd-foreground" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ListCard({ item }: { item: ContentItem }) {
  const trending = isTrending(item.data.date);

  return (
    <Link href={item.url} className="group flex items-center gap-6 px-6 py-5 transition-colors hover:bg-fd-accent/30">
      <div className="flex shrink-0 items-center gap-2.5 text-fd-muted-foreground">
        {item.type === "resource" && item.data.icon ? (
          <Image src={item.data.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
        ) : (
          <TypeIcon type={item.type} />
        )}
        <span className="w-16 text-xs font-semibold uppercase tracking-widest">{TYPE_LABELS[item.type] ?? item.type}</span>
      </div>
      <h3 className="flex-1 text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">{item.data.title}</h3>
      {item.data.linkedResource && (
        <span className="flex shrink-0 items-center gap-2 text-xs text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
          {item.data.linkedResource.icon ? (
            <Image src={item.data.linkedResource.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
          ) : (
            <IoLinkOutline className="h-3.5 w-3.5" />
          )}
          <span>{item.data.linkedResource.title}</span>
        </span>
      )}
      {trending && <TrendingBadge />}
      {item.data.tags && item.data.tags.length > 0 && (
        <div className="hidden shrink-0 gap-2 sm:flex">
          {item.data.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="border border-fd-border px-2 py-0.5 text-xs text-fd-muted-foreground">{tag}</span>
          ))}
        </div>
      )}
      <time className="shrink-0 text-xs tabular-nums text-fd-muted-foreground/60">
        {item.data.date ? new Date(item.data.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
      </time>
    </Link>
  );
}

const FOOTER_NAV = {
  explore: [
    { label: "Projects", href: "/projects" },
    { label: "Videos", href: "/videos" },
  ],
  about: [
    { label: "About Me", href: "/about" },
    { label: "My Story", href: "/story" },
    { label: "Autobiography", href: "/autobiography" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
    { label: "Follow", href: "/follow" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/seanfilimon", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/seanfilimon", icon: "linkedin" },
    { label: "X / Twitter", href: "https://x.com/SeanFilimon", icon: "twitter" },
  ],
};

function SocialIcon({ type }: { type: string }) {
  const cls = "h-5 w-5";
  switch (type) {
    case "github":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case "twitter":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return null;
  }
}

function SiteFooter() {
  const { ref, isInView } = useReveal();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-fd-border bg-fd-background">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/nokuva/nokuva-bg.png" alt="" fill className="object-cover opacity-[1]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_0%,hsl(0_0%_4%)_70%)]" />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="relative mx-auto w-full max-w-[90rem] px-6"
      >
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight">Sean Filimon</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-fd-muted-foreground">
              Founder of LegionEdge. Building tools that should already exist. Writing about what I learn along the way.
            </p>
            <div className="mt-6 flex gap-3">
              {FOOTER_NAV.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-fd-border text-fd-muted-foreground transition-all hover:border-fd-foreground hover:bg-fd-accent/30 hover:text-fd-foreground"
                  aria-label={link.label}
                >
                  <SocialIcon type={link.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore Column */}
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_NAV.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                  >
                    <span className="h-px w-0 bg-fd-foreground transition-all group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About Column */}
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              About
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_NAV.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                  >
                    <span className="h-px w-0 bg-fd-foreground transition-all group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter / CTA Column */}
          <motion.div variants={blurIn} transition={smoothTransition} className="gpu will-change-filter">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fd-muted-foreground">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-fd-muted-foreground">
              I share my journey through projects, guides, articles, and the lessons I pick up along the way.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/follow"
                className="group flex items-center justify-center gap-2 border border-fd-foreground bg-fd-foreground px-4 py-2.5 text-sm font-medium text-fd-background transition-all hover:bg-transparent hover:text-fd-foreground"
              >
                Follow Me
                <IoArrowForwardOutline className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 border border-fd-border px-4 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:border-fd-foreground hover:bg-fd-accent/30 hover:text-fd-foreground"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-fd-border py-6 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-fd-muted-foreground">
            <span>&copy; {currentYear} Sean Filimon</span>
            <span className="text-fd-border">·</span>
            <span>Built with Next.js</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-fd-muted-foreground/60">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span>All systems operational</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
