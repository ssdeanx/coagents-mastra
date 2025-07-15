"use client";

import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

/**
 * Hero section component for the landing page
 * 
 * @param className - Additional CSS classes
 * @param onGetStarted - Callback when "Get Started" button is clicked
 * @param onLearnMore - Callback when "Learn More" button is clicked
 */
export function Hero({ className, onGetStarted, onLearnMore }: HeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20", className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-8 px-4 py-2 text-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by Mastra & CopilotKit
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Build Intelligent{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Agents
            </span>{" "}
            with Ease
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Create powerful AI-driven applications with human-in-the-loop workflows,
            generative UI, and seamless frontend integration. Built on top of Mastra
            robust agent framework and CopilotKit interactive components.
          </p>

          {/* Feature highlights */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Multi-Agent Workflows
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Generative UI
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Human-in-the-Loop
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Real-time Chat
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="group px-8 py-3 text-lg"
              onClick={onGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={onLearnMore}
            >
              Learn More
            </Button>
          </div>

          {/* Stats or social proof */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">7+</div>
              <div className="text-sm text-muted-foreground">Pre-built Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">∞</div>
              <div className="text-sm text-muted-foreground">Customizable Workflows</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">TypeScript Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
