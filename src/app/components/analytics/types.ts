/**
 * @namespace AnalyticsTypes
 * @module src/app/components/analytics/types.ts
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file TypeScript interfaces and types for analytics components
 *
 * @implements Real telemetry data types from Mastra backend
 * @implements Analytics component interfaces
 * @since 2025-07-20
 */

/**
 * Log entry structure from Mastra backend
 */
export interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  transportId?: string;
  [key: string]: unknown;
}

/**
 * Telemetry data structure from Mastra backend
 */
export interface TelemetryData {
  averageResponseTime?: number;
  traces?: unknown[];
  metrics?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Agent information from Mastra backend
 */
export interface AgentInfo {
  id: string;
  name: string;
  status: string;
  [key: string]: unknown;
}

/**
 * Raw telemetry response from /api/copilotkit?telemetry=true
 */
export interface TelemetryResponse {
  success: boolean;
  timestamp: string;
  error?: string;
  data: {
    telemetry: TelemetryData;
    logs: LogEntry[];
    agents: Record<string, AgentInfo>;
  };
}

/**
 * Processed system metrics for analytics display
 */
export interface SystemMetrics {
  uptime: number;
  responseTime: number;
  successRate: number;
  errorRate: number;
  totalRequests: number;
  activeAgents: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

/**
 * Agent performance metrics
 */
export interface AgentMetrics {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  responseTime: number;
  successRate: number;
  requestCount: number;
  errorCount: number;
  lastActive: Date;
}

/**
 * Tool usage statistics
 */
export interface ToolUsage {
  toolName: string;
  usageCount: number;
  successRate: number;
  averageResponseTime: number;
  lastUsed: Date;
}

/**
 * Performance trend data point
 */
export interface PerformanceDataPoint {
  timestamp: string;
  responseTime: number;
  successRate: number;
  requestCount: number;
  errorCount: number;
}

/**
 * Analytics dashboard data
 */
export interface AnalyticsData {
  systemMetrics: SystemMetrics;
  agentMetrics: AgentMetrics[];
  toolUsage: ToolUsage[];
  performanceTrend: PerformanceDataPoint[];
  lastUpdated: Date;
}

/**
 * Chart data point for Recharts
 */
export interface ChartDataPoint {
  name: string;
  value: number;
  timestamp?: string;
  [key: string]: string | number | undefined;
}

/**
 * Metrics card props
 */
export interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: React.ReactNode;
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'gray';
  loading?: boolean;
  error?: string;
}

/**
 * Widget base props
 */
export interface WidgetProps {
  className?: string;
  refreshInterval?: number;
  onError?: (error: Error) => void;
  onDataUpdate?: (data: unknown) => void;
}

/**
 * Chart props
 */
export interface ChartProps extends WidgetProps {
  data: ChartDataPoint[];
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
}

/**
 * Data processing options
 */
export interface DataProcessingOptions {
  timeRange?: '1h' | '24h' | '7d' | '30d';
  aggregation?: 'minute' | 'hour' | 'day';
  includeErrors?: boolean;
  agentFilter?: string[];
}

/**
 * Error state for components
 */
export interface ErrorState {
  hasError: boolean;
  message: string;
  details?: string;
  timestamp: Date;
}

/**
 * Loading state for components
 */
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}
