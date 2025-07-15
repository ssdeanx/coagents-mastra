/**
 * Core data interfaces and types for Agent Performance Dashboard
 * Requirements: 1.1, 2.1, 3.1, 5.1
 */

/**
 * Represents metrics for an individual agent
 */
export interface AgentMetrics {
  agentId: string;
  agentName: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  errorCount: number;
  lastActivity: Date;
  toolUsage: ToolUsageMetric[];
}

/**
 * Represents usage metrics for a specific tool
 */
export interface ToolUsageMetric {
  toolName: string;
  usageCount: number;
  successRate: number;
  averageExecutionTime: number;
}

/**
 * Represents a performance alert
 */
export interface PerformanceAlert {
  id: string;
  agentId: string;
  alertType: 'error_rate' | 'response_time' | 'downtime';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

/**
 * Represents an individual interaction log entry
 */
export interface InteractionLog {
  id: string;
  agentId: string;
  userId?: string;
  timestamp: Date;
  requestType: string;
  responseTime: number;
  success: boolean;
  errorMessage?: string;
  toolsUsed: string[];
}

/**
 * Represents a time range for analytics queries
 */
export interface TimeRange {
  startDate: Date;
  endDate: Date;
  granularity: 'minute' | 'hour' | 'day' | 'week' | 'month';
}

/**
 * Represents historical metrics data
 */
export interface HistoricalMetrics {
  timeRange: TimeRange;
  agentMetrics: AgentMetrics[];
  aggregatedData: {
    totalRequests: number;
    averageSuccessRate: number;
    averageResponseTime: number;
    totalErrors: number;
  };
  dataPoints: HistoricalDataPoint[];
}

/**
 * Represents a single data point in historical metrics
 */
export interface HistoricalDataPoint {
  timestamp: Date;
  agentId: string;
  requests: number;
  successRate: number;
  responseTime: number;
  errors: number;
}

/**
 * Configuration for performance alerts
 */
export interface AlertConfiguration {
  id: string;
  name: string;
  agentId?: string; // Optional - if not specified, applies to all agents
  alertType: 'error_rate' | 'response_time' | 'downtime';
  threshold: number;
  comparisonOperator: 'greater_than' | 'less_than' | 'equals';
  timeWindow: number; // in minutes
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  notificationChannels: NotificationChannel[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Notification channel configuration
 */
export interface NotificationChannel {
  type: 'email' | 'webhook' | 'slack';
  endpoint: string;
  enabled: boolean;
}