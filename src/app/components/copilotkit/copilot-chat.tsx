"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { cn } from "@/lib/utils";

interface CopilotChatComponentProps {
  className?: string;
  labels?: {
    title?: string;
    initial?: string;
    placeholder?: string;
  };
  instructions?: string;
  showResponseButton?: boolean;
  onInProgress?: (inProgress: boolean) => void;
}

/**
 * Reusable CopilotChat component with customizable styling and labels
 * 
 * @param className - Additional CSS classes
 * @param labels - Custom labels for title, initial message, and placeholder
 * @param instructions - Additional instructions for the copilot
 * @param showResponseButton - Whether to show the response button
 * @param onInProgress - Callback when chat is in progress
 */
export function CopilotChatComponent({
  className,
  labels = {
    title: "AI Assistant",
    initial: "👋 Hi! How can I help you today?",
    placeholder: "Ask me anything...",
  },
  instructions,
  showResponseButton = true,
  onInProgress,
}: CopilotChatComponentProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      <CopilotChat
        labels={labels}
        instructions={instructions}
        showResponseButton={showResponseButton}
        onInProgress={onInProgress}
        className="h-full"
      />
    </div>
  );
}
