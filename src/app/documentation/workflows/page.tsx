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
  Workflow,
  Search,
  Play,
  BarChart3,
  Copy,
  CheckCircle,
  ExternalLink,
  Lightbulb,
  Activity,
  Clock,
  Users,
  Target,
  Zap
} from "lucide-react";

interface ProductionWorkflow {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  agents: string[];
  steps: Array<{
    id: number;
    name: string;
    agent: string;
    duration: string;
  }>;
  useCases: string[];
  example: string;
  metrics: {
    avgDuration: string;
    successRate: string;
    usage: string;
  };
}

export default function WorkflowsDocumentationPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState("research-analysis");
  const [copiedCode, setCopiedCode] = useState("");

  const productionWorkflows: ProductionWorkflow[] = [
    {
      id: "research-analysis",
      name: "Research Analysis Workflow",
      description: "Comprehensive research and analysis pipeline using multiple agents and tools",
      category: "research",
      icon: Search,
      agents: ["researchAgent", "analyzerAgent", "generationAgent"],
      steps: [
        { id: 1, name: "Web Research", agent: "researchAgent", duration: "2-5 min" },
        { id: 2, name: "Content Analysis", agent: "analyzerAgent", duration: "1-3 min" },
        { id: 3, name: "Report Generation", agent: "generationAgent", duration: "1-2 min" }
      ],
      useCases: ["Market research", "Competitive analysis", "Academic research"],
      example: `import { Mastra } from '@mastra/core';

// Research Analysis Workflow
const researchWorkflow = await mastra.run({
  agent: 'researchAgent',
  input: {
    query: "AI trends in healthcare 2024",
    depth: "comprehensive",
    sources: ["web", "academic", "news"]
  },
  workflow: [
    {
      agent: 'researchAgent',
      tools: ['braveSearchTool', 'tavilySearchTool'],
      action: 'gather-research-data'
    },
    {
      agent: 'analyzerAgent', 
      tools: ['vectorQueryTool', 'chunkerTool'],
      action: 'analyze-content'
    },
    {
      agent: 'generationAgent',
      tools: ['graphRAGTool'],
      action: 'generate-report'
    }
  ]
});

console.log(researchWorkflow.result);`,
      metrics: { avgDuration: "4.2 min", successRate: "98.5%", usage: "1,200/month" }
    },
    {
      id: "financial-analysis",
      name: "Financial Analysis Workflow",
      description: "Real-time financial data analysis with market insights and trend detection",
      category: "finance",
      icon: BarChart3,
      agents: ["analyzerAgent", "chanceAgent", "generationAgent"],
      steps: [
        { id: 1, name: "Data Collection", agent: "analyzerAgent", duration: "1-2 min" },
        { id: 2, name: "Risk Analysis", agent: "chanceAgent", duration: "2-3 min" },
        { id: 3, name: "Insights Generation", agent: "generationAgent", duration: "1-2 min" }
      ],
      useCases: ["Investment analysis", "Risk assessment", "Market monitoring"],
      example: `// Financial Analysis Workflow
const financialWorkflow = await mastra.run({
  agent: 'analyzerAgent',
  input: {
    symbols: ["AAPL", "GOOGL", "MSFT"],
    timeframe: "1M",
    analysis_type: "comprehensive"
  },
  workflow: [
    {
      agent: 'analyzerAgent',
      tools: ['stockPriceTool', 'cryptoPriceTool'],
      action: 'collect-market-data'
    },
    {
      agent: 'chanceAgent',
      tools: ['vectorQueryTool'],
      action: 'assess-risk-probability'
    },
    {
      agent: 'generationAgent',
      tools: ['graphRAGTool'],
      action: 'generate-insights'
    }
  ]
});`,
      metrics: { avgDuration: "5.1 min", successRate: "96.8%", usage: "800/month" }
    },
    {
      id: "content-creation",
      name: "Content Creation Workflow",
      description: "End-to-end content creation with research, generation, and optimization",
      category: "content",
      icon: Activity,
      agents: ["researchAgent", "generationAgent", "analyzerAgent"],
      steps: [
        { id: 1, name: "Topic Research", agent: "researchAgent", duration: "2-4 min" },
        { id: 2, name: "Content Generation", agent: "generationAgent", duration: "3-6 min" },
        { id: 3, name: "Quality Analysis", agent: "analyzerAgent", duration: "1-2 min" }
      ],
      useCases: ["Blog posts", "Documentation", "Marketing content"],
      example: `// Content Creation Workflow
const contentWorkflow = await mastra.run({
  agent: 'researchAgent',
  input: {
    topic: "Getting started with AI agents",
    type: "blog-post",
    audience: "developers",
    length: "medium"
  },
  workflow: [
    {
      agent: 'researchAgent',
      tools: ['braveSearchTool', 'tavilySearchTool'],
      action: 'research-topic'
    },
    {
      agent: 'generationAgent',
      tools: ['vectorQueryTool', 'chunkerTool'],
      action: 'create-content'
    },
    {
      agent: 'analyzerAgent',
      tools: ['graphRAGTool'],
      action: 'analyze-quality'
    }
  ]
});`,
      metrics: { avgDuration: "6.8 min", successRate: "94.2%", usage: "600/month" }
    },
    {
      id: "monitoring-alert",
      name: "Monitoring & Alert Workflow",
      description: "Real-time system monitoring with intelligent alerting and response",
      category: "monitoring",
      icon: Activity,
      agents: ["supervisorAgent", "masterAgent"],
      steps: [
        { id: 1, name: "Health Check", agent: "supervisorAgent", duration: "10 sec" },
        { id: 2, name: "Issue Detection", agent: "supervisorAgent", duration: "30 sec" },
        { id: 3, name: "Alert Dispatch", agent: "masterAgent", duration: "15 sec" }
      ],
      useCases: ["System monitoring", "Performance alerts", "Incident response"],
      example: `// Monitoring & Alert Workflow
const monitoringWorkflow = await mastra.run({
  agent: 'supervisorAgent',
  input: {
    metrics: ["agent_health", "tool_performance", "memory_usage"],
    thresholds: { 
      response_time: 2000,
      error_rate: 0.05,
      memory_usage: 0.85 
    }
  },
  workflow: [
    {
      agent: 'supervisorAgent',
      tools: ['vectorQueryTool'],
      action: 'check-system-health'
    },
    {
      agent: 'supervisorAgent',
      tools: ['chunkerTool'],
      action: 'detect-anomalies'
    },
    {
      agent: 'masterAgent',
      tools: ['braveSearchTool'],
      action: 'dispatch-alerts'
    }
  ]
});`,
      metrics: { avgDuration: "55 sec", successRate: "99.9%", usage: "24/7 continuous" }
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <PageLayout
      title="Workflows Documentation"
      description="Complete guide to production workflows, agent orchestration, and monitoring"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-gentle-float">
          <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
            <Workflow className="h-8 w-8 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent text-shadow">
            Workflows Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to our production workflows featuring automated processes,
            intelligent orchestration, and real-time monitoring capabilities.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="glass px-4 py-2">
              <Workflow className="h-4 w-4 mr-2" />
              Production Workflows
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Activity className="h-4 w-4 mr-2" />
              Real-time Monitoring
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              99%+ Success Rate
            </Badge>
          </div>
        </section>

        {/* Main Content */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Optimization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Production Workflows</h2>

              <Alert className="glass">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Mastra-Powered Workflows</AlertTitle>
                <AlertDescription>
                  Our production workflows combine multiple AI agents and tools to automate complex
                  business processes with high reliability and performance.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Workflow Selection */}
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Workflow</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {productionWorkflows.map((workflow) => {
                      const IconComponent = workflow.icon;
                      return (
                        <Button
                          key={workflow.id}
                          variant={selectedWorkflow === workflow.id ? "default" : "ghost"}
                          className="w-full justify-start glass"
                          onClick={() => setSelectedWorkflow(workflow.id)}
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {workflow.name}
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Workflow Details */}
                <div className="lg:col-span-2 space-y-6">
                  {(() => {
                    const workflow = productionWorkflows.find(w => w.id === selectedWorkflow);
                    if (!workflow) return null;

                    const IconComponent = workflow.icon;

                    return (
                      <Card className="glass-strong">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 neomorphic rounded-lg flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-primary animate-glow" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{workflow.name}</CardTitle>
                              <CardDescription>{workflow.description}</CardDescription>
                              <Badge variant="outline" className="text-xs mt-1">
                                {workflow.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-3">Workflow Steps</h4>
                            <div className="space-y-3">
                              {workflow.steps.map((step, index) => (
                                <div key={step.id} className="flex items-center gap-3 p-3 neomorphic rounded-lg">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-sm font-medium">{step.id}</span>
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-medium text-sm">{step.name}</h5>
                                    <p className="text-xs text-muted-foreground">
                                      Agent: {step.agent} • Duration: {step.duration}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Performance Metrics</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="p-3 neomorphic rounded-lg text-center">
                                <div className="text-lg font-bold text-primary">{workflow.metrics.avgDuration}</div>
                                <div className="text-xs text-muted-foreground">Avg Duration</div>
                              </div>
                              <div className="p-3 neomorphic rounded-lg text-center">
                                <div className="text-lg font-bold text-green-600">{workflow.metrics.successRate}</div>
                                <div className="text-xs text-muted-foreground">Success Rate</div>
                              </div>
                              <div className="p-3 neomorphic rounded-lg text-center">
                                <div className="text-lg font-bold text-blue-600">{workflow.metrics.usage}</div>
                                <div className="text-xs text-muted-foreground">Usage</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Involved Agents</h4>
                            <div className="flex flex-wrap gap-2">
                              {workflow.agents.map(agent => (
                                <Badge key={agent} variant="secondary" className="text-xs">
                                  {agent}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Use Cases</h4>
                            <div className="flex flex-wrap gap-2">
                              {workflow.useCases.map(useCase => (
                                <Badge key={useCase} variant="outline" className="text-xs">
                                  {useCase}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Implementation Example</h4>
                            <div className="relative">
                              <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                                <code>{workflow.example}</code>
                              </pre>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => handleCopyCode(workflow.example)}
                              >
                                {copiedCode === workflow.example ? (
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

          <TabsContent value="monitoring" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Workflow Monitoring</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="text-lg">Real-time Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Step Progress</h4>
                      <p className="text-xs text-muted-foreground">Track individual step execution with Langfuse</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Agent Status</h4>
                      <p className="text-xs text-muted-foreground">Monitor agent health and performance</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Tool Usage</h4>
                      <p className="text-xs text-muted-foreground">Track tool execution and response times</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="text-lg">Error Handling</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Automatic Retry</h4>
                      <p className="text-xs text-muted-foreground">Configurable retry logic with exponential backoff</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Fallback Strategies</h4>
                      <p className="text-xs text-muted-foreground">Alternative execution paths for resilience</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Alert System</h4>
                      <p className="text-xs text-muted-foreground">Immediate failure notifications via supervisorAgent</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="text-lg">Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Usage Patterns</h4>
                      <p className="text-xs text-muted-foreground">Workflow execution trends and insights</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Performance Metrics</h4>
                      <p className="text-xs text-muted-foreground">Duration, success rates, and bottleneck analysis</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Cost Analysis</h4>
                      <p className="text-xs text-muted-foreground">Resource usage and optimization opportunities</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Performance Optimization</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Agent Coordination</h4>
                      <p className="text-xs text-muted-foreground">Optimize agent handoffs and data passing</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Tool Caching</h4>
                      <p className="text-xs text-muted-foreground">Cache tool results in Upstash Redis</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Parallel Execution</h4>
                      <p className="text-xs text-muted-foreground">Run independent steps concurrently</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Timeout Settings</h4>
                      <p className="text-xs text-muted-foreground">Optimize step and workflow timeouts</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Memory Management</h4>
                      <p className="text-xs text-muted-foreground">Efficient state management with Redis TTL</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Model Settings</h4>
                      <p className="text-xs text-muted-foreground">Optimize Gemini model parameters</p>
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
                <h3 className="text-lg font-semibold">Ready to Create Workflows?</h3>
                <p className="text-sm text-muted-foreground">
                  Explore Mastra workflow builder and execution monitoring tools
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass">
                  <Play className="h-4 w-4 mr-2" />
                  Workflow Builder
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
