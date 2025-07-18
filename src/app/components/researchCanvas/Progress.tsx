
import { cn } from "@/lib/utils";
import { CheckIcon, LoaderCircle, Clock, AlertCircle, Zap } from "lucide-react";
import { truncateUrl } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress as ProgressBar } from "@/app/components/ui/progress";

/**
 * Enhanced Progress Component
 *
 * Features:
 * - Glassmorphic design with modern styling
 * - Progress percentage calculation
 * - Status indicators with icons
 * - Estimated time remaining
 * - URL truncation and favicon display
 */

interface ProgressLog {
  message: string;
  done: boolean;
  timestamp?: Date;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

interface ProgressProps {
  logs: ProgressLog[];
  title?: string;
  showProgress?: boolean;
  estimatedTime?: number;
}

export function Progress({
  logs,
  title = "Processing",
  showProgress = true,
  estimatedTime
}: ProgressProps) {
  if (logs.length === 0) {
    return null;
  }

  const completedSteps = logs.filter(log => log.done).length;
  const progressPercentage = (completedSteps / logs.length) * 100;
  const currentStepIndex = logs.findIndex(log => !log.done);
  const isComplete = completedSteps === logs.length;

  const getStepIcon = (log: ProgressLog, index: number) => {
    if (log.done) {
      return <CheckIcon className="w-3 h-3 text-emerald-400" />;
    } else if (index === currentStepIndex) {
      return <LoaderCircle className="w-3 h-3 text-blue-400 animate-spin" />;
    } else if (log.type === 'error') {
      return <AlertCircle className="w-3 h-3 text-red-400" />;
    } else {
      return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const getStepStatus = (log: ProgressLog, index: number) => {
    if (log.done) {
      return 'completed';
    }
    if (index === currentStepIndex) {
      return 'active';
    }
    if (log.type === 'error') {
      return 'error';
    }
    return 'pending';
  };

  return (
    <Card className="glass border-white/10" data-test-id="progress-steps">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isComplete ? "default" : "secondary"} className="text-xs">
              {completedSteps}/{logs.length}
            </Badge>
            {estimatedTime && !isComplete && (
              <Badge variant="outline" className="text-xs border-white/30 text-white">
                ~{estimatedTime}s
              </Badge>
            )}
          </div>
        </div>

        {showProgress && (
          <div className="space-y-2">
            <ProgressBar value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-300">
              <span>{progressPercentage.toFixed(0)}% complete</span>
              {isComplete && <span className="text-emerald-400">✓ Finished</span>}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-1">
          {logs.map((log, index) => {
            const status = getStepStatus(log, index);
            const isActive = index === currentStepIndex;

            return (
              <div
                key={index}
                data-test-id="progress-step-item"
                className={cn(
                  "flex items-start gap-3 p-2 rounded-lg transition-all duration-200",
                  {
                    "bg-white/5": isActive,
                    "opacity-60": status === 'pending',
                    "bg-red-500/10": status === 'error',
                    "bg-emerald-500/10": status === 'completed'
                  }
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center transition-colors",
                      {
                        "bg-emerald-500/20 border border-emerald-400/30": status === 'completed',
                        "bg-blue-500/20 border border-blue-400/30": status === 'active',
                        "bg-red-500/20 border border-red-400/30": status === 'error',
                        "bg-gray-500/20 border border-gray-400/30": status === 'pending'
                      }
                    )}
                    data-test-id={log.done ? 'progress-step-item_done' : 'progress-step-item_loading'}
                  >
                    {getStepIcon(log, index)}
                  </div>

                  {index < logs.length - 1 && (
                    <div
                      className={cn(
                        "w-[1px] h-6 ml-2.5 mt-1 transition-colors",
                        status === 'completed' ? "bg-emerald-400/30" : "bg-gray-600/30"
                      )}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "text-sm font-medium transition-colors",
                      {
                        "text-white": isActive,
                        "text-emerald-300": status === 'completed',
                        "text-red-300": status === 'error',
                        "text-gray-400": status === 'pending'
                      }
                    )}>
                      {log.message.replace(
                        /https?:\/\/[^\s]+/g,
                        (url) => truncateUrl(url)
                      )}
                    </p>

                    {log.timestamp && (
                      <span className="text-xs text-gray-500 ml-2">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    )}
                  </div>

                  {log.duration && status === 'completed' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Completed in {log.duration}ms
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
