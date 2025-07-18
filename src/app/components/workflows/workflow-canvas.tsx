"use client";

import { useCallback, useState, useMemo, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  NodeTypes,
  ReactFlowInstance,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeChange,
  EdgeChange,
  XYPosition,
  Viewport,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { useCopilotAction } from "@copilotkit/react-core";
import { AgentNode } from './nodes/agent-node';
import { ToolNode } from './nodes/tool-node';
import { ConditionNode } from './nodes/condition-node';
import { StartNode } from './nodes/start-node';
import { EndNode } from './nodes/end-node';
import { Play, Pause, Square, Zap } from 'lucide-react';

/**
 * Workflow Canvas - Hybrid Builder-Executor
 *
 * Features:
 * - Visual workflow building with @xyflow/react
 * - Real-time execution monitoring
 * - Agent integration (researchAgent, analyzerAgent, supervisorAgent)
 * - CopilotKit AI-assisted workflow building
 * - Glassmorphic design with globals.css
 */

// Define node types following @xyflow/react v12 best practices
const nodeTypes: NodeTypes = {
  agentNode: AgentNode,
  toolNode: ToolNode,
  conditionNode: ConditionNode,
  startNode: StartNode,
  endNode: EndNode,
};

interface WorkflowExecution {
  id: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
  currentNodeId?: string;
  progress: number;
  startTime?: Date;
  endTime?: Date;
  results: Record<string, unknown>;
}

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  selectedNodes: Node[];
  selectedEdges: Edge[];
}

interface AgentNodeData extends Record<string, unknown> {
  label: string;
  agentType: 'researchAgent' | 'analyzerAgent' | 'supervisorAgent';
  status: 'idle' | 'running' | 'completed' | 'error';
  progress?: number;
  tools?: string[];
  lastResult?: unknown;
}

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'startNode',
    position: { x: 100, y: 100 },
    data: { label: 'Start' },
  },
];

const initialEdges: Edge[] = [];

