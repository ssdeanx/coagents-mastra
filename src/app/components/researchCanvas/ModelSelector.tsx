"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useModelSelectorContext } from "@/lib/model-selector-provider";
import { Brain, Cpu } from "lucide-react";

/**
 * Enhanced Model Selector Component
 *
 * Features:
 * - Glassmorphic design with modern styling
 * - Model icons and descriptions
 * - Performance indicators
 * - Responsive positioning
 */

const modelConfigs = {
  mastra: {
    name: "Mastra",
    description: "Integrated Mastra agents with specialized tools",
    icon: Brain,
    badge: "Default",
    color: "bg-blue-500"
  },
  google_genai: {
    name: "Google Gemini",
    description: "Gemini 2.5 with multimodal capabilities and search grounding",
    icon: Cpu,
    badge: "Multimodal",
    color: "bg-orange-500"
  },
  langgraph: {
    name: "LangGraph",
    description: "Advanced workflow orchestration with Google Generative AI",
    icon: Brain,
    badge: "Workflow",
    color: "bg-indigo-500"
  }
};

export function ModelSelector() {
  const { model, setModel, hidden, setHidden } = useModelSelectorContext();
  const currentModel = modelConfigs[model as keyof typeof modelConfigs] || modelConfigs.mastra;
  const IconComponent = currentModel.icon;

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="glass-strong border-0 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${currentModel.color} bg-opacity-20`}>
              <IconComponent className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">AI Model</span>
                <Badge variant="secondary" className="text-xs">
                  {currentModel.badge}
                </Badge>
              </div>
              <p className="text-xs text-gray-300">{currentModel.description}</p>
            </div>
          </div>

          <Select value={model} onValueChange={(v) => setModel(v)}>
            <SelectTrigger className="w-[280px] glass border-white/20 text-white">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent className="glass-strong border-white/20">
              {Object.entries(modelConfigs).map(([key, config]) => {
                const ModelIcon = config.icon;
                return (
                  <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded ${config.color} bg-opacity-20`}>
                        <ModelIcon className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{config.name}</span>
                          <Badge variant="outline" className="text-xs border-white/30 text-white">
                            {config.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-300">{config.description}</p>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <button
            type="button"
            onClick={() => setHidden(true)}
            className="mt-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Hide selector
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
