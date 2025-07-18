"use client";

import { useState } from "react";
import { PageLayout } from "@/app/components/layout/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/components/ui/alert";
import {
  Network,
  BarChart3,
  Activity,
  Copy,
  CheckCircle,
  ExternalLink,
  Play,
  Lightbulb,
  GitBranch,
  Workflow,
  Users,
  Router,
  Zap
} from "lucide-react";

interface NetworkPattern {
  id: string;
  name: string;
  description: string;
  diagram: string;
  useCases: string[];
  example: string;
}

export default function NetworksDocumentationPage() {
  const [activePattern, setActivePattern] = useState("mastra-agents");
  const [copiedCode, setCopiedCode] = useState("");

  const networkPatterns: NetworkPattern[] = [
    {
      id: "mastra-agents",
      name: "Mastra Agent Network",
      description: "Distributed agent communication through Mastra framework",
      diagram: "masterAgent ↔ [researchAgent, analyzerAgent, generationAgent, weatherAgent] ↔ Tools",
      useCases: ["Multi-agent workflows", "Tool orchestration", "Distributed processing"],
      example: `// Mastra agent network
import { Mastra } from '@mastra/core';

const mastra = new Mastra({
  agents: [
    masterAgent,
    researchAgent,
    analyzerAgent,
    generationAgent,
    weatherAgent,
    supervisorAgent,
    chanceAgent,
    langGraphAgent
  ],
  tools: [
    braveSearchTool,
    tavilySearchTool,
    vectorQueryTool,
    chunkerTool,
    stockPriceTool,
    cryptoPriceTool
  ]
});

// Execute multi-agent workflow
const result = await mastra.run({
  agent: 'masterAgent',
  input: 'Analyze market trends',
  workflow: 'research-analysis'
});`
    },
    {
      id: "tool-coordination",
      name: "Tool Coordination Pattern",
      description: "Agents coordinate through shared tool ecosystem",
      diagram: "Agent A → Tool → Agent B → Tool → Agent C",
      useCases: ["Data pipeline", "Sequential processing", "Tool sharing"],
      example: `// Tool coordination pattern
const searchResults = await researchAgent.use(braveSearchTool, {
  query: "AI market analysis"
});

const analysis = await analyzerAgent.use(vectorQueryTool, {
  query: searchResults.content
});

const report = await generationAgent.use(chunkerTool, {
  text: analysis.results
});`
    },
    {
      id: "memory-sharing",
      name: "Shared Memory Pattern",
      description: "Agents share state through Upstash Redis memory layer",
      diagram: "Agents ↔ Upstash Redis ↔ PostgreSQL ↔ Vector Store",
      useCases: ["State persistence", "Cross-agent communication", "Session management"],
      example: `// Shared memory pattern
import { UpstashRedisMemory } from '@mastra/memory';

const memory = new UpstashRedisMemory({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

// Agent stores state
await researchAgent.memory.set('research_context', {
  query: userQuery,
  results: searchResults,
  timestamp: Date.now()
});

// Another agent retrieves state
const context = await analyzerAgent.memory.get('research_context');`
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <PageLayout
      title="Networks Documentation"
      description="Complete guide to Mastra agent networks, tool coordination, and memory patterns"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-gentle-float">
          <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
            <Network className="h-8 w-8 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent text-shadow">
            Network Architecture Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to our Mastra-based network architecture featuring agent communication,
            tool coordination, and shared memory patterns.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="glass px-4 py-2">
              <Router className="h-4 w-4 mr-2" />
              Mastra Framework
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              8 Agents
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Workflow className="h-4 w-4 mr-2" />
              Tool Coordination
            </Badge>
          </div>
        </section>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Patterns
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Mastra Network Architecture</h2>

              <Alert className="glass">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Mastra-Powered Network</AlertTitle>
                <AlertDescription>
                  Our network architecture is built on the Mastra framework, enabling seamless agent communication,
                  tool coordination, and shared memory management.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle>Agent Network</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">8 Specialized Agents</h4>
                      <p className="text-xs text-muted-foreground">masterAgent, researchAgent, analyzerAgent, generationAgent, weatherAgent, supervisorAgent, chanceAgent, langGraphAgent</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Tool Ecosystem</h4>
                      <p className="text-xs text-muted-foreground">braveSearchTool, tavilySearchTool, vectorQueryTool, chunkerTool, stockPriceTool, cryptoPriceTool</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Memory Layer</h4>
                      <p className="text-xs text-muted-foreground">Upstash Redis for shared state and PostgreSQL for persistence</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle>Communication Flow</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Agent-to-Agent</h4>
                      <p className="text-xs text-muted-foreground">Direct communication through Mastra framework</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Tool Sharing</h4>
                      <p className="text-xs text-muted-foreground">Agents access shared tool ecosystem</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Memory Sync</h4>
                      <p className="text-xs text-muted-foreground">State synchronization through Redis</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Network Patterns</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pattern Selection */}
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Pattern</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {networkPatterns.map((pattern) => (
                      <Button
                        key={pattern.id}
                        variant={activePattern === pattern.id ? "default" : "ghost"}
                        className="w-full justify-start glass"
                        onClick={() => setActivePattern(pattern.id)}
                      >
                        <GitBranch className="h-4 w-4 mr-2" />
                        {pattern.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Pattern Details */}
                <div className="lg:col-span-2 space-y-6">
                  {(() => {
                    const pattern = networkPatterns.find(p => p.id === activePattern);
                    if (!pattern) {
                      return null;
                    }

                    return (
                      <Card className="glass-strong">
                        <CardHeader>
                          <CardTitle className="text-xl">{pattern.name}</CardTitle>
                          <CardDescription>{pattern.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-3">Network Diagram</h4>
                            <div className="p-4 neomorphic rounded-lg">
                              <p className="text-sm font-mono text-center">{pattern.diagram}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Use Cases</h4>
                            <div className="flex flex-wrap gap-2">
                              {pattern.useCases.map(useCase => (
                                <Badge key={useCase} variant="secondary" className="text-xs">
                                  {useCase}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Implementation Example</h4>
                            <div className="relative">
                              <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                                <code>{pattern.example}</code>
                              </pre>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => handleCopyCode(pattern.example)}
                              >
                                {copiedCode === pattern.example ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })()}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Performance Optimization</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Optimization Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Agent Pooling</h4>
                      <p className="text-xs text-muted-foreground">Reuse agent instances to reduce overhead</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Tool Caching</h4>
                      <p className="text-xs text-muted-foreground">Cache tool results in Redis for faster access</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Memory Optimization</h4>
                      <p className="text-xs text-muted-foreground">Efficient memory usage with TTL and cleanup</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Agent Response Time</h4>
                      <p className="text-xs text-muted-foreground">Average: &lt;2s, P99: &lt;5s</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Tool Execution</h4>
                      <p className="text-xs text-muted-foreground">Concurrent tool usage with rate limiting</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Memory Efficiency</h4>
                      <p className="text-xs text-muted-foreground">Redis TTL and PostgreSQL optimization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="glass-strong">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Ready to Build Networks?</h3>
                <p className="text-sm text-muted-foreground">
                  Explore Mastra framework and agent network patterns
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass">
                  <Play className="h-4 w-4 mr-2" />
                  Quick Start
                </Button>
                <Button variant="outline" className="glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Mastra Docs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
