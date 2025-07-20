"use client";

import React, { useState } from 'react';
import '@/app/globals.css';
import { AnalyticsPageLayout } from "@/app/components/layout";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import {
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

// Analytics Components
import { SystemHealthWidget } from "@/app/components/analytics/widgets/system-health-widget";
import { AgentPerformanceWidget } from "@/app/components/analytics/widgets/agent-performance-widget";
import { ToolUsageWidget } from "@/app/components/analytics/widgets/tool-usage-widget";
import { PerformanceChart } from "@/app/components/analytics/charts/performance-chart";
import { useTelemetryData } from "@/app/components/analytics/hooks/use-telemetry-data";

/**
 * @namespace AnalyticsPage
 * @module src/app/analytics/page.tsx
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file Analytics Dashboard - Real-time performance metrics and system monitoring
 *
 * @implements Real telemetry data from Mastra backend
 * @implements Component-based architecture with reusable widgets
 * @implements Glassmorphic design with modern aesthetics
 * @since 2025-07-20
 */



/**
 * Analytics Page - Performance Metrics and System Monitoring
 *
 * This page provides comprehensive analytics and monitoring capabilities
 * using real telemetry data from the Mastra backend.
 */
export default function AnalyticsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Fetch telemetry data once for the entire page
  const { data: analyticsData, loading, error, refresh } = useTelemetryData({
    refreshInterval: 5000,
    autoRefresh: true,
    onError: (error: Error) => {
      console.error('Analytics error:', error);
    },
    onDataUpdate: (data) => {
      setLastRefresh(new Date());
      console.log('Analytics data updated:', data);
    }
  });

  const handleManualRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setLastRefresh(new Date());
    refresh();
  };

  return (
    <AnalyticsPageLayout
      title="Analytics Dashboard"
      description="Real-time performance metrics and system monitoring"
      showCopilot={true}
      copilotConfig={{
        defaultOpen: false
      }}
    >
      <div className="space-y-6">
        {/* Header with Refresh Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time insights from Mastra backend telemetry
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        <Alert className="glass border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>Analytics system is operational and collecting real-time data from Mastra backend</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Live Data
              </Badge>
            </div>
          </AlertDescription>
        </Alert>

        {/* Loading State */}
        {loading.isLoading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass p-6 rounded-xl animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error.hasError && (
          <Alert className="glass border-red-500/20">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription>
              <div className="font-medium">Failed to load analytics data</div>
              <div className="text-sm mt-1">{error.message}</div>
            </AlertDescription>
          </Alert>
        )}

        {/* Analytics Content - Only show when data is loaded */}
        {analyticsData && !loading.isLoading && !error.hasError && (
          <>
            {/* Analytics Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* System Health Overview */}
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  System Health
                </h3>
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {analyticsData.systemMetrics.systemHealth === 'healthy' ? 'Healthy' :
                   analyticsData.systemMetrics.systemHealth === 'warning' ? 'Warning' : 'Critical'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {analyticsData.systemMetrics.uptime.toFixed(1)}% uptime
                </div>
              </div>

              {/* Agent Performance Overview */}
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-blue-500" />
                  Agent Performance
                </h3>
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  {analyticsData.agentMetrics.filter(a => a.status === 'active').length}/{analyticsData.agentMetrics.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {(analyticsData.agentMetrics.reduce((sum, a) => sum + a.successRate, 0) / analyticsData.agentMetrics.length).toFixed(1)}% avg success
                </div>
              </div>

              {/* Tool Usage Overview */}
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-purple-500" />
                  Tool Usage
                </h3>
                <div className="text-2xl font-bold text-purple-500 mb-1">
                  {analyticsData.toolUsage.length}+
                </div>
                <div className="text-sm text-muted-foreground">
                  {analyticsData.toolUsage.reduce((sum, t) => sum + t.usageCount, 0)} total executions
                </div>
              </div>
            </div>

            {/* Main Analytics Widgets */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* System Health Widget */}
              <SystemHealthWidget
                key={`system-health-${refreshKey}`}
                data={analyticsData}
                refreshInterval={30000}
              />

              {/* Agent Performance Widget */}
              <AgentPerformanceWidget
                key={`agent-performance-${refreshKey}`}
                data={analyticsData}
                refreshInterval={30000}
              />
            </div>

            {/* Tool Usage Widget */}
            <div className="grid grid-cols-1 gap-6">
              <ToolUsageWidget
                key={`tool-usage-${refreshKey}`}
                data={analyticsData}
                refreshInterval={30000}
              />
            </div>

            {/* Performance Charts */}
            <div className="space-y-6">
              <PerformanceChart
                key={`performance-chart-${refreshKey}`}
                data={analyticsData}
                refreshInterval={30000}
              />
            </div>
          </>
        )}

        {/* Footer Information */}
        <div className="glass-subtle p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                All metrics are sourced from live Mastra backend telemetry data.
                Data refreshes automatically every 5-10 seconds to provide real-time insights.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-500 font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsPageLayout>
  );
}