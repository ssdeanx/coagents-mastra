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
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/components/ui/alert";
import {
  Database,
  Zap,
  Cloud,
  Search,
  Copy,
  CheckCircle,
  Settings,
  BarChart3,
  Shield,
  Lightbulb,
  ExternalLink,
  Play,
  Sparkles,
  Network,
  Activity
} from "lucide-react";

/**
 * Memory Documentation Page - Complete Memory Systems Guide
 *
 * This page provides:
 * - Overview of memory architecture and storage types
 * - Pinecone vector database setup and usage
 * - Upstash Redis configuration and caching patterns
 * - PostgreSQL setup and relational data management
 * - Memory management patterns and best practices
 * - Performance optimization and troubleshooting
 */
export default function MemoryDocumentationPage() {
  const [activeSystem, setActiveSystem] = useState("pinecone");
  const [copiedCode, setCopiedCode] = useState("");

  const memorySystemsData = [
    {
      id: "pinecone",
      name: "Pinecone Vector Database",
      description: "High-performance vector database for embeddings and semantic search",
      icon: Search,
      category: "vector",
      useCases: ["Semantic search", "RAG applications", "Similarity matching", "Content recommendations"],
      features: ["Vector similarity search", "Real-time indexing", "Metadata filtering", "Hybrid search"],
      setup: `# Install Pinecone client
pnpm add @pinecone-database/pinecone

# Environment variables
PINECONE_API_KEY=your_api_key
PINECONE_ENVIRONMENT=your_environment`,
      example: `import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Create index
const index = pinecone.index('memory-index');

// Upsert vectors
await index.upsert([
  {
    id: 'doc-1',
    values: [0.1, 0.2, 0.3, ...], // 1536-dim embedding
    metadata: {
      title: 'Document Title',
      content: 'Document content...',
      timestamp: Date.now()
    }
  }
]);

// Query similar vectors
const results = await index.query({
  vector: queryEmbedding,
  topK: 10,
  includeMetadata: true
});`,
      configuration: {
        dimension: 1536,
        metric: "cosine",
        pods: 1,
        replicas: 1,
        podType: "p1.x1"
      }
    },
    {
      id: "upstash",
      name: "Upstash Redis",
      description: "Serverless Redis for caching, sessions, and real-time data",
      icon: Zap,
      category: "cache",
      useCases: ["Session management", "API caching", "Rate limiting", "Real-time features"],
      features: ["Serverless Redis", "Global replication", "REST API", "Automatic scaling"],
      setup: `# Install Upstash Redis client
pnpm add @upstash/redis

# Environment variables
UPSTASH_REDIS_REST_URL=your_rest_url
UPSTASH_REDIS_REST_TOKEN=your_rest_token`,
      example: `import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache data with TTL
await redis.setex('user:123', 3600, JSON.stringify(userData));

// Get cached data
const cachedUser = await redis.get('user:123');

// Session management
await redis.hset('session:abc123', {
  userId: '123',
  lastActive: Date.now(),
  preferences: JSON.stringify(userPrefs)
});

// Rate limiting
const requests = await redis.incr(\`rate_limit:\${userId}:\${minute}\`);
await redis.expire(\`rate_limit:\${userId}:\${minute}\`, 60);`,
      configuration: {
        maxMemory: "100MB",
        evictionPolicy: "allkeys-lru",
        persistence: "enabled",
        replication: "global"
      }
    },
    {
      id: "postgresql",
      name: "PostgreSQL Database",
      description: "Powerful relational database for structured data and complex queries",
      icon: Database,
      category: "relational",
      useCases: ["User management", "Transaction data", "Analytics", "Complex relationships"],
      features: ["ACID compliance", "Complex queries", "JSON support", "Full-text search"],
      setup: `# Install PostgreSQL client
pnpm add pg @types/pg

# Environment variables
DATABASE_URL=postgresql://user:password@host:port/database
POSTGRES_PRISMA_URL=your_prisma_url
POSTGRES_URL_NON_POOLING=your_direct_url`,
      example: `import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create tables
await pool.query(\`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    preferences JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  )
\`);

// Insert data
const result = await pool.query(
  'INSERT INTO users (email, name, preferences) VALUES ($1, $2, $3) RETURNING *',
  [email, name, JSON.stringify(preferences)]
);

// Complex query with joins
const analytics = await pool.query(\`
  SELECT 
    u.name,
    COUNT(s.id) as session_count,
    AVG(s.duration) as avg_duration
  FROM users u
  LEFT JOIN sessions s ON u.id = s.user_id
  WHERE s.created_at >= NOW() - INTERVAL '30 days'
  GROUP BY u.id, u.name
  ORDER BY session_count DESC
\`);`,
      configuration: {
        maxConnections: 20,
        connectionTimeout: 30000,
        idleTimeout: 10000,
        ssl: "require"
      }
    }
  ];

  const memoryPatterns = [
    {
      id: "caching",
      name: "Intelligent Caching",
      description: "Multi-layer caching strategy with automatic invalidation",
      pattern: "Memory → Redis → Database",
      benefits: ["Reduced latency", "Lower database load", "Better user experience"]
    },
    {
      id: "vector-search",
      name: "Semantic Search",
      description: "Vector-based similarity search with metadata filtering",
      pattern: "Query → Embedding → Pinecone → Results",
      benefits: ["Semantic understanding", "Contextual results", "Scalable search"]
    },
    {
      id: "session-management",
      name: "Session Management",
      description: "Distributed session storage with automatic cleanup",
      pattern: "Request → Redis Session → PostgreSQL User",
      benefits: ["Stateless scaling", "Fast access", "Persistent storage"]
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <PageLayout
      title="Memory Documentation"
      description="Complete guide to memory systems: Pinecone, Upstash Redis, and PostgreSQL"
      showCopilot={false}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-gentle-float">
          <div className="w-16 h-16 mx-auto neomorphic rounded-full flex items-center justify-center">
            <Database className="h-8 w-8 text-primary animate-glow" />
          </div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent text-shadow">
            Memory Systems Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to our multi-tier memory architecture featuring vector storage, 
            caching, and relational databases for optimal performance and scalability.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="glass px-4 py-2">
              <Search className="h-4 w-4 mr-2" />
              Pinecone Vectors
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Upstash Redis
            </Badge>
            <Badge variant="secondary" className="glass px-4 py-2">
              <Database className="h-4 w-4 mr-2" />
              PostgreSQL
            </Badge>
          </div>
        </section>

        {/* Architecture Overview */}
        <Card className="glass-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 animate-glow" />
              Memory Architecture
            </CardTitle>
            <CardDescription>
              Multi-tier memory system designed for performance and scalability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="glass mb-6">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Intelligent Memory Management</AlertTitle>
              <AlertDescription>
                Our platform uses a three-tier memory architecture: Pinecone for vector storage and semantic search, 
                Upstash Redis for high-speed caching and sessions, and PostgreSQL for relational data and analytics.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {memorySystemsData.map((system) => {
                const IconComponent = system.icon;
                return (
                  <Card key={system.id} className="glass resource-card">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 neomorphic rounded-lg flex items-center justify-center mb-2">
                        <IconComponent className="h-5 w-5 text-primary animate-glow" />
                      </div>
                      <CardTitle className="text-lg">{system.name}</CardTitle>
                      <Badge variant="outline" className="text-xs w-fit">
                        {system.category}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{system.description}</p>
                      <div className="space-y-2">
                        <div className="text-xs font-medium">Key Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {system.features.slice(0, 2).map(feature => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {system.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{system.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="glass-strong">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Ready to Implement?</h3>
                <p className="text-sm text-muted-foreground">
                  Explore implementation guides and integration examples
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass">
                  <Play className="h-4 w-4 mr-2" />
                  Quick Start
                </Button>
                <Button variant="outline" className="glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Docs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
