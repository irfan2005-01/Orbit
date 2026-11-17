"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { initiativesData, partnershipTracks } from "@/data/psyctech";

export function InitiativesSection() {
  return (
    <section id="initiatives" className="py-28 md:py-32 relative border-t border-[#484A43]/45">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <BlurFade delay={0.05}>
          <div className="text-xs tracking-[0.2em] uppercase text-[#BC806A] font-mono mb-3">
            03 / INITIATIVES & ALLIANCES
          </div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#EFE7E4] mb-12">
            Flagship Programs & Industry Partnerships
          </h2>
        </BlurFade>

        {/* Minimal 3-Item Editorial Showcase */}
        <BlurFade delay={0.1}>
          <div className="space-y-12 border-t border-[#484A43]/55 pt-10 mb-24">
            {initiativesData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-[#484A43]/45 last:border-b-0"
              >
                {/* Left 4 cols: Dates & Role */}
                <div className="md:col-span-4">
                  <div className="text-xs font-mono text-[#BC806A] mb-1">
                    {item.dates}
                  </div>
                  <div className="text-xs text-[#806B64] font-mono uppercase tracking-wide">
                    {item.role}
                  </div>
                  <div className="mt-4 text-xs font-mono text-[#B59289]">
                    {item.metrics}
                  </div>
                </div>

                {/* Right 8 cols: Title, Summary & Key Directives */}
                <div className="md:col-span-8">
                  <h3 className="text-xl font-medium text-[#EFE7E4] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#B59289] leading-relaxed mb-4 font-normal">
                    {item.summary}
                  </p>
                  <ul className="space-y-2 text-xs text-[#B59289]">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-baseline gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-[#BC806A] flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Quiet Partner & Collaboration Section */}
        <BlurFade delay={0.15}>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-[#484A43]/55">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#BC806A] mb-1">
                  COLLABORATIVE ECOSYSTEM
                </div>
                <h4 className="text-lg font-medium text-[#EFE7E4]">
                  Partnership Tracks
                </h4>
              </div>
              <div className="text-xs text-[#806B64] font-mono mt-2 sm:mt-0">
                Lingaraj Appa Engineering College • Team KrishiKalpa
              </div>
            </div>

            {/* 5 Clean Typographic Columns (No loud bordered boxes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {partnershipTracks.map((track) => (
                <div key={track.tierNumber} className="flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#BC806A] mb-1">
                      {track.tierNumber}
                    </div>
                    <div className="text-sm font-medium text-[#EFE7E4] mb-2">
                      {track.name}
                    </div>
                    <p className="text-xs text-[#B59289] leading-relaxed mb-3 font-normal">
                      {track.description}
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-[#806B64] leading-snug pt-3 border-t border-[#484A43]/45">
                    {track.deliverable}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
