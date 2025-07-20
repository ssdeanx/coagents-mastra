/**
 * @namespace AnalyticsWidgets
 * @module src/app/components/analytics/widgets/agent-performance-widget.tsx
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file Agent performance monitoring widget with real telemetry data
 *
 * @implements Real-time agent performance tracking
 * @implements Individual agent metrics and status
 * @since 2025-07-20
 */

import React from 'react';
import '@/app/globals.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { 
  Bot, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  Users
} from 'lucide-react';
import { MetricsCard } from '../base/metrics-card';
import { useTelemetryData } from '../hooks/use-telemetry-data';
import { formatMetric } from '../utils/data-processing';
import { WidgetProps, AgentMetrics, AnalyticsData } from '../types';
import { cn } from '@/lib/utils';

/**
 * Agent status indicator
 */
function AgentStatusIndicator({ 
  status 
}: { 
  status: 'active' | 'inactive' | 'error' 
}) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          label: 'Active'
        };
      case 'inactive':
        return {
          icon: <Clock className="h-3 w-3" />,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/20',
          label: 'Inactive'
        };
      case 'error':
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          label: 'Error'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'text-xs transition-all duration-300',
        config.bgColor,
        config.borderColor,
        config.color
      )}
    >
      <div className="flex items-center space-x-1">
        {config.icon}
        <span>{config.label}</span>
      </div>
    </Badge>
  );
}

/**
 * Individual agent performance card
 */
function AgentCard({ agent }: { agent: AgentMetrics }) {
  return (
    <div className="glass-subtle p-4 rounded-lg space-y-3">
      {/* Agent Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">{agent.name}</span>
        </div>
        <AgentStatusIndicator status={agent.status} />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-muted-foreground mb-1">Success Rate</div>
          <div className="flex items-center space-x-2">
            <Progress value={agent.successRate} className="h-1 flex-1" />
            <span className="font-medium">{formatMetric(agent.successRate, 'percentage')}</span>
          </div>
        </div>
        
        <div>
          <div className="text-muted-foreground mb-1">Response Time</div>
          <div className="font-medium">{formatMetric(agent.responseTime, 'time')}</div>
        </div>
        
        <div>
          <div className="text-muted-foreground mb-1">Requests</div>
          <div className="font-medium">{formatMetric(agent.requestCount, 'count')}</div>
        </div>
        
        <div>
          <div className="text-muted-foreground mb-1">Errors</div>
          <div className={cn(
            'font-medium',
            agent.errorCount > 0 ? 'text-red-500' : 'text-green-500'
          )}>
            {agent.errorCount}
          </div>
        </div>
      </div>

      {/* Last Active */}
      <div className="text-xs text-muted-foreground">
        Last active: {agent.lastActive.toLocaleTimeString()}
      </div>
    </div>
  );
}

/**
 * Agent performance summary
 */
function PerformanceSummary({ agents }: { agents: AgentMetrics[] }) {
  const activeAgents = agents.filter(agent => agent.status === 'active').length;
  const totalRequests = agents.reduce((sum, agent) => sum + agent.requestCount, 0);
  const totalErrors = agents.reduce((sum, agent) => sum + agent.errorCount, 0);
  const avgSuccessRate = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.successRate, 0) / agents.length
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="text-center">
        <Users className="h-6 w-6 text-blue-500 mx-auto mb-1" />
        <div className="text-2xl font-bold text-blue-500">{activeAgents}</div>
        <div className="text-xs text-muted-foreground">Active Agents</div>
      </div>

      <div className="text-center">
        <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-1" />
        <div className="text-2xl font-bold text-green-500">
          {formatMetric(avgSuccessRate, 'percentage')}
        </div>
        <div className="text-xs text-muted-foreground">Avg Success Rate</div>
      </div>

      <div className="text-center">
        <Activity className="h-6 w-6 text-purple-500 mx-auto mb-1" />
        <div className="text-2xl font-bold text-purple-500">
          {formatMetric(totalRequests, 'count')}
        </div>
        <div className="text-xs text-muted-foreground">Total Requests</div>
      </div>

      <div className="text-center">
        {totalErrors > 0 ? (
          <TrendingDown className="h-6 w-6 text-red-500 mx-auto mb-1" />
        ) : (
          <Zap className="h-6 w-6 text-green-500 mx-auto mb-1" />
        )}
        <div className={cn(
          'text-2xl font-bold',
          totalErrors > 0 ? 'text-red-500' : 'text-green-500'
        )}>
          {totalErrors}
        </div>
        <div className="text-xs text-muted-foreground">Total Errors</div>
      </div>
    </div>
  );
}

/**
 * Agent performance widget component
 * 
 * @param props - Widget configuration props
 * @returns JSX element representing the agent performance widget
 */
export function AgentPerformanceWidget({
  className,
  refreshInterval = 5000,
  onError,
  onDataUpdate,
  data: externalData
}: WidgetProps & { data?: AnalyticsData }) {
  const { data: internalData, loading, error } = useTelemetryData({
    refreshInterval,
    autoRefresh: !externalData,
    onError,
    onDataUpdate
  });

  const data = externalData || internalData;
  const agentMetrics = data?.agentMetrics || [];

  // Error state
  if (error.hasError) {
    return (
      <Card className={cn('glass border-red-500/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-red-500" />
            <span>Agent Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Failed to load agent performance data
            </p>
            <p className="text-xs text-red-500">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading.isLoading) {
    return (
      <Card className={cn('glass', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-gray-500 animate-pulse" />
            <span>Agent Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('glass hover:glass-hover transition-all duration-300', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-500" />
            <span>Agent Performance</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {agentMetrics.length} Agents
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Performance Summary */}
        <PerformanceSummary agents={agentMetrics} />

        {/* Agent List */}
        <div>
          <h4 className="text-sm font-medium mb-3">Individual Agent Status</h4>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {agentMetrics.length > 0 ? (
                agentMetrics.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No agent data available</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact agent performance overview for dashboard
 */
export function AgentPerformanceOverview() {
  const { data, loading, error } = useTelemetryData({
    refreshInterval: 10000,
    autoRefresh: true
  });

  if (error.hasError) {
    return (
      <MetricsCard
        title="Agent Performance"
        value="Error"
        description="Failed to load agent data"
        color="red"
        error={error.message}
        icon={<Bot className="h-5 w-5" />}
      />
    );
  }

  if (loading.isLoading || !data?.agentMetrics) {
    return (
      <MetricsCard
        title="Agent Performance"
        value="Loading..."
        description="Checking agent status"
        loading={true}
        icon={<Bot className="h-5 w-5" />}
      />
    );
  }

  const agentMetrics = data.agentMetrics;
  const activeAgents = agentMetrics.filter(agent => agent.status === 'active').length;
  const avgSuccessRate = agentMetrics.length > 0 
    ? agentMetrics.reduce((sum, agent) => sum + agent.successRate, 0) / agentMetrics.length
    : 0;

  return (
    <MetricsCard
      title="Agent Performance"
      value={`${activeAgents}/${agentMetrics.length}`}
      description={`${formatMetric(avgSuccessRate, 'percentage')} avg success rate`}
      color="blue"
      trend={avgSuccessRate > 95 ? 'up' : avgSuccessRate > 85 ? 'stable' : 'down'}
      trendValue={`${formatMetric(avgSuccessRate, 'percentage')}`}
      icon={<Bot className="h-5 w-5" />}
    />
  );
}
