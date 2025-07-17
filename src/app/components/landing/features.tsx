"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Bot,
  MessageSquare,
  Workflow,
  Users,
  Palette,
  Zap,
  Shield,
  Code,
  Brain,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Bot,
    title: "Multi-Agent System",
    description: "Deploy multiple specialized AI agents that work together to solve complex tasks with coordinated workflows.",
    badge: "Core",
    color: "text-primary",
  },
  {
    icon: MessageSquare,
    title: "Interactive Chat Interface",
    description: "Seamless chat experience with real-time responses, context awareness, and beautiful UI components.",
    badge: "UI",
    color: "text-primary",
  },
  {
    icon: Workflow,
    title: "Human-in-the-Loop",
    description: "Collaborative workflows where humans can review, approve, and guide AI decision-making processes.",
    badge: "Workflow",
    color: "text-primary",
  },
  {
    icon: Palette,
    title: "Generative UI",
    description: "Dynamic user interfaces that adapt and generate based on AI responses and user interactions.",
    badge: "Advanced",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Frontend Actions",
    description: "Direct UI manipulation through natural language commands - change themes, navigate, and control the interface.",
    badge: "Interactive",
    color: "text-primary",
  },
  {
    icon: Brain,
    title: "Intelligent Routing",
    description: "Smart agent selection and task routing based on context, capabilities, and user requirements.",
    badge: "Smart",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Type-Safe Development",
    description: "Full TypeScript support with comprehensive type definitions for reliable and maintainable code.",
    badge: "DX",
    color: "text-primary",
  },
  {
    icon: Code,
    title: "Developer Experience",
    description: "Rich development tools, hot reload, debugging support, and extensive documentation for rapid development.",
    badge: "DX",
    color: "text-primary",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Composable components and services that can be mixed and matched to build custom AI applications.",
    badge: "Architecture",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Community & Support",
    description: "Active community, regular updates, and dedicated support for developers building AI applications.",
    badge: "Community",
    color: "text-gray-500",
  },
];

interface FeaturesProps {
  className?: string;
}

/**
 * Features section component showcasing key capabilities
 *
 * @param className - Additional CSS classes
 */
export function Features({ className }: FeaturesProps) {
  return (
    <section className={cn("py-24 bg-muted/30", className)} id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to build AI agents
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive toolkit for creating intelligent, interactive AI applications
            with modern web technologies.
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:bg-background/80 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={cn("rounded-lg bg-muted/50 p-2", feature.color)}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">
            Ready to start building?{" "}
            <a href="#cta" className="font-semibold text-primary hover:underline">
              Get started today →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
