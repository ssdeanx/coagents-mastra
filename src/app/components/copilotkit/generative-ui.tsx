"use client";

import { CatchAllActionRenderProps, useCopilotAction } from "@copilotkit/react-core";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Loader2, Sparkles, Zap, CheckCircle2 } from "lucide-react";

interface GenerativeUIProps {
  className?: string;
  themeColor?: string;
  showDetails?: boolean;
  variant?: "default" | "glassmorphic" | "neumorphic" | "minimal";
  animated?: boolean;
}

/**
 * Reusable Generative UI component with cutting-edge 2025 design trends
 * Features glassmorphism, neumorphism, micro-interactions, and dynamic animations
 *
 * @param className - Additional CSS classes
 * @param themeColor - Theme color in oklch format
 * @param showDetails - Whether to show detailed information about tool calls
 * @param variant - Design variant (default, glassmorphic, neumorphic, minimal)
 * @param animated - Whether to enable micro-animations
 */
export function GenerativeUI({
  className,
  themeColor = "oklch(0.488 0.243 264.376)",
  showDetails = true,
  variant = "glassmorphic",
  animated = true
}: GenerativeUIProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "glassmorphic":
        return cn(
          "backdrop-blur-xl bg-background/60 border border-white/20",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
          "before:absolute before:inset-0 before:rounded-lg before:p-[1px]",
          "before:bg-gradient-to-br before:from-white/20 before:to-transparent",
          "before:mask-composite-subtract before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
          "relative overflow-hidden"
        );
      case "neumorphic":
        return cn(
          "bg-background shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]",
          "dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a]",
          "border-0 rounded-2xl"
        );
      case "minimal":
        return cn(
          "bg-background/90 backdrop-blur-sm border border-border/30",
          "shadow-sm rounded-lg"
        );
      default:
        return "bg-background border border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "executing":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      default:
        return <Zap className="h-4 w-4 text-yellow-500" />;
    }
  };

  useCopilotAction({
    name: "*",
    render: (props: CatchAllActionRenderProps) => {
      const { args, result, status, name } = props;
      const isComplete = status === "complete";

      return (
        <Card
          className={cn(
            "my-4 border-l-4 transition-all duration-500 ease-out glass",
            animated && "hover:scale-[1.02] hover:shadow-lg transform-gpu",
            getVariantStyles(),
            className
          )}
          style={{ borderLeftColor: themeColor }}
          data-theme-color={themeColor}
        >
          {/* Glassmorphic background effects */}
          {variant === "glassmorphic" && (
            <div className="absolute inset-0 opacity-20 rounded-lg overflow-hidden">
              <div className="absolute top-2 right-2 w-16 h-16 gradient-primary rounded-full blur-xl animate-pulse opacity-30" />
              <Sparkles className="absolute top-4 left-4 h-3 w-3 text-primary/60 animate-pulse" />
              <div className="absolute bottom-2 left-2 w-12 h-12 gradient-accent rounded-full blur-lg animate-float opacity-20" />
            </div>
          )}

          <CardHeader className="pb-3 relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className={cn(
                "text-lg font-semibold flex items-center gap-2 text-shadow-sm",
                animated && "transition-all duration-300"
              )}>
                {getStatusIcon(status)}
                <span className={animated ? "animate-in slide-in-from-left-2 duration-300" : ""}>
                  {name}
                </span>
              </CardTitle>
              <Badge
                variant={isComplete ? "default" : "secondary"}
                className={cn(
                  "transition-all duration-300 drop-shadow-colored",
                  animated && "animate-in slide-in-from-right-2 duration-300 delay-100"
                )}
              >
                {isComplete ? "Complete" : "Executing..."}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 relative z-10">
            {/* Input Arguments */}
            {args && typeof args === 'object' && Object.keys(args).length > 0 && (
              <div className={animated ? "animate-in slide-in-from-bottom-2 duration-300 delay-200" : ""}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 text-shadow-sm">Input</h4>
                <div className="glass-subtle p-3 rounded-lg">
                  <pre className="text-sm overflow-auto max-h-32 font-mono">
                    {JSON.stringify(args, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Output Result */}
            {result !== undefined && result !== null && (
              <div className={animated ? "animate-in slide-in-from-bottom-2 duration-300 delay-300" : ""}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 text-shadow-sm">Output</h4>
                <div className="glass-subtle p-3 rounded-lg">
                  <pre className="text-sm overflow-auto max-h-32 font-mono">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Detailed Information */}
            {showDetails && (
              <details className={cn("mt-4", animated && "animate-in slide-in-from-bottom-2 duration-300 delay-400")}>
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View Details
                </summary>
                <div className="mt-2 glass-subtle p-3 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-48 font-mono">
                    {JSON.stringify({ args, result, status, name }, null, 2)}
                  </pre>
                </div>
              </details>
            )}
          </CardContent>
        </Card>
      );
    },
  });

  return null; // This component only registers the action, doesn't render anything itself
}

/**
 * Hook for creating custom generative UI actions
 * Use this as a template for creating your own custom actions
 *
 * Example usage:
 * useCopilotAction({
 *   name: "customAction",
 *   render: (props) => <YourCustomComponent {...props} />
 * });
 */
