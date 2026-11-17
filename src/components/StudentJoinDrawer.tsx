"use client";

import React, { useState, useEffect } from "react";
import { BRAND_CONFIG } from "@/data/psyctech";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { SocialIcons } from "@/components/icons/SocialIcons";

export type OnboardingTrack = "community" | "labs";

interface StudentJoinDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: OnboardingTrack;
  initialProject?: string;
}

const BRANCH_OPTIONS = [
  "CSE • 2nd Sem",
  "CSE • 4th Sem",
  "CSE • 6th Sem",
  "ECE • 2nd Sem",
  "ECE • 4th Sem",
  "ECE • 6th Sem",
  "AI & ML • 2nd Sem",
  "AI & ML • 4th Sem",
  "Mechanical • 2nd/4th/6th Sem",
  "Civil • 2nd/4th/6th Sem",
  "Other Department / Year",
];

const DOMAIN_OPTIONS = [
  "Full-Stack / Web",
  "AI / ML",
  "IoT & Hardware",
  "UI/UX & Design",
  "Operations & Stage",
];

function StudentJoinDrawerContent({
  onClose,
  initialTrack,
  initialProject,
}: {
  onClose: () => void;
  initialTrack: OnboardingTrack;
  initialProject: string;
}) {
  const [track, setTrack] = useState<OnboardingTrack>(initialTrack);
  const [name, setName] = useState("");
  const [branchSem, setBranchSem] = useState(BRANCH_OPTIONS[0]);
  const [whatsapp, setWhatsapp] = useState("");
  const [domain, setDomain] = useState(DOMAIN_OPTIONS[0]);
  const [portfolio, setPortfolio] = useState("");
  const [note, setNote] = useState(
    initialProject ? `Interested in contributing to: ${initialProject}` : ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll while drawer content is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission = {
      name: name.trim(),
      track: track === "labs" ? "Applied R&D / Labs" : "Community & Workshops",
      branchSem,
      whatsapp: whatsapp.trim(),
      domain,
      portfolio: portfolio.trim(),
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };

    // 1. Send to Webhook if configured (Google Sheets / Web3Forms / custom webhook)
    const webhookUrl = process.env.NEXT_PUBLIC_INTAKE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        });
      } catch (err) {
        // Fallback gracefully without blocking the student
        console.warn("Webhook dispatch failed, falling back to local intake:", err);
      }
    }

    // 2. Persist in local storage
    try {
      const existing = JSON.parse(localStorage.getItem("orbite_intake_submissions") || "[]");
      existing.push(submission);
      localStorage.setItem("orbite_intake_submissions", JSON.stringify(existing));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setWhatsapp("");
    setPortfolio("");
    setNote("");
    setIsSubmitted(false);
  };

  // Build WhatsApp prefilled message
  const trackName = track === "labs" ? "Applied R&D / Labs" : "Community & Workshops";
  const waText = [
    `Hi ${BRAND_CONFIG.name} team, I just applied to join the ecosystem!`,
    ``,
    `*Name:* ${name.trim()}`,
    `*Track:* ${trackName}`,
    `*Branch:* ${branchSem}`,
    `*Domain:* ${domain}`,
    portfolio.trim() ? `*Portfolio:* ${portfolio.trim()}` : null,
    note.trim() ? `*Note:* ${note.trim()}` : null,
    ``,
    `Looking forward to onboarding with LAEC Bidar!`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `${BRAND_CONFIG.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#162323]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg h-full bg-[#1D2C2C] border-l border-[#484A43]/50 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#B59289] hover:text-[#EFE7E4] transition-colors p-1.5 rounded-md hover:bg-[#162323]/60 cursor-pointer"
          aria-label="Close intake drawer"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-2 my-auto">
            <div className="w-12 h-12 rounded-full bg-[#BC806A]/15 border border-[#BC806A]/35 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6 text-[#BC806A]" strokeWidth={1.5} />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#BC806A] mb-2">
              INTAKE APPLICATION RECORDED
            </span>

            <h3 className="text-2xl font-medium text-[#EFE7E4] tracking-tight mb-2">
              Welcome to {BRAND_CONFIG.name}, {name.split(" ")[0]}.
            </h3>

            <p className="text-xs text-[#B59289] max-w-sm leading-relaxed mb-6">
              Your profile has been queued for Cohort 2026–27 under the{" "}
              <span className="text-[#EFE7E4] font-medium">{trackName}</span> track. Connect directly with
              student leads to accelerate your review.
            </p>

            {/* Direct WhatsApp Action Link */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-md bg-[#BC806A] text-[#162323] hover:bg-[#C9917D] transition-all font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer group"
            >
              <SocialIcons.WhatsApp className="w-4 h-4" />
              <span>Open WhatsApp Intake Chat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <div className="mt-6 flex items-center gap-4 text-xs font-mono">
              <button
                onClick={handleReset}
                className="text-[#806B64] hover:text-[#B59289] transition-colors cursor-pointer"
              >
                Submit another profile
              </button>
              <span className="text-[#806B64]">•</span>
              <button
                onClick={onClose}
                className="text-[#B59289] hover:text-[#EFE7E4] transition-colors cursor-pointer"
              >
                Close drawer
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <>
            <div>
              {/* Header */}
              <div className="pr-8 mb-6">
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#BC806A] mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BC806A] animate-pulse" />
                  <span>STUDENT INTAKE • COHORT 2026–27</span>
                </div>
                <h2 className="text-2xl font-medium text-[#EFE7E4] tracking-tight">
                  Join the Ecosystem
                </h2>
                <p className="text-xs text-[#B59289] mt-1">
                  {BRAND_CONFIG.institution}
                </p>
              </div>

              {/* Track Selector Tabs */}
              <div className="mb-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-2">
                  SELECT YOUR ONBOARDING TRACK
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTrack("community")}
                    className={`p-3 text-left rounded-md border transition-all cursor-pointer ${
                      track === "community"
                        ? "bg-[#BC806A] border-[#BC806A] text-[#162323]"
                        : "bg-[#162323]/60 border-[#484A43]/60 text-[#B59289] hover:text-[#EFE7E4] hover:border-[#806B64]"
                    }`}
                  >
                    <div
                      className={`text-xs font-medium mb-0.5 ${
                        track === "community" ? "text-[#162323]" : "text-[#EFE7E4]"
                      }`}
                    >
                      Community & Workshops
                    </div>
                    <div
                      className={`text-[11px] leading-snug ${
                        track === "community" ? "text-[#162323]/75" : "text-[#806B64]"
                      }`}
                    >
                      Events, hackathons & skill sprints
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrack("labs")}
                    className={`p-3 text-left rounded-md border transition-all cursor-pointer ${
                      track === "labs"
                        ? "bg-[#BC806A] border-[#BC806A] text-[#162323]"
                        : "bg-[#162323]/60 border-[#484A43]/60 text-[#B59289] hover:text-[#EFE7E4] hover:border-[#806B64]"
                    }`}
                  >
                    <div
                      className={`text-xs font-medium mb-0.5 ${
                        track === "labs" ? "text-[#162323]" : "text-[#EFE7E4]"
                      }`}
                    >
                      Applied R&D / Labs
                    </div>
                    <div
                      className={`text-[11px] leading-snug ${
                        track === "labs" ? "text-[#162323]/75" : "text-[#806B64]"
                      }`}
                    >
                      Building software, AI & IoT systems
                    </div>
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <form id="student-intake-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                    FULL NAME <span className="text-[#BC806A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Patil"
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#162323] border border-[#484A43]/60 focus:border-[#BC806A] text-sm text-[#EFE7E4] placeholder:text-[#806B64] outline-none transition-colors"
                  />
                </div>

                {/* Branch & Semester */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                      BRANCH & SEMESTER <span className="text-[#BC806A]">*</span>
                    </label>
                    <select
                      value={branchSem}
                      onChange={(e) => setBranchSem(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md bg-[#162323] border border-[#484A43]/60 focus:border-[#BC806A] text-xs font-mono text-[#EFE7E4] outline-none transition-colors"
                    >
                      {BRANCH_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#1D2C2C] text-[#EFE7E4]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                      PRIMARY DOMAIN <span className="text-[#BC806A]">*</span>
                    </label>
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md bg-[#162323] border border-[#484A43]/60 focus:border-[#BC806A] text-xs font-mono text-[#EFE7E4] outline-none transition-colors"
                    >
                      {DOMAIN_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#1D2C2C] text-[#EFE7E4]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                    WHATSAPP NUMBER <span className="text-[#BC806A]">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#484A43]/60 bg-[#162323] text-xs font-mono text-[#806B64]">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="94482 XXXXX"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 rounded-r-md bg-[#162323] border border-[#484A43]/60 focus:border-[#BC806A] text-sm font-mono text-[#EFE7E4] placeholder:text-[#806B64] outline-none transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-[#806B64] mt-1 font-mono">
                    Used exclusively for official cohort invites & technical updates.
                  </p>
                </div>

                {/* GitHub or Portfolio (Optional) */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                    GITHUB / PORTFOLIO / LINKEDIN (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://github.com/your-handle"
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#162323] border border-[#484A43]/60 focus:border-[#BC806A] text-sm font-mono text-[#EFE7E4] placeholder:text-[#806B64] outline-none transition-colors"
                  />
                </div>

                {/* Short Note */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#806B64] mb-1.5">
                    WHAT DO YOU WANT TO BUILD OR LEARN?
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Mention any technologies, ideas, or projects you want to contribute to..."
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#162323] border border-[#484A43]/60 focus:border-[#BC806A] text-xs text-[#EFE7E4] placeholder:text-[#806B64] outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>
              </form>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#484A43]/50 mt-6">
              <button
                type="submit"
                form="student-intake-form"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-md bg-[#BC806A] text-[#162323] hover:bg-[#C9917D] disabled:opacity-50 transition-all font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{isSubmitting ? "Recording..." : "Submit Application"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <div className="text-center mt-2.5">
                <span className="text-[10.5px] font-mono text-[#806B64]">
                  Zero dues • Pure merit and builder curiosity
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function StudentJoinDrawer({
  isOpen,
  onClose,
  initialTrack = "community",
  initialProject = "",
}: StudentJoinDrawerProps) {
  if (!isOpen) return null;

  return (
    <StudentJoinDrawerContent
      onClose={onClose}
      initialTrack={initialTrack}
      initialProject={initialProject}
    />
  );
}
