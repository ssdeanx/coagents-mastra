# CopilotKit Overview

## CopilotKit Integration

CopilotKit is integrated into this project to enable AI-driven features and facilitate natural language interactions with the Mastra AI agents.

* **Frontend Integration:**
  * [`src/app/layout.tsx`](src/app/layout.tsx): The root layout of the Next.js application wraps the entire application with `CopilotKit` from `@copilotkit/react-core`. It configures the runtime URL to `/api/copilotkit` and specifies `agent="weatherAgent"`, indicating that frontend interactions will be routed through this API endpoint to the specified agent.
  * [`src/app/page.tsx`](src/app/page.tsx): This main page component utilizes `useCopilotAction` from `@copilotkit/react-core` to define frontend actions and enable generative UI rendering. This allows for dynamic and interactive user experiences powered by AI.

* **Backend Integration (API Route):**
  * [`src/app/api/copilotkit/route.ts`](src/app/api/copilotkit/route.ts): This Next.js API route serves as the crucial bridge between the frontend's CopilotKit instance and the Mastra AI agents. It initializes `CopilotRuntime` and fetches remote agents using `MastraClient`, processing requests from the frontend and forwarding them to the Mastra AI agents. It then handles the agents' responses and sends them back to the frontend.

This integration allows for a seamless flow of AI-powered features, where user interactions on the frontend are processed by the Mastra agents via the CopilotKit runtime.

## Building Reusable CopilotKit Components

To ensure consistency, maintainability, and scalability, it's crucial to design CopilotKit integrations with reusability in mind. Here's how you can build modular and reusable components and actions within your application:

### 1. Reusable AI Actions with `useCopilotAction`

The `useCopilotAction` hook is a powerful way to define functions that your AI agents can call. By encapsulating specific functionalities as actions, you can reuse them across different parts of your application or even with different agents.

* **Define actions centrally:** Create a dedicated file or module for your common `useCopilotAction` definitions.
* **Clear descriptions and parameters:** Provide detailed `description` for each action and clearly define its `parameters` (including `type`, `description`, and `required` status). This helps the AI understand when and how to use the action.
* **Generative UI for actions:** Leverage the `render` or `renderAndWaitForResponse` properties of `useCopilotAction` to create reusable UI components that visualize the action's execution or gather user input.

**Example (from `docs/copilotkit/Agentic Chat with Frontend Tools.md`):**

```tsx
useCopilotAction({
  name: "changeBackgroundTool",
  description:
    "Change the background color of the chat. Can be anything that the CSS background attribute accepts. Regular colors, linear of radial gradients etc.",
  parameters: [
    {
      name: "background",
      type: "string",
      description: "The background. Prefer gradients.",
    },
  ],
  handler: ({ background }) => {
    setBackground(background);
  },
  followUp: false,
});
```

This `changeBackgroundTool` can be reused by any component that needs to allow the AI to modify its background, promoting a consistent user experience.

### 2. Providing Reusable Context with `useCopilotReadable`

The `useCopilotReadable` hook allows you to expose application state and information to the Copilot. By structuring this data thoughtfully, you can provide reusable context that enhances the AI's understanding without duplicating information.

* **Modular context providers:** Wrap logical sections of your application with components that use `useCopilotReadable` to expose relevant data.
* **Hierarchical context:** Use the `parentId` property to maintain a hierarchical structure of information, especially useful for nested components or lists. This allows the AI to understand relationships between different pieces of data.
* **Descriptive values:** Ensure the `description` and `value` provided are clear and concise, enabling the AI to effectively utilize the context.

**Example (from `docs/copilotkit/useCopilotReadable API Rf.md`):**

```tsx
function Employee(props: EmployeeProps) {
  const { employeeName, workProfile, metadata } = props;

  const employeeContextId = useCopilotReadable({
    description: "Employee name",
    value: employeeName
  });

  useCopilotReadable({
    description: "Work profile",
    value: workProfile.description(),
    parentId: employeeContextId
  });

  useCopilotReadable({
    description: "Employee metadata",
    value: metadata.description(),
    parentId: employeeContextId
  });

  return (
    // Render as usual...
  );
}
```

This pattern allows the `Employee` component to provide its own context to the Copilot, which can then be reused wherever employee data is displayed.

### 3. Customizing and Reusing UI Components

CopilotKit provides several pre-built UI components like `CopilotChat`, `CopilotSidebar`, and `CopilotPopup`. These components are highly customizable, allowing you to reuse their core functionality while adapting their appearance and behavior to your application's design system.

* **CSS Variables and Custom CSS:** Utilize CopilotKit's CSS variables and class names (e.g., `.copilotKitChat`, `.copilotKitInput`) to apply consistent styling across all instances of these components.
* **Custom Sub-Components:** Replace default sub-components (e.g., `AssistantMessage`, `Input`) with your own React components to achieve a completely custom look and feel while retaining the underlying CopilotKit logic. This is ideal for integrating with existing design systems.

**Example (from `docs/copilotkit/Custom Sub-Components.md`):**

```tsx
const CustomAssistantMessage = (props: AssistantMessageProps) => {
  // ... custom rendering logic ...
};

<CopilotKit>
  <CopilotSidebar AssistantMessage={CustomAssistantMessage} />
</CopilotKit>
```

By passing `CustomAssistantMessage` to `CopilotSidebar`, you reuse the sidebar's functionality but control how assistant messages are rendered.

### 4. Headless UI for Maximum Flexibility (`useCopilotChat`)

