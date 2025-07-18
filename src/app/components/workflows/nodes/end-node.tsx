"use client";

import { memo } from 'react';
import { Handle, Position, Node, NodeProps } from '@xyflow/react';
import { Card, CardContent } from "@/app/components/ui/card";
import { Square } from 'lucide-react';

/**
 * End Node Component for @xyflow/react v12
 *
 * Professional implementation following latest @xyflow/react best practices
 * Represents the end point of a workflow
 */

interface EndNodeData extends Record<string, unknown> {
  label: string;
}

// Define the specific node type following @xyflow/react v12 patterns
type EndNodeType = Node<EndNodeData, 'endNode'>;

export const EndNode = memo(({ data, selected }: NodeProps<EndNodeType>) => {
  const nodeData = data as EndNodeData;
  return (
    <div className="end-node">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-red-400 !border-red-300"
      />

      <Card className={`
        glass border-red-400/50 bg-red-500/20 min-w-[120px] transition-all duration-200
        ${selected ? 'ring-2 ring-red-400 ring-opacity-50' : ''}
      `}>
        <CardContent className="p-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-red-500/30">
              <Square className="h-4 w-4 text-red-400" />
            </div>
            <span className="text-sm font-semibold text-white">{nodeData.label || 'End'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

EndNode.displayName = 'EndNode';
