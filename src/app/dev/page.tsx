"use client";

import { DevPageLayout } from "@/app/components/layout";
import { DevWorkspace } from "@/app/components/dev/dev-workspace";

/**
 * Development Workspace Page - AI-Powered Development Environment
 *
 * This page provides an AI-powered development workspace with:
 * - Monaco code editor with TypeScript support
 * - Component generator with live preview
 * - File manager with tree view and CRUD operations
 * - Terminal integration with command simulation
 * - Project scaffolding capabilities
 */
export default function DevelopmentWorkspacePage() {
  return (
    <DevPageLayout
      title="Development Workspace"
      description="AI-powered development environment with Monaco editor, component generator, and file management"
      showCopilot={true}
      copilotConfig={{
        defaultOpen: false
      }}
    >
      <DevWorkspace
        showTerminal={true}
        showComponentGenerator={true}
        enableScaffolding={true}
        className="h-[calc(100vh-12rem)]"
      />
    </DevPageLayout>
  );
}
