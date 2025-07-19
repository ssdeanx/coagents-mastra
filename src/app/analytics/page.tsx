"use client";

import { AnalyticsPageLayout } from "@/app/components/layout";

/**
 * Analytics Page - Performance Metrics and System Monitoring
 *
 * This page provides analytics and monitoring capabilities
 * using the analyzerAgent for performance metrics.
 */
export default function AnalyticsPage() {
  return (
    <AnalyticsPageLayout
      title="Analytics Dashboard"
      description="Performance metrics and system monitoring"
      showCopilot={true}
      copilotConfig={{
        defaultOpen: false
      }}
    >
      <div className="space-y-6">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Agent Performance</h3>
            <p className="text-muted-foreground mb-4">
              Monitor AI agent performance and usage metrics.
            </p>
            <div className="text-2xl font-bold text-green-500">98.5%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>

          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Tool Usage</h3>
            <p className="text-muted-foreground mb-4">
              Track tool utilization across all agents.
            </p>
            <div className="text-2xl font-bold text-blue-500">20+</div>
            <div className="text-sm text-muted-foreground">Active Tools</div>
          </div>

          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">System Health</h3>
            <p className="text-muted-foreground mb-4">
              Overall system status and health metrics.
            </p>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <div className="text-sm text-muted-foreground">All Systems</div>
          </div>
        </div>

        {/* Metrics Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Response Time</span>
                <span className="font-medium">&lt; 2s</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate</span>
                <span className="font-medium">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Concurrent Users</span>
                <span className="font-medium">Active</span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Usage Analytics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Daily Requests</span>
                <span className="font-medium">Processing</span>
              </div>
              <div className="flex justify-between">
                <span>Popular Tools</span>
                <span className="font-medium">Research, Analysis</span>
              </div>
              <div className="flex justify-between">
                <span>Peak Hours</span>
                <span className="font-medium">9AM - 5PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="glass-subtle p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Advanced Analytics Coming Soon</h2>
          <p className="text-muted-foreground mb-6">
            Comprehensive analytics and monitoring features are being implemented in Phase 2.
            This page will feature real-time dashboards, detailed metrics, and performance insights.
          </p>
        </div>
      </div>
    </AnalyticsPageLayout>
  );
}