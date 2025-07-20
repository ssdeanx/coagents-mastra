/**
 * @namespace AnalyticsBase
 * @module src/app/components/analytics/base/metrics-card.tsx
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file Reusable metrics card component for analytics dashboard
 *
 * @implements Glassmorphic design with modern aesthetics
 * @implements Real-time data display with loading and error states
 * @since 2025-07-20
 */

import React from 'react';
import '@/app/globals.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Activity,
  Zap,
  Shield,
  Database,
  Users,
  Clock
} from 'lucide-react';
import { MetricsCardProps } from '../types';
import { cn } from '@/lib/utils';

/**
 * Get icon component based on color theme
 */
const getDefaultIcon = (color: string) => {
  switch (color) {
    case 'green':
      return <Shield className="h-5 w-5" />;
    case 'blue':
      return <Activity className="h-5 w-5" />;
    case 'yellow':
      return <Zap className="h-5 w-5" />;
    case 'red':
      return <AlertTriangle className="h-5 w-5" />;
    case 'gray':
      return <Users className="h-5 w-5" />;
    case 'purple':
      return <Database className="h-5 w-5" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};

/**
 * Get trend icon based on trend direction
 */
const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4" />;
    case 'down':
      return <TrendingDown className="h-4 w-4" />;
    default:
      return <Minus className="h-4 w-4" />;
  }
};

/**
 * Get color classes based on color theme
 */
const getColorClasses = (color: string) => {
  switch (color) {
    case 'green':
      return {
        value: 'text-green-500',
        icon: 'text-green-500',
        trend: 'text-green-600',
        badge: 'bg-green-500/10 text-green-500 border-green-500/20'
      };
    case 'blue':
      return {
        value: 'text-blue-500',
        icon: 'text-blue-500',
        trend: 'text-blue-600',
        badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      };
    case 'yellow':
      return {
        value: 'text-yellow-500',
        icon: 'text-yellow-500',
        trend: 'text-yellow-600',
        badge: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      };
    case 'red':
      return {
        value: 'text-red-500',
        icon: 'text-red-500',
        trend: 'text-red-600',
        badge: 'bg-red-500/10 text-red-500 border-red-500/20'
      };
    default:
      return {
        value: 'text-gray-500',
        icon: 'text-gray-500',
        trend: 'text-gray-600',
        badge: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
      };
  }
};

/**
 * Reusable metrics card component for displaying analytics data
 *
 * @param props - MetricsCardProps containing card configuration
 * @returns JSX element representing the metrics card
 */
export function MetricsCard({
  title,
  value,
  description,
  trend,
  trendValue,
  icon,
  color = 'gray',
  loading = false,
  error,
  ...props
}: MetricsCardProps) {
  const colorClasses = getColorClasses(color);
  const displayIcon = icon || getDefaultIcon(color);

  // Error state
  if (error) {
    return (
      <Card className="glass border-red-500/20" {...props}>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium">{title}</div>
              <div className="text-sm mt-1">{error}</div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Card className="glass" {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-3 w-32" />
          {trendValue && (
            <div className="flex items-center mt-3">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass hover:glass-hover transition-all duration-300" {...props}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center space-x-2">
            <div className={cn('transition-colors', colorClasses.icon)}>
              {displayIcon}
            </div>
            <span className="text-muted-foreground">{title}</span>
          </div>
          {trend && (
            <Badge
              variant="outline"
              className={cn('transition-colors', colorClasses.badge)}
            >
              <div className="flex items-center space-x-1">
                {getTrendIcon(trend)}
                <span className="text-xs">
                  {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                </span>
              </div>
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          {/* Main Value */}
          <div className={cn(
            'text-2xl font-bold transition-colors',
            colorClasses.value
          )}>
            {value}
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {/* Trend Information */}
          {trendValue && trend && (
            <div className="flex items-center space-x-1 pt-1">
              <div className={cn('transition-colors', colorClasses.trend)}>
                {getTrendIcon(trend)}
              </div>
              <span className={cn(
                'text-sm font-medium transition-colors',
                colorClasses.trend
              )}>
                {trendValue}
              </span>
              <span className="text-xs text-muted-foreground">
                vs last period
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Loading skeleton for metrics card
 */
export function MetricsCardSkeleton() {
  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-12 rounded-full" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-32 mb-3" />
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Error state for metrics card
 */
export function MetricsCardError({ 
  title, 
  error 
}: { 
  title: string; 
  error: string; 
}) {
  return (
    <Card className="glass border-red-500/20">
      <CardContent className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium">{title}</div>
            <div className="text-sm mt-1">{error}</div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
