"use client";

import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { milestonesData } from "@/data/psyctech";

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-28 md:py-32 relative border-t border-[#484A43]/45">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Label */}
        <BlurFade delay={0.05}>
          <div className="text-xs tracking-[0.2em] uppercase text-[#BC806A] font-mono mb-4">
            01 / ECOSYSTEM
          </div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#EFE7E4] mb-12">
            Two distinct wings. One integrated methodology.
          </h2>
        </BlurFade>

        {/* Two Clean Border-Separated Editorial Columns */}
        <BlurFade delay={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 border-t border-[#484A43]/55 pt-10 mb-20">
            {/* Column 1: Orbite Community */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#BC806A] mb-3">
                WING 01 • TALENT ACCELERATION
              </div>
              <h3 className="text-xl font-medium text-[#EFE7E4] tracking-tight mb-4">
                Orbite Community
              </h3>
              <p className="text-sm text-[#B59289] leading-relaxed mb-6 font-normal">
                The grassroots catalyst responsible for student engagement, peer-to-peer technical bootcamps, national hackathons, leadership training, and public speaking mastery. It turns curious undergraduates into disciplined engineering leads.
              </p>
              <ul className="space-y-2.5 text-xs text-[#B59289]">
                <li className="flex items-baseline gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-[#BC806A] flex-shrink-0" />
                  <span>Technical skill development in modern software, cloud, and embedded systems</span>
                </li>
                <li className="flex items-baseline gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-[#BC806A] flex-shrink-0" />
                  <span>Executive pitch coaching, presentation confidence, and operational responsibility</span>
                </li>
                <li className="flex items-baseline gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-[#BC806A] flex-shrink-0" />
                  <span>Ideathons and rapid problem-validation sprints with mentor feedback</span>
                </li>
                <li className="flex items-baseline gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-[#BC806A] flex-shrink-0" />
                  <span>Bilateral industry collaborations and startup incubation links</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Orbite Labs */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#BC806A] mb-3">
                WING 02 • PRODUCT ENGINEERING
              </div>
              <h3 className="text-xl font-medium text-[#EFE7E4] tracking-tight mb-4">
                Orbite Labs
              </h3>
              <p className="text-sm text-[#B59289] leading-relaxed mb-6 font-normal">
                The institutional research engine executing rigorous engineering across AI/ML systems, full-stack software, IoT microcontrollers, and smart campus infrastructure. Every system follows a structured 7-stage research-to-deployment lifecycle.
              </p>
              <div className="mb-6 p-4 rounded-lg bg-[#1D2C2C] border border-[#484A43]/55">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-2">
                  7-STAGE LIFECYCLE
                </div>
                <div className="text-xs font-mono text-[#EFE7E4] flex flex-wrap gap-x-2 gap-y-1">
                  <span>Identify</span>
                  <span className="text-[#806B64]">→</span>
                  <span>Research</span>
                  <span className="text-[#806B64]">→</span>
                  <span>Architecture</span>
                  <span className="text-[#806B64]">→</span>
                  <span>Prototype</span>
                  <span className="text-[#806B64]">→</span>
                  <span>Validate</span>
                  <span className="text-[#806B64]">→</span>
                  <span>Deploy</span>
                  <span className="text-[#806B64]">→</span>
                  <span className="text-[#BC806A]">Scale</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#B59289]">
                <div className="p-2.5 rounded bg-[#1D2C2C]/80 border border-[#484A43]/50">
                  AI / ML Systems
                </div>
                <div className="p-2.5 rounded bg-[#1D2C2C]/80 border border-[#484A43]/50">
                  Full-Stack Software
                </div>
                <div className="p-2.5 rounded bg-[#1D2C2C]/80 border border-[#484A43]/50">
                  IoT & Embedded Hardware
                </div>
                <div className="p-2.5 rounded bg-[#1D2C2C]/80 border border-[#484A43]/50">
                  Smart Campus Infrastructure
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Quiet Typographic Metrics Row */}
        <BlurFade delay={0.18}>
          <div className="border-t border-[#484A43]/55 pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#484A43]/55">
              {milestonesData.map((m, idx) => (
                <div key={idx} className={`${idx === 0 ? "" : "md:pl-8"} ${idx === milestonesData.length - 1 ? "" : "md:pr-8"} pt-4 md:pt-0`}>
                  <div className="text-3xl md:text-4xl font-normal font-mono text-[#EFE7E4] tracking-tight mb-1">
                    {m.prefix}
                    {m.numericValue}
                    {m.suffix}
                  </div>
                  <div className="text-xs font-medium text-[#EFE7E4] mb-0.5">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-[#806B64] leading-snug">
                    {m.context}
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