export function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    nodes: initialNodes,
    edges: initialEdges,
    viewport: { x: 0, y: 0, zoom: 1 },
    selectedNodes: [],
    selectedEdges: [],
  });
  const [execution, setExecution] = useState<WorkflowExecution>({
    id: '',
    status: 'idle',
    progress: 0,
    results: {},
  });

  // Memoize nodeTypes to prevent unnecessary re-renders
  const memoizedNodeTypes: NodeTypes = useMemo(() => nodeTypes, []);

  // Properly typed event handlers
  const handleNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      setWorkflowState(prev => ({ ...prev, nodes }));
    },
    [onNodesChange, nodes]
  );

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onEdgesChange(changes);
      setWorkflowState(prev => ({ ...prev, edges }));
    },
    [onEdgesChange, edges]
  );

  const handleConnect: OnConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
      setWorkflowState(prev => ({ ...prev, edges: newEdges }));
    },
    [setEdges, edges]
  );

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  // CopilotKit Action for AI-assisted workflow building
  useCopilotAction({
    name: "buildWorkflow",
    description: "Build a workflow using AI assistance with agent orchestration and tool integration",
    parameters: [
      {
        name: "workflowDescription",
        type: "string",
        description: "Description of the workflow to build"
      },
      {
        name: "agents",
        type: "string[]",
        description: "Agents to include: researchAgent, analyzerAgent, supervisorAgent"
      },
      {
        name: "complexity",
        type: "string",
        description: "Workflow complexity: simple, moderate, complex"
      }
    ],
    handler: async ({ workflowDescription, agents, complexity }) => {
      // Generate workflow nodes based on AI input
      const newNodes = generateWorkflowNodes(workflowDescription, agents, complexity);
      const newEdges = generateWorkflowEdges(newNodes);

      setNodes(newNodes);
      setEdges(newEdges);
    },
    render: ({ status, args }) => {
      if (status === "executing") {
        return (
          <Card className="copilot-action-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Building Workflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Creating workflow: {args.workflowDescription}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Using agents: {args.agents?.join(', ')}
              </p>
            </CardContent>
          </Card>
        );
      }
      return (
        <div className="text-sm text-muted-foreground">
          Workflow builder ready
        </div>
      );
    }
  });

  const generateWorkflowNodes = (description: string, agents: string[], complexity: string): Node[] => {
    let nodeCounter = 0; // Initialize a counter for unique IDs
    const baseNodes: Node[] = [
      {
        id: 'start',
        type: 'startNode',
        position: { x: 100, y: 100 } as XYPosition,
        data: { label: 'Start' } as Record<string, unknown>,
      }
    ];

    // Use complexity to determine workflow structure
    const isComplex = complexity === 'complex';
    const isAdvanced = complexity === 'advanced';

    const yOffset = 200;
    const xCenter = 300;
    const spacing = isComplex ? 150 : 200;

    // Add agent nodes based on complexity and selected agents
    agents.forEach((agent: string, index: number) => {
      const agentData: AgentNodeData = {
        label: agent,
        agentType: agent as 'researchAgent' | 'analyzerAgent' | 'supervisorAgent',
        status: 'idle',
        progress: 0,
        tools: isComplex ? ['braveSearchTool', 'tavilySearchTool', 'collaborativeReasoningTool'] : ['basicTool'],
        lastResult: undefined,
      };

      // Complex workflows use different positioning
      const xPosition = isComplex
        ? xCenter + (index % 2 === 0 ? -spacing : spacing)
        : xCenter + (index * spacing);
      const yPosition = isComplex
        ? yOffset + Math.floor(index / 2) * 150
        : yOffset;

      baseNodes.push({
        id: `agent-${agent}`,
        type: 'agentNode',
        position: { x: xPosition, y: yPosition } as XYPosition,
        data: agentData,
      });
    });

    // Add conditional nodes for advanced workflows
    if (isAdvanced && description.toLowerCase().includes('condition')) {
      nodeCounter++;
      baseNodes.push({
        id: `condition-${nodeCounter}`, // Dynamic ID
        type: 'conditionNode',
        position: { x: xCenter, y: yOffset + 100 } as XYPosition,
        data: {
          label: 'Decision Point',
          condition: 'Check if analysis is complete',
          status: 'idle',
          result: undefined
        } as Record<string, unknown>,
      });
    }

    // Add tool nodes for complex workflows
    if (isComplex) {
      nodeCounter++;
      baseNodes.push({
        id: `tool-${nodeCounter}`, // Dynamic ID
        type: 'toolNode',
        position: { x: xCenter - 100, y: yOffset + 150 } as XYPosition,
        data: {
          label: 'Search Tool',
          toolType: 'braveSearchTool',
          status: 'idle',
          progress: 0
        } as Record<string, unknown>,
      });
    }

    // Calculate final end node position based on complexity
    const finalYOffset = isComplex ? yOffset + 300 : yOffset + 200;

    baseNodes.push({
      id: 'end',
      type: 'endNode',
      position: { x: xCenter, y: finalYOffset } as XYPosition,
      data: { label: 'End' } as Record<string, unknown>,
    });

    return baseNodes;
  };

  const generateWorkflowEdges = (nodes: Node[]): Edge[] => {
    const edges: Edge[] = [];

    // Simple linear connection for now
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        id: `edge-${i}`,
        source: nodes[i].id,
        target: nodes[i + 1].id,
        type: 'smoothstep',
      });
    }

    return edges;
  };

  const executeWorkflow = async () => {
    setExecution(prev => ({
      ...prev,
      status: 'running',
      startTime: new Date(),
      progress: 0,
    }));

    try {
      // Execute workflow using supervisorAgent
      const response = await fetch('/api/copilotkit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Execute this workflow with nodes: ${nodes.map(n => n.data.label).join(' -> ')}`
          }],
          agent: 'supervisorAgent',
          workflow: { nodes, edges }
        })
      });

      if (response.ok) {
        const result = await response.json();
        setExecution(prev => ({
          ...prev,
          status: 'completed',
          progress: 100,
          endTime: new Date(),
          results: result,
        }));
      }
    } catch (error) {
      console.error('Workflow execution failed:', error);
      setExecution(prev => ({
        ...prev,
        status: 'error',
        progress: 0,
      }));
    }
  };

  const pauseWorkflow = () => {
    setExecution(prev => ({ ...prev, status: 'paused' }));
  };

  const stopWorkflow = () => {
    // Reset all node statuses using workflowState
    const resetNodes = workflowState.nodes.map(node => {
      if (node.type === 'agentNode') {
        const nodeData = node.data as AgentNodeData;
        return {
          ...node,
          data: { ...nodeData, status: 'idle', progress: 0 }
        };
      }
      return node;
    });

    setNodes(resetNodes);
    setWorkflowState(prev => ({ ...prev, nodes: resetNodes }));

    setExecution(prev => ({
      ...prev,
      status: 'idle',
      progress: 0,
      currentNodeId: undefined
    }));
  };

  // Use reactFlowInstance for advanced operations
  const fitViewToWorkflow = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  };

  const exportWorkflow = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const workflowData = {
        ...flow,
        workflowState,
        execution,
        timestamp: new Date().toISOString()
      };

      const dataStr = JSON.stringify(workflowData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'workflow.json';
      link.click();

      URL.revokeObjectURL(url);
    }
  };

  const getWorkflowStats = () => {
    const totalNodes = workflowState.nodes.length;
    const agentNodes = workflowState.nodes.filter(n => n.type === 'agentNode').length;
    const toolNodes = workflowState.nodes.filter(n => n.type === 'toolNode').length;
    const conditionNodes = workflowState.nodes.filter(n => n.type === 'conditionNode').length;

    return { totalNodes, agentNodes, toolNodes, conditionNodes };
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Workflow Controls */}
      <Card className="glass border-white/10 mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Workflow Canvas
              <Badge variant="outline" className="border-white/30 text-white">
                {nodes.length - 2} nodes
              </Badge>
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Badge
                variant={execution.status === 'running' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {execution.status}
              </Badge>

              <div className="text-xs text-gray-400">
                {(() => {
                  const stats = getWorkflowStats();
                  return `${stats.totalNodes} nodes (${stats.agentNodes} agents, ${stats.toolNodes} tools, ${stats.conditionNodes} conditions)`;
                })()}
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  onClick={executeWorkflow}
                  disabled={execution.status === 'running'}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-3 w-3" />
                </Button>
                
                <Button
                  size="sm"
                  onClick={pauseWorkflow}
                  disabled={execution.status !== 'running'}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <Pause className="h-3 w-3" />
                </Button>
                
                <Button
                  size="sm"
                  onClick={stopWorkflow}
                  disabled={execution.status === 'idle'}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Square className="h-3 w-3" />
                </Button>

                <Button
                  size="sm"
                  onClick={fitViewToWorkflow}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Zap className="h-3 w-3" />
                </Button>

                <Button
                  size="sm"
                  onClick={exportWorkflow}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* ReactFlow Canvas */}
      <div className="flex-1 glass border-white/10 rounded-lg overflow-hidden">
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          onInit={onInit}
          nodeTypes={memoizedNodeTypes}
          fitView
          className="workflow-canvas"
          proOptions={{ hideAttribution: true }}
        >
          <Controls className="glass border-white/20" />
          <MiniMap 
            className="glass border-white/20" 
            nodeColor="#3b82f6"
            maskColor="rgba(0, 0, 0, 0.2)"
          />
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            color="rgba(255, 255, 255, 0.1)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
