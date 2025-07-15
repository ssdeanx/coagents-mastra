"use client";

import { CopilotPopup } from "@copilotkit/react-ui";
import { CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { cn } from "@/lib/utils";

interface CopilotPopupComponentProps {
  className?: string;
  labels?: {
    title?: string;
    initial?: string;
    placeholder?: string;
  };
  instructions?: string;
  themeColor?: string;
  onSetOpen?: (open: boolean) => void;
  defaultOpen?: boolean;
}

/**
 * Reusable CopilotPopup component with customizable styling and behavior
 * 
 * @param className - Additional CSS classes
 * @param labels - Custom labels for title, initial message, and placeholder
 * @param instructions - Additional instructions for the copilot
 * @param themeColor - Theme color for the copilot interface
 * @param onSetOpen - Callback when popup open state changes
 * @param defaultOpen - Whether the popup is open by default
 */
export function CopilotPopupComponent({
  className,
  labels = {
    title: "AI Assistant",
    initial: "👋 Hi! How can I help you today?",
    placeholder: "Ask me anything...",
  },
  instructions,
  themeColor,
  onSetOpen,
  defaultOpen = false,
}: CopilotPopupComponentProps) {
  const style = themeColor 
    ? ({ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties)
    : undefined;

  return (
    <div className={cn("", className)} style={style}>
      <CopilotPopup
        labels={labels}
        instructions={instructions}
        onSetOpen={onSetOpen}
        defaultOpen={defaultOpen}
      />
    </div>
  );
}
