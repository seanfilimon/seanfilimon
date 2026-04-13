"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import type { ReactNode } from "react";

interface NavItem {
  text: string;
  url: string;
  icon: ReactNode;
}

interface StatItem {
  label: string;
  value: string;
}

interface SocialLink {
  label: string;
  url: string;
  icon: ReactNode;
}

interface NavbarProps {
  title: ReactNode;
  navItems: NavItem[];
  stats?: StatItem[];
  socials?: SocialLink[];
}

function TopBar({ stats, socials, visible }: { stats?: StatItem[]; socials?: SocialLink[]; visible: boolean }) {
  return (
    <div 
      className={`border-b border-fd-border bg-fd-muted/30 transition-all duration-300 ${
        visible ? "h-8 opacity-100" : "h-0 opacity-0 overflow-hidden border-b-0"
      }`}
    >
      <div className="mx-auto flex h-8 max-w-[90rem] items-center justify-between px-6">
        {/* Stats on left */}
        {stats && stats.length > 0 ? (
          <div className="flex items-center gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-1.5">
                <span className="text-xs font-bold tabular-nums text-fd-foreground">{stat.value}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">{stat.label}</span>
                {i < stats.length - 1 && <span className="ml-3 text-fd-border">·</span>}
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}

        {/* Socials on right */}
        {socials && socials.length > 0 && (
          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2 py-1 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                aria-label={social.label}
              >
                {social.icon}
                <span className="hidden text-xs sm:inline">{social.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Navbar({ title, navItems, stats, socials }: NavbarProps) {
  const [showTopBar, setShowTopBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
      
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* Top bar with stats and socials */}
      <TopBar stats={stats} socials={socials} visible={showTopBar} />
      
      {/* Main navbar */}
      <nav className="border-b border-fd-border bg-fd-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              {title}
            </Link>

            <div className="flex items-center gap-1 max-sm:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="px-4 py-1.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              Contact
            </Link>
            <Link
              href="/follow"
              className="flex items-center gap-2 border border-fd-foreground bg-fd-foreground px-4 py-1.5 text-sm font-medium text-fd-background transition-all hover:bg-transparent hover:text-fd-foreground"
            >
              Follow Me
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
