"use client";

import React from "react";
import { PageLayout } from "@/app/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import {
  Sparkles,
  Brain,
  Code2,
  Database,
  Network,
  Users,
  Heart,
  Lightbulb,
  Shield,
  Mail,
  MapPin,
  Calendar,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";

/**
 * About Page - Platform Information and Team Profiles
 *
 * This page provides comprehensive information about:
 * - Platform overview and capabilities
 * - Technology stack and architecture
 * - Team profiles and expertise
 * - Company mission and values
 * - Contact information and form
 */
export default function AboutPage() {
  return (
    <PageLayout
      title="About"
      description="Learn about our AI-powered development platform, team, and mission"
      showCopilot={false}
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-gentle-float">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent text-shadow-lg">
              Building the Future of
              <br />
              AI-Powered Development
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We&apos;re creating an intelligent development platform that combines the power of AI agents,
              advanced tooling, and seamless workflows to revolutionize how developers build software.
            </p>
          </div>

          <div className="bento-grid max-w-2xl mx-auto">
            <Badge variant="secondary" className="glass px-6 py-3 text-sm animate-subtle-pulse">
              <Brain className="h-4 w-4 mr-2" />
              8 AI Agents
            </Badge>
            <Badge variant="secondary" className="glass px-6 py-3 text-sm animate-subtle-pulse">
              <Code2 className="h-4 w-4 mr-2" />
              20+ Tools
            </Badge>
            <Badge variant="secondary" className="glass px-6 py-3 text-sm animate-subtle-pulse">
              <Network className="h-4 w-4 mr-2" />
              5 Workflows
            </Badge>
            <Badge variant="secondary" className="glass px-6 py-3 text-sm animate-subtle-pulse">
              <Database className="h-4 w-4 mr-2" />
              Multi-DB Support
            </Badge>
          </div>
        </section>

        <Separator />

        {/* Mission & Values */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-shadow">Our Mission & Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering developers with intelligent tools that enhance creativity,
              productivity, and collaboration in software development.
            </p>
          </div>

          <div className="bento-grid">
            <Card className="glass-strong bento-item text-center transform-3d perspective">
              <CardHeader>
                <div className="mx-auto w-12 h-12 neomorphic rounded-lg flex items-center justify-center mb-4 animate-soft-glow">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pushing the boundaries of what&apos;s possible with AI-powered development tools.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-strong bento-item text-center transform-3d perspective">
              <CardHeader>
                <div className="mx-auto w-12 h-12 neomorphic rounded-lg flex items-center justify-center mb-4 animate-soft-glow">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Building tools that bring developers together and enhance team productivity.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-strong bento-item text-center transform-3d perspective">
              <CardHeader>
                <div className="mx-auto w-12 h-12 neomorphic rounded-lg flex items-center justify-center mb-4 animate-soft-glow">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Delivering reliable, secure, and high-performance development solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-strong bento-item text-center transform-3d perspective">
              <CardHeader>
                <div className="mx-auto w-12 h-12 neomorphic rounded-lg flex items-center justify-center mb-4 animate-soft-glow">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supporting and growing the developer community through open collaboration.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Platform Overview */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-shadow">Platform Overview</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive AI-powered development platform built for modern software teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-strong resource-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-shadow-sm">
                  <Sparkles className="h-5 w-5 animate-glow" />
                  AI-Powered Development
                </CardTitle>
                <CardDescription>
                  Intelligent agents that understand your codebase and assist with development tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">Code generation and completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">Automated testing and debugging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">Intelligent refactoring suggestions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">Documentation generation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong resource-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-shadow-sm">
                  <Network className="h-5 w-5 animate-glow" />
                  Workflow Automation
                </CardTitle>
                <CardDescription>
                  Streamlined workflows that automate repetitive development tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">CI/CD pipeline automation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">Code review and quality checks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">Deployment and monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
                    <span className="text-sm">Performance optimization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Technology Stack */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-shadow">Technology Stack</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technologies for performance, scalability, and developer experience.
            </p>
          </div>

          <div className="bento-grid">
            <Card className="glass-strong bento-item">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Code2 className="h-4 w-4" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Next.js 14</Badge>
                  <Badge variant="outline" className="text-xs">React 18</Badge>
                  <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  <Badge variant="outline" className="text-xs">Tailwind CSS</Badge>
                  <Badge variant="outline" className="text-xs">Radix UI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong bento-item">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4" />
                  Backend & AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Mastra Framework</Badge>
                  <Badge variant="outline" className="text-xs">CopilotKit</Badge>
                  <Badge variant="outline" className="text-xs">LangGraph</Badge>
                  <Badge variant="outline" className="text-xs">OpenAI GPT-4</Badge>
                  <Badge variant="outline" className="text-xs">Google Gemini</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong bento-item">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Network className="h-4 w-4" />
                  Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Vercel</Badge>
                  <Badge variant="outline" className="text-xs">Supabase</Badge>
                  <Badge variant="outline" className="text-xs">Pinecone</Badge>
                  <Badge variant="outline" className="text-xs">Upstash</Badge>
                  <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong bento-item">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Brain className="h-4 w-4" />
                  AI Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">Master Agent</Badge>
                  <Badge variant="outline" className="text-xs">Research Agent</Badge>
                  <Badge variant="outline" className="text-xs">Generation Agent</Badge>
                  <Badge variant="outline" className="text-xs">Analyzer Agent</Badge>
                  <Badge variant="outline" className="text-xs">8 Total Agents</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* AI Agents Showcase */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-shadow">AI Agent Ecosystem</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized AI agents working together to provide intelligent development assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-strong resource-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Brain className="h-4 w-4 animate-glow" />
                  Master Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Orchestrates all other agents and manages complex multi-step workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-strong resource-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 animate-glow" />
                  Research Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Conducts web research, analyzes documents, and gathers information.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-strong resource-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Code2 className="h-4 w-4 animate-glow" />
                  Generation Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Generates code, components, and documentation with AI assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-strong resource-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Database className="h-4 w-4 animate-glow" />
                  Analyzer Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Analyzes code quality, performance, and provides optimization suggestions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Team Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-shadow">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate developers and AI researchers building the future of software development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-strong resource-card text-center">
              <CardHeader>
                <div className="mx-auto w-20 h-20 neomorphic rounded-full flex items-center justify-center mb-4 animate-soft-glow">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg">Development Team</CardTitle>
                <CardDescription>Full-Stack Engineers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Expert developers specializing in AI integration, modern web technologies, and scalable architectures.
                </p>
                <div className="flex justify-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong resource-card text-center">
              <CardHeader>
                <div className="mx-auto w-20 h-20 neomorphic rounded-full flex items-center justify-center mb-4 animate-soft-glow">
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg">AI Research Team</CardTitle>
                <CardDescription>Machine Learning Engineers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Researchers focused on advancing AI agent capabilities, natural language processing, and code generation.
                </p>
                <div className="flex justify-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong resource-card text-center">
              <CardHeader>
                <div className="mx-auto w-20 h-20 neomorphic rounded-full flex items-center justify-center mb-4 animate-soft-glow">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-lg">Product Team</CardTitle>
                <CardDescription>UX/UI & Product Managers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Designers and product strategists creating intuitive experiences for developer productivity.
                </p>
                <div className="flex justify-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                  <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Company History */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-shadow">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From concept to cutting-edge AI platform - the story of our development.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-strong">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 neomorphic rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">2024 - Platform Launch</h3>
                    <p className="text-muted-foreground">
                      Launched the AI-powered development platform with 8 specialized agents,
                      comprehensive tooling, and seamless workflow automation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 neomorphic rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">2024 - AI Integration</h3>
                    <p className="text-muted-foreground">
                      Integrated advanced AI models including GPT-4, Gemini, and custom LangGraph workflows
                      for intelligent code generation and analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 neomorphic rounded-full flex items-center justify-center">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">2024 - Foundation</h3>
                    <p className="text-muted-foreground">
                      Built the core platform architecture using Next.js, TypeScript, and modern development tools
                      with a focus on developer experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Contact Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-shadow">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to revolutionize your development workflow? Let&apos;s connect and explore the possibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">hello@aidevplatform.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Remote-First, Global Team</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Open Source</p>
                      <p className="text-sm text-muted-foreground">github.com/aidevplatform</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="font-medium">Follow Us</p>
                  <div className="flex gap-4">
                    <Github className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong">
              <CardHeader>
                <CardTitle>Ready to Get Started?</CardTitle>
                <CardDescription>
                  Join the future of AI-powered development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 neomorphic rounded-lg">
                    <h4 className="font-medium mb-2">🚀 Try the Platform</h4>
                    <p className="text-sm text-muted-foreground">
                      Experience our AI-powered development workspace with live code generation,
                      intelligent agents, and seamless workflows.
                    </p>
                  </div>

                  <div className="p-4 neomorphic rounded-lg">
                    <h4 className="font-medium mb-2">📚 Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive guides, API references, and tutorials to help you
                      integrate our platform into your development workflow.
                    </p>
                  </div>

                  <div className="p-4 neomorphic rounded-lg">
                    <h4 className="font-medium mb-2">🤝 Partnership</h4>
                    <p className="text-sm text-muted-foreground">
                      Interested in partnerships, integrations, or enterprise solutions?
                      Let&apos;s discuss how we can work together.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}