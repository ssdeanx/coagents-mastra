"use client";

import React, { useState, useMemo } from "react";
import { PageLayout } from "@/app/components/layout/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Search,
  BookOpen,
  MessageSquare,
  Brain,
  Database,
  Network,
  Settings,
  Wrench,
  Workflow,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  FileText,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

/**
 * Documentation Hub Page - Comprehensive Documentation Landing Page
 *
 * This page provides:
 * - Search functionality across all documentation
 * - Navigation to all documentation categories
 * - Quick start guides and popular content
 * - Recent updates and changelog
 * - Filtering and categorization
 */
export default function DocumentationHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const documentationSections = useMemo(() => [
    {
      id: "chat",
      title: "Chat Documentation",
      description: "Comprehensive CopilotKit guides, component variants, and troubleshooting.",
      href: "/documentation/chat",
      icon: MessageSquare,
      category: "core",
      tags: ["copilotkit", "chat", "components", "ui"],
      popularity: 95,
      lastUpdated: "2024-01-15"
    },
    {
      id: "agents",
      title: "Agents Documentation",
      description: "All 8 agents, capabilities, tools, examples, and coordination patterns.",
      href: "/documentation/agents",
      icon: Brain,
      category: "core",
      tags: ["agents", "ai", "automation", "coordination"],
      popularity: 90,
      lastUpdated: "2024-01-14"
    },
    {
      id: "memory",
      title: "Memory Documentation",
      description: "Memory systems, Pinecone/Upstash/PostgreSQL implementations, and configuration.",
      href: "/documentation/memory",
      icon: Database,
      category: "infrastructure",
      tags: ["memory", "database", "pinecone", "upstash", "postgresql"],
      popularity: 85,
      lastUpdated: "2024-01-13"
    },
    {
      id: "networks",
      title: "Networks Documentation",
      description: "Network architecture, routing logic, workflow creation, and optimization.",
      href: "/documentation/networks",
      icon: Network,
      category: "infrastructure",
      tags: ["networks", "routing", "architecture", "optimization"],
      popularity: 80,
      lastUpdated: "2024-01-12"
    },
    {
      id: "settings",
      title: "Settings Documentation",
      description: "Configuration options, environment variables, integration guides, and security.",
      href: "/documentation/settings",
      icon: Settings,
      category: "configuration",
      tags: ["settings", "config", "environment", "security"],
      popularity: 75,
      lastUpdated: "2024-01-11"
    },
    {
      id: "tools",
      title: "Tools Documentation",
      description: "All 20+ tools, usage examples, integration patterns, and custom development.",
      href: "/documentation/tools",
      icon: Wrench,
      category: "development",
      tags: ["tools", "integration", "development", "examples"],
      popularity: 88,
      lastUpdated: "2024-01-10"
    },
    {
      id: "workflows",
      title: "Workflows Documentation",
      description: "5 production workflows, creation templates, execution monitoring, and optimization.",
      href: "/documentation/workflows",
      icon: Workflow,
      category: "automation",
      tags: ["workflows", "automation", "templates", "monitoring"],
      popularity: 82,
      lastUpdated: "2024-01-09"
    },
  ], []);

  const quickStartGuides = [
    {
      title: "Getting Started with CopilotKit",
      description: "Set up your first AI-powered chat interface",
      href: "/documentation/chat/getting-started",
      icon: Sparkles,
      estimatedTime: "10 min"
    },
    {
      title: "Creating Your First Agent",
      description: "Build and deploy a custom AI agent",
      href: "/documentation/agents/creating-agents",
      icon: Brain,
      estimatedTime: "15 min"
    },
    {
      title: "Setting Up Memory Systems",
      description: "Configure vector storage and persistence",
      href: "/documentation/memory/setup",
      icon: Database,
      estimatedTime: "20 min"
    },
    {
      title: "Building Custom Tools",
      description: "Extend functionality with custom tools",
      href: "/documentation/tools/custom-tools",
      icon: Wrench,
      estimatedTime: "25 min"
    }
  ];

  const recentUpdates = [
    {
      title: "New CopilotKit Components",
      description: "Added advanced chat components and customization options",
      date: "2024-01-15",
      category: "chat",
      type: "feature"
    },
    {
      title: "Agent Coordination Improvements",
      description: "Enhanced multi-agent workflows and communication patterns",
      date: "2024-01-14",
      category: "agents",
      type: "improvement"
    },
    {
      title: "Memory System Optimization",
      description: "Improved Pinecone integration and query performance",
      date: "2024-01-13",
      category: "memory",
      type: "optimization"
    }
  ];

  // Filter documentation sections based on search and filters
  const filteredSections = useMemo(() => {
    return documentationSections.filter(section => {
      const matchesSearch = searchQuery === "" ||
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
      const matchesTag = selectedTag === "all" || section.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag, documentationSections]);

  // Get unique categories and tags for filters
  const categories = useMemo(() => {
    const cats = [...new Set(documentationSections.map(section => section.category))];
    return cats.sort();
  }, [documentationSections]);

  const tags = useMemo(() => {
    const allTags = documentationSections.flatMap(section => section.tags);
    return [...new Set(allTags)].sort();
  }, [documentationSections]);

  return (
    <PageLayout
      title="Documentation Hub"
      description="Comprehensive guides and references for the AI-powered development platform"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-gentle-float">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent text-shadow-lg">
              Documentation Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build with our AI-powered development platform.
              From quick starts to advanced integrations.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <Card className="glass-strong">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation, guides, and examples..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Category:</span>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40 glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tag:</span>
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-40 glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {tags.map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Badge variant="outline" className="glass">
                  {filteredSections.length} results
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Guides */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary animate-glow" />
            <h2 className="text-2xl font-bold text-shadow">Quick Start Guides</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartGuides.map((guide, index) => (
              <Link href={guide.href} key={index}>
                <Card className="glass-strong resource-card h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <guide.icon className="h-4 w-4 text-primary animate-glow" />
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {guide.estimatedTime}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{guide.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* Documentation Sections */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary animate-glow" />
            <h2 className="text-2xl font-bold text-shadow">Documentation Categories</h2>
          </div>

          <div className="bento-grid">
            {filteredSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link href={section.href} key={section.id}>
                  <Card className="glass-strong bento-item resource-card h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary animate-glow" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            {section.popularity}%
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription className="text-sm">{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {section.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {section.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{section.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Updated {section.lastUpdated}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* Recent Updates */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary animate-glow" />
            <h2 className="text-2xl font-bold text-shadow">Recent Updates</h2>
          </div>

          <div className="space-y-4">
            {recentUpdates.map((update, index) => (
              <Card key={index} className="glass-strong">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Badge
                        variant={update.type === 'feature' ? 'default' :
                                update.type === 'improvement' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {update.type}
                      </Badge>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{update.title}</h3>
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {update.date}
                        <Badge variant="outline" className="text-xs">
                          {update.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <Card className="glass-strong">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary animate-glow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Need Help?</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Can&apos;t find what you&apos;re looking for? Our AI assistant can help you navigate
                  the documentation and find the right resources.
                </p>
              </div>
              <Button className="glass">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
