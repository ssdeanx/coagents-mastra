"use client";

import { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import {
  ChevronLeft,
  Bot,
  Settings,
  HelpCircle,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  PageConfig,
  CopilotLabels,
  PageMetadata,
  NavigationItem
} from "@/types/app-types";

/**
 * Available Mastra agents for page-specific functionality
 */
export type MastraAgent =
  | "masterAgent"
  | "researchAgent"
  | "supervisorAgent"
  | "analyzerAgent"
  | "weatherAgent"
  | "generationAgent"
  | "chanceAgent"
  | "langGraphAgent";

/**
 * Extended page layout configuration interface that uses app-types
 */
export interface PageLayoutProps {
  /** Page content */
  children: ReactNode;
  /** Page configuration using app-types PageConfig */
  pageConfig?: PageConfig;
  /** Page metadata using app-types PageMetadata */
  pageMetadata?: PageMetadata;
  /** Page title displayed in header */
  title: string;
  /** Page description/subtitle */
  description?: string;
  /** Mastra agent to use for this page */
  agent?: MastraAgent;
  /** Whether to show the CopilotSidebar */
  showCopilot?: boolean;
  /** Whether to show the back button */
  showBackButton?: boolean;
  /** Custom back button URL */
  backUrl?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show page header */
  showHeader?: boolean;
  /** Custom header actions */
  headerActions?: ReactNode;
  /** Page-specific sidebar content */
  sidebarContent?: ReactNode;
  /** Navigation items for page-specific navigation */
  navigationItems?: NavigationItem[];
  /** Whether to show help button */
  showHelpButton?: boolean;
  /** CopilotKit CSS properties for styling */
  copilotCssProperties?: CopilotKitCSSProperties;
  /** Custom copilot labels */
  copilotLabels?: CopilotLabels;
  /** CopilotSidebar configuration */
  copilotConfig?: {
    title?: string;
    initialMessage?: string;
    defaultOpen?: boolean;
  };
}

/**
 * Agent configuration mapping
 */
const agentConfig: Record<MastraAgent, { name: string; description: string; color: string }> = {
  masterAgent: {
    name: "Master Agent",
    description: "General-purpose AI assistant with 20+ tools",
    color: "bg-blue-500"
  },
  researchAgent: {
    name: "Research Agent",
    description: "Document analysis and research capabilities",
    color: "bg-green-500"
  },
  supervisorAgent: {
    name: "Supervisor Agent",
    description: "Multi-agent coordination and orchestration",
    color: "bg-purple-500"
  },
  analyzerAgent: {
    name: "Analyzer Agent",
    description: "Data analysis and performance metrics",
    color: "bg-orange-500"
  },
  weatherAgent: {
    name: "Weather Agent",
    description: "Weather information and forecasting",
    color: "bg-cyan-500"
  },
  generationAgent: {
    name: "Generation Agent",
    description: "Content and code generation",
    color: "bg-pink-500"
  },
  chanceAgent: {
    name: "Chance Agent",
    description: "Probability and statistical analysis",
    color: "bg-yellow-500"
  },
  langGraphAgent: {
    name: "LangGraph Agent",
    description: "Advanced workflow processing",
    color: "bg-indigo-500"
  }
};

/**
 * Reusable page layout component for all functional pages
 *
 * Features:
 * - Consistent page structure with header and content area
 * - Agent-specific CopilotKit integration
 * - Professional glassmorphic design
 * - Responsive layout with proper spacing
 * - Optional sidebar and back navigation
 *
 * @param props - PageLayout configuration
 */
export function PageLayout({
  children,
  title,
  description,
  agent = "masterAgent",
  showCopilot = true,
  showBackButton = false,
  backUrl = "/dashboard",
  className,
  showHeader = true,
  headerActions,
  sidebarContent,
  showHelpButton = false,
  navigationItems = [],
  copilotConfig = {},
  copilotCssProperties,
  copilotLabels
}: PageLayoutProps) {
  // Defensive access to prevent prototype pollution or object injection
  const safeAgent = (typeof agent === "string" && Object.prototype.hasOwnProperty.call(agentConfig, agent))
    ? agent
    : "masterAgent";
  const currentAgent = agentConfig[safeAgent];

  const defaultCopilotConfig = {
    title: `${currentAgent.name} - Deanmachines`,
    initialMessage: `👋 Hi! I'm the ${currentAgent.name}. ${currentAgent.description}.\n\nHow can I help you today?`,
    defaultOpen: false,
    ...copilotConfig
  };

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Page Header */}
      {showHeader && (
        <header className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              {showBackButton && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={backUrl}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Link>
                </Button>
              )}

              {/* Page Title and Description */}
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Agent Indicator */}
              <div className="hidden md:flex items-center space-x-2">
                <div className={cn("w-2 h-2 rounded-full", currentAgent.color)} />
                <Badge variant="secondary" className="text-xs">
                  <Bot className="mr-1 h-3 w-3" />
                  {currentAgent.name}
                </Badge>
              </div>

              {headerActions}

              {/* Help Button */}
              {showHelpButton && (
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              )}

              {/* Settings Button */}
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Page-specific navigation */}
          {navigationItems.length > 0 && (
            <div className="mb-6">
              <nav className="flex items-center space-x-4">
                {navigationItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="outline" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </div>
                ))}
              </nav>
              <Separator className="mt-4" />
            </div>
          )}

          {/* Sidebar content if provided */}
          {sidebarContent && (
            <div className="mb-6 p-4 rounded-lg bg-muted/50">
              {sidebarContent}
            </div>
          )}

          {children}
        </div>
      </main>

      {/* CopilotSidebar Integration */}
      {showCopilot && (
        <CopilotKit
          runtimeUrl="/api/copilotkit"
          agent={safeAgent}
          {...(copilotCssProperties && { properties: copilotCssProperties })}
        >
          <CopilotSidebar
            clickOutsideToClose={true}
            defaultOpen={defaultCopilotConfig.defaultOpen}
            labels={{
              title: copilotLabels?.title || defaultCopilotConfig.title,
              initial: copilotLabels?.initial || defaultCopilotConfig.initialMessage,
              placeholder: copilotLabels?.placeholder,
              stopGenerating: copilotLabels?.stopGenerating,
              regenerateResponse: copilotLabels?.regenerateResponse
            }}
          />
        </CopilotKit>
      )}
    </div>
  );
}

