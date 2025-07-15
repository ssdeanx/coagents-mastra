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
  useCopilotAction({
    name: "createTaskPlan",
    description: "Create a step-by-step plan for a task that requires human approval",
    parameters: [
      {
        name: "task",
        type: "string",
        description: "The main task to plan for",
        required: true,
      },
      {
        name: "steps",
        type: "object[]",
        description: "Array of task steps",
        required: true,
      },
    ],
    handler: async ({ task, steps }) => {
      const taskSteps: TaskStep[] = steps.map((step: any, index: number) => ({
        id: `step-${index}`,
        title: step.title || step.name || `Step ${index + 1}`,
        description: step.description,
        required: step.required || false,
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
    render: ({ args, result }) => (
      <Card className={cn("my-4", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Task Plan: {args?.task}
            <Badge variant="outline">Awaiting Approval</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Review the steps below and select which ones you would like to execute:
          </p>
          {result && (
            <div className="text-sm text-green-600 mb-4">
              ✅ Plan created with {result.steps} steps
            </div>
          )}
        </CardContent>
      </Card>
    ),
  });

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
    handler: async ({ selectedSteps }) => {
      setIsExecuting(true);
      
      // Simulate execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const executedSteps = currentPlan.filter(step => 
        selectedSteps.includes(step.id)
      );
      
      setIsExecuting(false);
      
      return {
        message: `Executed ${executedSteps.length} steps successfully`,
        executedSteps: executedSteps.map(step => step.title),
        status: "completed",
      };
    },
    render: ({ args, result }) => (
      <Card className={cn("my-4", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Execution Results
            <Badge variant="default">Completed</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result && (
            <div className="space-y-2">
              <p className="text-sm text-green-600">
                ✅ {result.message}
              </p>
              <div className="text-sm">
                <strong>Executed steps:</strong>
                <ul className="list-disc list-inside mt-1">
                  {result.executedSteps?.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    ),
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
