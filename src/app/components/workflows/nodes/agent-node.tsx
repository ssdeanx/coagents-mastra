"use client";

import { memo } from 'react';
import { Handle, Position, Node, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Brain, Search, BarChart3, Users, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';

/**
 * Agent Node Component for @xyflow/react v12
 *
 * Professional implementation following latest @xyflow/react best practices
 * Represents Mastra agents in the workflow execution:
 * - researchAgent: Web research and data gathering with braveSearchTool, tavilySearchTool
 * - analyzerAgent: Data analysis and insights with collaborativeReasoningTool
 * - supervisorAgent: Workflow orchestration and coordination
 */

interface AgentNodeData extends Record<string, unknown> {
  label: string;
  agentType: 'researchAgent' | 'analyzerAgent' | 'supervisorAgent';
  status: 'idle' | 'running' | 'completed' | 'error';
  progress?: number;
  tools?: string[];
  lastResult?: unknown;
  executionTime?: number;
  errorMessage?: string;
}

// Define the specific node type following @xyflow/react v12 patterns
type AgentNodeType = Node<AgentNodeData, 'agentNode'>;

const agentConfigs = {
  researchAgent: {
    icon: Search,
    color: 'bg-blue-500',
    description: 'Web research and data gathering',
    tools: ['braveSearchTool', 'tavilySearchTool', 'diffbot', 'chunkerTool']
  },
  analyzerAgent: {
    icon: BarChart3,
    color: 'bg-purple-500',
    description: 'Data analysis and insights',
    tools: ['collaborativeReasoningTool', 'scientificMethodTool', 'metacognitiveMonitoringTool']
  },
  supervisorAgent: {
    icon: Users,
    color: 'bg-green-500',
    description: 'Workflow orchestration',
    tools: ['agentCoordinationTool', 'workflowManagementTool', 'resultAggregationTool']
  }
};

export const AgentNode = memo(({ data, selected }: NodeProps<AgentNodeType>) => {
  const nodeData = data as AgentNodeData;
  const config = agentConfigs[nodeData.agentType];
  const IconComponent = config.icon;

  const getStatusColor = () => {
    switch (nodeData.status) {
      case 'running': return 'border-blue-400 bg-blue-500/20';
      case 'completed': return 'border-green-400 bg-green-500/20';
      case 'error': return 'border-red-400 bg-red-500/20';
      default: return 'border-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = () => {
    switch (nodeData.status) {
      case 'running':
        return <Loader2 className="h-3 w-3 animate-spin text-blue-400" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-400" />;
      case 'error':
        return <XCircle className="h-3 w-3 text-red-400" />;
      case 'idle':
        return <Clock className="h-3 w-3 text-gray-400" />;
      default:
        return <IconComponent className="h-3 w-3 text-white" />;
    }
  };

  const getProgressWidth = () => {
    return nodeData.progress ? `${nodeData.progress}%` : '0%';
  };

  return (
    <div className="agent-node">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-white/50 !border-white"
      />

      <Card className={`
        glass border-white/20 min-w-[200px] transition-all duration-200
        ${selected ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
        ${getStatusColor()}
      `}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${config.color} bg-opacity-30`}>
                {getStatusIcon()}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{nodeData.label}</h3>
                <p className="text-xs text-gray-300">{config.description}</p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`text-xs border-white/30 text-white ${
                nodeData.status === 'running' ? 'animate-pulse' : ''
              }`}
            >
              {nodeData.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Progress bar for running status */}
          {nodeData.status === 'running' && nodeData.progress !== undefined && (
            <div className="mb-3">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-blue-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ '--progress-width': getProgressWidth() } as React.CSSProperties}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{nodeData.progress}% complete</p>
            </div>
          )}

          {/* Tools */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-medium">Available Tools:</p>
            <div className="flex flex-wrap gap-1">
              {config.tools.slice(0, 3).map((tool: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-1.5 py-0.5 bg-white/10 text-gray-300"
                >
                  {tool.replace('Tool', '')}
                </Badge>
              ))}
              {config.tools.length > 3 && (
                <Badge
                  variant="secondary"
                  className="text-xs px-1.5 py-0.5 bg-white/10 text-gray-300"
                >
                  +{config.tools.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Last result preview */}
          {nodeData.lastResult != null && nodeData.status === 'completed' && (
            <div className="mt-3 pt-2 border-t border-white/10">
              <p className="text-xs text-gray-400 font-medium">Last Result:</p>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                {typeof nodeData.lastResult === 'string'
                  ? nodeData.lastResult
                  : JSON.stringify(nodeData.lastResult).slice(0, 100) + '...'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-white/50 !border-white"
      />
    </div>
  );
});

AgentNode.displayName = 'AgentNode';
