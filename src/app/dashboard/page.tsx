"use client";

import { CatchAllActionRenderProps, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { useState } from "react";
import { Sidebar } from "@/app/components/layout/sidebar";
import { HumanInTheLoop } from "../components/copilotkit/human-in-the-loop";
import "../globals.css";


/**
 * Renders the main dashboard page for the application.
 *
 * This component manages the theme color state and sets up a CopilotKit action to allow dynamic theme changes.
 * It provides the main layout and passes the current theme color to the main content area.
 *
 * Returns:
 *   The dashboard page layout with CopilotKit integration and dynamic theming.
 */
export default function DashboardPage() {
  const [themeColor, setThemeColor] = useState("oklch(0.147 0.004 49.25)"); //globals.css --primary

  // 🪁 Frontend Actions: https://docs.copilotkit.ai/guides/frontend-actions
  useCopilotAction({
    name: "setThemeColor",
    parameters: [{
      name: "themeColor",
      description: "The theme color to set. Make sure to pick nice colors.",
      required: true,
    }],
    handler({ themeColor }) {
      setThemeColor(themeColor);
    },
  });

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Dashboard</h1>
              <p className="text-sm text-muted-foreground">Your intelligent workspace powered by Deanmachines</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div style={{ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties}>
            <YourMainContent themeColor={themeColor} />
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Displays the main content area of the dashboard with dynamic theming.
 *
 * This component integrates CopilotKit generative UI actions and renders detailed information about CopilotKit actions and results.
 *
 * Args:
 *   themeColor: The current theme color to apply to the content area.
 * Returns:
 *   The main dashboard content with CopilotKit action integration and theming.
 */
function YourMainContent({ themeColor }: { themeColor: string }) {
  //🪁 Generative UI: https://docs.copilotkit.ai/coagents/generative-ui
  useCopilotAction({
    name: "*",
    render: (props: CatchAllActionRenderProps) => {
      const InfoBox = ({ title, content }: { title: string; content: unknown }) => (
        <div className="bg-black/30 p-3 rounded-xl">
          <h2 className="text-white text-sm mb-1">{title}</h2>
          <pre className="text-white text-sm overflow-auto max-h-32 font-mono">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      );

      return (
        <details style={{ backgroundColor: themeColor }} className="p-4 my-2 rounded-xl">
          <summary className="text-white cursor-pointer">
            {props.name} {props.status === "complete" ? "called!" : "executing..."}
          </summary>
          <div className="space-y-2 py-4">
            <div className="grid grid-cols-2 gap-2">
              <InfoBox title="Name" content={props.name} />
              <InfoBox title="Status" content={props.status} />
            </div>
            <InfoBox title="Input" content={props.args} />
            <InfoBox title="Output" content={props.result} />
            <InfoBox title="Full Details" content={props} />
          </div>
        </details>
      );
    },
  });

  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="min-h-full flex justify-center items-center flex-col transition-colors duration-300 p-6"
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Deanmachines AI Dashboard</h1>
          <p className="text-gray-200 italic mb-6">
            Welcome to your intelligent workspace! This dashboard integrates with 8 specialized AI agents
            and provides access to 20+ production tools. 🪁
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Active Agents</h3>
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-gray-300 text-sm">Specialized AI agents ready</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Available Tools</h3>
            <p className="text-2xl font-bold text-white">20+</p>
            <p className="text-gray-300 text-sm">Production-ready tools</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Status</h3>
            <p className="text-2xl font-bold text-green-400">Online</p>
            <p className="text-gray-300 text-sm">All systems operational</p>
          </div>
        </div>

        <HumanInTheLoop themeColor={themeColor} />
      </div>
    </div>
  );
}
