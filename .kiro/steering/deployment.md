---
inclusion: always
---

# Deployment & Infrastructure Guidelines

This document outlines deployment strategies, infrastructure requirements, and operational best practices for the CopilotKit + Mastra AI application.

## Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        LB[Load Balancer]
        
        subgraph "Application Layer"
            APP1[Next.js App Instance 1]
            APP2[Next.js App Instance 2]
            APP3[Next.js App Instance N]
        end
        
        subgraph "Mastra Backend"
            MASTRA1[Mastra Agent Server 1]
            MASTRA2[Mastra Agent Server 2]
        end
        
        subgraph "External Services"
            UPSTASH[Upstash Redis/Vector]
            PINECONE[Pinecone Vector DB]
            POSTGRES[PostgreSQL]
            GEMINI[Google Gemini API]
            SEARCH[Search APIs]
        end
    end
    
    LB --> APP1
    LB --> APP2
    LB --> APP3
    
    APP1 --> MASTRA1
    APP2 --> MASTRA1
    APP3 --> MASTRA2
    
    MASTRA1 --> UPSTASH
    MASTRA1 --> PINECONE
    MASTRA1 --> POSTGRES
    MASTRA1 --> GEMINI
    MASTRA1 --> SEARCH
    
    MASTRA2 --> UPSTASH
    MASTRA2 --> PINECONE
    MASTRA2 --> POSTGRES
    MASTRA2 --> GEMINI
    MASTRA2 --> SEARCH
```

## Platform Options

### 1. Vercel (Recommended for Next.js)

**Advantages:**
- Optimized for Next.js applications
- Automatic deployments from Git
- Edge functions and global CDN
- Built-in analytics and monitoring
- Zero-config deployment

**Configuration:**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/copilotkit/route.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "GOOGLE_GENERATIVE_AI_API_KEY": "@google-ai-key",
    "UPSTASH_REDIS_REST_URL": "@upstash-redis-url",
    "UPSTASH_REDIS_REST_TOKEN": "@upstash-redis-token",
    "UPSTASH_VECTOR_REST_URL": "@upstash-vector-url",
    "UPSTASH_VECTOR_REST_TOKEN": "@upstash-vector-token"
  }
}
```

**Deployment Steps:**
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set up custom domain (optional)
4. Enable analytics and monitoring
5. Configure deployment hooks

### 2. Railway

**Advantages:**
- Simple deployment process
- Built-in database services
- Automatic HTTPS
- Git-based deployments

**Configuration:**
```toml
# railway.toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3

[[services]]
name = "web"
source = "."

[[services]]
name = "mastra"
source = "."
startCommand = "npm run dev:agent"
```

### 3. Docker Deployment

**Dockerfile:**
```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}
      - UPSTASH_REDIS_REST_URL=${UPSTASH_REDIS_REST_URL}
      - UPSTASH_REDIS_REST_TOKEN=${UPSTASH_REDIS_REST_TOKEN}
    depends_on:
      - redis
      - postgres

  mastra:
    build: .
    command: npm run dev:agent
    ports:
      - "4111:4111"
    environment:
      - NODE_ENV=production
      - GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=mastra
      - POSTGRES_USER=mastra
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  redis_data:
  postgres_data:
```

## Environment Configuration

### 1. Environment Variables

**Required Variables:**
```bash
# AI Model Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key

# Memory & Storage
UPSTASH_REDIS_REST_URL=https://your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
UPSTASH_VECTOR_REST_URL=https://your-vector-url
UPSTASH_VECTOR_REST_TOKEN=your-vector-token

# Search APIs
BRAVE_API_KEY=your-brave-api-key
TAVILY_API_KEY=your-tavily-api-key

# Observability
LANGFUSE_PUBLIC_KEY=your-langfuse-public-key
LANGFUSE_SECRET_KEY=your-langfuse-secret-key
LANGFUSE_HOST=https://your-langfuse-host

# Application Configuration
NODE_ENV=production
LOG_LEVEL=info
MASTRA_URL=http://localhost:4111
```

**Optional Variables:**
```bash
# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database

# Pinecone (if using Pinecone instead of Upstash Vector)
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=your-pinecone-env
PINECONE_INDEX_NAME=your-index-name

# Additional APIs
DIFFBOT_API_KEY=your-diffbot-key
FIRECRAWL_API_KEY=your-firecrawl-key
NANGO_SECRET_KEY=your-nango-key

# Security
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.com
```

