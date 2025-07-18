"use client";

import { PageLayout } from "@/app/components/layout/page-layout";
import { useCopilotAction } from "@copilotkit/react-core";
import { useState } from "react";

export default function DevelopmentWorkspacePage() {
  const [generatedCode, setGeneratedCode] = useState("");

  useCopilotAction({
    name: "generateCode",
    description: "Generates code based on user specifications.",
    parameters: [
      {
        name: "prompt",
        type: "string",
        description: "The prompt for code generation.",
      },
    ],
    handler: async ({ prompt }) => {
      // Placeholder for actual code generation logic with a Mastra agent
      const code = `// Generated code for: ${prompt}\nconsole.log("Hello from AI-generated code!");`;
      setGeneratedCode(code);
      alert(`Code generated: ${code}`);
    },
    render: "Generating code...",
  });

  return (
    <PageLayout
      title="Development Workspace"
      description="AI-powered environment for code generation and component creation."
    >
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Code Editor (Coming Soon)</h2>
        <p>This section will feature an integrated code editor.</p>

        <h2 className="text-2xl font-bold">Component Generator (Coming Soon)</h2>
        <p>This section will allow AI-powered component generation.</p>

        <h2 className="text-2xl font-bold">Generated Code Preview</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto">
          {generatedCode || "// No code generated yet."}
        </pre>
      </div>
    </PageLayout>
  );
}
