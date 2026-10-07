"use client";

import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ProblemSolutionSection from "../components/landing/ProblemSolutionSection";
import CoreFeaturesSection from "../components/landing/CoreFeaturesSection";
import OmnichannelSection from "../components/landing/OmnichannelSection";
import RbacSection from "../components/landing/RbacSection";
import ArchitectureSection from "../components/landing/ArchitectureSection";
import OpenSourceDevSection from "../components/landing/OpenSourceDevSection";
import TechStackSection from "../components/landing/TechStackSection";
import DeploymentSection from "../components/landing/DeploymentSection";
import FinalCtaSection from "../components/landing/FinalCtaSection";
import Footer from "../components/landing/Footer";
import ContactDemoModal from "../components/landing/ContactDemoModal";
import LoginModal from "../components/landing/LoginModal";
import { useLandingStore } from "../store/useLandingStore";
import CrmDashboard from "../CrmDashboard";
import { ArrowLeft } from "lucide-react";

export default function HomePage() {
  const { currentView, setCurrentView } = useLandingStore();

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentView]);

  // If user clicked Launch Dashboard, transition directly to the Dashboard!
  if (currentView === "dashboard") {
    return (
      <div className="relative min-h-screen bg-slate-50">
        {/* Sticky Top Banner Navigation back to Homepage */}
        <div className="sticky top-0 z-50 bg-[#070913] text-white px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs shadow-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView("landing")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to OpenCRM Homepage</span>
            </button>
            <span className="text-slate-400 hidden sm:inline">
              You are exploring the live enterprise dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-emerald-400 text-[11px]">LIVE DEMO ACTIVE</span>
          </div>
        </div>

        <CrmDashboard />
      </div>
    );
  }

  // Otherwise, default to the Homepage!
  return (
    <main className="min-h-screen bg-[#070913] text-slate-100 relative selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Hero Section with Dashboard Preview */}
      <HeroSection />

      {/* Problem -> Solution Section */}
      <ProblemSolutionSection />

      {/* Core Features Bento Grid */}
      <CoreFeaturesSection />

      {/* Omnichannel Communication Section */}
      <OmnichannelSection />

      {/* 5-Tier RBAC & Security Section */}
      <RbacSection />

      {/* Self-Hosted Architecture Section */}
      <ArchitectureSection />

      {/* Open Source & Developer Section */}
      <OpenSourceDevSection />

      {/* Technology Stack Ecosystem */}
      <TechStackSection />

      {/* 4-Step Deployment & Terminal Timeline */}
      <DeploymentSection />

      {/* Final Call to Action */}
      <FinalCtaSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Modal for Request Blueprint / Demo */}
      <ContactDemoModal />

      {/* Login / Sign in Modal */}
      <LoginModal />
    </main>
  );
}