### 2. Environment-Specific Configurations

**Development (.env.local):**
```bash
NODE_ENV=development
LOG_LEVEL=debug
MASTRA_URL=http://localhost:4111
NEXT_TELEMETRY_DISABLED=1
```

**Staging (.env.staging):**
```bash
NODE_ENV=staging
LOG_LEVEL=info
MASTRA_URL=https://staging-mastra.your-domain.com
```

**Production (.env.production):**
```bash
NODE_ENV=production
LOG_LEVEL=warn
MASTRA_URL=https://mastra.your-domain.com
NEXT_TELEMETRY_DISABLED=1
```

## Infrastructure Requirements

### 1. Compute Resources

**Next.js Application:**
- **CPU**: 1-2 vCPUs per instance
- **Memory**: 1-2 GB RAM per instance
- **Storage**: 10-20 GB SSD
- **Network**: 1 Gbps bandwidth

**Mastra Agent Server:**
- **CPU**: 2-4 vCPUs per instance
- **Memory**: 2-4 GB RAM per instance
- **Storage**: 20-50 GB SSD
- **Network**: 1 Gbps bandwidth

### 2. Database Requirements

**Upstash Redis:**
- **Memory**: 1-10 GB depending on usage
- **Throughput**: 10,000-100,000 ops/sec
- **Persistence**: Daily backups enabled

**Upstash Vector:**
- **Dimensions**: 768 (for Gemini embeddings)
- **Vectors**: 100K-1M+ depending on usage
- **Similarity Metric**: Cosine similarity

**PostgreSQL (if used):**
- **CPU**: 2-4 vCPUs
- **Memory**: 4-8 GB RAM
- **Storage**: 100-500 GB SSD
- **Connections**: 100-500 concurrent

### 3. External Service Limits

**Google Gemini API:**
- **Rate Limits**: 60 requests/minute (free tier)
- **Token Limits**: 1M tokens/minute (paid tier)
- **Context Window**: 2M tokens (Gemini 2.5)

**Search APIs:**
- **Brave Search**: 2,000 queries/month (free)
- **Tavily Search**: 1,000 queries/month (free)

## Deployment Strategies

### 1. Blue-Green Deployment

```bash
#!/bin/bash
# blue-green-deploy.sh

# Deploy to staging (green) environment
echo "Deploying to green environment..."
vercel --prod --env=staging

# Run health checks
echo "Running health checks..."
curl -f https://staging.your-domain.com/api/health || exit 1

# Switch traffic to green environment
echo "Switching traffic..."
vercel alias staging.your-domain.com your-domain.com

echo "Deployment complete!"
```

### 2. Canary Deployment

```yaml
# .github/workflows/canary-deploy.yml
name: Canary Deployment

on:
  push:
    branches: [main]

jobs:
  deploy-canary:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Canary
        run: |
          # Deploy 10% of traffic to new version
          vercel --prod --env=canary
          
      - name: Monitor Metrics
        run: |
          # Monitor error rates and performance
          ./scripts/monitor-canary.sh
          
      - name: Full Deployment
        if: success()
        run: |
          # Deploy to 100% of traffic
          vercel --prod
```

### 3. Rolling Deployment

```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mastra-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: mastra-app
  template:
    metadata:
      labels:
        app: mastra-app
    spec:
      containers:
      - name: app
        image: your-registry/mastra-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
```

## Monitoring & Observability

### 1. Application Monitoring

**Health Check Endpoint:**
```typescript
// src/app/api/health/route.ts
export async function GET() {
  try {
    // Check database connectivity
    await checkDatabase();
    
    // Check external services
    await checkExternalServices();
    
    // Check agent availability
    await checkAgents();
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version,
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 503 });
  }
}
```

**Metrics Collection:**
```typescript
// src/lib/metrics.ts
import { createPrometheusMetrics } from '@prometheus/client';

export const metrics = {
  httpRequests: new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
  }),
  
  agentExecutions: new Counter({
    name: 'agent_executions_total',
    help: 'Total number of agent executions',
    labelNames: ['agent', 'status'],
  }),
  
  responseTime: new Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route'],
  }),
};
```

