"use client";

import { WorkflowPageLayout } from "@/app/components/layout";
import { WorkflowCanvas } from "@/app/components/workflows";

/**
 * Workflows Page - Multi-Agent Orchestration and Automation
 *
 * This page provides workflow automation and multi-agent coordination
 * using the supervisorAgent for orchestration.
 */
export default function WorkflowsPage() {
  return (
    <WorkflowPageLayout
      title="Workflow Automation"
      description="Multi-agent orchestration and automated workflows"
      showCopilot={true}
      copilotConfig={{
        defaultOpen: false
      }}
    >
      <div className="space-y-6">
        {/* Workflow Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Agent Orchestration</h3>
            <p className="text-muted-foreground mb-4">
              Coordinate multiple AI agents for complex tasks.
            </p>
            <div className="text-sm text-muted-foreground">
              • Multi-agent coordination
              • Task delegation
              • Result aggregation
            </div>
          </div>

          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Workflow Builder</h3>
            <p className="text-muted-foreground mb-4">
              Visual workflow creation with drag-and-drop interface.
            </p>
            <div className="text-sm text-muted-foreground">
              • Visual workflow design
              • Conditional logic
              • Real-time monitoring
            </div>
          </div>
        </div>

        {/* Available Agents */}
        <div className="glass-subtle p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Available Agents</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "masterAgent",
              "researchAgent",
              "supervisorAgent",
              "analyzerAgent",
              "weatherAgent",
              "generationAgent",
              "chanceAgent",
              "langGraphAgent"
            ].map((agent) => (
              <div key={agent} className="text-center p-3 bg-background/50 rounded-lg">
                <div className="text-sm font-medium">{agent}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="h-[600px]">
          <WorkflowCanvas />
        </div>
      </div>
    </WorkflowPageLayout>
  );
}