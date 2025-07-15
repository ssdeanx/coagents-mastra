"use client";

import { CatchAllActionRenderProps, useCopilotAction } from "@copilotkit/react-core";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Loader2 } from "lucide-react";

interface GenerativeUIProps {
  className?: string;
  themeColor?: string;
  showDetails?: boolean;
}

/**
 * Reusable Generative UI component that renders tool calls with a clean interface
 * 
 * @param className - Additional CSS classes
 * @param themeColor - Theme color for the interface
 * @param showDetails - Whether to show detailed information about tool calls
 */
export function GenerativeUI({ 
  className, 
  themeColor = "oklch(0.216 0.006 56.043)",
  showDetails = true 
}: GenerativeUIProps) {
  useCopilotAction({
    name: "*",
    render: (props: CatchAllActionRenderProps) => {
      const isComplete = props.status === "complete";
      const isExecuting = props.status === "executing";

      return (
        <Card className={cn("my-4 border-l-4 transition-all duration-300", className)} 
              style={{ borderLeftColor: themeColor }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {isExecuting && <Loader2 className="h-4 w-4 animate-spin" />}
                {props.name}
              </CardTitle>
              <Badge variant={isComplete ? "default" : "secondary"}>
                {isComplete ? "Complete" : "Executing..."}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Input Arguments */}
            {props.args && Object.keys(props.args).length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Input</h4>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <pre className="text-sm overflow-auto max-h-32 font-mono">
                    {JSON.stringify(props.args, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Output Result */}
            {props.result && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Output</h4>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <pre className="text-sm overflow-auto max-h-32 font-mono">
                    {JSON.stringify(props.result, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Detailed Information */}
            {showDetails && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  View Details
                </summary>
                <div className="mt-2 bg-muted/30 p-3 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-48 font-mono">
                    {JSON.stringify(props, null, 2)}
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
 * 
 * @param name - Name of the action
 * @param render - Custom render function for the action
 */
export function useGenerativeUIAction(name: string, render: (props: CatchAllActionRenderProps) => React.ReactNode) {
  useCopilotAction({
    name,
    render,
  });
}
