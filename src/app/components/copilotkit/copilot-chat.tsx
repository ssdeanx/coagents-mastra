"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { cn } from "@/lib/utils";
import { TextMessage } from "@copilotkit/runtime-client-gql";

interface CopilotChatComponentProps {
  className?: string;
  labels?: {
    title?: string;
    initial?: string;
    placeholder?: string;
  };
  instructions?: string;
  onInProgress?: (inProgress: boolean) => void;
  onSubmitMessage?: (message: string) => void | Promise<void>;
  onStopGeneration?: () => void;
  onReloadMessages?: () => void;
  onRegenerate?: (messageId: string) => void;
  onCopy?: (message: string) => void;
  onThumbsUp?: (message: TextMessage) => void;
  onThumbsDown?: (message: TextMessage) => void;
  variant?: "default" | "glassmorphic" | "neumorphic";
  themeColor?: string;
  imageUploadsEnabled?: boolean;
  hideStopButton?: boolean;
  children?: React.ReactNode;
}

/**
 * Reusable CopilotChat component with cutting-edge 2025 design trends
 * Features glassmorphism, neumorphism, and modern oklch colors
 *
 * @param className - Additional CSS classes
 * @param labels - Custom labels for title, initial message, and placeholder
 * @param instructions - Additional instructions for the copilot
 * @param onInProgress - Callback when chat is in progress
 * @param onSubmitMessage - Callback when a message is submitted
 * @param onStopGeneration - Callback to stop generation
 * @param onReloadMessages - Callback to reload messages
 * @param onRegenerate - Callback to regenerate a message
 * @param onCopy - Callback when message is copied
 * @param onThumbsUp - Callback for thumbs up feedback
 * @param onThumbsDown - Callback for thumbs down feedback
 * @param variant - Design variant (default, glassmorphic, neumorphic)
 * @param themeColor - Custom theme color in oklch format
 * @param imageUploadsEnabled - Enable image uploads
 * @param hideStopButton - Hide the stop button
 * @param children - Child components
 */
export function CopilotChatComponent({
  className,
  labels = {
    title: "AI Assistant",
    initial: "👋 Hi! How can I help you today?",
    placeholder: "Ask me anything...",
  },
  instructions,
  onInProgress,
  onSubmitMessage,
  onStopGeneration,
  onReloadMessages,
  onRegenerate,
  onCopy,
  onThumbsUp,
  onThumbsDown,
  variant = "glassmorphic",
  themeColor = "oklch(0.488 0.243 264.376)",
  imageUploadsEnabled = false,
  hideStopButton = false,
  children,
}: CopilotChatComponentProps) {
  /**
   * Determines the CSS class names for the selected design variant.
   *
   * This helper function returns the appropriate class names for glassmorphic, neumorphic, or default styling.
   *
   * Returns:
   *   A string of CSS class names for the selected variant.
   */
  const getVariantStyles = () => {
    switch (variant) {
      case "glassmorphic":
        return cn(
          // Using globals.css glassmorphism utilities
          "glass-strong rounded-2xl relative overflow-hidden",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
        );
      case "neumorphic":
        return cn(
          // Using globals.css neumorphism utilities
          "neomorphic dark:neomorphic-dark rounded-3xl border-0"
        );
      default:
        return "bg-background border border-border rounded-lg";
    }
  };

  return (
    <div
      className={cn(
        "h-full w-full rounded-lg transition-all duration-300 ease-out",
        "hover:shadow-lg hover:scale-[1.02] transform-gpu",
        getVariantStyles(),
        className
      )}
      data-theme-color={themeColor}
    >
      {/* Animated gradient background for glassmorphic variant */}
      {variant === "glassmorphic" && (
        <div className="absolute inset-0 opacity-30 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 gradient-mesh animate-pulse" />
          <div className="absolute top-0 left-0 w-32 h-32 gradient-primary rounded-full blur-xl animate-float" />
          <div className="absolute bottom-0 right-0 w-24 h-24 gradient-accent rounded-full blur-xl animate-glow" />
        </div>
      )}

      <div className="relative z-10 h-full">
        <CopilotChat
          labels={labels}
          instructions={instructions}
          onInProgress={onInProgress}
          onSubmitMessage={onSubmitMessage}
          onStopGeneration={onStopGeneration}
          onReloadMessages={onReloadMessages}
          onRegenerate={onRegenerate}
          onCopy={onCopy}
          onThumbsUp={onThumbsUp}
          onThumbsDown={onThumbsDown}
          imageUploadsEnabled={imageUploadsEnabled}
          hideStopButton={hideStopButton}
          className="h-full [&_.copilot-kit-chat]:bg-transparent [&_.copilot-kit-chat]:border-0"
        >
          {children}
        </CopilotChat>
      </div>
    </div>
  );
}
