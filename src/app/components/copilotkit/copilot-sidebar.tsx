"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
import { cn } from "@/lib/utils";
import { TextMessage } from "@copilotkit/runtime-client-gql";

interface CopilotSidebarComponentProps {
  className?: string;
  defaultOpen?: boolean;
  clickOutsideToClose?: boolean;
  hitEscapeToClose?: boolean;
  shortcut?: string;
  labels?: {
    title?: string;
    initial?: string;
    placeholder?: string;
  };
  instructions?: string;
  themeColor?: string;
  onSetOpen?: (open: boolean) => void;
  onInProgress?: (inProgress: boolean) => void;
  onSubmitMessage?: (message: string) => void | Promise<void>;
  onStopGeneration?: () => void;
  onReloadMessages?: () => void;
  onRegenerate?: (messageId: string) => void;
  onCopy?: (message: string) => void;
  onThumbsUp?: (message: TextMessage) => void;
  onThumbsDown?: (message: TextMessage) => void;
  variant?: "default" | "glassmorphic" | "neumorphic" | "floating";
  position?: "left" | "right";
  imageUploadsEnabled?: boolean;
  hideStopButton?: boolean;
  children?: React.ReactNode;
}

/**
 * Reusable CopilotSidebar component with cutting-edge 2025 design trends
 * Features glassmorphism, neumorphism, floating effects, and modern animations
 *
 * @param className - Additional CSS classes
 * @param defaultOpen - Whether the sidebar is open by default
 * @param clickOutsideToClose - Whether clicking outside closes the sidebar
 * @param hitEscapeToClose - Whether hitting escape closes the sidebar
 * @param shortcut - Keyboard shortcut to open the sidebar
 * @param labels - Custom labels for title, initial message, and placeholder
 * @param instructions - Additional instructions for the copilot
 * @param themeColor - Theme color in oklch format
 * @param onSetOpen - Callback when sidebar open state changes
 * @param onInProgress - Callback when chat is in progress
 * @param onSubmitMessage - Callback when a message is submitted
 * @param onStopGeneration - Callback to stop generation
 * @param onReloadMessages - Callback to reload messages
 * @param onRegenerate - Callback to regenerate a message
 * @param onCopy - Callback when message is copied
 * @param onThumbsUp - Callback for thumbs up feedback
 * @param onThumbsDown - Callback for thumbs down feedback
 * @param variant - Design variant (default, glassmorphic, neumorphic, floating)
 * @param position - Sidebar position (left or right)
 * @param imageUploadsEnabled - Enable image uploads
 * @param hideStopButton - Hide the stop button
 * @param children - Child components
 */
export function CopilotSidebarComponent({
  className,
  defaultOpen = false,
  clickOutsideToClose = true,
  hitEscapeToClose = true,
  shortcut = "/",
  labels = {
    title: "AI Assistant",
    initial: "👋 Hi! How can I help you today?",
    placeholder: "Ask me anything...",
  },
  instructions,
  themeColor = "oklch(0.488 0.243 264.376)",
  onSetOpen,
  onInProgress,
  onSubmitMessage,
  onStopGeneration,
  onReloadMessages,
  onRegenerate,
  onCopy,
  onThumbsUp,
  onThumbsDown,
  variant = "glassmorphic",
  position = "right",
  imageUploadsEnabled = false,
  hideStopButton = false,
  children,
}: CopilotSidebarComponentProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "glassmorphic":
        return cn(
          // Glassmorphism with advanced backdrop effects
          "backdrop-blur-2xl bg-background/40 border border-white/10",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
          "before:absolute before:inset-0 before:rounded-lg before:p-[1px]",
          "before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent",
          "before:mask-composite-subtract before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
          "relative overflow-hidden"
        );
      case "neumorphic":
        return cn(
          // Soft neumorphic design with tactile shadows
          "bg-background shadow-[inset_20px_20px_60px_#bebebe,inset_-20px_-20px_60px_#ffffff]",
          "dark:shadow-[inset_20px_20px_60px_#1a1a1a,inset_-20px_-20px_60px_#2a2a2a]",
          "border-0 rounded-3xl"
        );
      case "floating":
        return cn(
          // Floating card effect with dynamic shadows
          "bg-background/95 backdrop-blur-md border border-border/50",
          "shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]",
          "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]",
          "transition-all duration-500 ease-out",
          "rounded-2xl"
        );
      default:
        return "bg-background border border-border rounded-lg";
    }
  };

  const getPositionStyles = () => {
    return position === "left"
      ? "left-0 origin-left"
      : "right-0 origin-right";
  };

  return (
    <div
      className={cn(
        "fixed top-0 h-full z-50 transition-all duration-700 ease-out",
        "transform-gpu will-change-transform",
        getPositionStyles(),
        getVariantStyles(),
        className
      )}
      data-theme-color={themeColor}
    >
      {/* Animated background elements for glassmorphic variant */}
      {variant === "glassmorphic" && (
        <>
          <div className="absolute inset-0 opacity-20 rounded-lg overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-radial from-primary/40 to-transparent rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-radial from-accent/40 to-transparent rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-radial from-secondary/30 to-transparent rounded-full blur-xl animate-bounce delay-500" />
          </div>

          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-50" />
        </>
      )}

      {/* Floating variant glow effect */}
      {variant === "floating" && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-60" />
      )}

      <div className="relative z-10 h-full">
        <CopilotSidebar
          defaultOpen={defaultOpen}
          clickOutsideToClose={clickOutsideToClose}
          hitEscapeToClose={hitEscapeToClose}
          shortcut={shortcut}
          labels={labels}
          instructions={instructions}
          onSetOpen={onSetOpen}
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
          className="h-full bg-transparent border-0 [&_.copilot-kit-sidebar]:bg-transparent [&_.copilot-kit-sidebar]:border-0"
        >
          {children}
        </CopilotSidebar>
      </div>
    </div>
  );
}
