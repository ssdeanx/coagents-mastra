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
  Settings,
  Shield,
  Key,
  Database,
  Cloud,
  Copy,
  CheckCircle,
  ExternalLink,
  Play,
  Lightbulb,
  Server,
  Eye,
  EyeOff
} from "lucide-react";

export default function SettingsDocumentationPage() {
  const [copiedCode, setCopiedCode] = useState("");
  const [showSecrets, setShowSecrets] = useState(false);

  const envConfig = `# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/database"
POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/database?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/database"

# Google AI Configuration (Gemini)
GOOGLE_GENAI_API_KEY="your-google-ai-api-key"

# Upstash Redis Memory
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# Langfuse Telemetry & Observability
LANGFUSE_SECRET_KEY="your-langfuse-secret-key"
LANGFUSE_PUBLIC_KEY="your-langfuse-public-key"
LANGFUSE_HOST="https://cloud.langfuse.com"

# Search Tools
BRAVE_SEARCH_API_KEY="your-brave-search-api-key"
TAVILY_API_KEY="your-tavily-api-key"

# Financial Data Tools
STOCK_API_KEY="your-stock-api-key"
CRYPTO_API_KEY="your-crypto-api-key"

# Application Settings
NODE_ENV="production"
PORT="3000"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://your-domain.com"`;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const maskSecret = (value: string) => {
    if (!showSecrets && (value.includes("your-") || value.includes("sk-"))) {
      return value.replace(/[a-zA-Z0-9]/g, "*");
    }
    return value;
  };

  return (
    <PageLayout
      title="Settings Documentation"
      description="Complete configuration guide for environment variables, security, and deployment"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-gentle-float">
          <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
            <Settings className="h-8 w-8 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent text-shadow">
            Configuration & Settings
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to configuring your AI platform with environment variables,
            security best practices, and deployment optimization.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="glass px-4 py-2">
              <Key className="h-4 w-4 mr-2" />
              Environment Setup
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Security Practices
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Server className="h-4 w-4 mr-2" />
              Deployment Config
            </Badge>
          </div>
        </section>

        {/* Controls */}
        <Card className="glass-strong">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Configuration Options</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSecrets(!showSecrets)}
                className="glass"
              >
                {showSecrets ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Secrets
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Secrets
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="configuration" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="configuration" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="deployment" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Deployment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configuration" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Environment Variables</h2>

              <Alert className="glass">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Configuration Best Practices</AlertTitle>
                <AlertDescription>
                  Always use environment variables for sensitive data and validate your configuration
                  before deploying to production environments.
                </AlertDescription>
              </Alert>

              <Card className="glass-strong">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Required Environment Variables
                  </CardTitle>
                  <CardDescription>
                    Configure these environment variables for your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted/50 p-4 rounded-lg overflow-auto text-sm border glass">
                      <code>{showSecrets ? envConfig : envConfig.replace(/(api[_-]?key|token|password|secret)="[^"]*"/gi, 
                        (match) => match.replace(/="[^"]*"/, '="***masked***"'))}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyCode(envConfig)}
                    >
                      {copiedCode === envConfig ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                      <Database className="h-5 w-5 text-primary animate-glow" />
                    </div>
                    <CardTitle className="text-lg">Database</CardTitle>
                    <CardDescription>PostgreSQL configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configure PostgreSQL connection strings for your database operations and Prisma ORM.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                      <Cloud className="h-5 w-5 text-primary animate-glow" />
                    </div>
                    <CardTitle className="text-lg">AI Services</CardTitle>
                    <CardDescription>Google Gemini configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configure Google Gemini API for AI-powered features and agent capabilities using the latest models.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                      <Shield className="h-5 w-5 text-primary animate-glow" />
                    </div>
                    <CardTitle className="text-lg">Observability</CardTitle>
                    <CardDescription>Langfuse telemetry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configure Langfuse for comprehensive telemetry, monitoring, and observability of your AI agents.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                      <Database className="h-5 w-5 text-primary animate-glow" />
                    </div>
                    <CardTitle className="text-lg">Memory</CardTitle>
                    <CardDescription>Upstash Redis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configure Upstash Redis for high-performance memory, caching, and agent state management.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                      <Cloud className="h-5 w-5 text-primary animate-glow" />
                    </div>
                    <CardTitle className="text-lg">Search Tools</CardTitle>
                    <CardDescription>Brave & Tavily APIs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configure search APIs for web research, content discovery, and information gathering capabilities.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                      <Server className="h-5 w-5 text-primary animate-glow" />
                    </div>
                    <CardTitle className="text-lg">Financial Data</CardTitle>
                    <CardDescription>Stock & Crypto APIs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configure financial data APIs for market analysis, price tracking, and investment insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Security Best Practices</h2>

              <Alert className="glass border-orange-200">
                <Shield className="h-4 w-4" />
                <AlertTitle>Security Warning</AlertTitle>
                <AlertDescription>
                  Never commit API keys or sensitive configuration to version control.
                  Use environment variables and secure secret management.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle>API Key Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Environment Variables</h4>
                      <p className="text-xs text-muted-foreground">Store all secrets in environment variables, never in code</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Key Rotation</h4>
                      <p className="text-xs text-muted-foreground">Rotate API keys regularly (every 90 days)</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Access Control</h4>
                      <p className="text-xs text-muted-foreground">Limit API key permissions and scope</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle>Data Protection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Encryption</h4>
                      <p className="text-xs text-muted-foreground">Data encrypted at rest and in transit</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Database Security</h4>
                      <p className="text-xs text-muted-foreground">SSL/TLS connections required for PostgreSQL</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Monitoring</h4>
                      <p className="text-xs text-muted-foreground">Comprehensive audit logging with Langfuse</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-shadow">Deployment Configuration</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle>Environment Setup</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Development</h4>
                      <p className="text-xs text-muted-foreground">Local development with hot reload and debug logging</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Staging</h4>
                      <p className="text-xs text-muted-foreground">Pre-production testing with production-like data</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Production</h4>
                      <p className="text-xs text-muted-foreground">Live deployment with monitoring and alerting</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-strong">
                  <CardHeader>
                    <CardTitle>Performance Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Memory Optimization</h4>
                      <p className="text-xs text-muted-foreground">Configure Redis TTL and PostgreSQL connection pooling</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Agent Performance</h4>
                      <p className="text-xs text-muted-foreground">Optimize Gemini model settings and response times</p>
                    </div>
                    <div className="p-3 neomorphic rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Caching Strategy</h4>
                      <p className="text-xs text-muted-foreground">Implement intelligent caching for tools and API responses</p>
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
                <h3 className="text-lg font-semibold">Need Help with Configuration?</h3>
                <p className="text-sm text-muted-foreground">
                  Access configuration templates and validation tools
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass">
                  <Play className="h-4 w-4 mr-2" />
                  Validate Config
                </Button>
                <Button variant="outline" className="glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
