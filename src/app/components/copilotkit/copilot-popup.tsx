"use client";

import { CopilotPopup } from "@copilotkit/react-ui";
import { cn } from "@/lib/utils";
import { TextMessage } from "@copilotkit/runtime-client-gql";

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
  clickOutsideToClose?: boolean;
  hitEscapeToClose?: boolean;
  shortcut?: string;
  onInProgress?: (inProgress: boolean) => void;
  onSubmitMessage?: (message: string) => void | Promise<void>;
  onStopGeneration?: () => void;
  onReloadMessages?: () => void;
  onRegenerate?: (messageId: string) => void;
  onCopy?: (message: string) => void;
  onThumbsUp?: (message: TextMessage) => void;
  onThumbsDown?: (message: TextMessage) => void;
  variant?: "default" | "glassmorphic" | "neumorphic" | "floating" | "minimal";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";
  size?: "sm" | "md" | "lg" | "xl";
  imageUploadsEnabled?: boolean;
  hideStopButton?: boolean;
  children?: React.ReactNode;
}

/**
 * Reusable CopilotPopup component with cutting-edge 2025 design trends
 * Features glassmorphism, neumorphism, floating effects, and micro-interactions
 *
 * @param className - Additional CSS classes
 * @param labels - Custom labels for title, initial message, and placeholder
 * @param instructions - Additional instructions for the copilot
 * @param themeColor - Theme color in oklch format
 * @param onSetOpen - Callback when popup open state changes
 * @param defaultOpen - Whether the popup is open by default
 * @param clickOutsideToClose - Whether clicking outside closes the popup
 * @param hitEscapeToClose - Whether hitting escape closes the popup
 * @param shortcut - Keyboard shortcut to open the popup
 * @param onInProgress - Callback when chat is in progress
 * @param onSubmitMessage - Callback when a message is submitted
 * @param onStopGeneration - Callback to stop generation
 * @param onReloadMessages - Callback to reload messages
 * @param onRegenerate - Callback to regenerate a message
 * @param onCopy - Callback when message is copied
 * @param onThumbsUp - Callback for thumbs up feedback
 * @param onThumbsDown - Callback for thumbs down feedback
 * @param variant - Design variant (default, glassmorphic, neumorphic, floating, minimal)
 * @param position - Popup position on screen
 * @param size - Popup size variant
 * @param imageUploadsEnabled - Enable image uploads
 * @param hideStopButton - Hide the stop button
 * @param children - Child components
 */
export function CopilotPopupComponent({
  className,
  labels = {
    title: "AI Assistant",
    initial: "👋 Hi! How can I help you today?",
    placeholder: "Ask me anything...",
  },
  instructions,
  themeColor = "oklch(0.488 0.243 264.376)",
  onSetOpen,
  defaultOpen = false,
  clickOutsideToClose = true,
  hitEscapeToClose = true,
  shortcut = "/",
  onInProgress,
  onSubmitMessage,
  onStopGeneration,
  onReloadMessages,
  onRegenerate,
  onCopy,
  onThumbsUp,
  onThumbsDown,
  variant = "glassmorphic",
  position = "bottom-right",
  size = "md",
  imageUploadsEnabled = false,
  hideStopButton = false,
  children,
}: CopilotPopupComponentProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "glassmorphic":
        return cn(
          // Advanced glassmorphism with layered effects
          "backdrop-blur-3xl bg-background/30 border border-white/20",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37),0_0_0_1px_rgba(255,255,255,0.1)]",
          "before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
          "before:bg-gradient-to-br before:from-white/40 before:via-white/20 before:to-transparent",
          "before:mask-composite-subtract before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
          "relative overflow-hidden rounded-2xl"
        );
      case "neumorphic":
        return cn(
          // Soft neumorphic with elevated feel
          "bg-background shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff,inset_0_0_0_1px_rgba(255,255,255,0.1)]",
          "dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a,inset_0_0_0_1px_rgba(255,255,255,0.05)]",
          "border-0 rounded-3xl"
        );
      case "floating":
        return cn(
          // Floating card with dynamic shadows and hover effects
          "bg-background/95 backdrop-blur-md border border-border/50",
          "shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]",
          "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]",
          "hover:scale-105 transition-all duration-500 ease-out",
          "rounded-2xl transform-gpu"
        );
      case "minimal":
        return cn(
          // Clean minimal design with subtle effects
          "bg-background/90 backdrop-blur-sm border border-border/30",
          "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]",
          "rounded-xl"
        );
      default:
        return "bg-background border border-border rounded-lg";
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "bottom-right":
        return "fixed bottom-4 right-4";
      case "bottom-left":
        return "fixed bottom-4 left-4";
      case "top-right":
        return "fixed top-4 right-4";
      case "top-left":
        return "fixed top-4 left-4";
      case "center":
        return "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      default:
        return "fixed bottom-4 right-4";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "w-80 h-96";
      case "md":
        return "w-96 h-[32rem]";
      case "lg":
        return "w-[28rem] h-[36rem]";
      case "xl":
        return "w-[32rem] h-[40rem]";
      default:
        return "w-96 h-[32rem]";
    }
  };

  return (
    <div
      className={cn(
        "z-50 transition-all duration-700 ease-out",
        "transform-gpu will-change-transform",
        getPositionStyles(),
        getSizeStyles(),
        getVariantStyles(),
        className
      )}
      data-theme-color={themeColor}
    >
      {/* Animated background elements for glassmorphic variant */}
      {variant === "glassmorphic" && (
        <>
          <div className="absolute inset-0 opacity-30 rounded-2xl overflow-hidden">
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-radial from-primary/50 to-transparent rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-gradient-radial from-accent/50 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-radial from-secondary/40 to-transparent rounded-full blur-lg animate-bounce delay-500" />
          </div>

          {/* Animated mesh gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-60 animate-pulse" />
        </>
      )}

      {/* Floating variant glow effect */}
      {variant === "floating" && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-75 blur-sm" />
      )}

      <div className="relative z-10 h-full">
        <CopilotPopup
          labels={labels}
          instructions={instructions}
          onSetOpen={onSetOpen}
          defaultOpen={defaultOpen}
          clickOutsideToClose={clickOutsideToClose}
          hitEscapeToClose={hitEscapeToClose}
          shortcut={shortcut}
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
          className="h-full bg-transparent border-0 [&_.copilot-kit-popup]:bg-transparent [&_.copilot-kit-popup]:border-0"
        >
          {children}
        </CopilotPopup>
      </div>
    </div>
  );
}
