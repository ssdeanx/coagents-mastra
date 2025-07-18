"use client";

import { memo } from 'react';
import { Handle, Position, Node, NodeProps } from '@xyflow/react';
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { GitBranch, Loader2 } from 'lucide-react';

/**
 * Condition Node Component for @xyflow/react
 *
 * Represents conditional logic in workflows
 */

interface ConditionNodeData extends Record<string, unknown> {
  label: string;
  condition: string;
  status: 'idle' | 'evaluating' | 'true' | 'false' | 'error';
  result?: boolean;
}

// Define the specific node type following @xyflow/react v12 patterns
type ConditionNodeType = Node<ConditionNodeData, 'conditionNode'>;

export const ConditionNode = memo(({ data, selected }: NodeProps<ConditionNodeType>) => {
  const nodeData = data as ConditionNodeData;
  const getStatusColor = () => {
    switch (nodeData.status) {
      case 'evaluating': return 'border-blue-400 bg-blue-500/20';
      case 'true': return 'border-green-400 bg-green-500/20';
      case 'false': return 'border-yellow-400 bg-yellow-500/20';
      case 'error': return 'border-red-400 bg-red-500/20';
      default: return 'border-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = () => {
    if (nodeData.status === 'evaluating') {
      return <Loader2 className="h-3 w-3 animate-spin text-blue-400" />;
    }
    return <GitBranch className="h-3 w-3 text-white" />;
  };

  return (
    <div className="condition-node">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-white/50 !border-white"
      />

      <Card className={`
        glass border-white/20 min-w-[160px] transition-all duration-200
        ${selected ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
        ${getStatusColor()}
      `}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-yellow-500/30">
                {getStatusIcon()}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{nodeData.label}</h3>
                <p className="text-xs text-gray-300">Condition</p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`text-xs border-white/30 text-white ${
                nodeData.status === 'evaluating' ? 'animate-pulse' : ''
              }`}
            >
              {nodeData.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-medium">Condition:</p>
            <p className="text-xs text-gray-300 line-clamp-2">{nodeData.condition}</p>

            {nodeData.result !== undefined && (
              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-gray-400 font-medium">Result:</p>
                <Badge
                  variant={nodeData.result ? "default" : "secondary"}
                  className="text-xs mt-1"
                >
                  {nodeData.result ? 'TRUE' : 'FALSE'}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* True path */}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="w-3 h-3 !bg-green-400 !border-green-300"
        style={{ top: '60%' }}
      />

      {/* False path */}
      <Handle
        type="source"
        position={Position.Left}
        id="false"
        className="w-3 h-3 !bg-red-400 !border-red-300"
        style={{ top: '60%' }}
      />
    </div>
  );
});

ConditionNode.displayName = 'ConditionNode';
