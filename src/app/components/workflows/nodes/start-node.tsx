"use client";

import { memo } from 'react';
import { Handle, Position, Node, NodeProps } from '@xyflow/react';
import { Card, CardContent } from "@/app/components/ui/card";
import { Play } from 'lucide-react';

/**
 * Start Node Component for @xyflow/react v12
 *
 * Professional implementation following latest @xyflow/react best practices
 * Represents the starting point of a workflow
 */

interface StartNodeData extends Record<string, unknown> {
  label: string;
}

// Define the specific node type following @xyflow/react v12 patterns
type StartNodeType = Node<StartNodeData, 'startNode'>;

export const StartNode = memo(({ data, selected }: NodeProps<StartNodeType>) => {
  const nodeData = data as StartNodeData;
  return (
    <div className="start-node">
      <Card className={`
        glass border-green-400/50 bg-green-500/20 min-w-[120px] transition-all duration-200
        ${selected ? 'ring-2 ring-green-400 ring-opacity-50' : ''}
      `}>
        <CardContent className="p-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-green-500/30">
              <Play className="h-4 w-4 text-green-400" />
            </div>
            <span className="text-sm font-semibold text-white">{nodeData.label || 'Start'}</span>
          </div>
        </CardContent>
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-green-400 !border-green-300"
      />
    </div>
  );
});

StartNode.displayName = 'StartNode';
