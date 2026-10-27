"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  IoFolderOpenOutline, 
  IoGridOutline, 
  IoListOutline,
  IoDocumentTextOutline,
  IoBookOutline,
  IoNewspaperOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoFilterOutline,
} from "react-icons/io5";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const blurScale = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.97 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
};

const smoothTransition = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const };

interface ContentItem {
  url: string;
  title: string;
  description?: string;
  type: "blog" | "article" | "guide";
  date?: string;
  tags?: string[];
  projectSlug: string;
  projectName: string;
  projectLogo?: string;
}

interface ProjectItem {
  url: string;
  slug: string;
  name: string;
  tagline: string;
  logo?: string;
  status: string;
  role: string;
  stack: string[];
}

const TYPE_ICONS = {
  blog: IoNewspaperOutline,
  article: IoDocumentTextOutline,
  guide: IoBookOutline,
};

const TYPE_LABELS = {
  blog: "Blog",
  article: "Article",
  guide: "Guide",
};

const CONTENT_FILTERS = [
  { id: "all", label: "All", icon: IoFilterOutline },
  { id: "blog", label: "Blogs", icon: IoNewspaperOutline },
  { id: "article", label: "Articles", icon: IoDocumentTextOutline },
  { id: "guide", label: "Guides", icon: IoBookOutline },
];

function ContentCard({ item }: { item: ContentItem }) {
  const Icon = TYPE_ICONS[item.type];

  return (
    <Link 
      href={item.url} 
      className="group flex h-full flex-col gap-2 bg-fd-card p-5 transition-colors hover:bg-fd-accent/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-fd-muted-foreground">
          <Icon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold uppercase tracking-widest">{TYPE_LABELS[item.type]}</span>
        </div>
        {item.projectLogo ? (
          <Image
            src={item.projectLogo}
            alt={item.projectName}
            width={48}
            height={16}
            className="h-4 w-auto object-contain opacity-40"
          />
        ) : (
          <span className="text-[10px] text-fd-muted-foreground/50">{item.projectName}</span>
        )}
      </div>
      <h3 className="mt-1 text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">
        {item.title}
      </h3>
      {item.description && (
        <p className="line-clamp-2 text-[13px] leading-relaxed text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
          {item.description}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        {item.tags && item.tags.length > 0 ? (
          <div className="flex gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="border border-fd-border px-1.5 py-px text-[10px] text-fd-muted-foreground">{tag}</span>
            ))}
          </div>
        ) : (
          <span />
        )}
        <time className="text-[10px] tabular-nums text-fd-muted-foreground/50">
          {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
        </time>
      </div>
    </Link>
  );
}

function ContentListCard({ item }: { item: ContentItem }) {
  const Icon = TYPE_ICONS[item.type];

  return (
    <Link 
      href={item.url} 
      className="group flex items-center gap-6 bg-fd-card p-5 transition-colors hover:bg-fd-accent/30"
    >
      <div className="flex shrink-0 items-center gap-2 text-fd-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="w-14 text-[10px] font-semibold uppercase tracking-widest">{TYPE_LABELS[item.type]}</span>
      </div>
      <h3 className="flex-1 text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">
        {item.title}
      </h3>
      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        {item.projectLogo ? (
          <Image
            src={item.projectLogo}
            alt={item.projectName}
            width={48}
            height={16}
            className="h-4 w-auto object-contain opacity-40"
          />
        ) : (
          <span className="text-[11px] text-fd-muted-foreground/50">{item.projectName}</span>
        )}
      </div>
      {item.tags && item.tags.length > 0 && (
        <div className="hidden shrink-0 gap-1.5 md:flex">
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="border border-fd-border px-1.5 py-px text-[10px] text-fd-muted-foreground">{tag}</span>
          ))}
        </div>
      )}
      <time className="shrink-0 text-[10px] tabular-nums text-fd-muted-foreground/50">
        {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
      </time>
    </Link>
  );
}