### 2. Logging Configuration

**Structured Logging:**
```typescript
// src/lib/logger.ts
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: {
    service: 'mastra-app',
    version: process.env.npm_package_version,
  },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});
```

### 3. Error Tracking

**Sentry Integration:**
```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter sensitive data
    if (event.request?.headers) {
      delete event.request.headers.authorization;
    }
    return event;
  },
});
```

## Security Considerations

### 1. API Security

**Rate Limiting:**
```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }
  
  return NextResponse.next();
}
```

**CORS Configuration:**
```typescript
// src/app/api/copilotkit/route.ts
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}
```

### 2. Environment Security

**Secret Management:**
```bash
# Use environment-specific secret management
# Vercel: Environment Variables in dashboard
# Railway: Environment Variables in project settings
# Docker: Docker secrets or external secret management

# Example with Docker secrets
docker secret create google_ai_key ./google_ai_key.txt
```

**SSL/TLS Configuration:**
```nginx
# nginx.conf (if using reverse proxy)
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Performance Optimization

### 1. Caching Strategies

**CDN Configuration:**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ];
  },
};
```

**Redis Caching:**
```typescript
// src/lib/cache.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    return cached as T;
  }
  
  const data = await fetcher();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}
```

### 2. Database Optimization

**Connection Pooling:**
```typescript
// src/lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export { pool };
```

**Query Optimization:**
```sql
-- Create indexes for frequently queried fields
CREATE INDEX idx_memory_thread_user_id ON memory_threads(user_id);
CREATE INDEX idx_memory_messages_thread_id ON memory_messages(thread_id);
CREATE INDEX idx_vector_metadata_type ON vectors USING GIN(metadata);
```

## Backup & Recovery

### 1. Data Backup

**Database Backup:**
```bash
#!/bin/bash
# backup-db.sh

# PostgreSQL backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Upload to cloud storage
aws s3 cp backup_*.sql s3://your-backup-bucket/database/
```

**Redis Backup:**
```bash
#!/bin/bash
# backup-redis.sh

# Upstash Redis backup (automatic)
# Manual backup via API
curl -X POST "https://api.upstash.com/v2/redis/backup" \
  -H "Authorization: Bearer $UPSTASH_API_KEY"
```

### 2. Disaster Recovery

**Recovery Procedures:**
1. **Database Recovery**: Restore from latest backup
2. **Application Recovery**: Redeploy from Git repository
3. **Configuration Recovery**: Restore environment variables
4. **DNS Recovery**: Update DNS records if needed

**Recovery Testing:**
```bash
#!/bin/bash
# test-recovery.sh

# Test database restoration
psql $TEST_DATABASE_URL < latest_backup.sql

# Test application deployment
vercel --env=test

# Test functionality
npm run test:e2e
```

## Scaling Strategies

### 1. Horizontal Scaling

**Load Balancer Configuration:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app1
      - app2
      - app3

  app1:
    build: .
    environment:
      - INSTANCE_ID=1

  app2:
    build: .
    environment:
      - INSTANCE_ID=2

  app3:
    build: .
    environment:
      - INSTANCE_ID=3
```

### 2. Auto-scaling

**Kubernetes HPA:**
```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: mastra-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: mastra-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## Maintenance & Updates

### 1. Update Procedures

**Dependency Updates:**
```bash
#!/bin/bash
# update-deps.sh

# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Run tests
npm test

# Update lock file
npm install --package-lock-only
```

**Security Updates:**
```bash
#!/bin/bash
# security-updates.sh

# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Manual review for breaking changes
npm audit fix --force
```

### 2. Maintenance Windows

**Scheduled Maintenance:**
```yaml
# .github/workflows/maintenance.yml
name: Scheduled Maintenance

on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly on Sunday at 2 AM

jobs:
  maintenance:
    runs-on: ubuntu-latest
    steps:
      - name: Update Dependencies
        run: npm update
        
      - name: Run Security Audit
        run: npm audit
        
      - name: Clean Cache
        run: npm cache clean --force
        
      - name: Restart Services
        run: |
          # Restart application services
          kubectl rollout restart deployment/mastra-app
```

This comprehensive deployment guide ensures your CopilotKit + Mastra AI application is production-ready with proper monitoring, security, and scalability considerations.