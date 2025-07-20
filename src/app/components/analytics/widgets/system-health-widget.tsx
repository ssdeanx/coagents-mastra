/**
 * @namespace AnalyticsWidgets
 * @module src/app/components/analytics/widgets/system-health-widget.tsx
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file System health monitoring widget with real telemetry data
 *
 * @implements Real-time system health monitoring
 * @implements Glassmorphic design with status indicators
 * @since 2025-07-20
 */

import React from 'react';
import '@/app/globals.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Database,
  Network
} from 'lucide-react';
import { MetricsCard } from '../base/metrics-card';
import { useTelemetryData } from '../hooks/use-telemetry-data';
import { formatMetric } from '../utils/data-processing';
import { WidgetProps, AnalyticsData } from '../types';
import { cn } from '@/lib/utils';

/**
 * System health status indicator
 */
function HealthStatusIndicator({
  status
}: {
  status: 'healthy' | 'warning' | 'critical'
}) {
  const getStatusConfig = () => {
    switch (status) {
      case 'healthy':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          label: 'Healthy'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/20',
          label: 'Warning'
        };
      case 'critical':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          label: 'Critical'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge
      variant="outline"
      className={cn(
        'transition-all duration-300',
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
 * System health metrics grid
 */
function HealthMetricsGrid({
  uptime,
  responseTime,
  successRate,
  activeAgents
}: {
  uptime: number;
  responseTime: number;
  successRate: number;
  activeAgents: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Uptime</span>
          <span className="text-sm font-medium">{formatMetric(uptime, 'percentage')}</span>
        </div>
        <Progress value={uptime} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Success Rate</span>
          <span className="text-sm font-medium">{formatMetric(successRate, 'percentage')}</span>
        </div>
        <Progress value={successRate} className="h-2" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-muted-foreground">Response Time</span>
        </div>
        <span className="text-sm font-medium">{formatMetric(responseTime, 'time')}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-500" />
          <span className="text-sm text-muted-foreground">Active Agents</span>
        </div>
        <span className="text-sm font-medium">{activeAgents}</span>
      </div>
    </div>
  );
}

/**
 * System health widget component
 * 
 * @param props - Widget configuration props
 * @returns JSX element representing the system health widget
 */
export function SystemHealthWidget({
  className,
  refreshInterval = 5000,
  onError,
  onDataUpdate,
  data: externalData
}: WidgetProps & { data?: AnalyticsData }) {
  const { data: internalData, loading, error } = useTelemetryData({
    refreshInterval,
    autoRefresh: !externalData, // Only auto-refresh if no external data
    onError,
    onDataUpdate
  });

  // Use external data if provided, otherwise use internal data
  const data = externalData || internalData;
  const systemMetrics = data?.systemMetrics;

  // Error state
  if (error.hasError) {
    return (
      <Card className={cn('glass border-red-500/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-500" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Failed to load system health data
            </p>
            <p className="text-xs text-red-500">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading.isLoading || !systemMetrics) {
    return (
      <Card className={cn('glass', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-500 animate-pulse" />
            <span>System Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-2 w-full bg-gray-200 rounded animate-pulse" />
                </div>
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
            <Shield className="h-5 w-5 text-blue-500" />
            <span>System Health</span>
          </div>
          <HealthStatusIndicator status={systemMetrics.systemHealth} />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Status */}
        <div className="text-center py-4">
          <div className="text-3xl font-bold mb-2">
            {systemMetrics.systemHealth === 'healthy' && (
              <span className="text-green-500">All Systems Operational</span>
            )}
            {systemMetrics.systemHealth === 'warning' && (
              <span className="text-yellow-500">Minor Issues Detected</span>
            )}
            {systemMetrics.systemHealth === 'critical' && (
              <span className="text-red-500">Critical Issues</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated: {data?.lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        {/* Health Metrics */}
        <HealthMetricsGrid
          uptime={systemMetrics.uptime}
          responseTime={systemMetrics.responseTime}
          successRate={systemMetrics.successRate}
          activeAgents={systemMetrics.activeAgents}
        />

        {/* System Indicators */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <Database className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Database</div>
            <div className="text-sm font-medium text-green-500">Connected</div>
          </div>

          <div className="text-center">
            <Network className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Network</div>
            <div className="text-sm font-medium text-green-500">Stable</div>
          </div>

          <div className="text-center">
            <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">Performance</div>
            <div className="text-sm font-medium text-green-500">Optimal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact system health overview for dashboard
 */
export function SystemHealthOverview() {
  const { data, loading, error } = useTelemetryData({
    refreshInterval: 10000,
    autoRefresh: true
  });

  if (error.hasError) {
    return (
      <MetricsCard
        title="System Health"
        value="Error"
        description="Failed to load health data"
        color="red"
        error={error.message}
        icon={<AlertTriangle className="h-5 w-5" />}
      />
    );
  }

  if (loading.isLoading || !data?.systemMetrics) {
    return (
      <MetricsCard
        title="System Health"
        value="Loading..."
        description="Checking system status"
        loading={true}
        icon={<Shield className="h-5 w-5" />}
      />
    );
  }

  const { systemHealth, uptime } = data.systemMetrics;

  const getHealthDisplay = () => {
    switch (systemHealth) {
      case 'healthy':
        return { value: 'Healthy', color: 'green' as const };
      case 'warning':
        return { value: 'Warning', color: 'yellow' as const };
      case 'critical':
        return { value: 'Critical', color: 'red' as const };
    }
  };

  const healthDisplay = getHealthDisplay();

  return (
    <MetricsCard
      title="System Health"
      value={healthDisplay.value}
      description={`${formatMetric(uptime, 'percentage')} uptime`}
      color={healthDisplay.color}
      trend={uptime > 95 ? 'up' : uptime > 85 ? 'stable' : 'down'}
      trendValue={`${formatMetric(uptime, 'percentage')}`}
      icon={<Shield className="h-5 w-5" />}
    />
  );
}
