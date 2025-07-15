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
        required: true,
      },
    ],
    handler: ({ color }) => {
      onThemeChange?.(color);
      onNotification?.(`Theme color changed to ${color}`, "success");
      toast.success(`Theme updated to ${color}`);
      return { success: true, color };
    },
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
        required: true,
      },
      {
        name: "type",
        type: "string",
        description: "The notification type (success, error, info, warning)",
        required: false,
      },
    ],
    handler: ({ message, type = "info" }) => {
      onNotification?.(message, type as any);
      
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
        required: true,
      },
      {
        name: "newTab",
        type: "boolean",
        description: "Whether to open in a new tab",
        required: false,
      },
    ],
    handler: ({ path, newTab = false }) => {
      if (newTab) {
        window.open(path, "_blank");
      } else {
        window.location.href = path;
      }
      
      onNotification?.(`Navigating to ${path}`, "info");
      return { success: true, path, newTab };
    },
  });

  // Toggle sidebar action
  useCopilotAction({
    name: "toggleSidebar",
    description: "Toggle the sidebar open or closed",
    parameters: [
      {
        name: "open",
        type: "boolean",
        description: "Whether to open (true) or close (false) the sidebar. If not specified, it will toggle.",
        required: false,
      },
    ],
    handler: ({ open }) => {
      // This would need to be connected to your sidebar state management
      const event = new CustomEvent("toggleSidebar", { detail: { open } });
      window.dispatchEvent(event);
      
      const action = open === undefined ? "toggled" : (open ? "opened" : "closed");
      onNotification?.(`Sidebar ${action}`, "info");
      
      return { success: true, action, open };
    },
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
      } catch (error) {
        onNotification?.("Failed to copy to clipboard", "error");
        toast.error("Failed to copy to clipboard");
        return { success: false, error: "Clipboard access denied" };
      }
    },
  });

  return null; // This component only registers actions, doesn't render anything
}

/**
 * Hook for creating custom frontend actions
 * 
 * @param name - Name of the action
 * @param description - Description of what the action does
 * @param parameters - Parameters the action accepts
 * @param handler - Function to handle the action
 */
export function useFrontendAction(
  name: string,
  description: string,
  parameters: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
  }>,
  handler: (args: any) => any
) {
  useCopilotAction({
    name,
    description,
    parameters,
    handler,
  });
}
