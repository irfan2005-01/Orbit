"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BRAND_CONFIG, navLinks } from "@/data/psyctech";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenJoin?: () => void;
}

export function Header({ onOpenJoin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <ScrollProgress className="bg-[#BC806A] z-50 h-0.5" />

      <header className="sticky top-0 z-40 w-full bg-[#162323]/80 backdrop-blur-md border-b border-[#484A43]/40 transition-colors">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Left: Clean uppercase tracked wordmark */}
          <Link
            href="/"
            className="uppercase tracking-[0.22em] text-sm font-medium text-[#EFE7E4] hover:text-[#BC806A] transition-colors focus:outline-none"
            aria-label={`${BRAND_CONFIG.name} Home`}
          >
            {BRAND_CONFIG.name}
          </Link>

          {/* Right: Navigation Links + Join Action (Desktop) */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-sm text-[#B59289] hover:text-[#EFE7E4] transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Understated Join CTA */}
            {onOpenJoin && (
              <button
                onClick={onOpenJoin}
                className="text-xs font-mono uppercase tracking-[0.16em] text-[#162323] bg-[#BC806A] hover:bg-[#C9917D] px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer ml-1"
              >
                Join
              </button>
            )}
          </nav>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {onOpenJoin && (
              <button
                onClick={onOpenJoin}
                className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#162323] bg-[#BC806A] hover:bg-[#C9917D] px-3 py-1 rounded-full font-medium"
              >
                Join
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#B59289] hover:text-[#EFE7E4] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#BC806A]" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#484A43]/45 bg-[#162323]/95 backdrop-blur-xl px-6 py-5 animate-in fade-in duration-150">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="text-sm text-[#B59289] hover:text-[#EFE7E4] py-1 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              {onOpenJoin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenJoin();
                  }}
                  className="text-xs font-mono uppercase tracking-[0.16em] text-[#162323] bg-[#BC806A] hover:bg-[#C9917D] px-4 py-2.5 rounded-full font-medium transition-all text-center cursor-pointer mt-2"
                >
                  Join the ecosystem →
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
