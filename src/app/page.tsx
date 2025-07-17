"use client";

import { useRouter } from "next/navigation";
import { Hero, Features, Testimonials, CTA } from "@/app/components/landing";
import "./globals.css";

/**
 * Landing Page - Professional entry point for the CopilotKit Integration System
 *
 * Features:
 * - Hero section with clear value proposition
 * - Features showcase highlighting AI agent capabilities
 * - Social proof through testimonials
 * - Strong call-to-action driving users to dashboard
 *
 * Uses existing Tailwind v4.1 utilities and oklch color system
 */
export default function LandingPage() {
  const router = useRouter();

  // Navigation handlers using Next.js router
  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  const handleLearnMore = () => {
    // Smooth scroll to features section
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewDocs = () => {
    // Navigate to documentation (can be updated to actual docs URL)
    window.open("/docs", "_blank");
  };

  const handleViewGithub = () => {
    // Navigate to GitHub repository (can be updated to actual repo URL)
    window.open("https://github.com/mastra-ai/mastra", "_blank");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
      />

      {/* Features Section */}
      <Features />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call-to-Action Section */}
      <CTA
        onGetStarted={handleGetStarted}
        onViewDocs={handleViewDocs}
        onViewGithub={handleViewGithub}
      />
    </main>
  );
}
