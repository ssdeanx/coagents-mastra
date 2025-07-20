/**
 * @namespace AnalyticsWidgets
 * @module src/app/components/analytics/widgets/tool-usage-widget.tsx
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file Tool usage analytics widget with real telemetry data
 *
 * @implements Real-time tool utilization tracking
 * @implements Tool performance metrics and usage patterns
 * @since 2025-07-20
 */

import React from 'react';
import '@/app/globals.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import {
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  Wrench
} from 'lucide-react';
import { MetricsCard } from '../base/metrics-card';
import { useTelemetryData } from '../hooks/use-telemetry-data';
import { formatMetric } from '../utils/data-processing';
import { WidgetProps, ToolUsage, AnalyticsData } from '../types';
import { cn } from '@/lib/utils';

/**
 * Tool status indicator
 */
function ToolStatusIndicator({
  successRate
}: {
  successRate: number
}) {
  const getStatusConfig = () => {
    if (successRate >= 95) {
      return {
        icon: <CheckCircle className="h-3 w-3" />,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        label: 'Excellent'
      };
    } else if (successRate >= 85) {
      return {
        icon: <Activity className="h-3 w-3" />,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        label: 'Good'
      };
    } else if (successRate >= 70) {
      return {
        icon: <Clock className="h-3 w-3" />,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        label: 'Fair'
      };
    } else {
      return {
        icon: <AlertTriangle className="h-3 w-3" />,
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        label: 'Poor'
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
 * Individual tool usage card
 */
function ToolCard({ tool }: { tool: ToolUsage }) {
  return (
    <div className="glass-subtle p-4 rounded-lg space-y-3">
      {/* Tool Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wrench className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">{tool.toolName}</span>
        </div>
        <ToolStatusIndicator successRate={tool.successRate} />
      </div>

      {/* Usage Metrics */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-muted-foreground mb-1">Success Rate</div>
          <div className="flex items-center space-x-2">
            <Progress value={tool.successRate} className="h-1 flex-1" />
            <span className="font-medium">{formatMetric(tool.successRate, 'percentage')}</span>
          </div>
        </div>
        
        <div>
          <div className="text-muted-foreground mb-1">Avg Response</div>
          <div className="font-medium">{formatMetric(tool.averageResponseTime, 'time')}</div>
        </div>
        
        <div>
          <div className="text-muted-foreground mb-1">Usage Count</div>
          <div className="font-medium">{formatMetric(tool.usageCount, 'count')}</div>
        </div>
        
        <div>
          <div className="text-muted-foreground mb-1">Last Used</div>
          <div className="font-medium text-xs">
            {tool.lastUsed.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Tool usage summary
 */
function ToolUsageSummary({ tools }: { tools: ToolUsage[] }) {
  const totalUsage = tools.reduce((sum, tool) => sum + tool.usageCount, 0);
  const avgSuccessRate = tools.length > 0 
    ? tools.reduce((sum, tool) => sum + tool.successRate, 0) / tools.length
    : 0;
  const avgResponseTime = tools.length > 0 
    ? tools.reduce((sum, tool) => sum + tool.averageResponseTime, 0) / tools.length
    : 0;
  const mostUsedTool = tools.reduce((max, tool) => 
    tool.usageCount > max.usageCount ? tool : max, 
    tools[0] || { toolName: 'None', usageCount: 0 }
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center">
        <Wrench className="h-6 w-6 text-blue-500 mx-auto mb-1" />
        <div className="text-2xl font-bold text-blue-500">{tools.length}</div>
        <div className="text-xs text-muted-foreground">Active Tools</div>
      </div>

      <div className="text-center">
        <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-1" />
        <div className="text-2xl font-bold text-green-500">
          {formatMetric(avgSuccessRate, 'percentage')}
        </div>
        <div className="text-xs text-muted-foreground">Avg Success Rate</div>
      </div>

      <div className="text-center">
        <Zap className="h-6 w-6 text-purple-500 mx-auto mb-1" />
        <div className="text-2xl font-bold text-purple-500">
          {formatMetric(totalUsage, 'count')}
        </div>
        <div className="text-xs text-muted-foreground">Total Usage</div>
      </div>

      <div className="text-center">
        <TrendingDown className="h-6 w-6 text-orange-500 mx-auto mb-1" />
        <div className="text-2xl font-bold text-orange-500">
          {formatMetric(avgResponseTime, 'time')}
        </div>
        <div className="text-xs text-muted-foreground">Avg Response</div>
      </div>
    </div>

    {/* Most Used Tool Display */}
    {mostUsedTool.toolName !== 'None' && (
      <div className="p-3 glass-subtle rounded-lg">
        <div className="text-sm text-muted-foreground mb-1">Most Used Tool</div>
        <div className="font-medium">{mostUsedTool.toolName}</div>
        <div className="text-xs text-muted-foreground">
          {formatMetric(mostUsedTool.usageCount, 'count')} executions
        </div>
      </div>
    )}
  </div>
  );
}

/**
 * Tool usage widget component
 * 
 * @param props - Widget configuration props
 * @returns JSX element representing the tool usage widget
 */
export function ToolUsageWidget({
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
  const toolUsage = data?.toolUsage || [];

  // Error state
  if (error.hasError) {
    return (
      <Card className={cn('glass border-red-500/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-red-500" />
            <span>Tool Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Failed to load tool usage data
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
            <Database className="h-5 w-5 text-gray-500 animate-pulse" />
            <span>Tool Usage</span>
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
            <Database className="h-5 w-5 text-blue-500" />
            <span>Tool Usage Analytics</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {toolUsage.length} Tools
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Usage Summary */}
        <ToolUsageSummary tools={toolUsage} />

        {/* Tool List */}
        <div>
          <h4 className="text-sm font-medium mb-3">Individual Tool Performance</h4>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {toolUsage.length > 0 ? (
                toolUsage
                  .sort((a, b) => b.usageCount - a.usageCount)
                  .map((tool) => (
                    <ToolCard key={tool.toolName} tool={tool} />
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tool usage data available</p>
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
 * Compact tool usage overview for dashboard
 */
export function ToolUsageOverview() {
  const { data, loading, error } = useTelemetryData({
    refreshInterval: 15000,
    autoRefresh: true
  });

  if (error.hasError) {
    return (
      <MetricsCard
        title="Tool Usage"
        value="Error"
        description="Failed to load tool data"
        color="red"
        error={error.message}
        icon={<Database className="h-5 w-5" />}
      />
    );
  }

  if (loading.isLoading || !data?.toolUsage) {
    return (
      <MetricsCard
        title="Tool Usage"
        value="Loading..."
        description="Analyzing tool utilization"
        loading={true}
        icon={<Database className="h-5 w-5" />}
      />
    );
  }

  const toolUsage = data.toolUsage;
  const activeTools = toolUsage.length;
  const totalUsage = toolUsage.reduce((sum, tool) => sum + tool.usageCount, 0);

  return (
    <MetricsCard
      title="Tool Usage"
      value={`${activeTools}+`}
      description={`${formatMetric(totalUsage, 'count')} total executions`}
      color="blue"
      trend={activeTools > 10 ? 'up' : 'stable'}
      trendValue={`${activeTools} active tools`}
      icon={<Database className="h-5 w-5" />}
    />
  );
}
