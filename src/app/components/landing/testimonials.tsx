"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  badge?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "TechCorp",
    content: "The human-in-the-loop workflows are game-changing. We can now build AI applications that truly collaborate with our users instead of replacing them.",
    rating: 5,
    badge: "Early Adopter",
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "StartupXYZ",
    content: "Generative UI capabilities allowed us to create dynamic interfaces that adapt to user needs in real-time. Our user engagement increased by 40%.",
    rating: 5,
    badge: "Power User",
  },
  {
    name: "Emily Watson",
    role: "AI Engineer",
    company: "InnovateLabs",
    content: "The multi-agent system is incredibly powerful. We built a complex workflow with 5 different agents working together seamlessly.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Full Stack Developer",
    company: "WebSolutions",
    content: "TypeScript support is excellent, and the developer experience is top-notch. Hot reload works perfectly with the agent system.",
    rating: 5,
    badge: "Contributor",
  },
  {
    name: "Lisa Thompson",
    role: "UX Designer",
    company: "DesignStudio",
    content: "The frontend actions feature lets users control the interface naturally. It's like having a conversation with the app itself.",
    rating: 5,
  },
  {
    name: "Alex Johnson",
    role: "CTO",
    company: "ScaleUp Inc",
    content: "We migrated our entire AI infrastructure to this framework. The modular architecture made it easy to integrate with our existing systems.",
    rating: 5,
    badge: "Enterprise",
  },
];

interface TestimonialsProps {
  className?: string;
}

/**
 * Testimonials section component showcasing user feedback
 * 
 * @param className - Additional CSS classes
 */
export function Testimonials({ className }: TestimonialsProps) {
  return (
    <section className={cn("py-24 bg-background", className)} id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by developers worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what developers are saying about building with our AI agent framework.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-muted/30 transition-all duration-300 hover:bg-muted/50 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">
                    &quot;{testimonial.content}&quot;
                  </blockquote>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        {testimonial.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {testimonial.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-4 text-center">
          <div>
            <div className="text-3xl font-bold text-foreground">1000+</div>
            <div className="text-sm text-muted-foreground">Developers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">50+</div>
            <div className="text-sm text-muted-foreground">Companies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">99%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
