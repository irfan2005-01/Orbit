"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { OrbiteParticleO } from "@/components/OrbiteParticleO";
import { BRAND_CONFIG } from "@/data/psyctech";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onOpenJoin?: () => void;
}

export function HeroSection({ onOpenJoin }: HeroSectionProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden"
    >
      {/* Subtle Organic Terracotta-Rose Ambient Glow Behind Particle O */}
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none"
        style={{
          background:
            "radial-gradient(circle at 72% 48%, rgba(188, 128, 106, 0.11) 0%, rgba(72, 74, 67, 0.05) 45%, rgba(22, 35, 35, 0) 72%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-16">
          {/* Left Column: Left-Aligned Sleek Editorial Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left order-1">
            {/* Top Eyebrow Pill */}
            <BlurFade delay={0.05}>
              <button
                onClick={onOpenJoin}
                className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[#BC806A] border border-[#484A43]/60 bg-[#1D2C2C]/60 hover:border-[#BC806A]/60 hover:bg-[#1D2C2C] px-3.5 py-1.5 rounded-full transition-all cursor-pointer group"
                aria-label="Open student onboarding application"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#BC806A] animate-pulse" />
                <span>COHORT 2026–27 ONBOARDING OPEN • LAEC BIDAR</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </BlurFade>

            {/* Institution Line */}
            <BlurFade delay={0.09}>
              <div className="text-xs font-mono tracking-[0.18em] uppercase text-[#806B64] mt-5">
                {BRAND_CONFIG.institution}
              </div>
            </BlurFade>

            {/* Headline */}
            <BlurFade delay={0.13}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.03em] leading-[1.08] text-[#EFE7E4] mt-3">
                {BRAND_CONFIG.tagline}
              </h1>
            </BlurFade>

            {/* Subtitle */}
            <BlurFade delay={0.17}>
              <p className="max-w-lg text-base sm:text-lg text-[#B59289] leading-relaxed mt-5 font-normal">
                {BRAND_CONFIG.subheading}
              </p>
            </BlurFade>

            {/* CTA Row */}
            <BlurFade delay={0.21}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {onOpenJoin && (
                  <button
                    onClick={onOpenJoin}
                    className="bg-[#BC806A] text-[#162323] hover:bg-[#C9917D] font-medium px-6 py-3 rounded-full text-sm tracking-wide transition-all cursor-pointer inline-flex items-center gap-2 group"
                  >
                    <span>Join the ecosystem</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                  </button>
                )}

                <a
                  href="#ecosystem"
                  onClick={(e) => handleScrollTo(e, "#ecosystem")}
                  className="text-sm text-[#BC806A] hover:text-[#EFE7E4] inline-flex items-center gap-2 group transition-colors py-2"
                >
                  <span>Explore the system</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                </a>
              </div>
            </BlurFade>

            {/* Subtle Bottom Metadata Strip */}
            <BlurFade delay={0.25} className="w-full">
              <div className="mt-12 pt-6 border-t border-[#484A43]/40 flex flex-wrap gap-8 w-full">
                <div>
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#806B64]">
                    01 / ORBITE COMMUNITY
                  </div>
                  <div className="text-xs text-[#EFE7E4] mt-1">
                    Peer Engineering &amp; Hackathons
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#806B64]">
                    02 / ORBITE LABS
                  </div>
                  <div className="text-xs text-[#EFE7E4] mt-1">
                    Applied R&amp;D &amp; Deployment
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Interactive Particle Letter "O" */}
          <div className="lg:col-span-6 flex items-center justify-center order-2">
            <BlurFade delay={0.1} className="w-full flex items-center justify-center">
              <OrbiteParticleO />
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
