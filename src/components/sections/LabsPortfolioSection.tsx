"use client";

import React, { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { systemsIndexData, SystemItem, SystemCategory } from "@/data/psyctech";
import { ArrowUpRight, X, Sparkles } from "lucide-react";

interface LabsPortfolioSectionProps {
  onApplyProject?: (projectTitle: string) => void;
}

export function LabsPortfolioSection({ onApplyProject }: LabsPortfolioSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<SystemCategory>("all");
  const [activeSystem, setActiveSystem] = useState<SystemItem | null>(null);

  const filters: { id: SystemCategory; label: string }[] = [
    { id: "all", label: "All Systems" },
    { id: "active", label: "Active & Approved" },
    { id: "prototype", label: "Prototypes" },
    { id: "planned", label: "Planned" },
  ];

  const filteredSystems = systemsIndexData.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="labs" className="py-28 md:py-32 relative border-t border-[#484A43]/45">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <BlurFade delay={0.05}>
            <div className="text-xs tracking-[0.2em] uppercase text-[#BC806A] font-mono mb-3">
              02 / R&D SYSTEMS
            </div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#EFE7E4]">
              Selected Systems & Engineering IP
            </h2>
          </BlurFade>

          {/* Filter Pills */}
          <BlurFade delay={0.1}>
            <div className="flex items-center gap-1.5 self-start md:self-auto flex-wrap">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                    selectedFilter === f.id
                      ? "bg-[#BC806A] text-[#162323] font-medium"
                      : "text-[#B59289] hover:text-[#EFE7E4] hover:bg-[#1D2C2C]/60 border border-transparent"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Refined Interactive Index List */}
        <BlurFade delay={0.15}>
          <div className="divide-y divide-[#484A43]/55 border-y border-[#484A43]/55">
            {filteredSystems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveSystem(item)}
                className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group hover:bg-[#1D2C2C]/60 -mx-3 px-3 rounded transition-colors"
              >
                {/* Left: Title & Subtitle */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-base font-medium text-[#EFE7E4] group-hover:text-[#BC806A] transition-colors">
                      {item.title}
                    </span>
                    {item.referenceCode && (
                      <span className="text-[10px] font-mono text-[#BC806A] px-2 py-0.5 rounded bg-[#BC806A]/10 border border-[#BC806A]/25">
                        {item.referenceCode}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#B59289] mt-1 truncate">
                    {item.shortTitle}
                  </p>
                </div>

                {/* Right: Metadata & Arrow */}
                <div className="flex items-center gap-6 justify-between md:justify-end text-xs font-mono">
                  <span className="text-[#806B64] uppercase text-[11px] hidden sm:inline">
                    {item.domain}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded border ${
                      item.statusText === "Active" || item.statusText === "Approved"
                        ? "text-[#BC806A] bg-[#BC806A]/10 border-[#BC806A]/30"
                        : "text-[#B59289] bg-[#1D2C2C]/60 border-[#484A43]/60"
                    }`}
                  >
                    {item.statusText}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#806B64] group-hover:text-[#EFE7E4] transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>

      {/* Minimal Editorial Slide-Over Detail Drawer */}
      {activeSystem && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#162323]/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setActiveSystem(null)}
        >
          <div
            className="relative w-full max-w-lg h-full bg-[#1D2C2C] border-l border-[#484A43]/50 p-6 sm:p-8 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveSystem(null)}
              className="absolute top-6 right-6 text-[#B59289] hover:text-[#EFE7E4] transition-colors p-1 cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Header */}
            <div className="pr-8 mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#BC806A] mb-1.5">
                {activeSystem.domain} • {activeSystem.year}
              </div>
              <h3 className="text-2xl font-medium text-[#EFE7E4] tracking-tight">
                {activeSystem.title}
              </h3>
              {activeSystem.referenceCode && (
                <div className="text-xs font-mono text-[#BC806A] mt-1">
                  {activeSystem.referenceCode}
                </div>
              )}
            </div>

            {/* Problem Statement */}
            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                PROBLEM STATEMENT
              </div>
              <p className="text-sm text-[#B59289] leading-relaxed">
                {activeSystem.problemStatement}
              </p>
            </div>

            {/* Solution Overview */}
            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                ENGINEERING SPECIFICATION
              </div>
              <p className="text-sm text-[#EFE7E4] leading-relaxed">
                {activeSystem.solutionOverview}
              </p>
            </div>

            {/* Current Stage */}
            <div className="mb-6 p-3 rounded bg-[#162323] border border-[#484A43]/60">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1">
                CURRENT DEVELOPMENT STAGE
              </div>
              <div className="text-xs font-mono text-[#BC806A]">
                {activeSystem.currentStage}
              </div>
            </div>

            {/* Architecture Stack */}
            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-2">
                TECHNOLOGY & PROTOCOLS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSystem.architectureStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono text-[#B59289] bg-[#162323] border border-[#484A43]/60 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Open Roles & Skills Needed */}
            {activeSystem.lookingFor && activeSystem.lookingFor.length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-[#162323]/70 border border-[#484A43]/60">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#BC806A] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#BC806A]" />
                  <span>OPEN ROLES & SKILLS NEEDED</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSystem.lookingFor.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-mono text-[#B59289] bg-[#1D2C2C] border border-[#484A43]/60 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Apply to Build Action */}
            <div className="pt-4 border-t border-[#484A43]/50">
              <button
                onClick={() => {
                  const sys = activeSystem;
                  setActiveSystem(null);
                  if (onApplyProject) {
                    onApplyProject(sys.title);
                  }
                }}
                className="w-full py-3 px-4 rounded-md bg-[#BC806A] text-[#162323] hover:bg-[#C9917D] transition-all font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Apply to build on this project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
