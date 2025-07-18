"use client";

import React, { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "react-resizable-panels";
import CodeEditor from "./code-editor"; // Assuming CodeEditor is in the same directory

interface ComponentGeneratorProps {
  onComponentGenerated: (component: GeneratedComponent) => void;
  templates: ComponentTemplate[];
  generationAgent: any; // Placeholder for MastraAgent
}

interface GeneratedComponent {
  id: string;
  name: string;
  code: string;
  props: ComponentProp[];
  dependencies: string[];
  preview: React.ReactNode;
  documentation: string;
  tests?: string;
}

interface ComponentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'form' | 'layout' | 'data-display' | 'navigation' | 'feedback' | 'input';
  baseCode: string;
  configurableProps: TemplateProp[];
  preview: string; // URL or base64 for image preview
}

interface ComponentProp {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function';
  required: boolean;
  defaultValue?: any;
  description: string;
  validation?: any[]; // Placeholder for ValidationRule[]
}

interface TemplateProp {
  name: string;
  type: string;
  defaultValue?: any;
  options?: string[];
}

const ComponentGenerator: React.FC<ComponentGeneratorProps> = ({
  onComponentGenerated,
  templates,
  generationAgent,
}) => {
  const [componentCode, setComponentCode] = useState<string>(`
import React from 'react';

interface MyComponentProps {
  // Define props here
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return (
    <div>
      {/* Component content goes here */}
      <p>Hello, World!</p>
    </div>
  );
};

export default MyComponent;
`);
  const [previewComponent, setPreviewComponent] = useState<React.ReactNode>(null);

  const handleCodeChange = (newCode: string) => {
    setComponentCode(newCode);
    // In a real scenario, you'd dynamically import/evaluate the newCode
    // and set it as the previewComponent. This is complex and requires
    // a secure sandbox environment. For now, it's a placeholder.
    try {
        // This is a highly simplified and insecure example.
        // DO NOT use eval in a production environment without extreme caution
        // and robust sandboxing.
        // const Component = eval(`(${newCode})`);
        // setPreviewComponent(<Component />);
        setPreviewComponent(
            <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-500">Live preview not available in this simplified example.</p>
                <p className="text-sm text-gray-500">Changes will be visible upon full implementation.</p>
            </div>
        );
    } catch (error) {
        setPreviewComponent(
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
                <p>Error in component code:</p>
                <pre className="text-xs overflow-auto">{error instanceof Error ? error.message : String(error)}</pre>
            </div>
        );
    }
  };

  const handleGenerateComponent = () => {
    // Placeholder for AI generation logic
    const generated: GeneratedComponent = {
      id: `comp-${Date.now()}`,
      name: "GeneratedComponent",
      code: componentCode,
      props: [],
      dependencies: [],
      preview: previewComponent,
      documentation: "AI-generated component.",
    };
    onComponentGenerated(generated);
    alert("Component generation (placeholder) triggered!");
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Component Generator</h2>
      <div className="flex-grow">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={50}>
            <div className="flex flex-col h-full p-4">
              <h3 className="text-lg font-semibold mb-2">Component Code</h3>
              <div className="flex-grow border rounded-md overflow-hidden">
                <CodeEditor
                  value={componentCode}
                  language="typescript" // Or 'typescriptreact' for TSX
                  theme="vs-dark"
                  onChange={handleCodeChange}
                  // onSave can be added here
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex flex-col h-full p-4">
              <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
              <div className="flex-grow border rounded-md flex items-center justify-center bg-white">
                {previewComponent}
              </div>
              <button
                onClick={handleGenerateComponent}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Generate Component (AI)
              </button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ComponentGenerator;
export default ComponentGenerator;
