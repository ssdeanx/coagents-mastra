"use client";

import { ResearchPageLayout } from "@/app/components/layout";
import { ResearchWorkspace } from "@/app/components/research/research-workspace";

/**
 * Research Page - Document Analysis and Research Capabilities
 *
 * Phase 2 Implementation: Full functional research experience
 * - Document upload and analysis using researchAgent
 * - Research workflow execution with research-analysis-workflow
 * - Real-time results with CopilotKit integration
 * - Knowledge graph visualization and insights
 */
export default function ResearchPage() {
  return (
    <ResearchPageLayout
      title="Research Workspace"
      description="AI-powered document analysis and research capabilities"
      showCopilot={true}
      copilotConfig={{
        defaultOpen: false
      }}
    >
      <ResearchWorkspace />
    </ResearchPageLayout>
  );
}