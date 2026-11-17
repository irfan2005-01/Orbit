"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Preloader } from "@/components/Preloader";
import { StudentJoinDrawer, OnboardingTrack } from "@/components/StudentJoinDrawer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { LabsPortfolioSection } from "@/components/sections/LabsPortfolioSection";
import { InitiativesSection } from "@/components/sections/InitiativesSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ContactAndFooter } from "@/components/sections/ContactAndFooter";

const subscribeStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getClientSnapshot = () => {
  try {
    return sessionStorage.getItem("orbite_preloaded") === "true";
  } catch {
    return false;
  }
};

const getServerSnapshot = () => false;

export default function HomePage() {
  const alreadyPreloaded = useSyncExternalStore(subscribeStorage, getClientSnapshot, getServerSnapshot);
  const [preloaderDismissed, setPreloaderDismissed] = useState(false);

  // Student Onboarding Drawer State
  const [isJoinDrawerOpen, setIsJoinDrawerOpen] = useState(false);
  const [joinTrack, setJoinTrack] = useState<OnboardingTrack>("community");
  const [joinProject, setJoinProject] = useState("");

  const isPreloaderActive = !alreadyPreloaded && !preloaderDismissed;

  const handleOpenJoin = (track: OnboardingTrack = "community", project = "") => {
    setJoinTrack(track);
    setJoinProject(project);
    setIsJoinDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#162323] text-[#EFE7E4] overflow-x-hidden selection:bg-[#BC806A]/25 selection:text-[#EFE7E4]">
      {/* Pure-GPU Zoom-Through Letter-Fill Preloader */}
      <Preloader onExitStart={() => setPreloaderDismissed(true)} />

      {/* Student Onboarding Slide-Over Drawer */}
      <StudentJoinDrawer
        isOpen={isJoinDrawerOpen}
        onClose={() => setIsJoinDrawerOpen(false)}
        initialTrack={joinTrack}
        initialProject={joinProject}
      />

      {/* Sticky Petroleum Header (kept outside scaled wrapper so backdrop-blur & sticky never jank) */}
      <div
        className={`sticky top-0 z-40 transition-opacity duration-500 ease-out ${
          isPreloaderActive ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header onOpenJoin={() => handleOpenJoin("community")} />
      </div>

      {/* Main Homepage Content: Lightweight GPU depth arrival */}
      <main
        className={`relative flex flex-col transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isPreloaderActive ? "scale-[0.97] opacity-90" : "scale-100 opacity-100"
        }`}
      >
        {/* Section 1: Calm Editorial Hero */}
        <HeroSection onOpenJoin={() => handleOpenJoin("community")} />

        {/* Section 2: Ecosystem (Dual-Wing Architecture) */}
        <EcosystemSection />

        {/* Section 3: Selected Systems & R&D Index with Apply Project Trigger */}
        <LabsPortfolioSection
          onApplyProject={(projectTitle) => handleOpenJoin("labs", projectTitle)}
        />

        {/* Section 4: Initiatives & Collaborations */}
        <InitiativesSection />

        {/* Section 5: Leadership */}
        <LeadershipSection />

        {/* Section 6: Contact & Quiet Footer */}
        <ContactAndFooter />
      </main>
    </div>
  );
}
