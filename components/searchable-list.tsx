"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Chip, Input } from "@heroui/react";
import { motion, AnimatePresence } from "motion/react";

interface SearchableItem {
  url: string;
  data: {
    title: string;
    description?: string;
    date?: string;
    thumbnail?: string;
    tags?: string[];
    difficulty?: string;
    category?: string;
  };
}

export function SearchableList({ items }: { items: SearchableItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    const matchTitle = item.data.title.toLowerCase().includes(q);
    const matchDesc = item.data.description?.toLowerCase().includes(q);
    const matchTags = item.data.tags?.some((t) => t.toLowerCase().includes(q));
    return matchTitle || matchDesc || matchTags;
  });

  return (
    <div className="flex flex-col gap-8">
      <Input
        aria-label="Search"
        placeholder="Search..."
        className="max-w-md border border-fd-border bg-fd-background"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-fd-muted-foreground"
          >
            No results found.
          </motion.p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.url}
              layout
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.97 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(8px)", scale: 0.97 }}
              transition={{ duration: 0.35, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
              className="gpu will-change-filter"
            >
              <Link href={item.url} className="group block h-full">
                <div className="relative h-full overflow-hidden border border-fd-border bg-fd-card transition-colors hover:border-fd-muted-foreground/30">
                  <div className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.06]">
                    <Image
                      src="/upscale.png"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="relative flex h-full flex-col p-5">
                    <div className="mb-2 flex items-center gap-2">
                      {item.data.difficulty && (
                        <span className="text-[11px] font-medium uppercase tracking-widest text-fd-muted-foreground">
                          {item.data.difficulty}
                        </span>
                      )}
                      {item.data.date && (
                        <span className="text-[11px] text-fd-muted-foreground">
                          {new Date(item.data.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold leading-snug tracking-tight">
                      {item.data.title}
                    </h3>

                    {item.data.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-fd-muted-foreground">
                        {item.data.description}
                      </p>
                    )}

                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {item.data.category && (
                        <Chip size="sm" variant="soft">
                          {item.data.category}
                        </Chip>
                      )}
                      {item.data.tags?.slice(0, 3).map((tag) => (
                        <Chip key={tag} size="sm" variant="soft">
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
