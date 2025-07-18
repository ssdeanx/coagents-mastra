"use client";

import React, { useState, useMemo } from "react";
import { PageLayout } from "@/app/components/layout/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Input } from "@/app/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
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
  Brain,
  Search,
  Code2,
  Network,
  Zap,
  Settings,
  Cloud,
  BarChart3,
  Workflow,
  Copy,
  ExternalLink,
  Play,
  CheckCircle,
  Lightbulb,
  Users,
  Target,
  Activity
} from "lucide-react";

/**
 * Agents Documentation Page - Complete Agent Ecosystem Guide
 *
 * This page provides:
 * - Overview of all 8 AI agents and their capabilities
 * - Detailed documentation for each agent
 * - Tools and integrations available to agents
 * - Coordination patterns and multi-agent workflows
 * - Configuration and customization guides
 * - Performance optimization and best practices
 */
export default function AgentsDocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeAgent, setActiveAgent] = useState("master");
  const [copiedCode, setCopiedCode] = useState("");

  const agents = useMemo(() => [
    {
      id: "master",
      name: "Master Agent",
      description: "Orchestrates all other agents and manages complex multi-step workflows",
      category: "orchestration",
      icon: Brain,
      capabilities: ["Workflow orchestration", "Agent coordination", "Task delegation", "Result aggregation"],
      tools: ["agentCoordinationTool", "workflowManagementTool", "resultAggregationTool"],
      useCases: ["Complex multi-agent workflows", "Task coordination", "System orchestration"],
      example: `import { masterAgent } from '@/lib/agents';

const result = await masterAgent.execute({
  task: "Analyze document and generate summary",
  agents: ["researchAgent", "analyzerAgent"],
  workflow: "research-analysis-workflow"
});`,
      configuration: {
        maxConcurrentTasks: 5,
        timeoutMs: 30000,
        retryAttempts: 3
      }
    },
    {
      id: "research",
      name: "Research Agent",
      description: "Conducts web research, analyzes documents, and gathers information",
      category: "research",
      icon: Search,
      capabilities: ["Web research", "Document analysis", "Information extraction", "Source validation"],
      tools: ["braveSearchTool", "tavilySearchTool", "vectorQueryTool", "chunkerTool"],
      useCases: ["Market research", "Document analysis", "Competitive intelligence"],
      example: `import { researchAgent } from '@/lib/agents';

const research = await researchAgent.research({
  query: "Latest AI development trends",
  sources: ["web", "documents"],
  depth: "comprehensive"
});`,
      configuration: {
        maxSources: 10,
        searchDepth: "comprehensive",
        includeImages: true
      }
    },
    {
      id: "generation",
      name: "Generation Agent",
      description: "Generates code, components, documentation, and creative content",
      category: "creation",
      icon: Code2,
      capabilities: ["Code generation", "Component creation", "Documentation writing", "Content creation"],
      tools: ["vectorQueryTool", "chunkerTool", "graphRAGTool", "braveSearchTool"],
      useCases: ["Code generation", "Component creation", "Documentation automation"],
      example: `import { generationAgent } from '@/lib/agents';

const component = await generationAgent.generateComponent({
  type: "react",
  description: "User profile card with avatar",
  framework: "nextjs",
  styling: "tailwind"
});`,
      configuration: {
        model: "gemini-2.5-flash-lite-preview-06-17",
        thinkingBudget: -1,
        includeThoughts: true
      }
    },
    {
      id: "analyzer",
      name: "Analyzer Agent",
      description: "Analyzes code quality, performance, and provides optimization suggestions",
      category: "analysis",
      icon: BarChart3,
      capabilities: ["Code analysis", "Performance monitoring", "Quality assessment", "Optimization suggestions"],
      tools: ["vectorQueryTool", "chunkerTool", "graphRAGTool", "stockPriceTool"],
      useCases: ["Code review", "Performance optimization", "Quality assurance"],
      example: `import { analyzerAgent } from '@/lib/agents';

const analysis = await analyzerAgent.analyzeCode({
  code: sourceCode,
  metrics: ["performance", "security", "maintainability"],
  suggestions: true
});`,
      configuration: {
        analysisDepth: "comprehensive",
        includeMetrics: true,
        generateSuggestions: true
      }
    },
    {
      id: "supervisor",
      name: "Supervisor Agent",
      description: "Monitors agent activities, manages resources, and ensures system health",
      category: "monitoring",
      icon: Activity,
      capabilities: ["Agent monitoring", "Resource management", "Health checks", "Performance tracking"],
      tools: ["vectorQueryTool", "chunkerTool", "graphRAGTool", "braveSearchTool"],
      useCases: ["System monitoring", "Resource optimization", "Health management"],
      example: `import { supervisorAgent } from '@/lib/agents';

const status = await supervisorAgent.getSystemStatus({
  includeMetrics: true,
  checkHealth: true,
  generateReport: true
});`,
      configuration: {
        monitoringInterval: 5000,
        healthCheckTimeout: 10000,
        alertThresholds: { cpu: 80, memory: 85 }
      }
    },
    {
      id: "weather",
      name: "Weather Agent",
      description: "Provides weather information and climate data for location-based services",
      category: "data",
      icon: Cloud,
      capabilities: ["Weather forecasts", "Climate data", "Location services", "Weather alerts"],
      tools: ["braveSearchTool", "tavilySearchTool", "vectorQueryTool", "chunkerTool"],
      useCases: ["Weather forecasting", "Location-based services", "Climate analysis"],
      example: `import { weatherAgent } from '@/lib/agents';

const weather = await weatherAgent.getWeather({
  location: "San Francisco, CA",
  forecast: "7-day",
  includeAlerts: true
});`,
      configuration: {
        apiProvider: "openweather",
        units: "metric",
        includeHourly: true
      }
    },
    {
      id: "chance",
      name: "Chance Agent",
      description: "Handles probability calculations, random events, and statistical analysis",
      category: "analysis",
      icon: Target,
      capabilities: ["Probability calculations", "Random generation", "Statistical analysis", "Risk assessment"],
      tools: ["cryptoPriceTool", "stockPriceTool", "vectorQueryTool", "chunkerTool"],
      useCases: ["Risk analysis", "Statistical modeling", "Random event generation"],
      example: `import { chanceAgent } from '@/lib/agents';

const probability = await chanceAgent.calculateProbability({
  event: "user_conversion",
  factors: ["traffic", "engagement", "season"],
  model: "bayesian"
});`,
      configuration: {
        randomSeed: null,
        precision: 4,
        distributionType: "normal"
      }
    },
    {
      id: "langgraph",
      name: "LangGraph Agent",
      description: "Manages complex workflows using LangGraph for advanced AI orchestration",
      category: "orchestration",
      icon: Network,
      capabilities: ["Workflow management", "Graph execution", "State management", "Complex reasoning"],
      tools: ["braveSearchTool", "tavilySearchTool", "vectorQueryTool", "chunkerTool"],
      useCases: ["Complex AI workflows", "Multi-step reasoning", "State-based processing"],
      example: `import { langGraphAgent } from '@/lib/agents';

const workflow = await langGraphAgent.executeWorkflow({
  graph: "research-analysis-workflow",
  input: { query: "AI trends", depth: "deep" },
  config: { maxSteps: 10 }
});`,
      configuration: {
        maxSteps: 20,
        timeoutMs: 60000,
        enableCheckpoints: true
      }
    }
  ], []);

  const coordinationPatterns = [
    {
      id: "sequential",
      name: "Sequential Processing",
      description: "Agents work in sequence, passing results to the next agent",
      example: "Research → Analysis → Generation → Review",
      useCases: ["Document processing", "Content creation pipelines", "Data analysis workflows"]
    },
    {
      id: "parallel",
      name: "Parallel Execution", 
      description: "Multiple agents work simultaneously on different aspects",
      example: "Research + Weather + Analysis (parallel) → Master Agent (coordination)",
      useCases: ["Multi-source data gathering", "Parallel analysis", "Concurrent processing"]
    },
    {
      id: "hierarchical",
      name: "Hierarchical Coordination",
      description: "Master agent delegates tasks to specialized agents",
      example: "Master → (Research, Analysis, Generation) → Master (aggregation)",
      useCases: ["Complex project management", "Multi-domain analysis", "Orchestrated workflows"]
    }
  ];

  // Filter agents based on search and category
  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = searchQuery === "" || 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.capabilities.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, agents]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(agents.map(agent => agent.category))];
    return cats.sort();
  }, [agents]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <PageLayout
      title="Agents Documentation"
      description="Complete guide to our 8 AI agents, their capabilities, and coordination patterns"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-gentle-float">
          <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
            <Brain className="h-8 w-8 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent text-shadow">
            AI Agent Ecosystem
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our 8 specialized AI agents designed to handle everything from research and analysis 
            to code generation and workflow orchestration.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="glass px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              8 Specialized Agents
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Network className="h-4 w-4 mr-2" />
              Multi-Agent Coordination
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              20+ Integrated Tools
            </Badge>
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
                  placeholder="Search agents, capabilities, and tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
              
              <div className="flex items-center gap-4">
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
                
                <Badge variant="outline" className="glass">
                  {filteredAgents.length} agents
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="coordination" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Coordination
            </TabsTrigger>
            <TabsTrigger value="configuration" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Agent Ecosystem Overview</h2>

              <Alert className="glass">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Intelligent Agent Network</AlertTitle>
                <AlertDescription>
                  Our platform features 8 specialized AI agents that work together to provide comprehensive
                  automation and intelligence across development, research, analysis, and orchestration tasks.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agents.map((agent) => {
                  const IconComponent = agent.icon;
                  return (
                    <Card key={agent.id} className="glass-strong resource-card">
                      <CardHeader className="pb-3">
                        <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                          <IconComponent className="h-5 w-5 text-primary animate-glow" />
                        </div>
                        <CardTitle className="text-sm">{agent.name}</CardTitle>
                        <Badge variant="outline" className="text-xs w-fit">
                          {agent.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground mb-3">{agent.description}</p>
                        <div className="space-y-2">
                          <div className="text-xs font-medium">Key Capabilities:</div>
                          <div className="flex flex-wrap gap-1">
                            {agent.capabilities.slice(0, 2).map(cap => (
                              <Badge key={cap} variant="secondary" className="text-xs">
                                {cap}
                              </Badge>
                            ))}
                            {agent.capabilities.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{agent.capabilities.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Agent Details</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agent Selection */}
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Agent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {filteredAgents.map((agent) => {
                      const IconComponent = agent.icon;
                      return (
                        <Button
                          key={agent.id}
                          variant={activeAgent === agent.id ? "default" : "ghost"}
                          className="w-full justify-start glass"
                          onClick={() => setActiveAgent(agent.id)}
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {agent.name}
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Agent Details */}
                <div className="lg:col-span-2 space-y-6">
                  {(() => {
                    const agent = agents.find(a => a.id === activeAgent);
                    if (!agent) {
                      return null;
                    }

                    const IconComponent = agent.icon;

                    return (
                      <>
                        <Card className="glass-strong">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 neomorphic rounded-lg flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-primary animate-glow" />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{agent.name}</CardTitle>
                                <CardDescription>{agent.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div>
                              <h4 className="font-medium mb-3">Capabilities</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {agent.capabilities.map(capability => (
                                  <div key={capability} className="flex items-center gap-2 p-2 neomorphic rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">{capability}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Available Tools</h4>
                              <div className="flex flex-wrap gap-2">
                                {agent.tools.map(tool => (
                                  <Badge key={tool} variant="outline" className="text-xs">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Common Use Cases</h4>
                              <ul className="space-y-1">
                                {agent.useCases.map(useCase => (
                                  <li key={useCase} className="flex items-center gap-2 text-sm">
                                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                                    {useCase}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Usage Example</h4>
                              <div className="relative">
                                <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                                  <code>{agent.example}</code>
                                </pre>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => handleCopyCode(agent.example)}
                                >
                                  {copiedCode === agent.example ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="coordination" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Agent Coordination Patterns</h2>

              <Alert className="glass">
                <Network className="h-4 w-4" />
                <AlertTitle>Multi-Agent Orchestration</AlertTitle>
                <AlertDescription>
                  Our agents can work together in various patterns to handle complex workflows
                  and provide comprehensive solutions.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                {coordinationPatterns.map((pattern) => (
                  <Card key={pattern.id} className="glass-strong">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Workflow className="h-5 w-5" />
                        {pattern.name}
                      </CardTitle>
                      <CardDescription>{pattern.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 neomorphic rounded-lg">
                        <h4 className="font-medium mb-2">Example Flow</h4>
                        <p className="text-sm text-muted-foreground font-mono">{pattern.example}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Best For</h4>
                        <div className="flex flex-wrap gap-2">
                          {pattern.useCases.map(useCase => (
                            <Badge key={useCase} variant="secondary" className="text-xs">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Agent Configuration</h2>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Configuration Options</CardTitle>
                  <CardDescription>
                    Customize agent behavior and performance settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    {agents.map((agent) => (
                      <AccordionItem key={agent.id} value={agent.id} className="border-none">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <agent.icon className="h-4 w-4" />
                            <span>{agent.name} Configuration</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            {Object.entries(agent.configuration).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-3 neomorphic rounded-lg">
                                <span className="font-medium text-sm">{key}</span>
                                <Badge variant="outline" className="text-xs">
                                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="glass-strong">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Ready to Get Started?</h3>
                <p className="text-sm text-muted-foreground">
                  Explore agent integration examples and advanced workflows
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass">
                  <Play className="h-4 w-4 mr-2" />
                  Try Examples
                </Button>
                <Button variant="outline" className="glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Reference
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
