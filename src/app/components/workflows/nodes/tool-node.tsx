"use client";

import { memo, ReactNode } from 'react';
import { Handle, Position, Node, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Wrench, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';

/**
 * Tool Node Component for @xyflow/react v12
 *
 * Professional implementation following latest @xyflow/react best practices
 * Represents individual Mastra tools in the workflow execution
 */

interface ToolNodeData extends Record<string, unknown> {
  label: string;
  toolType: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress?: number;
  input?: unknown;
  output?: ReactNode;
  executionTime?: number;
  errorMessage?: string;
}

// Define the specific node type following @xyflow/react v12 patterns
type ToolNodeType = Node<ToolNodeData, 'toolNode'>;

export const ToolNode = memo(({ data, selected }: NodeProps<ToolNodeType>) => {
  const nodeData = data as ToolNodeData;
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
        return <Wrench className="h-3 w-3 text-white" />;
    }
  };

  const getProgressWidth = () => {
    return nodeData.progress ? `${nodeData.progress}%` : '0%';
  };

  return (
    <div className="tool-node">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-white/50 !border-white"
      />

      <Card className={`
        glass border-white/20 min-w-[180px] transition-all duration-200
        ${selected ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
        ${getStatusColor()}
      `}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-orange-500/30">
                {getStatusIcon()}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{nodeData.label}</h3>
                <p className="text-xs text-gray-300">{nodeData.toolType}</p>
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

          {/* Output preview */}
          {nodeData.output && nodeData.status === 'completed' && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 font-medium">Output:</p>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                {typeof nodeData.output === 'string'
                  ? nodeData.output
                  : JSON.stringify(nodeData.output).slice(0, 80) + '...'
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

ToolNode.displayName = 'ToolNode';
