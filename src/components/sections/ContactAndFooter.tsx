"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/data/psyctech";
import { ArrowUpRight, Copy, Check } from "lucide-react";

export function ContactAndFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(BRAND_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-28 md:py-32 relative border-t border-[#484A43]/45">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-xs tracking-[0.2em] uppercase text-[#BC806A] font-mono mb-3">
            05 / CONTACT & DIALOGUE
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#EFE7E4] max-w-xl mb-6">
            Let&apos;s build together.
          </h2>
          <p className="text-sm md:text-base text-[#B59289] max-w-md font-normal mb-12 leading-relaxed">
            For academic collaborations, student venture incubation, event sponsorships, or direct technical talent acquisition.
          </p>

          {/* Understated Contact Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 pb-16 border-b border-[#484A43]/55">
            {/* Direct Email */}
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${BRAND_CONFIG.email}?subject=Collaboration%20Inquiry%20-%20${BRAND_CONFIG.name}`}
                className="text-base font-medium text-[#EFE7E4] hover:text-[#BC806A] inline-flex items-center gap-2 transition-colors"
              >
                <span>{BRAND_CONFIG.email}</span>
                <ArrowUpRight className="w-4 h-4 text-[#806B64]" />
              </a>
              <button
                onClick={copyEmail}
                className="text-[#806B64] hover:text-[#EFE7E4] transition-colors p-1 cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#BC806A]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Direct WhatsApp */}
            <a
              href={BRAND_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-[#EFE7E4] hover:text-[#BC806A] inline-flex items-center gap-2 transition-colors"
            >
              <span>WhatsApp: {BRAND_CONFIG.phone}</span>
              <ArrowUpRight className="w-4 h-4 text-[#806B64]" />
            </a>
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="py-12 border-t border-[#484A43]/45 bg-[#162323] text-xs font-mono text-[#806B64]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <Link
              href="/"
              className="text-[#EFE7E4] uppercase tracking-[0.22em] font-medium text-xs hover:text-[#BC806A] transition-colors"
            >
              {BRAND_CONFIG.name}
            </Link>
            <span>{BRAND_CONFIG.institution}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>{BRAND_CONFIG.location}</span>
            <span>© 2026 {BRAND_CONFIG.name}. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
