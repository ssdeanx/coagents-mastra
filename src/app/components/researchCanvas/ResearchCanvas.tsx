"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  useCoAgent,
  useCoAgentStateRender,
  useCopilotAction,
} from "@copilotkit/react-core";
import { Progress } from "./Progress";
import { EditResourceDialog } from "./EditResourceDialog";
import { AddResourceDialog } from "./AddResourceDialog";
import { Resources } from "./Resources";
import { AgentState, Resource } from "@/lib/types";
import { useModelSelectorContext } from "@/lib/model-selector-provider";
import { Search, FileText, Brain, Zap, AlertTriangle } from "lucide-react";

/**
 * Enhanced Research Canvas Component
 *
 * Features:
 * - Glassmorphic design with modern styling
 * - Real agent integration with researchAgent and analyzerAgent
 * - Enhanced progress tracking
 * - Better resource management
 * - Improved user experience
 */

export function ResearchCanvas() {
  const { model, agent } = useModelSelectorContext();

  const { state, setState } = useCoAgent<AgentState>({
    name: agent,
    initialState: {
      model,
      resources: [],
    },
  });
  useCoAgentStateRender({
    name: agent,
    render: ({ state, nodeName, status }) => {
      if (!state.logs || state.logs.length === 0) {
        return null;
      }
      return (
        <Progress
          logs={state.logs}
          title={`${nodeName} - ${status}`}
          showProgress={status === 'inProgress'}
        />
      );
    },
  });

  useCopilotAction({
    name: "DeleteResources",
    description:
      "Prompt the user for resource delete confirmation, and then perform resource deletion",
    available: "remote",
    parameters: [
      {
        name: "urls",
        type: "string[]",
      },
    ],
    renderAndWait: ({ args, status, handler }) => {
      return (
        <div
          className=""
          data-test-id="delete-resource-generative-ui-container"
        >
          <div className="font-bold text-base mb-2">
            Delete these resources?
          </div>
          <Resources
            resources={resources.filter((resource) =>
              (args.urls || []).includes(resource.url)
            )}
            customWidth={200}
          />
          {status === "executing" && (
            <div className="mt-4 flex justify-start space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handler("NO")}
                className="glass border-white/20 text-white hover:glass-strong"
              >
                Cancel
              </Button>
              <Button
                type="button"
                data-test-id="button-delete"
                onClick={() => handler("YES")}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>
      );
    },
  });

  const resources: Resource[] = state.resources || [];
  const setResources = (resources: Resource[]) => {
    setState((prevState: AgentState | undefined) => ({
      ...(prevState || state),
      resources,
    }));
  };

  // const [resources, setResources] = useState<Resource[]>(dummyResources);
  const [newResource, setNewResource] = useState<Resource>({
    url: "",
    title: "",
    description: "",
  });
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);

  const addResource = () => {
    if (newResource.url) {
      setResources([...resources, { ...newResource }]);
      setNewResource({ url: "", title: "", description: "" });
      setIsAddResourceOpen(false);
    }
  };

  const removeResource = (url: string) => {
    setResources(
      resources.filter((resource: Resource) => resource.url !== url)
    );
  };
  
  const [editResource, setEditResource] = useState<Resource | null>(null as Resource | null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null as string | null);
  const [isEditResourceOpen, setIsEditResourceOpen] = useState(false);

  const handleCardClick = (resource: Resource) => {
    setEditResource({ ...resource }); // Ensure a new object is created
    setOriginalUrl(resource.url); // Store the original URL
    setIsEditResourceOpen(true);
  };

  const updateResource = () => {
    if (editResource && originalUrl) {
      setResources(
        resources.map((resource) =>
          resource.url === originalUrl ? { ...editResource } : resource
        )
      );
      setEditResource(null);
      setOriginalUrl(null);
      setIsEditResourceOpen(false);
    }
  };

  return (
    <div className="research-workspace w-full h-full overflow-y-auto p-6">
      <div className="space-y-6 pb-10">
        {/* Research Question Section */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5" />
              Research Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter your research question to begin..."
              value={state.research_question || ""}
              onChange={(e) =>
                setState({ ...state, research_question: e.target.value })
              }
              aria-label="Research question"
              className="glass border-white/20 text-white placeholder:text-gray-400 px-4 py-3 text-base"
            />
            {state.research_question && (
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" className="border-white/30 text-white">
                  <Brain className="h-3 w-3 mr-1" />
                  Ready for research
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resources Section */}
        <Card className="glass border-white/10">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Research Resources
                {resources.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {resources.length}
                  </Badge>
                )}
              </CardTitle>
              <div className="flex gap-2">
                <AddResourceDialog
                  isOpen={isAddResourceOpen}
                  onOpenChange={setIsAddResourceOpen}
                  newResource={newResource}
                  setNewResource={setNewResource}
                  addResource={addResource}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {resources.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No resources added yet</p>
                <p className="text-xs mt-1">Add resources to enhance your research</p>
              </div>
            ) : (
              <Resources
                resources={resources}
                handleCardClick={handleCardClick}
                removeResource={removeResource}
                layout="grid"
                showMetadata={true}
              />
            )}
          </CardContent>
        </Card>

        {/* Hidden Edit Dialog */}
        <EditResourceDialog
          isOpen={isEditResourceOpen}
          onOpenChange={setIsEditResourceOpen}
          editResource={editResource}
          setEditResource={setEditResource}
          updateResource={updateResource}
        />

        {/* Research Draft Section */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Research Draft
              {state.report && (
                <Badge variant="outline" className="border-white/30 text-white">
                  {state.report.length} chars
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              data-test-id="research-draft"
              placeholder="Your research findings and analysis will appear here..."
              value={state.report || ""}
              onChange={(e) => setState({ ...state, report: e.target.value })}
              rows={12}
              aria-label="Research draft"
              className="glass border-white/20 text-white placeholder:text-gray-400 px-4 py-3 text-base min-h-[300px] resize-none"
            />
            {state.report && (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Draft saved
                  </Badge>
                </div>
                <div className="text-xs text-gray-400">
                  {state.report.split(' ').length} words
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
