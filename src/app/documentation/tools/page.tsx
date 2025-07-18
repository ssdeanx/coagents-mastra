"use client";

import React, { useState } from "react";
import { PageLayout } from "@/app/components/layout/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
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
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/components/ui/alert";
import {
  Wrench,
  Search,
  Code2,
  Database,
  Globe,
  Zap,
  Copy,
  CheckCircle,
  ExternalLink,
  Play,
  Lightbulb,
  Brain,
  DollarSign,
  TrendingUp,
  Shield,
  Activity
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  parameters: string[];
  returnType: string;
  example: string;
  useCases: string[];
}

export default function ToolsDocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState("brave-search");
  const [copiedCode, setCopiedCode] = useState("");

  const toolCatalog: Tool[] = [
    {
      id: "brave-search",
      name: "Brave Search Tool",
      description: "Search the web using Brave Search API for comprehensive results",
      category: "search",
      icon: Search,
      parameters: ["query", "count", "search_lang", "country"],
      returnType: "BraveSearchResults",
      example: `import { braveSearchTool } from '@/lib/tools';

const results = await braveSearchTool({
  query: "latest AI developments",
  count: 10,
  search_lang: "en",
  country: "US"
});

console.log(results.web.results);`,
      useCases: ["Web research", "Content discovery", "Market analysis"]
    },
    {
      id: "tavily-search",
      name: "Tavily Search Tool",
      description: "Advanced AI-powered search with comprehensive web results",
      category: "search",
      icon: Brain,
      parameters: ["query", "search_depth", "include_images", "max_results"],
      returnType: "TavilySearchResults",
      example: `import { tavilySearchTool } from '@/lib/tools';

const results = await tavilySearchTool({
  query: "machine learning trends 2024",
  search_depth: "advanced",
  include_images: true,
  max_results: 10
});`,
      useCases: ["Deep research", "Academic queries", "Technical analysis"]
    },
    {
      id: "vector-query",
      name: "Vector Query Tool",
      description: "Query vector database for semantic search and similarity matching",
      category: "data",
      icon: Database,
      parameters: ["query", "namespace", "top_k", "include_metadata"],
      returnType: "VectorQueryResults",
      example: `import { vectorQueryTool } from '@/lib/tools';

const results = await vectorQueryTool({
  query: "AI agent architecture",
  namespace: "documents",
  top_k: 5,
  include_metadata: true
});`,
      useCases: ["Semantic search", "Document retrieval", "Knowledge base queries"]
    },
    {
      id: "chunker",
      name: "Chunker Tool",
      description: "Split and process documents into manageable chunks for analysis",
      category: "processing",
      icon: Code2,
      parameters: ["text", "chunk_size", "overlap", "separator"],
      returnType: "ChunkedDocument",
      example: `import { chunkerTool } from '@/lib/tools';

const chunks = await chunkerTool({
  text: documentContent,
  chunk_size: 1000,
  overlap: 200,
  separator: "\\n\\n"
});`,
      useCases: ["Document processing", "Text analysis", "Content preparation"]
    },
    {
      id: "graph-rag",
      name: "Graph RAG Tool",
      description: "Perform graph-based retrieval augmented generation for complex queries",
      category: "ai",
      icon: Brain,
      parameters: ["query", "graph_depth", "max_nodes", "include_relationships"],
      returnType: "GraphRAGResults",
      example: `import { graphRAGTool } from '@/lib/tools';

const results = await graphRAGTool({
  query: "How do AI agents communicate?",
  graph_depth: 3,
  max_nodes: 20,
  include_relationships: true
});`,
      useCases: ["Complex reasoning", "Knowledge graph queries", "Relationship analysis"]
    },
    {
      id: "stock-price",
      name: "Stock Price Tool",
      description: "Get real-time and historical stock price data and market information",
      category: "finance",
      icon: TrendingUp,
      parameters: ["symbol", "interval", "period", "include_indicators"],
      returnType: "StockData",
      example: `import { stockPriceTool } from '@/lib/tools';

const stockData = await stockPriceTool({
  symbol: "AAPL",
  interval: "1d",
  period: "1mo",
  include_indicators: true
});`,
      useCases: ["Financial analysis", "Market research", "Investment tracking"]
    },
    {
      id: "crypto-price",
      name: "Crypto Price Tool",
      description: "Get cryptocurrency prices, market data, and trading information",
      category: "finance",
      icon: DollarSign,
      parameters: ["symbol", "vs_currency", "include_24hr_change", "include_market_cap"],
      returnType: "CryptoData",
      example: `import { cryptoPriceTool } from '@/lib/tools';

const cryptoData = await cryptoPriceTool({
  symbol: "bitcoin",
  vs_currency: "usd",
  include_24hr_change: true,
  include_market_cap: true
});`,
      useCases: ["Crypto analysis", "Portfolio tracking", "Market monitoring"]
    }
  ];

  // Filter tools based on search and category
  const filteredTools = toolCatalog.filter(tool => {
    const matchesSearch = searchQuery === "" || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.useCases.some(useCase => useCase.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [...new Set(toolCatalog.map(tool => tool.category))].sort();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <PageLayout
      title="Tools Documentation"
      description="Complete guide to production tools, usage examples, and integration patterns"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-gentle-float">
          <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
            <Wrench className="h-8 w-8 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent text-shadow">
            Tools Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to our production tool ecosystem featuring search, data processing,
            AI capabilities, and financial market tools.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="glass px-4 py-2">
              <Search className="h-4 w-4 mr-2" />
              Search Tools
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Database className="h-4 w-4 mr-2" />
              Data Processing
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <DollarSign className="h-4 w-4 mr-2" />
              Financial Data
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
                  placeholder="Search tools, categories, and use cases..."
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
                  {filteredTools.length} tools
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Tool Catalog
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Patterns
            </TabsTrigger>
            <TabsTrigger value="development" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Development
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Production Tools</h2>

              <Alert className="glass">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Production-Ready Tools</AlertTitle>
                <AlertDescription>
                  Our tool ecosystem includes search, data processing, AI capabilities, and financial market tools
                  that are actively used in production workflows.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tool Selection */}
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Tool</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredTools.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <Button
                          key={tool.id}
                          variant={selectedTool === tool.id ? "default" : "ghost"}
                          className="w-full justify-start glass"
                          onClick={() => setSelectedTool(tool.id)}
                        >
                          <IconComponent className="h-4 w-4 mr-2" />
                          {tool.name}
                        </Button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Tool Details */}
                <div className="lg:col-span-2 space-y-6">
                  {(() => {
                    const tool = toolCatalog.find(t => t.id === selectedTool);
                    if (!tool) {
                      return null;
                    }

                    const IconComponent = tool.icon;

                    return (
                      <Card className="glass-strong">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 neomorphic rounded-lg flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-primary animate-glow" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{tool.name}</CardTitle>
                              <CardDescription>{tool.description}</CardDescription>
                              <Badge variant="outline" className="text-xs mt-1">
                                {tool.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-3">Parameters</h4>
                            <div className="flex flex-wrap gap-2">
                              {tool.parameters.map(param => (
                                <Badge key={param} variant="secondary" className="text-xs">
                                  {param}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Return Type</h4>
                            <Badge variant="outline" className="font-mono text-xs">
                              {tool.returnType}
                            </Badge>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Usage Example</h4>
                            <div className="relative">
                              <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                                <code>{tool.example}</code>
                              </pre>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => handleCopyCode(tool.example)}
                              >
                                {copiedCode === tool.example ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-3">Use Cases</h4>
                            <div className="flex flex-wrap gap-2">
                              {tool.useCases.map(useCase => (
                                <Badge key={useCase} variant="outline" className="text-xs">
                                  {useCase}
                                </Badge>
                              ))}
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

          <TabsContent value="patterns" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Integration Patterns</h2>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Sequential Tool Chain</CardTitle>
                  <CardDescription>Tools execute in sequence, passing data between steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                      <code>{`// Sequential tool execution
const searchResults = await braveSearchTool({ query: userQuery });
const chunks = await chunkerTool({ text: searchResults.content });
const vectorResults = await vectorQueryTool({ query: userQuery });`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Parallel Tool Execution</CardTitle>
                  <CardDescription>Multiple tools run simultaneously for efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                      <code>{`// Parallel tool execution
const [braveResults, tavilyResults, stockData] = await Promise.all([
  braveSearchTool({ query: "market analysis" }),
  tavilySearchTool({ query: "market trends" }),
  stockPriceTool({ symbol: "AAPL" })
]);`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="development" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Tool Development</h2>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 neomorphic rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Error Handling</h4>
                    <p className="text-xs text-muted-foreground">Implement proper error handling and fallbacks</p>
                  </div>
                  <div className="p-3 neomorphic rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Type Safety</h4>
                    <p className="text-xs text-muted-foreground">Use TypeScript interfaces for all tool parameters</p>
                  </div>
                  <div className="p-3 neomorphic rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Performance</h4>
                    <p className="text-xs text-muted-foreground">Optimize for concurrent execution and caching</p>
                  </div>
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
                <h3 className="text-lg font-semibold">Ready to Use Tools?</h3>
                <p className="text-sm text-muted-foreground">
                  Explore tool integration examples and agent workflows
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass">
                  <Play className="h-4 w-4 mr-2" />
                  Try Tools
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
