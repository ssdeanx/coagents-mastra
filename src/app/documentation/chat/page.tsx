"use client";

import React, { useState } from "react";
import { PageLayout } from "@/app/components/layout/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/components/ui/alert";
import {
  MessageSquare,
  Code2,
  Palette,
  Settings,
  Zap,
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink,
  Play,
  BookOpen,
  Lightbulb,
  Wrench,
  Sparkles
} from "lucide-react";

/**
 * Chat Documentation Page - Comprehensive CopilotKit Guides
 *
 * This page provides:
 * - Complete CopilotKit setup and integration guides
 * - Component variants documentation with examples
 * - Customization and theming options
 * - Troubleshooting guides and common issues
 * - Best practices and performance tips
 */
export default function ChatDocumentationPage() {
  const [activeExample, setActiveExample] = useState("basic");
  const [copiedCode, setCopiedCode] = useState("");

  const componentVariants = [
    {
      id: "copilot-chat",
      name: "CopilotChat",
      description: "Full-featured chat interface with AI assistance",
      props: ["instructions", "functions", "makeSystemMessage", "showResponseButton"],
      example: `import { CopilotChat } from "@copilotkit/react-ui";

export function MyChatComponent() {
  return (
    <CopilotChat
      instructions="You are a helpful AI assistant for developers."
      labels={{
        title: "AI Assistant",
        initial: "Hi! How can I help you today?"
      }}
    />
  );
}`
    },
    {
      id: "copilot-textarea",
      name: "CopilotTextarea",
      description: "Enhanced textarea with AI-powered suggestions",
      props: ["placeholder", "suggestionsStyle", "disableBranding"],
      example: `import { CopilotTextarea } from "@copilotkit/react-textarea";

export function MyTextareaComponent() {
  const [text, setText] = useState("");

  return (
    <CopilotTextarea
      className="w-full min-h-[200px]"
      value={text}
      onValueChange={setText}
      placeholder="Start typing and get AI suggestions..."
      autosuggestionsConfig={{
        textareaPurpose: "Write documentation",
        chatApiConfigs: {}
      }}
    />
  );
}`
    },
    {
      id: "copilot-sidebar",
      name: "CopilotSidebar",
      description: "Collapsible sidebar chat interface",
      props: ["defaultOpen", "clickOutsideToClose", "shortcut"],
      example: `import { CopilotSidebar } from "@copilotkit/react-ui";

export function MySidebarComponent() {
  return (
    <CopilotSidebar
      instructions="Help users with development tasks."
      defaultOpen={false}
      labels={{
        title: "Dev Assistant",
        initial: "Ready to help with your code!"
      }}
      shortcut="Cmd+J"
    />
  );
}`
    }
  ];

  const troubleshootingIssues = [
    {
      id: "setup-issues",
      title: "Setup and Configuration Problems",
      issues: [
        {
          problem: "CopilotKit components not rendering",
          symptoms: ["Blank screen where chat should appear", "Console errors about missing providers"],
          solution: "Ensure CopilotKitProvider wraps your app and API route is configured",
          code: `// app/layout.tsx
import { CopilotKitProvider } from "@copilotkit/react-core";

export default function RootLayout({ children }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit">
      {children}
    </CopilotKitProvider>
  );
}`
        },
        {
          problem: "API route not working",
          symptoms: ["Network errors in console", "Chat not responding"],
          solution: "Check API route configuration and environment variables",
          code: `// app/api/copilotkit/route.ts
import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";

export async function POST(req: Request) {
  const { handleRequest } = CopilotRuntime({
    actions: [],
    langGraphPlatformConfig: {
      langGraphCloudApiKey: process.env.LANGGRAPH_API_KEY,
      langGraphCloudUrl: process.env.LANGGRAPH_CLOUD_URL
    }
  });

  return handleRequest(req);
}`
        }
      ]
    },
    {
      id: "styling-issues",
      title: "Styling and Theme Problems",
      issues: [
        {
          problem: "Chat interface doesn't match app theme",
          symptoms: ["Inconsistent colors", "Wrong font family", "Misaligned components"],
          solution: "Customize CSS variables and component props",
          code: `/* globals.css */
:root {
  --copilot-kit-primary-color: #your-primary-color;
  --copilot-kit-background-color: #your-bg-color;
  --copilot-kit-text-color: #your-text-color;
}`
        }
      ]
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <PageLayout
      title="Chat Documentation"
      description="Complete guide to CopilotKit chat components, customization, and troubleshooting"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 animate-gentle-float">
          <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent text-shadow">
            CopilotKit Chat Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build powerful AI-powered chat interfaces with CopilotKit components.
            From basic setup to advanced customization.
          </p>
        </section>

        {/* Quick Start */}
        <Card className="glass-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 animate-glow" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Get up and running with CopilotKit in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="glass">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Prerequisites</AlertTitle>
              <AlertDescription>
                Make sure you have Next.js 14+ and React 18+ installed in your project.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-medium">1. Install CopilotKit</h4>
              <div className="relative">
                <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                  <code>pnpm add @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopyCode("pnpm add @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="components" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass">
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="customization" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Customization
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Integration
            </TabsTrigger>
            <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Troubleshooting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Component Variants</h2>

              <div className="space-y-6">
                {componentVariants.map((component) => (
                  <Card key={component.id} className="glass-strong">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Code2 className="h-5 w-5" />
                            {component.name}
                          </CardTitle>
                          <CardDescription>{component.description}</CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveExample(component.id)}
                          className="glass"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          View Example
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {component.props.map(prop => (
                          <Badge key={prop} variant="outline" className="text-xs">
                            {prop}
                          </Badge>
                        ))}
                      </div>

                      {activeExample === component.id && (
                        <div className="relative">
                          <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                            <code>{component.example}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => handleCopyCode(component.example)}
                          >
                            {copiedCode === component.example ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customization" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Customization & Theming</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      CSS Variables
                    </CardTitle>
                    <CardDescription>
                      Customize colors and spacing with CSS variables
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                        <code>{`:root {
  --copilot-kit-primary-color: #3b82f6;
  --copilot-kit-background-color: #ffffff;
  --copilot-kit-text-color: #1f2937;
  --copilot-kit-muted-color: #6b7280;
  --copilot-kit-border-color: #e5e7eb;
  --copilot-kit-radius: 0.5rem;
}`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleCopyCode(`:root {
  --copilot-kit-primary-color: #3b82f6;
  --copilot-kit-background-color: #ffffff;
  --copilot-kit-text-color: #1f2937;
  --copilot-kit-muted-color: #6b7280;
  --copilot-kit-border-color: #e5e7eb;
  --copilot-kit-radius: 0.5rem;
}`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Component Props
                    </CardTitle>
                    <CardDescription>
                      Customize behavior with component properties
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 neomorphic rounded-lg">
                        <h4 className="font-medium text-sm mb-1">labels</h4>
                        <p className="text-xs text-muted-foreground">Customize UI text and messages</p>
                      </div>
                      <div className="p-3 neomorphic rounded-lg">
                        <h4 className="font-medium text-sm mb-1">instructions</h4>
                        <p className="text-xs text-muted-foreground">Set AI behavior and context</p>
                      </div>
                      <div className="p-3 neomorphic rounded-lg">
                        <h4 className="font-medium text-sm mb-1">className</h4>
                        <p className="text-xs text-muted-foreground">Apply custom CSS classes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Agent Integration</h2>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Connecting to Agents
                  </CardTitle>
                  <CardDescription>
                    Integrate CopilotKit with your AI agents and tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="glass">
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>Agent Integration</AlertTitle>
                    <AlertDescription>
                      Our platform includes 8 specialized agents that work seamlessly with CopilotKit components.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 neomorphic rounded-lg">
                      <h4 className="font-medium mb-2">Master Agent</h4>
                      <p className="text-sm text-muted-foreground">Orchestrates complex workflows and coordinates other agents</p>
                    </div>
                    <div className="p-4 neomorphic rounded-lg">
                      <h4 className="font-medium mb-2">Research Agent</h4>
                      <p className="text-sm text-muted-foreground">Conducts web research and analyzes documents</p>
                    </div>
                    <div className="p-4 neomorphic rounded-lg">
                      <h4 className="font-medium mb-2">Generation Agent</h4>
                      <p className="text-sm text-muted-foreground">Generates code, components, and documentation</p>
                    </div>
                    <div className="p-4 neomorphic rounded-lg">
                      <h4 className="font-medium mb-2">Analyzer Agent</h4>
                      <p className="text-sm text-muted-foreground">Analyzes code quality and provides optimization suggestions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Troubleshooting Guide</h2>

              <Accordion type="single" collapsible className="space-y-4">
                {troubleshootingIssues.map((category) => (
                  <Card key={category.id} className="glass-strong">
                    <AccordionItem value={category.id} className="border-none">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">{category.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-6">
                          {category.issues.map((issue, index) => (
                            <div key={index} className="space-y-3">
                              <h4 className="font-medium text-red-600">{issue.problem}</h4>

                              <div className="space-y-2">
                                <h5 className="text-sm font-medium">Symptoms:</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {issue.symptoms.map((symptom, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                                      {symptom}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-green-600">Solution:</h5>
                                <p className="text-sm text-muted-foreground">{issue.solution}</p>

                                <div className="relative">
                                  <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                                    <code>{issue.code}</code>
                                  </pre>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => handleCopyCode(issue.code)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {index < category.issues.length - 1 && <Separator />}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="glass-strong">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Need More Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Explore additional resources and community support
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass">
                  <BookOpen className="h-4 w-4 mr-2" />
                  API Reference
                </Button>
                <Button variant="outline" className="glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Examples
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
