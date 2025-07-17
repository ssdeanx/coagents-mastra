"use client";

import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ArrowRight, Sparkles, Zap, Brain, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ParticleBackground } from "./particle-background";

interface HeroProps {
  className?: string;
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

/**
 * Hero section component - 2025 Professional Design
 *
 * Features refined 2025 design with consistent branding:
 * - Subtle particle effects using your color scheme
 * - Professional glassmorphism
 * - Consistent oklch color palette
 * - Gentle, non-distracting animations
 * - Clean typography hierarchy
 *
 * @param className - Additional CSS classes
 * @param onGetStarted - Callback when "Get Started" button is clicked
 * @param onLearnMore - Callback when "Learn More" button is clicked
 */
export function Hero({ className, onGetStarted, onLearnMore }: HeroProps) {
  return (
    <section className={cn("relative min-h-screen flex items-center justify-center overflow-hidden bg-background", className)}>
      {/* Subtle Particle Background */}
      <ParticleBackground />

      {/* Professional Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.216_0.006_56.043/0.05),transparent_70%)]" />

      {/* Subtle Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }} />

      {/* Minimal Geometric Accents */}
      <div className="absolute top-1/4 right-1/4 w-12 h-12 border border-primary/20 rotate-45" />
      <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-primary/10 rounded-full" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Professional Badge */}
        <div className="mb-8 flex justify-center">
          <Badge
            variant="secondary"
            className="px-6 py-3 text-sm font-medium"
          >
            <Cpu className="mr-2 h-4 w-4" />
            Powered by AI Agents
            <Sparkles className="ml-2 h-4 w-4" />
          </Badge>
        </div>

        {/* Professional Main Heading */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Deanmachines
          </span>
          <br />
          <span className="text-foreground">AI Workspace</span>
        </h1>

        {/* Professional Subheading */}
        <p className="mb-8 mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Experience the future of productivity with our intelligent agent system.
          Automate workflows, analyze data, and generate insights with cutting-edge AI technology.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="group px-8 py-4 text-lg font-semibold"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onLearnMore}
            className="px-8 py-4 text-lg font-semibold"
          >
            <Brain className="mr-2 h-5 w-5" />
            Learn More
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 rounded-full bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Process complex tasks in seconds with our optimized AI agents
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Intelligent</h3>
            <p className="text-sm text-muted-foreground">
              Advanced reasoning capabilities that adapt to your workflow
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Seamless</h3>
            <p className="text-sm text-muted-foreground">
              Intuitive integration that enhances your daily workflow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
