"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ArrowRight, Github, BookOpen, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAProps {
  className?: string;
  onGetStarted?: () => void;
  onViewDocs?: () => void;
  onViewGithub?: () => void;
}

/**
 * Call-to-Action section component for the landing page
 *
 * @param className - Additional CSS classes
 * @param onGetStarted - Callback when "Get Started" button is clicked
 * @param onViewDocs - Callback when "View Documentation" button is clicked
 * @param onViewGithub - Callback when "View GitHub" button is clicked
 */
export function CTA({ className, onGetStarted, onViewDocs, onViewGithub }: CTAProps) {
  return (
    <section className={cn("py-24 bg-gradient-to-br from-primary/5 via-background to-muted/10", className)} id="cta">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary/10 via-background/50 to-primary/5 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          <CardContent className="relative px-8 py-16 sm:px-16 sm:py-24">
            <div className="mx-auto max-w-4xl text-center">
              {/* Icon */}
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Rocket className="h-8 w-8 text-primary" />
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Ready to build the future of AI?
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                Join developers who are already building amazing AI applications with our
                comprehensive toolkit. Get started in minutes, not hours.
              </p>

              {/* Features list */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  ✨ No complex setup required
                </div>
                <div className="flex items-center gap-2">
                  🚀 Deploy in minutes
                </div>
                <div className="flex items-center gap-2">
                  📚 Comprehensive documentation
                </div>
                <div className="flex items-center gap-2">
                  🔧 Full TypeScript support
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="group px-8 py-4 text-lg font-semibold"
                  onClick={onGetStarted}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 py-4"
                    onClick={onViewDocs}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Documentation
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 py-4"
                    onClick={onViewGithub}
                  >
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                </div>
              </div>

              {/* Additional info */}
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Free and open source • MIT License • Active community support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom section with quick links */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Quick Start</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get up and running with our starter template in under 5 minutes.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Examples</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore real-world examples and use cases to inspire your next project.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Community</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Join our growing community of developers building with AI agents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
