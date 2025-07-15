---
title: "GoogleGenerativeAIAdapter"
source: "https://docs.copilotkit.ai/reference/classes/llm-adapters/GoogleGenerativeAIAdapter"
author:
published:
created: 2025-07-15
description: "Copilot Runtime adapter for Google Generative AI (e.g. Gemini)."
tags:
  - "clippings"
---
We're officially launching AG-UI, the protocol for agent and user interactivity! [Learn more](https://ag-ui.com/).

LLM Adapters

Copilot Runtime adapter for Google Generative AI (e.g. Gemini).

Copilot Runtime adapter for Google Generative AI (e.g. Gemini).

## Example

```
import { CopilotRuntime, GoogleGenerativeAIAdapter } from "@copilotkit/runtime";

const { GoogleGenerativeAI } = require("@google/generative-ai");

 

const genAI = new GoogleGenerativeAI(process.env["GOOGLE_API_KEY"]);

 

const copilotKit = new CopilotRuntime();

 

return new GoogleGenerativeAIAdapter({ model: "gemini-1.5-pro" });
```

## Constructor Parameters

model string

A custom Google Generative AI model to use.

apiKey string

The API key to use.[Previous](https://docs.copilotkit.ai/reference/classes/llm-adapters/GroqAdapter)

[

GroqAdapter

](https://docs.copilotkit.ai/reference/classes/llm-adapters/GroqAdapter)[

Next

CopilotTask

](https://docs.copilotkit.ai/reference/classes/CopilotTask)

### On this page

No Headings

![](https://static.scarf.sh/a.png?x-pxid=ffc9f65d-0186-4575-b065-61d62ea9d7d3)