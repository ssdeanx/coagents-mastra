"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
import { CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { cn } from "@/lib/utils";

interface CopilotSidebarComponentProps {
  className?: string;
  defaultOpen?: boolean;
  clickOutsideToClose?: boolean;
  labels?: {
    title?: string;
    initial?: string;
    placeholder?: string;
  };
  instructions?: string;
  themeColor?: string;
  onSetOpen?: (open: boolean) => void;
}

/**
 * Reusable CopilotSidebar component with customizable styling and behavior
 * 
 * @param className - Additional CSS classes
 * @param defaultOpen - Whether the sidebar is open by default
 * @param clickOutsideToClose - Whether clicking outside closes the sidebar
 * @param labels - Custom labels for title, initial message, and placeholder
 * @param instructions - Additional instructions for the copilot
 * @param themeColor - Theme color for the copilot interface
 * @param onSetOpen - Callback when sidebar open state changes
 */
export function CopilotSidebarComponent({
  className,
  defaultOpen = false,
  clickOutsideToClose = true,
  labels = {
    title: "AI Assistant",
    initial: "👋 Hi! How can I help you today?",
    placeholder: "Ask me anything...",
  },
  instructions,
  themeColor,
  onSetOpen,
}: CopilotSidebarComponentProps) {
  const style = themeColor 
    ? ({ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties)
    : undefined;

  return (
    <div className={cn("", className)} style={style}>
      <CopilotSidebar
        defaultOpen={defaultOpen}
        clickOutsideToClose={clickOutsideToClose}
        labels={labels}
        instructions={instructions}
        onSetOpen={onSetOpen}
      />
    </div>
  );
}