/**
 * Specialized layout for dashboard pages with enhanced features
 */
export function DashboardPageLayout(props: Omit<PageLayoutProps, "agent">) {
  return (
    <PageLayout
      {...props}
      agent="masterAgent"
      showCopilot={true}
      copilotConfig={{
        title: "Deanmachines Dashboard",
        initialMessage: "👋 Welcome to your AI-powered workspace! I'm here to help you with:\n\n• **Research & Analysis** - Upload documents and get insights\n• **Workflow Automation** - Create multi-agent workflows\n• **Code Generation** - Build components and applications\n• **Data Analytics** - Monitor performance and metrics\n\nWhat would you like to work on today?",
        defaultOpen: false,
        ...props.copilotConfig
      }}
    />
  );
}

/**
 * Specialized layout for research pages
 */
export function ResearchPageLayout(props: Omit<PageLayoutProps, "agent">) {
  return (
    <PageLayout
      {...props}
      agent="researchAgent"
      showBackButton={true}
      copilotConfig={{
        title: "Research Assistant - Deanmachines",
        initialMessage: "🔬 I'm your Research Agent! I can help you with:\n\n• **Document Analysis** - Upload and analyze documents\n• **Web Research** - Search and gather information\n• **Data Extraction** - Extract insights from content\n• **Knowledge Graphs** - Build connected knowledge\n\nUpload a document or ask me to research a topic!",
        defaultOpen: true,
        ...props.copilotConfig
      }}
    />
  );
}

/**
 * Specialized layout for workflow pages
 */
export function WorkflowPageLayout(props: Omit<PageLayoutProps, "agent">) {
  return (
    <PageLayout
      {...props}
      agent="supervisorAgent"
      showBackButton={true}
      copilotConfig={{
        title: "Workflow Supervisor - Deanmachines",
        initialMessage: "⚡ I'm your Workflow Supervisor! I can help you:\n\n• **Create Workflows** - Design multi-agent processes\n• **Coordinate Agents** - Manage agent interactions\n• **Monitor Execution** - Track workflow progress\n• **Optimize Performance** - Improve workflow efficiency\n\nLet's build some powerful automation together!",
        defaultOpen: true,
        ...props.copilotConfig
      }}
    />
  );
}

/**
 * Specialized layout for analytics pages
 */
export function AnalyticsPageLayout(props: Omit<PageLayoutProps, "agent">) {
  return (
    <PageLayout
      {...props}
      agent="analyzerAgent"
      showBackButton={true}
      copilotConfig={{
        title: "Analytics Agent - Deanmachines",
        initialMessage: "📊 I'm your Analytics Agent! I can help you:\n\n• **Performance Metrics** - Monitor system performance\n• **Data Analysis** - Analyze usage patterns\n• **Report Generation** - Create detailed reports\n• **Trend Analysis** - Identify patterns and insights\n\nWhat metrics would you like to explore?",
        defaultOpen: false,
        ...props.copilotConfig
      }}
    />
  );
}
