"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import CoreFeaturesSection from "@/components/landing/CoreFeaturesSection";
import OmnichannelSection from "@/components/landing/OmnichannelSection";
import RbacSection from "@/components/landing/RbacSection";
import ArchitectureSection from "@/components/landing/ArchitectureSection";
import OpenSourceDevSection from "@/components/landing/OpenSourceDevSection";
import TechStackSection from "@/components/landing/TechStackSection";
import DeploymentSection from "@/components/landing/DeploymentSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import Footer from "@/components/landing/Footer";
import ContactDemoModal from "@/components/landing/ContactDemoModal";

export default function HomePage() {
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
    </main>
  );
}
