/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @namespace AnalyticsCharts
 * @module src/app/components/analytics/charts/performance-chart.tsx
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file Performance trend charts using Recharts with real telemetry data
 *
 * @implements Real-time performance visualization
 * @implements Responsive charts with glassmorphic design
 * @since 2025-07-20
 */

import React, { useMemo } from 'react';
import '@/app/globals.css';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  TrendingUp, 
  Activity, 
  Clock, 
  AlertTriangle,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart
} from 'lucide-react';
import { useTelemetryData } from '../hooks/use-telemetry-data';
import { formatMetric } from '../utils/data-processing';
import { WidgetProps, PerformanceDataPoint, AnalyticsData } from '../types';
import { cn } from '@/lib/utils';

/**
 * Custom tooltip for charts
 */
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-lg border border-border/50 shadow-lg">
        <p className="text-sm font-medium mb-2">{`Time: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${
              entry.dataKey.includes('Rate') || entry.dataKey.includes('rate')
                ? formatMetric(entry.value, 'percentage')
                : entry.dataKey.includes('Time') || entry.dataKey.includes('time')
                ? formatMetric(entry.value, 'time')
                : formatMetric(entry.value, 'count')
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

/**
 * Response time trend chart
 */
function ResponseTimeChart({ data }: { data: PerformanceDataPoint[] }) {
  const chartData = useMemo(() => 
    data.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString(),
      responseTime: point.responseTime,
      timestamp: point.timestamp
    }))
  , [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis
          dataKey="time"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => formatMetric(value, 'time')}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="responseTime"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/**
 * Success rate area chart
 */
function SuccessRateChart({ data }: { data: PerformanceDataPoint[] }) {
  const chartData = useMemo(() => 
    data.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString(),
      successRate: point.successRate,
      errorRate: 100 - point.successRate,
      timestamp: point.timestamp
    }))
  , [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="successRate"
          stackId="1"
          stroke="hsl(142 76% 36%)"
          fill="hsl(142 76% 36%)"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="errorRate"
          stackId="1"
          stroke="hsl(0 84% 60%)"
          fill="hsl(0 84% 60%)"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/**
 * Request volume bar chart
 */
function RequestVolumeChart({ data }: { data: PerformanceDataPoint[] }) {
  const chartData = useMemo(() => 
    data.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString(),
      requests: point.requestCount,
      errors: point.errorCount,
      timestamp: point.timestamp
    }))
  , [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => formatMetric(value, 'count')}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="requests" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
        <Bar dataKey="errors" fill="hsl(0 84% 60%)" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * Combined performance chart
 */
function CombinedChart({ data }: { data: PerformanceDataPoint[] }) {
  const chartData = useMemo(() => 
    data.map(point => ({
      time: new Date(point.timestamp).toLocaleTimeString(),
      responseTime: point.responseTime,
      successRate: point.successRate,
      requests: point.requestCount,
      timestamp: point.timestamp
    }))
  , [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          yAxisId="left"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => formatMetric(value, 'time')}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar yAxisId="left" dataKey="requests" fill="hsl(var(--primary))" opacity={0.6} />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="responseTime" 
          stroke="hsl(142 76% 36%)" 
          strokeWidth={2}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="successRate" 
          stroke="hsl(221 83% 53%)" 
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

/**
 * Performance chart widget component
 * 
 * @param props - Chart configuration props
 * @returns JSX element representing the performance chart widget
 */
export function PerformanceChart({
  className,
  refreshInterval = 10000,
  onError,
  onDataUpdate,
  data: externalData
}: WidgetProps & { refreshInterval?: number; data?: AnalyticsData }) {
  const { data: internalData, loading, error } = useTelemetryData({
    refreshInterval,
    autoRefresh: !externalData,
    onError,
    onDataUpdate
  });

  const data = externalData || internalData;
  const performanceData = data?.performanceTrend || [];

  // Error state
  if (error.hasError) {
    return (
      <Card className={cn('glass border-red-500/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-red-500" />
            <span>Performance Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Failed to load performance data
            </p>
            <p className="text-xs text-red-500">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading.isLoading || performanceData.length === 0) {
    return (
      <Card className={cn('glass', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-gray-500 animate-pulse" />
            <span>Performance Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-64 w-full bg-gray-200 rounded animate-pulse" />
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
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <span>Performance Trends</span>
            <Activity className="h-4 w-4 text-green-500 ml-2" />
          </div>
          <Badge variant="outline" className="text-xs">
            {performanceData.length} Data Points
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="response" className="text-xs">
              <LineChartIcon className="h-3 w-3 mr-1" />
              Response
            </TabsTrigger>
            <TabsTrigger value="success" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Success
            </TabsTrigger>
            <TabsTrigger value="volume" className="text-xs">
              <PieChart className="h-3 w-3 mr-1" />
              Volume
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <CombinedChart data={performanceData} />
          </TabsContent>
          
          <TabsContent value="response" className="mt-6">
            <ResponseTimeChart data={performanceData} />
          </TabsContent>
          
          <TabsContent value="success" className="mt-6">
            <SuccessRateChart data={performanceData} />
          </TabsContent>
          
          <TabsContent value="volume" className="mt-6">
            <RequestVolumeChart data={performanceData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
