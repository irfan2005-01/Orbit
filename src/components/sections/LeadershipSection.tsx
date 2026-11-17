"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { leadershipData } from "@/data/psyctech";
import { ArrowUpRight } from "lucide-react";

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-28 md:py-32 relative border-t border-[#484A43]/45">
      <div className="max-w-5xl mx-auto px-6">
        <BlurFade delay={0.05}>
          <div className="text-xs tracking-[0.2em] uppercase text-[#BC806A] font-mono mb-3">
            04 / CORE TEAM
          </div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#EFE7E4] mb-12">
            Engineering Leadership
          </h2>
        </BlurFade>

        {/* Minimal 4-Person Leadership Row */}
        <BlurFade delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#484A43]/55 pt-10">
            {leadershipData.map((member) => (
              <div key={member.name} className="flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-medium text-[#EFE7E4] mb-1">
                    {member.name}
                  </h3>
                  <div className="text-xs text-[#BC806A] font-mono mb-1">
                    {member.role}
                  </div>
                  <div className="text-[11px] font-mono text-[#806B64] mb-3">
                    {member.focus}
                  </div>
                  <p className="text-xs text-[#B59289] leading-relaxed mb-4 font-normal">
                    {member.bio}
                  </p>
                </div>

                {/* Subtle text links */}
                <div className="flex items-center gap-4 pt-3 border-t border-[#484A43]/45 text-xs font-mono">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B59289] hover:text-[#BC806A] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 text-[#806B64]" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B59289] hover:text-[#BC806A] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 text-[#806B64]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
