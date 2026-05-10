"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoSearchOutline, IoCloseOutline, IoFlaskOutline } from "react-icons/io5";

interface ResearchItem {
  url: string;
  title: string;
  description?: string;
  date: string;
  thumbnail?: string;
  tags?: string[];
}

function isTrending(dateStr?: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
}

function ResearchCard({ item }: { item: ResearchItem }) {
  const trending = isTrending(item.date);

  return (
    <Link href={item.url} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-fd-accent/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-fd-muted-foreground">
          <IoFlaskOutline className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Research</span>
        </div>
        {trending && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4m0 0l3 3m-3-3L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            New
          </span>
        )}
      </div>
      <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">
        {item.title}
      </h3>
      {item.description && (
        <p className="line-clamp-2 text-sm leading-relaxed text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
          {item.description}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        {item.tags && item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="border border-fd-border px-2 py-0.5 text-xs text-fd-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <span />
        )}
        <time className="shrink-0 text-xs tabular-nums text-fd-muted-foreground/60">
          {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </time>
      </div>
    </Link>
  );
}

function FeaturedResearchCard({ item }: { item: ResearchItem }) {
  const trending = isTrending(item.date);

  return (
    <Link href={item.url} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-fd-accent/30">
      {item.thumbnail && (
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-fd-muted">
          <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-fd-muted-foreground">
          <IoFlaskOutline className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Research</span>
        </div>
        {trending && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4m0 0l3 3m-3-3L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            New
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-fd-primary group-hover:underline">
        {item.title}
      </h3>
      {item.description && (
        <p className="line-clamp-3 text-sm leading-relaxed text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
          {item.description}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        {item.tags && item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="border border-fd-border px-2 py-0.5 text-xs text-fd-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <span />
        )}
        <time className="shrink-0 text-xs tabular-nums text-fd-muted-foreground/60">
          {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </time>
      </div>
    </Link>
  );
}

export function ResearchGrid({ items }: { items: ResearchItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [items, searchQuery]);

  const gridClasses =
    filtered.length === 1
      ? "grid grid-cols-1"
      : filtered.length === 2
      ? "grid grid-cols-1 sm:grid-cols-2"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <IoSearchOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fd-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search research..."
          className="h-12 w-full rounded-lg border border-fd-border bg-fd-muted/30 pl-12 pr-12 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-foreground focus:outline-none focus:ring-1 focus:ring-fd-foreground"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-fd-muted-foreground hover:text-fd-foreground"
          >
            <IoCloseOutline className="h-5 w-5" />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-fd-muted-foreground">No research found.</p>
      ) : (
        <div className="overflow-hidden border border-fd-border bg-fd-border">
          <div className={`${gridClasses} gap-px`}>
            {filtered.map((item, i) => (
              <div key={item.url} className="bg-fd-card">
                {i === 0 && filtered.length > 2 ? (
                  <FeaturedResearchCard item={item} />
                ) : (
                  <ResearchCard item={item} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
