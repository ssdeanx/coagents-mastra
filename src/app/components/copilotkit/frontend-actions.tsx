"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { toast } from "sonner";

interface FrontendActionsProps {
  onThemeChange?: (color: string) => void;
  onNotification?: (message: string, type?: "success" | "error" | "info") => void;
}

/**
 * Frontend Actions component that provides common UI actions for CopilotKit
 * 
 * @param onThemeChange - Callback when theme color changes
 * @param onNotification - Callback for notifications
 */
export function FrontendActions({ onThemeChange, onNotification }: FrontendActionsProps) {
  // Theme color action
  useCopilotAction({
    name: "setThemeColor",
    description: "Change the theme color of the application",
    parameters: [
      {
        name: "color",
        type: "string",
        description: "The new theme color (hex, rgb, or named color)",
      },
    ],
    handler: async ({ color }: { color: string }) => {
      onThemeChange?.(color);
      onNotification?.(`Theme color changed to ${color}`, "success");
      toast.success(`Theme updated to ${color}`);
      return { success: true, color };
    },
    render: ({ args, result, status }) => (
      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">🎨 Theme Color Change</h4>
        {status === "executing" && <p className="text-sm text-blue-600">Changing theme color to {args?.color}...</p>}
        {status === "complete" && result?.success && (
          <p className="text-sm text-green-600">✅ Theme color successfully changed to {result.color}</p>
        )}
      </div>
    ),
  });

  // Notification action
  useCopilotAction({
    name: "showNotification",
    description: "Display a notification to the user",
    parameters: [
      {
        name: "message",
        type: "string",
        description: "The notification message",
      },
      {
        name: "type",
        type: "string",
        description: "The notification type (success, error, info, warning)",
      },
    ],
    handler: async ({ message, type = "info" }: { message: string; type?: string }) => {
      onNotification?.(message, type as "success" | "error" | "info");

      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "warning":
          toast.warning(message);
          break;
        default:
          toast.info(message);
      }

      return { success: true, message, type };
    },
    render: ({ result, status }) => (
      <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">🔔 Notification</h4>
        {status === "executing" && <p className="text-sm text-yellow-600">Showing notification...</p>}
        {status === "complete" && result?.success && (
          <div className="text-sm">
            <p className="text-green-600">✅ Notification displayed</p>
            <p className="text-gray-600 mt-1">Message: &quot;{result.message}&quot; (Type: {result.type})</p>
          </div>
        )}
      </div>
    ),
  });

  // Page navigation action
  useCopilotAction({
    name: "navigateTo",
    description: "Navigate to a different page or section",
    parameters: [
      {
        name: "path",
        type: "string",
        description: "The path to navigate to",
      },
      {
        name: "newTab",
        type: "boolean",
        description: "Whether to open in a new tab",
      },
    ],
    handler: async ({ path, newTab = false }: { path: string; newTab?: boolean }) => {
      if (newTab) {
        window.open(path, "_blank");
      } else {
        window.location.href = path;
      }

      onNotification?.(`Navigating to ${path}`, "info");
      return { success: true, path, newTab };
    },
  });

  // Toggle sidebar action - routes through CopilotKit API to Mastra agents
  useCopilotAction({
    name: "toggleSidebar",
    description: "Toggle the sidebar open or closed using the supervisor agent",
    parameters: [
      {
        name: "open",
        type: "boolean",
        description: "Whether to open (true) or close (false) the sidebar. If not specified, it will toggle.",
        required: false,
      },
    ],
    // No handler - this will route through your CopilotKit API to Mastra agents
  });

  // Scroll to section action
  useCopilotAction({
    name: "scrollToSection",
    description: "Scroll to a specific section of the page",
    parameters: [
      {
        name: "sectionId",
        type: "string",
        description: "The ID of the section to scroll to",
        required: true,
      },
      {
        name: "behavior",
        type: "string",
        description: "Scroll behavior (smooth, instant, auto)",
        required: false,
      },
    ],
    handler: ({ sectionId, behavior = "smooth" }) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: behavior as ScrollBehavior });
        onNotification?.(`Scrolled to ${sectionId}`, "success");
        return { success: true, sectionId, found: true };
      } else {
        onNotification?.(`Section ${sectionId} not found`, "error");
        return { success: false, sectionId, found: false };
      }
    },
  });

  // Copy to clipboard action
  useCopilotAction({
    name: "copyToClipboard",
    description: "Copy text to the clipboard",
    parameters: [
      {
        name: "text",
        type: "string",
        description: "The text to copy to clipboard",
        required: true,
      },
    ],
    handler: async ({ text }) => {
      try {
        await navigator.clipboard.writeText(text);
        onNotification?.("Copied to clipboard", "success");
        toast.success("Copied to clipboard");
        return { success: true, text };
      } catch {
        onNotification?.("Failed to copy to clipboard", "error");
        toast.error("Failed to copy to clipboard");
        return { success: false, error: "Clipboard access denied" };
      }
    },
  });

  return null; // This component only registers actions for AI agents to call
}

/**
 * Hook for creating custom frontend actions with full CopilotKit support
 * Based on the exact documentation structure from docs/copilotkit/
 *
 * Example usage:
 * useFrontendAction({
 *   name: "generateTaskSteps",
 *   description: "Make up 10 steps that are required for a task",
 *   parameters: [
 *     {
 *       name: "steps",
 *       description: "An array of 10 step objects",
 *       type: "object[]",
 *       attributes: [
 *         {
 *           name: "description",
 *           type: "string",
 *           description: "The text of the step"
 *         },
 *         {
 *           name: "status",
 *           type: "string",
 *           enum: ["enabled", "disabled", "executing"],
 *           description: "The status of the step"
 *         }
 *       ]
 *     }
 *   ],
 *   handler: async ({ steps }) => {
 *     // Your handler logic
 *     return { success: true, steps };
 *   },
 *   render: ({ args, result, status }) => (
 *     <div>Your render component</div>
 *   ),
 *   renderAndWaitForResponse: ({ args, respond, status }) => (
 *     <div>Your interactive component</div>
 *   )
 * });
 */
export function useFrontendAction(
  name: string,
  description: string,
  parameters: Array<{
    name: string;
    type: "string" | "number" | "boolean" | "object" | "object[]" | "string[]" | "number[]" | "boolean[]";
    description: string;
    enum?: string[];
    attributes?: Array<{
      name: string;
      type: "string" | "number" | "boolean" | "object" | "object[]" | "string[]" | "number[]" | "boolean[]";
      description: string;
      enum?: string[];
    }>;
  }>,
  handler: (args: Record<string, unknown>) => Promise<unknown> | unknown,
  renderComponent?: (props: { args: Record<string, unknown>; result: unknown; status: string }) => React.ReactElement
) {
  useCopilotAction({
    name,
    description,
    parameters,
    handler,
    render: renderComponent || (({ args, result, status }: { args: Record<string, unknown>; result: unknown; status: "inProgress" | "executing" | "complete" }) => (
      <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/20">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">⚡ {name}</h4>
        {status === "executing" && <p className="text-sm text-gray-600">Executing action...</p>}
        {status === "complete" && (
          <div className="text-sm">
            <p className="text-green-600">✅ Action completed</p>
            {result ? (
              <pre className="text-xs mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : null}
          </div>
        )}
        {args && Object.keys(args).length > 0 && (
          <details className="mt-2">
            <summary className="text-xs text-gray-500 cursor-pointer">View Arguments</summary>
            <pre className="text-xs mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto">{JSON.stringify(args, null, 2)}</pre>
          </details>
        )}
      </div>
    )),
  });
}