For scenarios requiring complete control over the UI, the `useCopilotChat` hook provides a "headless" approach. This allows you to build your chat interface from scratch, giving you ultimate reusability and flexibility in how you present AI interactions.

* **Build your own UI:** `useCopilotChat` exposes functions like `visibleMessages`, `appendMessage`, `setMessages`, and `reset`, allowing you to manage the chat state and build any UI you desire.
* **Decoupled presentation:** Your UI components are completely decoupled from CopilotKit's default rendering, making them highly reusable across different parts of your application or even in different projects.

**Example (from `docs/copilotkit/Fully Headless UI.md`):**

```tsx
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

export function CustomChatInterface() {
  const {
    visibleMessages,
    appendMessage,
    // ... other functions
  } = useCopilotChat();

  const sendMessage = (content: string) => {
    appendMessage(new TextMessage({ content, role: Role.User }));
  };

  return (
    <div>
      {/* Implement your custom chat UI here using visibleMessages and sendMessage */}
    </div>
  );
}
```

By following these guidelines, you can build a robust and maintainable application that effectively leverages CopilotKit's features while promoting code reusability.

## CopilotKit API Reference

For detailed information on CopilotKit's components, hooks, and runtime, refer to the following API documentation:

* **[`CopilotKit API Rf.md`](docs/copilotkit/CopilotKit API Rf.md)**: The core CopilotKit provider component, wrapping your application and providing context to other components and hooks.
* **[`CopilotRuntime.md`](docs/copilotkit/CopilotRuntime.md)**: The backend component of CopilotKit, enabling interaction with LLMs, agents, and remote endpoints.
* **[`CopilotChat API Ref.md`](docs/copilotkit/CopilotChat API Ref.md)**: Provides a customizable chat interface component for interacting with your copilot.
* **[`CopilotSidebar API Rf.md`](docs/copilotkit/CopilotSidebar API Rf.md)**: A convenience wrapper for `CopilotChat` that offers a collapsible and expandable sidebar chat interface.
* **[`CopilotPopup API Rf.md`](docs/copilotkit/CopilotPopup API Rf.md)**: A convenience wrapper for `CopilotChat` that provides a floating chat interface.
* **[`CopilotTextarea API Rf.md`](docs/copilotkit/CopilotTextarea API mRf.md)**: An AI-powered textarea component with autocomplete features.
* **[`CopilotTask API Rf.md`](docs/copilotkit/CopilotTask API Rf.md)**: Used to execute one-off tasks, leveraging available context and actions.
* **[`useCopilotAction.md`](docs/copilotkit/useCopilotAction.md)**: A React hook to define custom actions that can be called by the AI, enabling generative UI.
* **[`useCopilotReadable API Rf.md`](docs/copilotkit/useCopilotReadable API Rf.md)**: A React hook to provide application state and other information as context to the Copilot.
* **[`useCopilotChat.md`](docs/copilotkit/useCopilotChat.md)**: A React hook for direct interaction with the Copilot instance, enabling fully custom (headless) UI implementations.
* **[`useCopilotAdditionalInstructions API Rf.md`](docs/copilotkit/useCopilotAdditionalInstructions API Rf.md)**: A React hook to provide additional instructions to the agent.
* **[`useCopilotChatSuggestions.md`](docs/copilotkit/useCopilotChatSuggestions.md)**: A React hook to generate chat suggestions based on real-time app state.
* **[`useCoAgent API Rf.md`](docs/copilotkit/useCoAgent API Rf.md)**: A hook to share state bidirectionally between your application and the agent (CoAgents).
* **[`useCoAgentStateRender API Rf.md`](docs/copilotkit/useCoAgentStateRender API Rf.md)**: A hook to render the state of the agent in the chat.
* **[`useLangGraphInterrupt API Rf.md`](docs/copilotkit/useLangGraphInterrupt API Rf.md)**: A hook to display generative UI on LangGraph's Interrupt event.
* **[`GoogleGenerativeAIAdapter.md`](docs/copilotkit/GoogleGenerativeAIAdapter.md)**: Copilot Runtime adapter for Google Generative AI (e.g., Gemini).
* **[`LangChainAdapter API Rf.md`](docs/copilotkit/LangChainAdapter API Rf.md)**: Copilot Runtime adapter for LangChain.
* **[`Markdown rendering.md`](docs/copilotkit/Markdown rendering.md)**: Information on how markdown is rendered in assistant messages and how to customize it.
* **[`Styling Copilot UI.md`](docs/copilotkit/Styling Copilot UI.md)**: Guide on customizing the look and feel of Copilot UI components using CSS variables, custom CSS, fonts, icons, and labels.
* **[`Custom Sub-Components.md`](docs/copilotkit/Custom Sub-Components.md)**: Details on swapping out sub-components of Copilot UI for custom appearances.
* **[`Fully Headless UI.md`](docs/copilotkit/Fully Headless UI.md)**: Explains how to build a completely custom UI using the `useCopilotChat` hook.
* **[`Agentic Chat with Frontend Tools.md`](docs/copilotkit/Agentic Chat with Frontend Tools.md)**: Demonstrates agentic chat capabilities with frontend tool integration.
* **[`Human-in-the-Loop Task Planner.md`](docs/copilotkit/Human-in-the-Loop Task Planner.md)**: Showcases human-in-the-loop capabilities for collaborative planning.
* **[`Tool-Based Generative UI Haiku Creator.md`](docs/copilotkit/Tool-Based Generative UI Haiku Creator.md)**: Illustrates tool-based generative UI for dynamic content generation.