function ProjectSelector({ 
  projects, 
  selectedProject, 
  onSelect 
}: { 
  projects: ProjectItem[]; 
  selectedProject: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-sm font-medium text-fd-muted-foreground">Filter by project</h2>
        <button
          onClick={() => onSelect(null)}
          aria-pressed={!selectedProject}
          className={`text-sm font-medium transition-colors ${
            !selectedProject ? "text-fd-foreground" : "text-fd-muted-foreground hover:text-fd-foreground"
          }`}
        >
          All projects
        </button>
      </div>

      {/* Equal cells, so every logo sits on the same grid whatever its width:
          one row from lg, three across from sm, two on a phone (where an odd
          last cell takes the full row). */}
      <div
        style={{ "--project-count": projects.length } as React.CSSProperties}
        className="grid grid-cols-2 gap-px border border-fd-border bg-fd-border sm:grid-cols-3 lg:grid-cols-[repeat(var(--project-count),minmax(0,1fr))] max-sm:[&>*:last-child:nth-child(odd)]:col-span-2"
      >
        {projects.map((project) => {
          const selected = selectedProject === project.slug;
          return (
            <button
              key={project.slug}
              onClick={() => onSelect(selected ? null : project.slug)}
              aria-pressed={selected}
              aria-label={project.name}
              className={`group relative flex h-16 items-center justify-center px-3 transition-colors ${
                selected ? "bg-fd-accent" : "bg-fd-card hover:bg-fd-accent/40"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="project-indicator"
                  className="absolute inset-0 border border-fd-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt=""
                  width={120}
                  height={20}
                  className={`h-5 w-auto max-w-full object-contain transition-opacity ${
                    selected ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                  }`}
                />
              ) : (
                <span className="text-sm font-medium">{project.name}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContentFilterTabs({ 
  activeFilter, 
  onFilterChange 
}: { 
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  return (
    <div className="relative flex items-center border border-fd-border bg-fd-card p-1">
      {CONTENT_FILTERS.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors"
          >
            {isActive && (
              <motion.div
                layoutId="content-filter-indicator"
                className="absolute inset-0 border border-fd-foreground bg-fd-accent"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 flex items-center gap-1.5 ${isActive ? "text-fd-foreground" : "text-fd-muted-foreground"}`}>
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{filter.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ProjectsClient({ projects, content }: { projects: ProjectItem[]; content: ContentItem[] }) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [contentFilter, setContentFilter] = useState("all");

  const filteredContent = useMemo(() => {
    let result = content;

    if (selectedProject) {
      result = result.filter((item) => item.projectSlug === selectedProject);
    }

    if (contentFilter !== "all") {
      result = result.filter((item) => item.type === contentFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          item.projectName.toLowerCase().includes(query)
      );
    }

    return result;
  }, [content, selectedProject, contentFilter, searchQuery]);

  const selectedProjectData = selectedProject 
    ? projects.find((p) => p.slug === selectedProject) 
    : null;

  return (
    <main className="mx-auto w-full max-w-[90rem] px-6 py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <IoFolderOpenOutline className="h-7 w-7 text-fd-muted-foreground" />
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        </div>
        <p className="mt-2 text-fd-muted-foreground">
          Companies and open source projects I have founded and built, along with related content.
        </p>
      </div>

      {/* Projects selector with sliding indicator */}
      <div className="mb-6">
        <ProjectSelector 
          projects={projects}
          selectedProject={selectedProject}
          onSelect={setSelectedProject}
        />
      </div>

      {/* Selected project info */}
      <AnimatePresence mode="wait">
        {selectedProjectData && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border border-fd-border bg-fd-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    {selectedProjectData.logo ? (
                      <Image
                        src={selectedProjectData.logo}
                        alt={selectedProjectData.name}
                        width={100}
                        height={28}
                        className="h-7 w-auto object-contain"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold">{selectedProjectData.name}</h3>
                    )}
                    <span className="rounded-full border border-fd-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-fd-muted-foreground">
                      {selectedProjectData.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-fd-muted-foreground">{selectedProjectData.tagline}</p>
                </div>
                <Link
                  href={selectedProjectData.url}
                  className="shrink-0 border border-fd-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-fd-accent/30"
                >
                  View Project →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and filters bar */}
      <div className="sticky top-14 z-40 -mx-6 mb-6 border-y border-fd-border bg-fd-background/95 px-6 py-4 backdrop-blur-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-md">
            <IoSearchOutline className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fd-muted-foreground" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full border border-fd-border bg-fd-card pl-10 pr-10 text-sm placeholder:text-fd-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-fd-ring"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fd-muted-foreground hover:text-fd-foreground"
              >
                <IoCloseOutline className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Content type filter with tab animation */}
            <ContentFilterTabs 
              activeFilter={contentFilter}
              onFilterChange={setContentFilter}
            />

            {/* Layout toggle */}
            <div className="flex items-center gap-1 border border-fd-border bg-fd-card p-1">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 transition-colors ${layout === "grid" ? "bg-fd-accent text-fd-foreground" : "text-fd-muted-foreground hover:text-fd-foreground"}`}
                aria-label="Grid view"
              >
                <IoGridOutline className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 transition-colors ${layout === "list" ? "bg-fd-accent text-fd-foreground" : "text-fd-muted-foreground hover:text-fd-foreground"}`}
                aria-label="List view"
              >
                <IoListOutline className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-fd-muted-foreground">
          {filteredContent.length} {filteredContent.length === 1 ? "item" : "items"}
          {selectedProject && ` for ${selectedProjectData?.name}`}
          {contentFilter !== "all" && ` · ${TYPE_LABELS[contentFilter as keyof typeof TYPE_LABELS]}s only`}
          {searchQuery && ` · matching "${searchQuery}"`}
        </div>
      </div>

      {/* Content grid */}
      {filteredContent.length === 0 ? (
        <div className="border border-fd-border bg-fd-card p-12 text-center">
          <p className="text-fd-muted-foreground">No content found.</p>
          {(searchQuery || selectedProject || contentFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedProject(null);
                setContentFilter("all");
              }}
              className="mt-4 text-sm text-fd-muted-foreground underline hover:text-fd-foreground"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${layout}-${selectedProject}-${contentFilter}`}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.25 }}
            className="gpu will-change-filter"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={
                layout === "list"
                  ? "flex flex-col gap-px overflow-hidden border border-fd-border bg-fd-border"
                  : "grid grid-cols-1 gap-px overflow-hidden border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }
            >
              {filteredContent.map((item) => (
                <motion.div
                  key={item.url}
                  variants={blurScale}
                  transition={smoothTransition}
                  className="gpu will-change-filter"
                >
                  {layout === "list" ? (
                    <ContentListCard item={item} />
                  ) : (
                    <ContentCard item={item} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
}
