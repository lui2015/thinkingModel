"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/models", label: "模型库" },
  { href: "/graph", label: "模型图谱" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md" style={{ backgroundColor: "var(--color-header-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🧠</span>
            <span className="text-lg font-bold text-primary">思维模型库</span>
          </Link>

          {/* Desktop Nav + Theme */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary hover:text-text hover:bg-surface-alt"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="w-px h-6 bg-border mx-2" />
            <ThemeSwitcher />
          </div>

          {/* Mobile: theme + menu */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-surface-alt transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="菜单"
            >
              <svg
                className="w-6 h-6 text-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-surface-alt"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
