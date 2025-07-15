---
title: "LangChainAdapter"
source: "https://docs.copilotkit.ai/reference/classes/llm-adapters/LangChainAdapter"
author:
published:
created: 2025-07-15
description: "Copilot Runtime adapter for LangChain."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

LLM Adapters

Copilot Runtime adapter for LangChain.

Copilot Runtime adapter for LangChain.

## Example

```tsx
import { CopilotRuntime, LangChainAdapter } from "@copilotkit/runtime";

import { ChatOpenAI } from "@langchain/openai";

 

const copilotKit = new CopilotRuntime();

 

const model = new ChatOpenAI({

  model: "gpt-4o",

  apiKey: "<your-api-key>",

});

 

return new LangChainAdapter({

  chainFn: async ({ messages, tools }) => {

    return model.bindTools(tools).stream(messages);

    // or optionally enable strict mode

    // return model.bindTools(tools, { strict: true }).stream(messages);

  }

});
```

The asynchronous handler function (`chainFn`) can return any of the following:

- A simple `string` response
- A LangChain stream (`IterableReadableStream`)
- A LangChain `BaseMessageChunk` object
- A LangChain `AIMessage` object

## Constructor Parameters

chainFn (parameters: ChainFnParameters) => Promise<LangChainReturnType> required

A function that uses the LangChain API to generate a response.[Previous](https://docs.copilotkit.ai/reference/classes/llm-adapters/AnthropicAdapter)

[

AnthropicAdapter

](https://docs.copilotkit.ai/reference/classes/llm-adapters/AnthropicAdapter)[

Next

GroqAdapter

](https://docs.copilotkit.ai/reference/classes/llm-adapters/GroqAdapter)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)