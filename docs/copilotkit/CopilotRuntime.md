---
title: "CopilotRuntime"
source: "https://docs.copilotkit.ai/reference/classes/CopilotRuntime"
author:
published:
created: 2025-07-15
description: "Copilot Runtime is the back-end component of CopilotKit, enabling interaction with LLMs."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

Copilot Runtime is the back-end component of CopilotKit, enabling interaction with LLMs.

## Usage

```tsx
import { CopilotRuntime } from "@copilotkit/runtime";

 

const copilotKit = new CopilotRuntime();
```

## Constructor Parameters

middleware Middleware

Middleware to be used by the runtime.

```tsx
onBeforeRequest: (options: {

  threadId?: string;

  runId?: string;

  inputMessages: Message[];

  properties: any;

}) => void | Promise<void>;
```

```tsx
onAfterRequest: (options: {

  threadId?: string;

  runId?: string;

  inputMessages: Message[];

  outputMessages: Message[];

  properties: any;

}) => void | Promise<void>;
```

actions ActionsConfiguration<T>

A list of server side actions that can be executed. Will be ignored when remoteActions are set

remoteActions CopilotKitEndpoint\[\]

Deprecated: Use `remoteEndpoints`.

remoteEndpoints EndpointDefinition\[\]

A list of remote actions that can be executed.

langserve RemoteChainParameters\[\]

An array of LangServer URLs.

agents Record<string, AbstractAgent>

A map of agent names to AGUI agents. Example agent config:

```tsx
import { AbstractAgent } from "@ag-ui/client";

// ...

agents: {

  "support": new CustomerSupportAgent(),

  "technical": new TechnicalAgent()

}
```

delegateAgentProcessingToServiceAdapter boolean

Delegates agent state processing to the service adapter.

When enabled, individual agent state requests will not be processed by the agent itself. Instead, all processing will be handled by the service adapter.

observability\_c CopilotObservabilityConfig

Configuration for LLM request/response logging. Requires publicApiKey from CopilotKit component to be set:

```
<CopilotKit publicApiKey="ck_pub_..." />
```

Example logging config:

```
logging: {

  enabled: true, // Enable or disable logging

  progressive: true, // Set to false for buffered logging

  logger: {

    logRequest: (data) => langfuse.trace({ name: "LLM Request", input: data }),

    logResponse: (data) => langfuse.trace({ name: "LLM Response", output: data }),

    logError: (errorData) => langfuse.trace({ name: "LLM Error", metadata: errorData }),

  },

}
```

mcpServers MCPEndpointConfig\[\]

Configuration for connecting to Model Context Protocol (MCP) servers. Allows fetching and using tools defined on external MCP-compliant servers. Requires providing the `createMCPClient` function during instantiation. @experimental

createMCPClient CreateMCPClientFunction

A function that creates an MCP client instance for a given endpoint configuration. This function is responsible for using the appropriate MCP client library (e.g., `@copilotkit/runtime`, `ai`) to establish a connection. Required if `mcpServers` is provided.

onError CopilotErrorHandler

Optional error handler for comprehensive debugging and observability.

Requires publicApiKey: Error handling only works when requests include a valid publicApiKey. This is a premium CopilotKit Cloud feature.

@param errorEvent - Structured error event with rich debugging context

@example

```tsx
const runtime = new CopilotRuntime({

  onError: (errorEvent) => {

    debugDashboard.capture(errorEvent);

  }

});
```

processRuntimeRequest request: CopilotRuntimeRequest

request CopilotRuntimeRequest

getAllAgents graphqlContext: GraphQLContext

graphqlContext GraphQLContext

discoverAgentsFromEndpoints graphqlContext: GraphQLContext

graphqlContext GraphQLContext

loadAgentState graphqlContext: GraphQLContext, threadId: string, agentName: string

graphqlContext GraphQLContext

threadId string

agentName string

errorGraphQLError error: { message: string; code: string; type: string }, context: { operation: string; cloudConfigPresent: boolean; guardrailsEnabled: boolean; }

Public method to handle GraphQL validation errors

error { message: string; code: string; type: string }

context { operation: string; cloudConfigPresent: boolean; guardrailsEnabled: boolean; }[Previous](https://docs.copilotkit.ai/reference/hooks/useLangGraphInterrupt)

[

useLangGraphInterrupt

](https://docs.copilotkit.ai/reference/hooks/useLangGraphInterrupt)[

Next

OpenAIAdapter

](https://docs.copilotkit.ai/reference/classes/llm-adapters/OpenAIAdapter)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)