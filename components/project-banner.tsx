"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectBannerProps {
  banner?: string;
  images?: string[];
  title: string;
}

export function ProjectBanner({ banner, images = [], title }: ProjectBannerProps) {
  const allImages = banner ? [banner, ...images] : images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = allImages.length > 1;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  if (allImages.length === 0) return null;

  return (
    <section className="relative w-full border-b border-fd-border bg-fd-muted/30">
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="gpu will-change-filter absolute inset-0"
          >
            <Image
              src={allImages[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fd-background/60 via-transparent to-transparent" />

        {hasMultiple && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-fd-border bg-fd-background/80 text-fd-foreground backdrop-blur-sm transition-colors hover:bg-fd-accent"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12 5l-5 5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-fd-border bg-fd-background/80 text-fd-foreground backdrop-blur-sm transition-colors hover:bg-fd-accent"
              aria-label="Next image"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                <path
                  d="M8 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-fd-foreground"
                      : "bg-fd-foreground/30 hover:bg-fd-foreground/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="absolute bottom-4 right-4 z-10 rounded-full border border-fd-border bg-fd-background/80 px-3 py-1 text-xs font-medium tabular-nums text-fd-muted-foreground backdrop-blur-sm">
          {currentIndex + 1} / {allImages.length}
        </div>
      )}
    </section>
  );
}
