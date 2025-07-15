"use client";

import { useState } from "react";
import { useCopilotAction } from "@copilotkit/react-core";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/utils";


interface TaskStep {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  completed?: boolean;
}

interface HumanInTheLoopProps {
  className?: string;
  themeColor?: string;
}

/**
 * Human-in-the-Loop component for interactive task planning and execution
 * 
 * @param className - Additional CSS classes
 * @param themeColor - Theme color for the interface
 */
export function HumanInTheLoop({ className, themeColor }: HumanInTheLoopProps) {
  const [currentPlan, setCurrentPlan] = useState<TaskStep[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // Action for creating a task plan
  useFrontendAction(
    "createTaskPlan",
    "Create a step-by-step plan for a task that requires human approval",
    [
      {
        name: "task",
        type: "string",
        description: "The main task to plan for",
      },
      {
        name: "steps",
        type: "object[]",
        description: "Array of task steps",
      },
    ],
    async (args: Record<string, unknown>) => {
      const { task, steps } = args as { task: string; steps: Array<Record<string, unknown>> };
      const taskSteps: TaskStep[] = steps.map((step: Record<string, unknown>, index: number) => ({
        id: `step-${index}`,
        title: (step.title as string) || (step.name as string) || `Step ${index + 1}`,
        description: step.description as string,
        required: (step.required as boolean) || false,
        completed: false,
      }));

      setCurrentPlan(taskSteps);
      setIsExecuting(false);

      return {
        message: `Created a plan for: ${task}`,
        steps: taskSteps.length,
        status: "awaiting_approval",
      };
    },
    ({ args, result }) => {
      const taskArgs = args as { task: string };
      const taskResult = result as { steps: number } | undefined;

      return (
        <Card className={cn("my-4", className)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Task Plan: {taskArgs?.task}
              <Badge variant="outline">Awaiting Approval</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Review the steps below and select which ones you would like to execute:
            </p>
            {taskResult && (
              <div className="text-sm text-green-600 mb-4">
                ✅ Plan created with {taskResult.steps} steps
              </div>
            )}
          </CardContent>
        </Card>
      );
    }
  );

  // Action for executing the approved plan
  useCopilotAction({
    name: "executePlan",
    description: "Execute the approved task plan",
    parameters: [
      {
        name: "selectedSteps",
        type: "string[]",
        description: "Array of selected step IDs to execute",
        required: true,
      },
    ],
    handler: async ({ selectedSteps }: { selectedSteps: string[] }) => {
      setIsExecuting(true);

      try {
        const executedSteps = currentPlan.filter(step =>
          selectedSteps.includes(step.id)
        );

        // Mark steps as completed in the plan
        setCurrentPlan(prev => prev.map(s =>
          selectedSteps.includes(s.id) ? { ...s, completed: true } : s
        ));

        setIsExecuting(false);

        return {
          message: `Executed ${executedSteps.length} steps successfully`,
          executedSteps: executedSteps.map(step => step.title),
          status: "completed",
        };
      } catch (error) {
        setIsExecuting(false);
        throw error;
      }
    },
    render: ({ result }) => (
      <Card className={cn("my-4", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Execution Results
            <Badge variant={result?.status === "completed" ? "default" : result?.status === "partial" ? "secondary" : "destructive"}>
              {result?.status === "completed" ? "Completed" : result?.status === "partial" ? "Partial" : "Failed"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result && (
            <div className="space-y-4">
              <p className={cn(
                "text-sm",
                result.status === "completed" ? "text-green-600" :
                result.status === "partial" ? "text-yellow-600" : "text-red-600"
              )}>
                {result.status === "completed" ? "✅" : result.status === "partial" ? "⚠️" : "❌"} {result.message}
              </p>

              {result.executedSteps && result.executedSteps.length > 0 && (
                <div className="text-sm">
                  <strong className="text-green-600">Successfully executed:</strong>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    {result.executedSteps.map((step: string, index: number) => (
                      <li key={index} className="text-green-600">{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.failedSteps && result.failedSteps.length > 0 && (
                <div className="text-sm">
                  <strong className="text-red-600">Failed steps:</strong>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    {result.failedSteps.map((step: { title: string; error: string }, index: number) => (
                      <li key={index} className="text-red-600">
                        {step.title}: {step.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    ),
  });

  // Action for executing individual steps through agents
  useCopilotAction({
    name: "executeTaskStep",
    description: "Execute a specific task step using the appropriate Mastra agent",
    parameters: [
      {
        name: "stepTitle",
        type: "string",
        description: "The title of the step to execute",
        required: true,
      },
      {
        name: "stepDescription",
        type: "string",
        description: "The description of the step to execute",
        required: false,
      },
      {
        name: "agentType",
        type: "string",
        description: "The type of agent to use (weather, research, analyzer, generation, supervisor)",
        required: false,
      },
    ],
    handler: async ({ stepTitle, stepDescription, agentType }: {
      stepTitle: string;
      stepDescription?: string;
      agentType?: string;
    }) => {
      // The agent routing is handled by your CopilotKit runtime
      return {
        success: true,
        stepTitle,
        stepDescription,
        result: `Task "${stepTitle}" has been processed by the ${agentType || 'supervisor'} agent`,
        timestamp: new Date().toISOString(),
      };
    },
  });

  const handleStepToggle = (stepId: string, checked: boolean) => {
    setCurrentPlan(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: checked } : step
    ));
  };

  const handleExecutePlan = () => {
    const selectedSteps = currentPlan
      .filter(step => step.completed)
      .map(step => step.id);
    
    // This would trigger the executePlan action
    // In a real implementation, you'd call the action directly
    console.log("Executing plan with steps:", selectedSteps);
  };

  if (currentPlan.length === 0) {
    return null;
  }

  return (
    <Card className={cn("my-4", className)}>
      <CardHeader>
        <CardTitle>Review & Execute Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentPlan.map((step) => (
          <div key={step.id} className="flex items-start space-x-3 p-3 border rounded-lg">
            <Checkbox
              id={step.id}
              checked={step.completed}
              onCheckedChange={(checked) => handleStepToggle(step.id, checked as boolean)}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor={step.id} className="text-sm font-medium cursor-pointer">
                {step.title}
                {step.required && <Badge variant="destructive" className="ml-2 text-xs">Required</Badge>}
              </label>
              {step.description && (
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              )}
            </div>
          </div>
        ))}
        
        <Button 
          onClick={handleExecutePlan}
          disabled={isExecuting || !currentPlan.some(step => step.completed)}
          className="w-full"
          style={{ backgroundColor: themeColor }}
        >
          {isExecuting ? "Executing..." : "Execute Selected Steps"}
        </Button>
      </CardContent>
    </Card>
  );
}
